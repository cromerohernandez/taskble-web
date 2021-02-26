import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import AuthContext from '../../contexts/AuthContext'

const Home = () => {
  const auth = useContext(AuthContext)

  const handleLogout = () => {
    auth.logout()
    return <Redirect to="/"/>
  }

  return(
    <div>
      <p>Taskble Home</p>
      <button onClick={handleLogout}>←</button>
    </div>
  )
}

export default Home