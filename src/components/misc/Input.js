const Input = (props) => {
  const { type, name, value, onBlur, onChange } = props

  return(
    <input
     /*id="form-error"*/
    type={type}
    name={name}
    placeholder={name}
    defaultValue={value}
    onBlur={onBlur}
    onChange={onChange}
    />
  )
}

export default Input