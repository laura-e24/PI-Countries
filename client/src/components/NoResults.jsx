import styled from "styled-components";

const Container = styled.div`
  border: dotted 1px rgba(129, 129, 129, 0.7);
  border-radius: 15px;
  padding: 30px 0;
  margin-right: 20px;
`

const Text = styled.span`
  display: block;
  font-size: 20px;
  text-align: center;
  color: #818181;
  font-weight: 500;
  margin: 10px 0;
`

const Status = styled.h1`
  font-weight: 700;
  font-size: 60px;
  text-align: center;
  margin:0
`

const NoResults = ({ text = '', status = undefined, style = {} }) => {
  const defaultText = 'No se encontraron resultados.'
  return (  
    <Container style={style}>
      {status && <Status>─ {status} ─</Status>}
      <Text>{text || defaultText}</Text>
      <img height={120} style={{display: 'flex', marginTop: 10 }} className='mx-auto' src='/not-found.png' />
    </Container>
  );
}
 
export default NoResults;