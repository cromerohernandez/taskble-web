import React from 'react'

const Input = ({ type, name, placeholder, disabled, value, onChange, onBlur }) => {
  return (
    <input
     /*id='form-error'*/
    type={type}
    name={name}
    placeholder={placeholder ? placeholder : name}
    disabled={disabled ? disabled : false}
    defaultValue={value}
    onChange={onChange}
    onBlur={onBlur}
    />
  )
}

export default Input