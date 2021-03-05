import React from 'react'

const Input = (props) => {
  const { type, name, placeholder, value, onBlur, onChange } = props

  return(
    <input
     /*id="form-error"*/
    type={type}
    name={name}
    placeholder={placeholder ? placeholder : name}
    defaultValue={value}
    onBlur={onBlur}
    onChange={onChange}
    />
  )
}

export default Input