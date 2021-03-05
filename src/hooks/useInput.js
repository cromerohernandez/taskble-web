import { useState } from 'react'

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue)
  const [touch, setTouch] = useState(false)
  const [error, setError] = useState(null)

  const onChange = (event) => setValue(event.target.value)

  const onBlur = (event) => {
    const valid = validator(event.target.value)

    setTouch(true)
    setError(!valid)
  }

  return {
    value,
    touch,
    error,
    handleInput: {
      value,
      error,
      onChange,
      onBlur
    }
  }
}

export default useInput