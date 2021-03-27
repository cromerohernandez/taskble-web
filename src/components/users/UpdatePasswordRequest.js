import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

import TranslateContext from '../../contexts/TranslateContext'
import TaskbleService from '../../services/TaskbleService'

import useInput from '../../hooks/useInput'
import SignUpLink from './SignUpLink'
import LoginLink from '../auth/LoginLink'

import Input from '../UI/Input'

// eslint-disable-next-line
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const validators = {
  email: val => val.match(EMAIL_PATTERN)
}

const UpdatePasswordRequest = () => {
  const history = useHistory()
  const { texts } = useContext(TranslateContext)

  const [success, setSuccess] = useState(false)

  const {
    value: email,
    touch: emailTouch,
    error: emailError,
    resetError: emailResetError,
    handleInput: emailHandleInput 
  } = useInput('', validators.email, texts.errors.emailFormat)

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

      <h3>{texts.headers.enterEmailAndSendLinkToGetBackAccount}</h3>

      <form onSubmit={handleRequestNewPassword} /*id='form-container'*/>

        <Input type='text' name={texts.inputs.email} {...emailHandleInput} />
          {emailTouch && emailError.active && (
            <div>
              { emailError.message }
            </div>
          )}

        <button disabled={anyError()} type="submit" /*id='form-submitButton'*/>
          {texts.buttons.sendLoginLink}
        </button>

      </form>

      {success && (
        <div>
          <h5>{texts.headers.haveSentEmailTo} </h5>
          <h4>{email}</h4>
          <h5> {texts.headers.toUpdatePassword}</h5>
        </div>
      )}

      <SignUpLink/>

      <LoginLink/>

    </div>
  )
}

export default UpdatePasswordRequest