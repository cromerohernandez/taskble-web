import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import AuthContext from '../../contexts/AuthContext'
import TaskbleService from '../../services/TaskbleService'

import LogoSprite from '../UI/LogoSprite'
import Input from '../UI/Input'

import '../../stylesheets/auth/login.css'

const Login = () => {
  const auth = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    TaskbleService.login({ email, password })
      .then(
        user => {
          auth.setUser(user)
        }
      )
  }

  if (auth.currentUser) {
    return <Redirect to="/"/>
  }

  return(
    <div id="login">
      
      <LogoSprite/>

      <form onSubmit={handleSubmit} id="loginForm">
        <Input type='text' name='email' value={email} onChange={handleChange} />

        <Input type='password' name='password' value={password} onChange={handleChange} />

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