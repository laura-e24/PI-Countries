import styled from "styled-components";

const Input = styled.input`
  all: unset;
  padding: 8px 10px;
  border-radius: 6px;
  background-color: rgba(217, 217, 217, 0.62);
`

const CustomInput = ({ label, type = 'text', name, value, onChange }) => {
  return (  
    <>
      <style>
        {`
          #label {
            font-size: 17px;
            font-weight: 700;
            margin-bottom: 5px !important;
            width: 100%;
            display: block;
          }
        `}
      </style>
      <div style={{ marginBottom: 10, display: 'block' }}>
        <label id="label">{label}</label>
        <Input type={type} name={name} value={value} onChange={onChange} />
      </div>
    </>
  );
}
 
export default CustomInput;