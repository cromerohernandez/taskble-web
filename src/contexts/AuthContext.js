import React, { useState } from 'react'

import TaskbleService from '../services/TaskbleService'

const AuthContext = React.createContext()

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))

  const setUser = (user) => {
    localStorage.setItem('user', user ? JSON.stringify(user) : null)
    setCurrentUser(user)
  }

  const logout = () => {
    TaskbleService.logout()
      .then(() => {
        setUser()
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