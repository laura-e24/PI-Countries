import styled from "styled-components";

const Container = styled.nav`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;
  padding: 5px;
  background-color: rgba(237, 236, 236, 1);
  border-radius: 15px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  font-size: 10px;
`

const Pagination = ({next, prev, jump, currentData, currentPage, pages }) => {

  return (  
    <Container>
      <button onClick={() => prev()}>{"<"}</button>
      {new Array(pages).fill(0).map((_, index) => {
        return (
          <p key={index} onClick={() => jump(index+1)}>
            {index + 1}
          </p>
        )
      })}
      <button onClick={() => next()}>{">"}</button>
    </Container>
  );
}
 
export default Pagination;