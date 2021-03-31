import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import TranslateContext from '../../contexts/TranslateContext'
import TaskbleService from '../../services/TaskbleService'

import useInput from '../../hooks/useInput'

import { checkPasswordFormat } from '../../helpers/authHelper'

import Input from '../UI/Input'

const validators = {
  newPassword: val => val.length >= 8 && checkPasswordFormat(val),
  confirmNewPassword: (newPasswordToMatch) => val => val === newPasswordToMatch
}

const UpdatePasswordForm = () => {
  const { texts } = useContext(TranslateContext)
  const history = useHistory()
  const { token } = useParams()

  const [success, setSuccess] = useState(false)

  const {
    value: newPassword,
    touch: newPasswordTouch,
    error: newPasswordError,
    handleInput: newPasswordHandleInput 
  } = useInput('', validators.newPassword, texts.errors.passwordFormat)

  const {
    value: confirmNewPassword,
    touch: confirmNewPasswordTouch,
    error: confirmNewPasswordError,
    handleInput: confirmNewPasswordHandleInput 
  } = useInput('', validators.confirmNewPassword(newPassword), texts.errors.passwordMatch)

  const anyError = () => {
    const errors = [newPasswordError.active, confirmNewPasswordError.active]
    return errors.some(x => x === true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const passwordData = {newPassword}

    TaskbleService.updatePassword(token, passwordData)
      .then(() => {
        setSuccess(true)
        setTimeout(() => history.push('/'), 3000)
      })
      .catch(error => {
        /*const errorMessage = error.response.data.message*/
      })
  }

  return (
    <div /*id='signup'*/>

      <h3>{texts.headers.changePassword}</h3>

      <form onSubmit={handleSubmit} /*id='form-container'*/>

        <Input type='password' name='newPassword' placeholder={texts.inputs.newPassword} {...newPasswordHandleInput} />
        {newPasswordTouch && newPasswordError.active && (
          <div>
            { newPasswordError.message }
          </div>
        )}

        <Input type='password' name='confirmNewPassword' placeholder={texts.inputs.confirmNewPassword} {...confirmNewPasswordHandleInput} />
        {confirmNewPasswordTouch && confirmNewPasswordError.active && newPassword !== confirmNewPassword && (
          <div>
            { confirmNewPasswordError.message }
          </div>
        )}

        <button disabled={anyError()} type="submit" /*id='form-submitButton'*/>
          {texts.buttons.changePassword}
        </button>

      </form>

      {success && (
        <h4>{texts.headers.passwordUpdated}</h4> 
      )}

    </div>
  )
}

export default UpdatePasswordForm