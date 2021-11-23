import React, { useEffect, useState } from 'react';
import { Container, Text, Button, Content, Input } from './styles'
import XLSX from 'xlsx';
import { CSVReader } from "react-papaparse"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { toast } from 'react-toastify';

import { api } from '../../services/api';


export default function Test() {

  const [dados, setDados] = useState([])
  const [currentKeys, setCurrentKeys] = useState([]);
  const [colunaDinamica, setColunaDinamica] = useState([])
  const [errors, SetErros] = useState([]);
  const [upload, setUpload] = useState([]);
  

  function handleUpload(e, file) {
    // console.log(file)
    setUpload(file);
    const data = []

    for (let i = 0 ; i < e.length; i++) {
      data.push(e[i].data)
    }
    data.pop()
    // console.log('data =>', data)

    const knowType = file.name.split('.')
    const size = knowType.length
    const fileType = knowType[size - 1]

    if (fileType === 'xlsx') {
      
      const reader = new FileReader()
      const rABS = !!reader.readAsBinaryString
  
      reader.onload = (e) => {
  
        const bstr = e.target.result
        const wb = XLSX.read(bstr, {
          type: rABS ? "binary" : "array",
          bookVBA: true
        })
  
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const dataArray = XLSX.utils.sheet_to_json(ws, { header: 1 })
        verifyData(dataArray, fileType)
      }

      if (rABS) {
        reader.readAsBinaryString(file)
      } else {
        reader.readAsArrayBuffer(file)
      }
      
      return
    }
    
    if (fileType === 'csv') {
      verifyData(data)
      
      return
    }
    
    else {
      alert('Não aceita esse tipo de arquivo, favor colocar um arquivo (.xlsx ou .csv) ')
    }
  }

  async function enviarCsv() {
    console.log(upload)
    let formData = new FormData();
    formData.append('file', upload);
    formData.append('author', 'fabio');

    console.log(formData)

    try {
      await api.post('/cargas/insert', formData)
    } catch (err) {
      console.log(err)
    }
  }

  function verifyData(arr, fileType) {
    // console.log('teste', arr)
    let result = [];
    let array = []
    // setCurrentKeys(arr[0].map(item => item))

    const keys = (arr[0].map(item => item))
    
    
 
    // function excelDateToJSDate (excelDate) {
    //   const date = new Date(Math.round((excelDate - (25567 + 2)) * 86400 * 1000));
    //   const converted_date = date.toISOString().split('T')[0];
    //   return converted_date.split('-').reverse().join('/')
    // }
   
    // function convertUtf8(indexName) {
    //   return decodeURIComponent(escape(indexName));
    // }
        
    arr.forEach((listas) => {
      const obj = {};
      for (let i = 0; i < listas.length; i++){

        // if (fileType === 'xlsx') {

        //   if (i === 2 || i === 4 || i === 8 || i === 9 || i === 13){
        //     listas[i] = excelDateToJSDate(listas[i]) 
        //   }

        //   else if (i === 36 || i === 40) {
        //     listas[i] = convertUtf8(listas[i])
        //   }
        // }
        
        obj[keys[i]] = listas[i];
      }
      
      result.push(obj)
    })

    result.shift()

    result.map((item, indiceLinhas) => {
      const chaves = Object.keys(item)
      const valores = Object.values(item)

      valores.forEach((celula, index) => {
        
        const conditional = index === 0 || index === 12 || index === 13 || index === 14 || index === 15 || index === 16 || index === 17 || index === 18 || index === 19 || index === 20 || index === 21;

        if (conditional) {
          if (celula.length === 0) {
            // console.log(`Erro Campo Vazio, linha ${indiceLinhas + 1 }, coluna ${index + 1}`)
            // let row = indiceLinhas + 1;
            // array.push(row)
          } 
          
          if (celula.length > 0 && (index === 0 || index === 20)) {            
            let documentWithoutMask = removeMask(celula);
            let onlyHasNumber = isNumber(documentWithoutMask);
            let isDocumentValid = checkDocumentValid(documentWithoutMask);
            // let isDocumentValid = documentWithoutMask.length === 11 || documentWithoutMask.length === 14;
            if (!onlyHasNumber || !isDocumentValid) {
              console.log(`ERRO na linha ${indiceLinhas + 1}, coluna ${index + 1}`);
            }
          }

          if (celula.length > 0 && index === 16) {
            let colunaValor = removeMask(celula);
            
            if (isNumber(colunaValor) > 0) {
              // console.log('valor valido')
            } else {
              // console.log('valor invalido')
            }
          }

          if (index === 17 || index === 18 || index === 19) {
            let colunaJuros = removeMask(celula);

            if (isNumber(colunaJuros)) {
              // console.log('juros ou multa valido')
            } else {
              // console.log('juros ou multa invalido')
            }
          }

          if (index === 18) {
            let colunaMulta = removeMask(celula);

            if (isNumber(colunaMulta)) {
              // console.log('multa valida')
            } else {
              // console.log('multa invalida')
            }
          }
        }
      })
           
      setDados(result);
      setCurrentKeys(chaves);
    })

    const Errors = new Set(array)
    const countErrors = Errors.size 
    let newArray = []
    for (let i = 1; i <= countErrors; i++) {
      newArray.push([i])
    }
  }

  function isNumber(value) {
    const reg = new RegExp('^[0-9]*$');
    if (reg.test(value) === true) {
      return true;
    }

    return false;
  }

  function removeMask(value) {
    return value.replace(/[,./%-]/g,'');
  }

  function checkDocumentValid(value) {
    if (value.length === 11 || value.length === 14) {
      return true;
    }

    return false;
  }
    
  function handleRemove() {
    setDados([]);
    setCurrentKeys([]);
  }
    
  const dynamicColumns = currentKeys.map(col => (
    <Column
      style={{ width: '350px'}}
      key={col}
      field={col}
      header={col} 
    />
  ));

  return (
    <>
      <Container>
        <Content>
          <CSVReader
            onFileLoad={(e, file) => handleUpload(e, file)}
            onError={() => toast.warn("Falha ao carregar arquivo.")}
            config={{ delimiter: ";" }}
            addRemoveButton
            removeButtonColor="#465762"
            onRemoveFile={() => handleRemove()}
          >
            <span>
              Clique ou solte aqui seu arquivo{" "}
              {".xlsx / .csv"}
            </span>
          </CSVReader>
        </Content>
        <div>
          <label>Erros:</label>
          <p>Linha x Coluna y</p>
        </div>
        <button
          style={{cursor: 'pointer'}}
          type='submit'
          onClick={enviarCsv}
          disabled
        >
          Upload
        </button>
      </Container>

      <div>
        <div className="card"> 
          {dados.length > 0 && currentKeys && (
            <DataTable value={dados} scrollable scrollHeight="50vh" >
              {dynamicColumns}
            </DataTable>
          )}      
        </div>
      </div>
    </>
  )
}
