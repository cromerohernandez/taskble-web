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
      window.location.assign('/login')
    }

    return Promise.reject(error)
  }
)

//users
const register = (userData) => http.post('/users/new', userData)
const userProfile = () => http.get('/users/me')
const updateUser = (userData) => http.patch('/users/me', userData)
const requestNewPassword = () => http.get('/users/me/requestNewPassword')
const deleteUser = () => http.delete('/users/me')

//tasks
const createTask = (taskData) => http.post('/tasks/new', taskData)
const taskDetail = (taskId) => http.get(`/tasks/${taskId}`)
const updateTask = (taskId, taskData) => http.patch(`/tasks/${taskId}`, taskData)
const deleteTask = (taskId) => http.delete(`/tasks/${taskId}`)

//sessions
const login = ({ email, password }) => http.post('/login', { email, password })
const logout = () => http.post('/logout')

export default {
  login,
  logout
}