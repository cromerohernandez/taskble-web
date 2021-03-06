import { useState } from 'react'

const useInput = (initialValue, validator, initialErrorMessage) => {
  const [value, setValue] = useState(initialValue)
  const [touch, setTouch] = useState(false)
  const [error, setError] = useState({active: true, message: initialErrorMessage})

  const onChange = (event) => setValue(event.target.value)

  const onBlur = (event) => {
    const valid = validator(event.target.value)

    setTouch(true)
    setError({active: !valid, message: initialErrorMessage})
  }

  const resetError = (newMessage) => {
    setError({
      active: true,
      messagge: newMessage
    })
  }

  return {
    value,
    touch,
    error,
    resetError,
    handleInput: {
      value,
      onChange,
      onBlur
    }
  }
}

export default useInput