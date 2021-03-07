import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import TaskbleService from '../../services/TaskbleService'

import useInput from '../../hooks/useInput'

import { checkPasswordFormat } from '../../helpers/authHelper'

import Input from '../UI/Input'

const validators = {
  newPassword: val => val.length >= 8 && checkPasswordFormat(val),
}

const errorMessages = {
  newPassword: 'password needs at least 8 chars and must contains uppercase, lowercase, numbers and symbols',
}

const UpdatePassword = () => {
  const [success, setSuccess] = useState(false)

  const {
    value: currentPassword,
    handleInput: currentPasswordHandleInput 
  } = useInput('')

  const {
    value: newPassword,
    touch: newPasswordTouch,
    error: newPasswordError,
    handleInput: newPasswordHandleInput 
  } = useInput('', validators.newPassword, errorMessages.newPassword)

  const {
    value: confirmNewPassword,
    touch: confirmNewPasswordTouch,
    handleInput: confirmNewPasswordHandleInput 
  } = useInput('')

  const anyError = () => {
    const errors = [newPasswordError.active]
    return errors.some(x => x === true)
  }

  /*const handleSubmit = (event) => {
    event.preventDefault()

    TaskbleService.signup(data)
      .then(
        () => {
          setErrors({
            username: {
              active: true,
              message: null
            },
            email: {
              active: true,
              message: null
            },
            password: {
              active: true,
              message: null
            }
          })
          setSuccess(true)
        }
      )
      .catch(error => {
        const responseErrors = error.response.data.errors
        const key = Object.keys(responseErrors)[0]

        setErrors({
          ...errors,
          [key]: {
            active: true,
            message: responseErrors[key]
          }
        })
      })
  }*/

  if (success) {
    return <Redirect to="/"/>
  }

  return(
    <div id="signup">

      <h3>Change Password</h3>

      <form /*onSubmit={handleSubmit}*/ /*id="form-container"*/>

        <Input type='password' name='currentPassword' placeholder='current password' {...currentPasswordHandleInput} />

        <Input type='password' name='newPassword' placeholder='new password' {...newPasswordHandleInput} />
        {newPasswordTouch && newPasswordError.active && (
          <div>
            { newPasswordError.message }
          </div>
        )}

        <Input type='password' name='confirmNewPassword' placeholder='confirm new password' {...confirmNewPasswordHandleInput} />
        {confirmNewPasswordTouch && (newPassword !== confirmNewPassword) && (
          <div>
            new password and confirm new password must be match
          </div>
        )}

        <button disabled={anyError()} type="submit" /*id="form-submitButton"*/>
          Change Password
        </button>

      </form>    

    </div>
  )
}

export default UpdatePassword