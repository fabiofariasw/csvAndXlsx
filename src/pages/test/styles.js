import styled from 'styled-components'

export const Container = styled.div`
  /* border: 3px solid red; */
  padding: 100px 50px;
`

export const Text = styled.p`
  height: 60px;
  width: 400px;
  color: red;
  border: 3px solid #000;
  margin: 0;
`

export const Button = styled.button`
  margin-left: 10px;
`

export const Content = styled.div`
  display: flex;
  justify-content: center;

  label {
    border: 1px solid #000;
    box-shadow: 3px 3px 3px #000;
    
    :hover {
      cursor: pointer;
    }
  }
  
`
export const Input = styled.input`
  /* border: 3px solid #000; */
  display: none;
`