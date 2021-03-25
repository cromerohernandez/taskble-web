import { Switch, Route, Redirect } from 'react-router-dom'

import { WithAuthConsumer } from '../contexts/AuthContext'

import AuthenticatedRoute from './auth/AuthenticatedRoute'
import NotAuthenticatedRoute from './auth/NotAuthenticatedRoute'
import Home from './users/Home'
import Login from './auth/Login'
import SignUp from './users/SignUp'
import PasswordRequest from './users/PasswordRequest'
import UpdatePassword from './users/UpdatePassword'
import TaskForm from './tasks/TaskForm'
import TaskDetail from './tasks/TaskDetail'

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

        <NotAuthenticatedRoute exact path='/passwordrequest'>
          <PasswordRequest/>
        </NotAuthenticatedRoute>

        <Route exact path='/:token/newpassword'>
          <UpdatePassword/>
        </Route>

        <AuthenticatedRoute exact path='/newtask'>
          <TaskForm/>
        </AuthenticatedRoute>

        <AuthenticatedRoute exact path='/tasks/:id'>
          <TaskDetail/>
        </AuthenticatedRoute>        

        <Redirect to='/'/>
      </Switch>
    </div>
  )
}

export default WithAuthConsumer(App)