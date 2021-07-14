import React, { useEffect, useState } from 'react';
import { Container, Text, Button, Content, Input } from './styles'
import XLSX from 'xlsx';
import { CSVReader } from "react-papaparse"
import { toast } from 'react-toastify';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export default function Test() {

  const [Upload, setUpload] = useState([])
  const [extradigital, setExtradigital] = useState("")
  const [teste, setTeste] = useState([])
  const [data, setData] = useState([])
  const [dados, setDados] = useState([])
  // const [products, setProducts] = useState();

  function handleUpload(e, file) {
    // setUpload(file)
    const reader = new FileReader()
    const rABS = !!reader.readAsBinaryString
    // console.log(file)
    const typeFile = file.name.split('.')
    const knowType = typeFile[1]

    reader.onload = (e) => {
      //     /* Parse data */
      const bstr = e.target.result
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true
      })
      //     /* Get first worksheet */
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      // console.log('2', ws)
      //     /* Convert array of arrays */
      const dataArray = XLSX.utils.sheet_to_json(ws, { header: 1 })
      /* Update state */
      // console.log('2', dataArray)
      setData(dataArray)

      if (knowType === 'csv') {
        // console.log('entrou')
        verifyData(dataArray)
      }
      else {
        // console.log('1', dataArray)
        verifyDataXlsx(dataArray)
        // console.log('xlsx')
        // e.map((item) => {
        //   delete item.errors
        //   delete item.meta
        // })
        // setData(e)
      }
      // console.log('day', dataArray)
      // setCols(make_cols(ws["!ref"]))
    }
    //   console.log('bobinho', data)
    if (rABS) {
      reader.readAsBinaryString(file)
    } else {
      reader.readAsArrayBuffer(file)
    }
  }

  // if (teste) {

  //   if (dadus.length > 0) {
  //     // console.log('saber', dadus.length > 0 ? 'lindo' : 'feio')
  //     setDados(dadus)
  //     console.log('bobinho')

  function verifyDataXlsx(arr) {
    // console.log(arr.split(','))
    arr.forEach(function teste(a) {
      const teste = (a[0])
      console.log(teste.split(','))
    })
    // const dadus = arr.map((item1) => {
    //   console.log(item1)
    //   // const teste = item1.split(',')
    //   // console.log(teste)
    //   // const daira = {
    //   //   id: item1[0].toString(),
    //   //   primeiroNome: item1[1],
    //   //   ultimoNome: item1[2],
    //   //   email: item1[4],
    //   //   profissao: item1[5]
    //   // }
    //   // return daira;
    //   // console.log('bobinho', item1[0])
    // })
    // dadus.shift()
    // if (dadus.length > 0) {
    // setDados(dadus)
    // }
  }

  function verifyData(arr) {
    const dadus = arr.map((item1) => {
      // console.log(item1)
      const daira = {
        id: item1[0].toString(),
        primeiroNome: item1[1],
        ultimoNome: item1[2],
        email: item1[4],
        profissao: item1[5]
      }
      return daira;
    })
    dadus.shift()
    console.log(dadus)
    setDados(dadus)
  }
  // const bobinho = JSON.stringify(dados)

  // useEffect(() => {
  //   verifyData()
  //   // console.log('value', dados)
  // }, [data])

  return (
    <>
      <Container>
        <Content>
          {/* <Text>Arraste o arquivo ou clique em anexar.</Text> */}
          <CSVReader
            onDrop={(e, file) => handleUpload(e, file)}
            onError={() => toast.warn("Falha ao carregar arquivo.")}
            config={{ delimiter: ";" }}
            addRemoveButton
            removeButtonColor="#465762"
          // onRemoveFile={() => handleRemove()}
          >
            <span>
              Clique ou solte aqui seu arquivo{" "}
              {extradigital === "S" ? "xlsx" : ".xlsx / .csv"}
            </span>
          </CSVReader>
          {/* <Input id="testando" type="file" /> */}
          {/* <label for="testando"> Selecionar arquivo</label> */}
          {/* <Button>Anexar arquivo</Button> */}
          <Button>Enviar</Button>
        </Content>
      </Container>
      <div>
        <div className="card">
          {/* {dados.length > 0 && ( */}
          <DataTable value={dados}>
            <Column field="id" header="id"></Column>
            {/* <Column field="primeiroNome" header="primeiroNome"></Column>
            <Column field="ultimoNome" header="ultimoNome"></Column>
            <Column field="email" header="email"></Column>
            <Column field="profissao" header="profissão"></Column> */}
          </DataTable>

          {/* )} */}
        </div>
      </div>
    </>
  )
}
