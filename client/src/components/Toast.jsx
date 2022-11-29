import styled from "styled-components";

const Toastify = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  max-width: 300px;
  min-height: 70px;
  padding: 8px 0;
  ${({ type }) => type === 'success' 
  ? `
    background: rgba(98, 245, 108, 0.5);
  ` 
  : `
    background: rgba(211, 16, 39, 0.62);
  `}
`

const Toast = ({ toastify, setToastify }) => {

  const { text, type } = toastify;

  return (  
    <>
      <Toastify type={type}>
        <div style={{padding: 10}}>
          <span onClick={() => setToastify({...toastify, display: false})} style={{ display: 'block', width: '100%', textAlign:'right', cursor: 'pointer', marginBottom: 8 }}>X Cerrar</span>
          <span>{text}</span>
        </div>
      </Toastify>
    </>
  );
}
 
export default Toast;