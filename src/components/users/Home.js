import React from 'react'
import { Redirect } from 'react-router-dom'

import { WithAuthConsumer } from '../../contexts/AuthContext'

class Home extends React.Component {

  handleLogout = () => {
    this.props.logout()
    return <Redirect to="/"/>
  }

  render () {
    return(
      <div>
        <p>Taskble Home</p>

        <button onClick={this.handleLogout}>←</button>

      </div>
    )
    }
}

export default WithAuthConsumer(Home)