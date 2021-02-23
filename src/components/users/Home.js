import React from 'react'
import { Redirect } from 'react-router-dom'

import { WithAuthConsumer } from '../../contexts/AuthContext'

const Home = (props) => {
  const handleLogout = () => {
    props.logout()
    return <Redirect to="/"/>
  }

  return(
    <div>
      <p>Taskble Home</p>
      <button onClick={handleLogout}>←</button>
    </div>
  )
}

export default WithAuthConsumer(Home)