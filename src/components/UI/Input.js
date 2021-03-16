import React from 'react'

const Input = ({ type, name, placeholder, value, onChange, onBlur }) => {
  return (
    <input
     /*id='form-error'*/
    type={type}
    name={name}
    placeholder={placeholder ? placeholder : name}
    defaultValue={value}
    onChange={onChange}
    onBlur={onBlur}
    />
  )
}

export default Input