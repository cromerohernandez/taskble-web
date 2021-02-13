import '../App.css'
import { Switch, Route, Redirect } from 'react-router-dom'
import { WithAuthConsumer } from '../contexts/AuthContext'

import Login from './auth/Login'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login">
          <Login/>
        </Route>

        <Redirect to="/"/>
      </Switch>
    </div>
  )
}

export default WithAuthConsumer(App)