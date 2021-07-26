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
    const reader = new FileReader()
    const rABS = !!reader.readAsBinaryString
    const typeFile = file.name.split('.')
    const allan = typeFile.length
    const knowType = typeFile[allan - 1]

    reader.onload = (e) => {
      //     /* Parse data */
      const bstr = e.target.result
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true
      })

      /* Get first worksheet */
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]

      /* Convert array of arrays */
      const dataArray = XLSX.utils.sheet_to_json(ws, { header: 1 })

      /* Update state */
      setData(dataArray)
      console.log('fdp', dataArray)

      if (knowType === 'csv') {
        verifyDataXlsx(dataArray)
      }
      else if (knowType === 'xlsx') {
        verifyDataXlsx(dataArray)
      }
      else {
        alert('nao aceita isso seu fdp BURRO')
      }
    }

    if (rABS) {
      const fabio = reader.readAsBinaryString(file)
      console.log(fabio)
    } else {
      reader.readAsArrayBuffer(file)
    }
  }

  function verifyDataXlsx(arr) {
    const dadus = arr.map((item1) => (
      item1.forEach(function (name, index) {
        console.log(`${index + 1}, ${name}`)
        const fabio = { teste: 'fabio' }
        console.log(fabio)
      })
      // c_ibge: item1[0],
      // c_cart: item1[1],
      // d_geracao: item1[2],
      // n_protocolo: item1[3],
      // d_apresentacao: item1[4],
      // c_especie: item1[5],
      // n_especie: item1[6],
      // n_titulo: item1[7],
      // d_emissao: item1[8],
      // d_vencimento: item1[9],
      // endosso: item1[10],
      // c_n_divida: item1[11],
      // n_divida: item1[12],
      // d_p_pagamento: item1[13],
      // v_titulo: item1[14],
      // s_t_protestar: item1[15],
      // multa: item1[16],
      // m_diaria: item1[17],
      // c_distribuidor: item1[18],
      // apontamento: item1[19],
      // intimacao: item1[20],
      // edital: item1[21],
      // pagamento: item1[22],
      // c_apontamento: item1[23],
      // m_digitalizacao: item1[24],
      // protesto: item1[25],
      // c_protesto: item1[26],
      // canc_protesto: item1[27],
      // selos: item1[28],
      // f_judiciario: item1[29],
      // f_defensoria: item1[30],
      // f_r_civil: item1[31],
      // tributos: item1[32],
      // t_bancaria: item1[33],
      // t_apresentante: item1[34],
      // apresentante: item1[35],
      // c_atual: item1[36],
      // c_original: item1[37],
      // c_a_documento: item1[38],
      // devedor: item1[39],
      // endereco: item1[40],
      // bairro: item1[41],
      // cep: item1[42],
      // d_devedor: item1[43],
      // t_d_devedor: item1[44],
      // n_numero: item1[45],
      // f_falimentares: item1[46],
      // t_i_f_falimentares: item1[47],
      // d_a_cancelamento: item1[48],
      // v_t_t_pagamento: item1[49],
      // v_t_c_pagamento: item1[50],
      // v_t_c_cancelamento: item1[51]


      // })
    ))

    // console.log('testando...', dadus)
    // dadus.shift()
    setDados(dadus)
  }


  function verifyData(arr) {
    const dadus = arr.map((item1) => {
      console.log('teste', item1)
      const daira = {
        id: item1[0],
        //     primeiroNome: item1[1],
        //     ultimoNome: item1[2],
        //     email: item1[4],
        //     profissao: item1[5]
      }
      return daira;
    })
    console.log('allan', dadus)
    // dadus.shift()
    // setDados(dadus)
  }

  function handleRemove() {
    setDados([])
  }

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
            onRemoveFile={() => handleRemove()}
          >
            <span>
              Clique ou solte aqui seu arquivo{" "}
              {extradigital === "S" ? "xlsx" : ".xlsx / .csv"}
            </span>
          </CSVReader>
          {/* <Input id="testando" type="file" /> */}
          {/* <label for="testando"> Selecionar arquivo</label> */}
          {/* <Button>Anexar arquivo</Button> */}
          {/* <Button>Enviar</Button> */}
        </Content>
      </Container>
      <div>
        <div className="card">
          {dados.length > 0 && (

            < DataTable value={dados} scrollable scrollHeight="50vh" >
              {/* <Column field="id" header="id" headerStyle={{ width: '50px' }}></Column>
              <Column field="primeiroNome" header="primeiroNome" headerStyle={{ width: '130px' }}></Column>
              <Column field="ultimoNome" header="ultimoNome" headerStyle={{ width: '250px' }}></Column>
              <Column field="email" header="email" headerStyle={{ width: '250px' }}></Column>
              <Column field="profissao" header="profissão" headerStyle={{ width: '250px' }}></Column> */}


              <Column field="c_ibge" header="Código IBGE do Município/Comarca" headerStyle={{ width: '250px', textAlign: 'center' }} style={{ textAlign: 'center' }}></Column>
              <Column field="c_cart" header="Código Cartório CRA (código principal)" headerStyle={{ width: '250px' }}></Column>
              <Column field="d_geracao" header="Data de Geração" headerStyle={{ width: '250px' }}></Column>
              <Column field="n_protocolo" header="Número do Protocolo" headerStyle={{ width: '250px' }}></Column>
              <Column field="d_apresentacao" header="Data de Apresentação" headerStyle={{ width: '250px' }}></Column>
              <Column field="c_especie" header="Código da Espécie" headerStyle={{ width: '250px' }}></Column>
              <Column field="n_especie" header="Nome da Espécie" headerStyle={{ width: '250px' }}></Column>
              <Column field="n_titulo" header="Número do Título" headerStyle={{ width: '250px' }}></Column>
              <Column field="d_emissao" header="Data de Emissão" headerStyle={{ width: '250px' }}></Column>
              <Column field="d_vencimento" header="Data de Vencimento" headerStyle={{ width: '250px' }}></Column>
              <Column field="endosso" header="Endosso" headerStyle={{ width: '250px' }}></Column>
              <Column field="c_n_divida" header="Código Natureza da Dívida" headerStyle={{ width: '250px' }}></Column>
              <Column field="n_divida" header="Natureza da Dívida" headerStyle={{ width: '250px' }}></Column>
              <Column field="d_p_pagamento" header="Data prevista para Pagamento" headerStyle={{ width: '250px' }}></Column>
              <Column field="v_titulo" header="Valor do Título" headerStyle={{ width: '250px' }}></Column>
              <Column field="s_t_protestar" header="Saldo do Título a Protestar" headerStyle={{ width: '250px' }}></Column>
              <Column field="multa" header="Multa" headerStyle={{ width: '250px' }}></Column>
              <Column field="m_diaria" header="Mora Diária (Juros)" headerStyle={{ width: '250px' }}></Column>
              <Column field="c_distribuidor" header="Custa do Distribuidor" headerStyle={{ width: '250px' }}></Column>
              <Column field="apontamento" header="Apontamento" headerStyle={{ width: '250px' }}></Column>
              <Column field="intimacao" header="Intimação" headerStyle={{ width: '250px' }}></Column>
              <Column field="edital" header="Edital" headerStyle={{ width: '250px' }}></Column>
              <Column field="pagamento" header="Pagamento" headerStyle={{ width: '250px' }}></Column>
              <Column field="c_apontamento" header="Cancelamento do Apontamento" headerStyle={{ width: '250px' }}></Column>
              <Column field="m_digitalizacao" header="Microfilmagem/Digitalização" headerStyle={{ width: '250px' }}></Column>
              <Column field="protesto" header="Protesto" headerStyle={{ width: '250px' }}></Column>
              <Column field="c_protesto" header="Contra Protesto" headerStyle={{ width: '250px' }}></Column>
              <Column field="canc_protesto" header="Cancelamento de Protesto" headerStyle={{ width: '250px' }}></Column>
              <Column field="selos" header="Selos (valor Total)" headerStyle={{ width: '250px' }}></Column>
              <Column field="f_judiciario" header="Fundo Judiciário" headerStyle={{ width: '250px' }}></Column>
              <Column field="f_defensoria" header="Fundo da defensoria" headerStyle={{ width: '250px' }}></Column>
              <Column field="f_r_civil" header="Fundo Registro Civil" headerStyle={{ width: '250px' }}></Column>
              <Column field="tributos" header="Tributos (ISS, etc)" headerStyle={{ width: '250px' }}></Column>
              <Column field="t_bancaria" header="Taxa Bancária" headerStyle={{ width: '250px' }}></Column>
              <Column field="t_apresentante" header="Tipo Apresentante" headerStyle={{ width: '250px' }}></Column>
              <Column field="apresentante" header="Apresentante" headerStyle={{ width: '250px' }}></Column>
              <Column field="c_atual" header="Credor Atual" headerStyle={{ width: '250px' }}></Column>
              <Column field="c_original" header="Credor Original" headerStyle={{ width: '250px' }}></Column>
              <Column field="c_a_documento" header="Credor Atual Documento" headerStyle={{ width: '250px' }}></Column>
              <Column field="devedor" header="Devedor" headerStyle={{ width: '250px' }}></Column>
              <Column field="endereco" header="Endereço" headerStyle={{ width: '250px' }}></Column>
              <Column field="bairro" header="Bairro" headerStyle={{ width: '250px' }}></Column>
              <Column field="cep" header="CEP" headerStyle={{ width: '250px' }}></Column>
              <Column field="d_devedor" header="Documento do Devedor" headerStyle={{ width: '250px' }}></Column>
              <Column field="t_d_devedor" header="Tipo de Documento do Devedor" headerStyle={{ width: '250px' }}></Column>
              <Column field="n_numero" header="Nosso Número" headerStyle={{ width: '250px' }}></Column>
              <Column field="f_falimentares" header="Fins Falimentares (0 – Não / 1 – Sim )" headerStyle={{ width: '250px' }}></Column>
              <Column field="t_i_f_falimentares" header="Texto Intimação Fins Falimentares" headerStyle={{ width: '250px' }}></Column>
              <Column field="d_a_cancelamento" header="Data da autorização de cancelamento" headerStyle={{ width: '250px' }}></Column>
              <Column field="v_t_t_pagamento" header="Valor Total Título p/ Pagamento (Saldo + Multa + Juros )" headerStyle={{ width: '250px' }}></Column>
              <Column field="v_t_c_pagamento" header="Valor Total das Custas p/ Pagamento (Custas + Selos )" headerStyle={{ width: '250px' }}></Column>
              <Column field="v_t_c_cancelamento" header="Valor total das custas de cancelamento (Custas de Protesto + Custas de Cancelamento + Selos)" headerStyle={{ width: '250px' }}></Column>
            </DataTable>
          )}
        </div>
      </div>
    </>
  )
}
