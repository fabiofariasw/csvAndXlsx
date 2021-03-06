import React, { useEffect, useState } from 'react';
import { Container, Text, Button, Content, Input } from './styles'
import XLSX from 'xlsx';
import { CSVReader } from "react-papaparse"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { toast } from 'react-toastify';


export default function Test() {

  const [extradigital, setExtradigital] = useState("")
  const [dados, setDados] = useState([])
  const [currentKeys, setCurrentKeys] = useState()
  const [colunaDinamica, setColunaDinamica] = useState([])
  

  function handleUpload(e, file) {

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
    }
    
    else if (fileType === 'csv') {
      verifyData(data)
    }
    
    else {
      alert('Não aceita esse tipo de arquivo, favor colocar um arquivo (.xlsx ou .csv) ')
    }
  }

  function verifyData(arr, fileType) {
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

      valores.forEach((atributo, columnCount) => {
        const attArray = [atributo]
        // const obj = {}
        // const arr = []
        attArray.forEach((campo) => {
          if (campo.length === 0) {
            console.log(`erro, linha ${indiceLinhas + 1 }, coluna ${columnCount + 1}`)
            let row = indiceLinhas + 1;
            array.push(row)
          }
        })
      })
      
      
      setDados(result)
      setCurrentKeys(chaves)
    })

    const Errors = new Set(array)
    const countErrors = Errors.size 
    let newArray = []
    for (let i = 1; i <= countErrors; i++) {
      newArray.push([i])
      // console.log(i)
    }
    // console.log(newArray)
    
  }
    
    function handleRemove() {
      setDados([])
      setCurrentKeys('')
    }
    
    const dynamicColumns = currentKeys ? currentKeys.map((col) => { return <Column style={{ width: '250px'}}key={col} field={col} header={col} />}) : console.log('')


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
              {extradigital === "S" ? "xlsx" : ".xlsx / .csv"}
            </span>
          </CSVReader>
        </Content>
      </Container>

      <div>
        <div className="card"> 
          {dados.length > 0 && (
            <DataTable value={dados} scrollable scrollHeight="50vh" >
              {dynamicColumns}
            </DataTable>

          )}      
        </div>
      </div>
    </>
  )
}
