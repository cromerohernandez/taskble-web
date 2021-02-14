import React from 'react'
import { Redirect } from 'react-router-dom'
import TaskbleService from '../../services/TaskbleService'
import { WithAuthConsumer } from '../../contexts/AuthContext'

class Login extends React.Component {
    state = {
      data: {
        email: '',
        password: ''
      }
    }

  handleChange = (event) => {
    const { name, value } = event.target

    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    TaskbleService.login({ ...this.state.data })
      .then(
        user => {
          this.props.setUser(user)
        }
      )
  }

  render() {
    const { data } = this.state

    if (this.props.currentUser) {
      return <Redirect to="/"/>
    }

    return(
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={this.handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={this.handleChange}
            />

            <button type="submit">Log in</button>

          </form>
  
        </div>
      </div>
    )
  }
}

export default WithAuthConsumer(Login)