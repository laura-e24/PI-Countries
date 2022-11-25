import { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  all: unset;
  padding: 8px 10px;
  border-radius: 6px;
  background-color: rgba(217, 217, 217, 0.62);
  ${({ error }) => error && `
    background: rgba(211, 16, 39, 0.62);
    border: solid 1px rgb(211, 16, 39)
  `}
`

const CustomInput = ({ label, type = 'text', name, value, onChange, onBlur, placeholder = '', errors }) => {

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
        <label htmlFor={name} id="label">{label}</label>
        <Input 
          error={errors[name]}
          placeholder={placeholder} 
          type={type} 
          name={name} 
          value={value} 
          onChange={onChange} 
          onBlur={onBlur}
        />
      </div>
    </>
  );
}
 
export default CustomInput;