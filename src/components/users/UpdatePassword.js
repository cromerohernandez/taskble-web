import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import TaskbleService from '../../services/TaskbleService'

import { checkPasswordFormat } from '../../helpers/authHelper'

import Input from '../UI/Input'

const validators = {
  password: val => val.length >= 8 && checkPasswordFormat(val) 
}

const errorMessages = {
  password: 'password needs at least 8 chars and must contains uppercase, lowercase, numbers and symbols'
}

const UpdatePassword = () => {
  const [currentPassword, setcurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [touch, setTouch] = useState({})
  const [success, setSuccess] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    const setState = 'set' + name

    setState(value)
  }

  /*const handleBlur = (event) => {
    const { name, value } = event.target
    const valid = validators[name](value)

    setTouch({
      ...touch,
      [name]: true
    })

    setErrors({
      ...errors,
      [name]: {
        active: !valid,
        message: errorMessages[name]
      }
    })

  }*/

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

  /*const anyError = () => Object.values(errors).some(x => x.active)*/

  /*if (auth.currentUser) {
    return <Redirect to="/"/>
  }*/
  
  /*if (success) {
    return <Validation/>
  }*/

  return(
    <div id="signup">

      <h3>Change Password</h3>

      <form /*onSubmit={handleSubmit}*/ /*id="form-container"*/>

        <Input type='text' name='currentPassword' placeholder='current password' value={currentPassword} /*onBlur={handleBlur} onChange={handleChange}*/ />

        <Input type='text' name='newPassword' placeholder='new password' value={newPassword} /*onBlur={handleBlur} onChange={handleChange}*/ />

        <Input type='password' name='confirmNewPassword' placeholder='confirm new password' value={confirmNewPassword} /*onBlur={handleBlur} onChange={handleChange}*/ />

        <button /*disabled={anyError()}*/ type="submit" /*id="form-submitButton"*/>
          Change Password
        </button>

      </form>    

    </div>
  )
}

export default UpdatePassword