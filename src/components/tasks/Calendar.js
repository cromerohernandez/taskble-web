import React, { useContext, useState, useCallback, useEffect } from 'react'

import AuthContext from '../../contexts/AuthContext'
import TaskbleService from '../../services/TaskbleService'

const Calendar = () => {
  const auth = useContext(AuthContext)

  const [tasks, setTasks] = useState([])

  const getTasks = useCallback(() => {
    TaskbleService.userProfile()
      .then(user => {
        setTasks(user.tasks)
      })
  }, [tasks])

  useEffect(() => {
    getTasks()
  }, [])

  console.log(tasks)

  return(
    <div>
      {tasks.map((task, i) => {
        <h6>{task.title}</h6>
      })}
    </div>
  )
}

export default Calendar