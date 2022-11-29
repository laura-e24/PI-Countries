import styled from "styled-components";

const CardComponent = styled.div`
  padding: 20px 0;
  background-color: rgba(237, 236, 236, 1);
  border-radius: 15px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`

const Card = ({ children }) => {
  return (  
    <CardComponent>
      {children}
    </CardComponent>
  );
}
 
export default Card;