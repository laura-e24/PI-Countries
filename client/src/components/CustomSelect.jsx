import styled from "styled-components";

const Select = styled.select`
  all: unset;
  padding: 8px 10px;
  border-radius: 6px;
  margin-right: 10px;
  background-color: rgba(217, 217, 217, 0.62);
  ${({ error }) => error && `
    background: rgba(211, 16, 39, 0.62);
    border: solid 1px rgb(211, 16, 39)
  `}
`

const CustomSelect = ({ children, onChange, name, label, errors, onBlur }) => {

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
        <Select 
          error={errors[name]}
          name={name} 
          onBlur={onBlur}
          onChange={onChange}
        >
          {children}
        </Select>
      </div>
    </>
  );
}
 
export default CustomSelect;