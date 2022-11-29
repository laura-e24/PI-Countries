import styled from "styled-components";

const Card = styled.nav`
  display: flex;
  padding: 12px;
  flex-wrap: wrap;
  /* max-width: 100%; */
  justify-content: space-between;
  background-color: rgba(237, 236, 236, 1);
  border-radius: 10px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  font-size: 17px;
  margin-top: 20px;
`

const Button = styled.button`
  font-size: 20px;
  margin: auto 10px;
  padding: 5px 12px;
  border: none;
  border-radius: 9999px;
  outline: inherit;
  cursor: pointer;
  color: white;
  background: #8278D7;
  &:hover {
    background: #D1CDF3;
    color: black;
  }
`

const PageNumber = styled.span`
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  padding: 7px 12px;
  border-radius: 9999px;
  user-select: none;
  &:hover {
    background: #D1CDF3;
    color: black;
  }
  ${({ currentPage }) => currentPage && `
    background: #8278D7;
    font-weight: 700;
  `}
`

const Pagination = ({next, prev, jump, currentPage, pages }) => {

  return (  
    <div>
      <Card>
        <Button onClick={() => prev()}>{"<"}</Button>
        {new Array(pages).fill(0).map((_, index) => {
          return (
            <PageNumber 
              currentPage={currentPage === index + 1}
              key={index} 
              onClick={() => jump(index+1)}
            >
              {index + 1}
            </PageNumber>
          )
        })}
        <Button onClick={() => next()}>{">"}</Button>
      </Card>
    </div>
  );
}
 
export default Pagination;