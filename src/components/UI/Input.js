import React from 'react'

const Input = (props) => {
  const { type, name, placeholder, value, onChange, onBlur } = props

  return(
    <input
     /*id="form-error"*/
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