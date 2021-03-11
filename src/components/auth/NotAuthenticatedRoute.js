import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'

import AuthContext from '../../contexts/AuthContext'

const NotAuthenticatedRoute = (props) => {
  const auth = useContext(AuthContext)

  if (auth.currentUser) {
    return <Redirect to='/'/>
  } else {
    return <Route {...props} />
  }
}

export default NotAuthenticatedRoute