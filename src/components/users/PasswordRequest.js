import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

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

  const [success, setSuccess] = useState(false)

  const {
    value: email,
    touch: emailTouch,
    error: emailError,
    resetError: emailResetError,
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
        setSuccess(true)
        setTimeout(() => history.push('/'), 4000)
      })
      .catch(error => {
        const errorMessage = error.response.data.message
        emailResetError(errorMessage)
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

      {success && (
        <div>
          <h5>we have sent an email to </h5>
          <h4>{email}</h4>
          <h5> to update the password</h5>
        </div>
      )}

      <div>
        <h5>Don´t have an account?
          <Link to={{pathname:'/signup'}}>Sign up for Taskble</Link>
        </h5>
      </div>

      <div>
        <h5>Go back to
          <Link to={{pathname:'/login'}}> log in</Link>
        </h5>
      </div>

    </div>
  )
}

export default PasswordRequest