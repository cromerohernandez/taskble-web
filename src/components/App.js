import { Switch, Route, Redirect } from 'react-router-dom'

import { WithAuthConsumer } from '../contexts/AuthContext'

import AuthenticatedRoute from './auth/AuthenticatedRoute'
import NotAuthenticatedRoute from './auth/NotAuthenticatedRoute'
import Home from './users/Home'
import Login from './auth/Login'
import SignUpForm from './users/SignUpForm'
import UpdatePasswordRequest from './users/UpdatePasswordRequest'
import UpdatePasswordForm from './users/UpdatePasswordForm'
import TaskForm from './tasks/TaskForm'

import 'bootstrap/dist/css/bootstrap.min.css'
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
          <SignUpForm/>
        </NotAuthenticatedRoute>

        <NotAuthenticatedRoute exact path='/passwordrequest'>
          <UpdatePasswordRequest/>
        </NotAuthenticatedRoute>

        <Route exact path='/:token/newpassword'>
          <UpdatePasswordForm/>
        </Route>

        <AuthenticatedRoute exact path='/newtask'>
          <TaskForm/>
        </AuthenticatedRoute>

        <AuthenticatedRoute exact path='/edittask/:id'>
          <TaskForm/>
        </AuthenticatedRoute>    

        <Redirect to='/'/>
      </Switch>
    </div>
  )
}

export default WithAuthConsumer(App)