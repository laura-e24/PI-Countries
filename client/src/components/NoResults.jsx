import styled from "styled-components";

const Container = styled.div`
  border: dotted 1px rgba(129, 129, 129, 0.7);
  border-radius: 15px;
  padding: 20px 0;
`

const Text = styled.span`
  display: block;
  font-size: 20px;
  text-align: center;
  color: #818181;
  font-weight: 500;
`

const NoResults = ({ text = '', style = {} }) => {
  const defaultText = 'No se encontraron resultados.'
  return (  
    <Container style={style}>
      <Text>{text || defaultText}</Text>
      <img height={140} style={{display: 'flex', paddingTop: 10 }} className='mx-auto' src='/not-found.png' />
    </Container>
  );
}
 
export default NoResults;