import React, { useContext, useState } from 'react'

import TranslateContext from '../../contexts/TranslateContext'
import TaskbleService from '../../services/TaskbleService'

import useInput from '../../hooks/useInput'

import { checkPasswordFormat } from '../../helpers/authHelper'

import SignUpValidation from './SignUpValidation'
import LoginLink from '../auth/LoginLink'

import Input from '../UI/Input'

// eslint-disable-next-line
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const validators = {
  username: val => val.length >= 3,
  email: val => val.match(EMAIL_PATTERN),
  password: val => val.length >= 8 && checkPasswordFormat(val),
  language: val => val === 'en' || val === 'es'
}

const SignUpForm = () => {
  const { translateAPIerror, texts } = useContext(TranslateContext)

  const [success, setSuccess] = useState(false)

  const {
    value: username,
    touch: usernameTouch,
    error: usernameError,
    resetError: usernameResetError,
    handleInput: usernameHandleInput 
  } = useInput('', validators.username, texts.errors.usernameFormat)

  const {
    value: email,
    touch: emailTouch,
    error: emailError,
    resetError: emailResetError,
    handleInput: emailHandleInput
  } = useInput('',  validators.email, texts.errors.emailFormat)

  const {
    value: password,
    touch: passwordTouch,
    error: passwordError,
    resetError: passwordResetError,
    handleInput: passwordHandleInput
  } = useInput('', validators.password, texts.errors.passwordFormat)

  const {
    value: language,
    touch: languageTouch,
    error: languageError,
    resetError: languageResetError,
    handleInput: languageHandleInput
  } = useInput('', validators.language, texts.errors.languageRequired)

  const anyError = () => {
    const errors = [usernameError.active, emailError.active, passwordError.active, languageError.active]
    return errors.some(x => x === true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = {username, email, password, language}

    TaskbleService.signup(data)
      .then(() => {
        setSuccess(true)
      })
      .catch(error => {
        const responseErrors = error.response.data.errors
        const key = Object.keys(responseErrors)[0]
        const translatedError = translateAPIerror(responseErrors[key])
        const resetErrors = [
          {keyError: 'username', resetError: usernameResetError},
          {keyError: 'email', resetError: emailResetError},
          {keyError: 'password', resetError: passwordResetError},
          {keyError: 'language', resetError: languageResetError},
        ]

        resetErrors.forEach(resetError => {
          if (resetError.keyError === key) {
            resetError.resetError(translatedError)
          }
        })
      })
  }

  if (success) {
    return <SignUpValidation/>
  }

  return (
    <div id='signup'>

      <h3>{texts.headers.signup}</h3>

      <form onSubmit={handleSubmit} /*id='form-container'*/>

        <Input type='text' name='username' placeholder={texts.inputs.username} {...usernameHandleInput} />
        {usernameTouch && usernameError.active && (
          <div /*id='form-error'*/>
            { usernameError.message }
          </div>
        )}

        <Input type='text' name='email' placeholder={texts.inputs.email} {...emailHandleInput} />
        {emailTouch && emailError.active && (
          <div /*id='form-error'*/>
            { emailError.message }
          </div>
        )}

        <Input type='password' name='password' placeholder={texts.inputs.password} {...passwordHandleInput} />
        {passwordTouch && passwordError.active && (
          <div /*id='form-error'*/>
            { passwordError.message }
          </div>
        )}

        <div>
          <label>{texts.labels.language}:</label>
          <select type='select' name='language' {...languageHandleInput} >
            <option>-</option>
            <option value='en'>{texts.options.english}</option>
            <option value='es'>{texts.options.spanish}</option>
          </select>
          {languageTouch && languageError.active && (
            <div>
              { languageError.message }
            </div>
          )}
        </div>

        <button disabled={anyError()} type="submit" /*id='form-submitButton'*/>
          {texts.buttons.createAccount}
        </button>

      </form>    

      <LoginLink/>

    </div>
  )
}

export default SignUpForm