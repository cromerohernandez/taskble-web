import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import AuthContext from '../../contexts/AuthContext'
import TaskbleService from '../../services/TaskbleService'

import useInput from '../../hooks/useInput'

import LogoSprite from '../UI/LogoSprite'
import Input from '../UI/Input'

import '../../stylesheets/auth/login.css'

const Login = () => {
  const auth = useContext(AuthContext)

  const [loginError, setLoginError] = useState({active: false, message: ''})

  const {
    value: email,
    handleInput: emailHandleInput 
  } = useInput('')

  const {
    value: password,
    handleInput: passwordHandleInput
  } = useInput('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = {email, password}

    TaskbleService.login(data)
      .then(user => {
        auth.setUser(user)
      })
      .catch(error => {
        setLoginError({active: true, message: error.response.data.message})
      })
  }

  if (auth.currentUser) {
    return <Redirect to="/"/>
  }

  return(
    <div id="login">
      
      <LogoSprite/>

      <form onSubmit={handleSubmit} id="loginForm">
        <Input type='text' name='email' {...emailHandleInput} />

        <Input type='password' name='password' {...passwordHandleInput} />

        {loginError.active && (
          <div>
            { loginError.message }
          </div>
        )}

        <button type="submit">Log in</button>

      </form>

      <div>
        <h5>Don´t have an account?
          <Link to={{pathname:'/signup'}}> Sign up for Taskble</Link>
        </h5>
      </div>

    </div>
  )
}

export default Login