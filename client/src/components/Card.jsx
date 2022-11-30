import styled from "styled-components";

const CardComponent = styled.div`
  padding: 20px 0;
  background-color: rgba(237, 236, 236, 1);
  border-radius: 15px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  display: flex;
  align-content: center;
  justify-content: center
`

const Card = ({ children, style = {} }) => {
  return (  
    <CardComponent style={style}>
      <div className="my-auto">
        {children}
      </div>
    </CardComponent>
  );
}
 
export default Card;