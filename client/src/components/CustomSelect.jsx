import styled from "styled-components";

const Select = styled.select`
  all: unset;
  padding: 8px 10px;
  border-radius: 6px;
  margin-right: 10px;
  background-color: rgba(217, 217, 217, 0.62);
  width: 100%;
  &:focus {
    border: solid 1px #8278D7;
  }
  ${({ error }) => error && `
    background: rgba(211, 16, 39, 0.62);
    border: solid 1px rgb(211, 16, 39)
  `}
`

const Label = styled.label`
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 5px !important;
  width: 100%;
  display: block;
`

const CustomSelect = ({ children, onChange, name, label, errors, onBlur, defaultValue }) => {

  return (  
    <>
      <div style={{ marginBottom: 10, display: 'block'}}>
        <Label>{label}</Label>
        <Select 
          error={errors[name]}
          name={name} 
          onBlur={onBlur}
          onChange={onChange}
          value={defaultValue || ""}
        >
          {children}
        </Select>
      </div>
    </>
  );
}
 
export default CustomSelect;
