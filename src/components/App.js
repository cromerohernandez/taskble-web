import { Switch, Route, Redirect } from 'react-router-dom'

import { WithAuthConsumer } from '../contexts/AuthContext'

import AuthenticatedRoute from './auth/AuthenticatedRoute'
import Login from './auth/Login'
import SignUp from './/auth/SignUp'
import Home from './users/Home'

import '../stylesheets/App.css'

function App() {
  return (
    <div className="App">
      <Switch>
        <AuthenticatedRoute exact path="/">
          <Home/>
        </AuthenticatedRoute>

        <Route exact path="/login">
          <Login/>
        </Route>

        <Route exact path="/signup">
          <SignUp/>
        </Route>

        <Redirect to="/"/>
      </Switch>
    </div>
  )
}

export default WithAuthConsumer(App)