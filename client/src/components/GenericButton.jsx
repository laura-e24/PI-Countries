import styled from "styled-components";

export const ButtonComponent = styled.button`
box-shadow: 0 4px 6px -1px rgba(93, 77, 228, 1), 0 2px 4px -2px rgba(93, 77, 228, 1);
padding: 8px 12px;
background: #8278D7;
-webkit-transition: background 1s; /* For Safari 3.0 to 6.0 */
transition: background 1s; /* For modern browsers */
border: none;
border-radius: 5px;
outline: inherit;
cursor: pointer;
font-size:  17px;
font-weight: 400;
color: rgba(237, 236, 236, 1);
${({ disabled }) => !disabled && `
  &:hover {
    background: #D1CDF3;
    color: black;
  }
`}
`

const GenericButton = ({ children }) => {
  return (  
    <ButtonComponent>
      {children}
    </ButtonComponent>
  );
}
 
export default GenericButton;