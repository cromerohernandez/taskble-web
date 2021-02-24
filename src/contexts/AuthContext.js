import React, { useState } from 'react'

import TaskbleService from '../services/TaskbleService'

const AuthContext = React.createContext()

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))

  const setUser = (user) => {
    localStorage.setItem('user', user ? JSON.stringify(user) : null)
    setCurrentUser(user)
  }

  const logout = () => {
    TaskbleService.logout()
      .then(() => {
        setCurrentUser()
      })
  }

  const value = {
    currentUser: currentUser,
    setUser: setUser,
    logout: logout
  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const WithAuthConsumer = (WrappedComponent) => (props) => (
  <AuthContext.Consumer>
    {(authProps) => (<WrappedComponent {...props} {...authProps} />)}
  </AuthContext.Consumer>
)

export default AuthContext

/*export class AuthContextProvider extends React.Component {
  state = {
    user: JSON.parse(localStorage.getItem('user'))
  }

  setUser = (user) => {
    localStorage.setItem('user', user ? JSON.stringify(user) : null)
    this.setState({ user })
  }

  logout = () => {
    TaskbleService.logout()
      .then(() => {
        this.setUser()
      })
  }

  render() {
    const value = {
      currentUser: this.state.user,
      setUser: this.setUser,
      logout: this.logout
    }

    return (
      <AuthContext.Provider value={value}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export const WithAuthConsumer = (WrappedComponent) => (props) => (
  <AuthContext.Consumer>
    {(authProps) => (<WrappedComponent {...props} {...authProps} />)}
  </AuthContext.Consumer>
)

export default AuthContext*/