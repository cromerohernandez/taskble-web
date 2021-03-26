import React from 'react'
import { useHistory } from 'react-router-dom'

import TaskbleService from '../../services/TaskbleService'

import useInput from '../../hooks/useInput'

import Input from '../UI/Input'

// eslint-disable-next-line
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const validators = {
  email: val => val.match(EMAIL_PATTERN)
}

const errorMessages = {
  email: 'invalid email format',
}

const PasswordRequest = () => {
  const history = useHistory()

  const {
    value: email,
    touch: emailTouch,
    error: emailError,
    handleInput: emailHandleInput 
  } = useInput('', validators.email, errorMessages.email)

  const anyError = () => {
    const errors = [emailError.active]
    return errors.some(x => x === true)
  }

  const handleRequestNewPassword = (event) => {
    event.preventDefault()
    const data = {email}

    TaskbleService.requestNewPassword(data)
      .then(() => {
        //////////////////////////////////////////////// => ADD ALERT !!!!!
        history.push('/')
      })
      .catch(() => {
        //////////////////////////////////////////////// => ADD ALERT !!!!!
      })
  }

  return (
    <div id='passwordRequest'>

      <h3>Enter your email, and we'll send you a link to get back into your account.</h3>

      <form onSubmit={handleRequestNewPassword} /*id='form-container'*/>

        <Input type='text' name='email' {...emailHandleInput} />
          {emailTouch && emailError.active && (
            <div>
              { emailError.message }
            </div>
          )}

        <button disabled={anyError()} type="submit" /*id='form-submitButton'*/>
          Send login link
        </button>

      </form>

    </div>
  )
}

export default PasswordRequest