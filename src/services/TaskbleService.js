import axios from 'axios'

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials:true
})

http.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.clear()
      window.location.assign('/')
    }
    return Promise.reject(error)
  }
)

//users
const signup = (userData) => http.post('/users/new', userData)
const userProfile = () => http.get('/users/me')
//const updateUser = (userData) => http.patch('/users/me', userData)
const requestNewPassword = (emailData) => http.post('/users/requestNewPassword', emailData)
const updatePassword = (token, passwordData) => http.patch(`/users/${token}/updatepassword`, passwordData)
//const deleteUser = () => http.delete('/users/me')

//tasks
const createTask = (taskData) => http.post('/tasks/new', taskData)
const dailyTasks = (date) => http.get(`/tasks/daily/${date}`)
const taskDetail = (taskId) => http.get(`/tasks/${taskId}`)
//const updateTask = (taskId, taskData) => http.patch(`/tasks/${taskId}`, taskData)
const doneTask = (taskId) => http.post(`/tasks/${taskId}/done`)
const deleteTask = (taskId) => http.delete(`/tasks/${taskId}`)

//sessions
const login = ({ email, password }) => http.post('/login', { email, password })
const logout = () => http.post('/logout')

const TaskbleService = {
  signup,
  userProfile,
  requestNewPassword,
  updatePassword,
  createTask,
  dailyTasks,
  taskDetail,
  doneTask,
  deleteTask,
  login,
  logout
}

export default TaskbleService