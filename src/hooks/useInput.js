import { useState, useEffect } from 'react'

const useInput = (initialValue, validator, initialErrorMessage, edit) => {
  const [value, setValue] = useState(initialValue)
  const [touch, setTouch] = useState(false)
  const [error, setError] = useState({active: true, message: ''})

  useEffect(() => {
    if (edit) {
      setError({active: false, message: ''})
    }
  }, [edit])

  const onChange = (event) => setValue(event.target.value)

  const onBlur = (event) => {
    const valid = validator(event.target.value)

    setTouch(true)
    setError({active: !valid, message: initialErrorMessage})
  }

  const resetError = (newMessage) => {
    setError({
      active: true,
      message: newMessage ? newMessage : initialErrorMessage
    })
  }

  if (validator) {
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
  } else {
    return {
      value,
      handleInput: {
        value,
        onChange
      }
    }
  }
}

export default useInput