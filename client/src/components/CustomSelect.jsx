import styled from "styled-components";

const Select = styled.select`
  all: unset;
  padding: 8px 10px;
  border-radius: 6px;
  margin-right: 10px;
  background-color: rgba(217, 217, 217, 0.62);
`

const CustomSelect = ({ children, onChange, name, value, label }) => {
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
      <div style={{ marginBottom: 10, display: 'block'}}>
        <label id="label">{label}</label>
        <Select value={value} name={name} onChange={onChange}>
          {children}
        </Select>
      </div>
    </>
  );
}
 
export default CustomSelect;