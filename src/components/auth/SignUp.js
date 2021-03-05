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


  const { value: username, handleInput: usernameHandleInput } = useInput('', validators.username)
  const { value: email, handleInput: emailHandleInput } = useInput('',  validators.email)
  const { value: password, handleInput: passwordHandleInput } = useInput('', validators.password)


  const [errors, setErrors] = useState({
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
  const [success, setSuccess] = useState(false)


  const [touch, setTouch] = useState(false)


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

  const anyError = () => Object.values(errors).some(x => x.active)

  if (auth.currentUser) {
    return <Redirect to="/"/>
  }
  
  if (success) {
    return <Validation/>
  }

  return(
    <div id="signup">

      <h3>SignUp</h3>

      <form /*onSubmit={handleSubmit}*/ /*id="form-container"*/>

        <Input type='text' name='username' {...usernameHandleInput} />
        {touch.username && errors.username.active && (
          <div /*id="form-error"*/>
            { errors.username.message }
          </div>
        )}

        <Input type='text' name='email' {...emailHandleInput} />
        {touch.email && errors.email.active && (
          <div /*id="form-error"*/>
            { errors.email.message }
          </div>
        )}


        <Input type='password' name='password' {...passwordHandleInput} />
        {touch.password && errors.password.active && (
          <div /*id="form-error"*/>
            { errors.password.message }
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