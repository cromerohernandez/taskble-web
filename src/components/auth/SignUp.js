import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import AuthContext from '../../contexts/AuthContext'
import TaskbleService from '../../services/TaskbleService'

import useInput from '../../hooks/useInput'

import { checkPasswordFormat } from '../../helpers/authHelper'

import Validation from '../auth/Validation'

import Input from '../UI/Input'

// eslint-disable-next-line
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const validators = {
  username:  val => val.length >= 3,
  email: val => val.match(EMAIL_PATTERN),
  password: val => val.length >= 8 && checkPasswordFormat(val) 
}

const errorMessages = {
  username: 'username needs at least 3 chars',
  email: 'invalid email format',
  password: 'password needs at least 8 chars and must contains uppercase, lowercase, numbers and symbols'
}

const SignUp = () => {
  const auth = useContext(AuthContext)

  const [success, setSuccess] = useState(false)

  const {
    value: username,
    touch: usernameTouch,
    error: usernameError,
    resetError: usernameResetError,
    handleInput: usernameHandleInput 
  } = useInput('', validators.username, errorMessages.username)

  const {
    value: email,
    touch: emailTouch,
    error: emailError,
    resetError: emailResetError,
    handleInput: emailHandleInput
  } = useInput('',  validators.email, errorMessages.email)

  const {
    value: password,
    touch: passwordTouch,
    error: passwordError,
    resetError: passwordResetError,
    handleInput: passwordHandleInput
  } = useInput('', validators.password, errorMessages.password)

  const anyError = () => {
    const errors = [usernameError.active, emailError.active, passwordError.active]
    return errors.some(x => x === true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = {username, email, password}

    TaskbleService.signup(data)
      .then(() => {
        setSuccess(true)
      })
      .catch(error => {
        const responseErrors = error.response.data.errors
        const key = Object.keys(responseErrors)[0]
        const resetErrors = [
          {keyError: 'username', resetError: usernameResetError},
          {keyError: 'email', resetError: emailResetError},
          {keyError: 'password', resetError: passwordResetError},
        ]

        resetErrors.forEach(resetError => {
          if (resetError.keyError === key) {
            resetError.resetError(responseErrors[key])
          }
        })
      })
  }

  if (auth.currentUser) {
    return <Redirect to="/"/>
  }
  
  if (success) {
    return <Validation/>
  }

  return(
    <div id="signup">

      <h3>SignUp</h3>

      <form onSubmit={handleSubmit} /*id="form-container"*/>

        <Input type='text' name='username' {...usernameHandleInput} />
        {usernameTouch && usernameError.active && (
          <div /*id="form-error"*/>
            { usernameError.message }
          </div>
        )}

        <Input type='text' name='email' {...emailHandleInput} />
        {emailTouch && emailError.active && (
          <div /*id="form-error"*/>
            { emailError.message }
          </div>
        )}

        <Input type='password' name='password' {...passwordHandleInput} />
        {passwordTouch && passwordError.active && (
          <div /*id="form-error"*/>
            { passwordError.message }
          </div>
        )}

        <button disabled={anyError()} type="submit" /*id="form-submitButton"*/>
          Sign up
        </button>

      </form>    

      <div>
        <h5>Have an account?
          <Link to={{pathname:'/login'}}> Log in</Link>
        </h5>
      </div>

    </div>
  )
}

export default SignUp