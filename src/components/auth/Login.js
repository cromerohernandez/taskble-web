import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'

import TaskbleService from '../../services/TaskbleService'
import AuthContext from '../../contexts/AuthContext'

import LogoSprite from '../misc/LogoSprite'

import '../../stylesheets/auth/login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = useContext(AuthContext)

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
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />

        <button type="submit">Log in</button>

      </form>

    </div>
  )
}

export default Login