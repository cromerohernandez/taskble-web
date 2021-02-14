//import React from 'react'
import { WithAuthConsumer } from '../../contexts/AuthContext'

const Home = () => {
  return (
    <div>
      <p>Taskble</p>
    </div>
  )
}

export default WithAuthConsumer(Home)