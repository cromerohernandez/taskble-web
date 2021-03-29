import React, { useContext, useState } from 'react'

import TranslateContext from '../../contexts/TranslateContext'
import AuthContext from '../../contexts/AuthContext'
import TaskbleService from '../../services/TaskbleService'

import useInput from '../../hooks/useInput'

import LogoSprite from '../UI/LogoSprite'
import Input from '../UI/Input'
import SignUpLink from '../users/SignUpLink'
import UpdatePasswordRequestLink from '../users/UpdatePasswordRequestLink'

import '../../stylesheets/auth/login.css'

const Login = () => {
  const auth = useContext(AuthContext)
  const { texts } = useContext(TranslateContext)

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

  return (
    <div id='login'>
      
      <LogoSprite/>

      <form onSubmit={handleSubmit} id='loginForm'>
        <Input type='text' name={texts.inputs.email} {...emailHandleInput} />

        <Input type='password' name='password' placeholder={texts.inputs.password} {...passwordHandleInput} />

        {loginError.active && (
          <div>
            { loginError.message }
          </div>
        )}

        <button type="submit">{texts.buttons.logIn}</button>

      </form>

      <SignUpLink/>

      <UpdatePasswordRequestLink/>

    </div>
  )
}

export default Login