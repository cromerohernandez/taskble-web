import React, { useContext, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'

import AuthContext from '../../contexts/AuthContext'
import TaskbleService from '../../services/TaskbleService'

const Home = () => {
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

  return(
    <div>
      <p>Taskble Home</p>
      <button onClick={handleRequestNewPassword}>Change Password</button>
      <Link to='/newtask'>New Task</Link>
      <button onClick={handleLogout}>←</button>
    </div>
  )
}

export default Home