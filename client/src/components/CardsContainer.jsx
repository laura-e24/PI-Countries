import styled from 'styled-components'


const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-right: 20px;
`

const CardsContainer = ({ children }) => {
  return (  
    <Container>
      {children}
    </Container>
  );
}
 
export default CardsContainer;