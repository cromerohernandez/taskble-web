import '../App.css'
import { WithAuthConsumer } from '../contexts/AuthContext'

function App() {
  return (
    <div className="App">
        <p>
          Taskble
        </p>
    </div>
  );
}

export default WithAuthConsumer(App)