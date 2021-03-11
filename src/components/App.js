import { Switch, Route, Redirect } from 'react-router-dom'

import { WithAuthConsumer } from '../contexts/AuthContext'

import AuthenticatedRoute from './auth/AuthenticatedRoute'
import NotAuthenticatedRoute from './auth/NotAuthenticatedRoute'
import Home from './users/Home'
import Login from './auth/Login'
import SignUp from './users/SignUp'
import UpdatePassword from './users/UpdatePassword'
import CreateTask from './tasks/CreateTask'

import '../stylesheets/App.css'

function App() {
  return (
    <div className='App'>
      <Switch>
        <AuthenticatedRoute exact path='/'>
          <Home/>
        </AuthenticatedRoute>

        <NotAuthenticatedRoute exact path='/login'>
          <Login/>
        </NotAuthenticatedRoute>

        <NotAuthenticatedRoute exact path='/signup'>
          <SignUp/>
        </NotAuthenticatedRoute>

        <Route exact path='/:token/newpassword'>
          <UpdatePassword/>
        </Route>

        <AuthenticatedRoute exact path='/newtask'>
          <CreateTask/>
        </AuthenticatedRoute>

        <Redirect to='/'/>
      </Switch>
    </div>
  )
}

export default WithAuthConsumer(App)