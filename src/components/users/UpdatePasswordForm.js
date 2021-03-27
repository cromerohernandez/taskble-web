import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import TaskbleService from '../../services/TaskbleService'

import useInput from '../../hooks/useInput'

import { checkPasswordFormat } from '../../helpers/authHelper'

import Input from '../UI/Input'

const validators = {
  currentPassword: val => val,
  newPassword: val => val.length >= 8 && checkPasswordFormat(val),
  confirmNewPassword: (newPasswordToMatch) => val => val === newPasswordToMatch
}

const errorMessages = {
  currentPassword: 'current password is required',
  newPassword: 'password needs at least 8 chars and must contains uppercase, lowercase, numbers and symbols',
  confirmNewPassword: 'new password and confirm new password must be match'
}

const UpdatePasswordForm = () => {
  const history = useHistory()
  const { token } = useParams()

  const [success, setSuccess] = useState(false)

  const {
    value: currentPassword,
    touch: currentPasswordTouch,
    error: currentPasswordError,
    resetError: currentPasswordResetError,
    handleInput: currentPasswordHandleInput
  } = useInput('', validators.currentPassword, errorMessages.currentPassword)

  const {
    value: newPassword,
    touch: newPasswordTouch,
    error: newPasswordError,
    handleInput: newPasswordHandleInput 
  } = useInput('', validators.newPassword, errorMessages.newPassword)

  const {
    value: confirmNewPassword,
    touch: confirmNewPasswordTouch,
    error: confirmNewPasswordError,
    handleInput: confirmNewPasswordHandleInput 
  } = useInput('', validators.confirmNewPassword(newPassword), errorMessages.confirmNewPassword)

  const anyError = () => {
    const errors = [currentPasswordError.active, newPasswordError.active, confirmNewPasswordError.active]
    return errors.some(x => x === true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const passwordData = {currentPassword, newPassword}

    TaskbleService.updatePassword(token, passwordData)
      .then(() => {
        setSuccess(true)
        setTimeout(() => history.push('/'), 3000)
      })
      .catch(error => {
        const errorMessage = error.response.data.message
        currentPasswordResetError(errorMessage)
      })
  }

  return (
    <div /*id='signup'*/>

      <h3>Change Password</h3>

      <form onSubmit={handleSubmit} /*id='form-container'*/>

        <Input type='password' name='currentPassword' placeholder='current password' {...currentPasswordHandleInput} />
        {currentPasswordTouch && currentPasswordError.active && (
          <div>
            { currentPasswordError.message }
          </div>
        )}

        <Input type='password' name='newPassword' placeholder='new password' {...newPasswordHandleInput} />
        {newPasswordTouch && newPasswordError.active && (
          <div>
            { newPasswordError.message }
          </div>
        )}

        <Input type='password' name='confirmNewPassword' placeholder='confirm new password' {...confirmNewPasswordHandleInput} />
        {confirmNewPasswordTouch && confirmNewPasswordError.active && newPassword !== confirmNewPassword && (
          <div>
            { confirmNewPasswordError.message }
          </div>
        )}

        <button disabled={anyError()} type="submit" /*id='form-submitButton'*/>
          Change Password
        </button>

      </form>

      {success && (
        <h4>your password has been updated successfully</h4> 
      )}

    </div>
  )
}

export default UpdatePasswordForm