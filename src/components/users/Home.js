import React, { useContext, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'

import TranslateContext from '../../contexts/TranslateContext'
import AuthContext from '../../contexts/AuthContext'
import TaskbleService from '../../services/TaskbleService'

import Calendar from '../tasks/Calendar'

const Home = () => {
  const { texts } = useContext(TranslateContext)
  const auth = useContext(AuthContext)

  const handleLogout = () => {
    auth.logout()
    return <Redirect to='/'/>
  }

  const handleRequestNewPassword = () => {
    TaskbleService.requestNewPassword()
      .then(() => {
        //////////////////////////////////////////////// => ADD ALERT !!!!!
      })
      .catch(() => {
        //////////////////////////////////////////////// => ADD ALERT !!!!!
      })
  }

  useEffect(() => {
    TaskbleService.userProfile()
  }, [auth.currentUser]) 

  return (
    <div>
      <Calendar/>
      <button onClick={handleRequestNewPassword}>{texts.buttons.changePassword}</button>
      <Link to='/newtask'>{texts.headers.newTask}</Link>
      <button onClick={handleLogout}>←</button>
    </div>
  )
}

export default Home