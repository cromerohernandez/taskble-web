import { Switch, Route, Redirect } from 'react-router-dom'

import { WithAuthConsumer } from '../contexts/AuthContext'

import AuthenticatedRoute from './auth/AuthenticatedRoute'
import Home from './users/Home'
import Login from './auth/Login'
import SignUp from './/auth/SignUp'
import UpdatePassword from './users/UpdatePassword'

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

        <Route exact path="/:token/updatepassword">
          <UpdatePassword/>
        </Route>

        <Redirect to="/"/>
      </Switch>
    </div>
  )
}

export default WithAuthConsumer(App)