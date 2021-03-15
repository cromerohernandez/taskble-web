import React, { useState, useCallback, useEffect } from 'react'

import TaskbleService from '../../services/TaskbleService'

import TaskCard from './TaskCard'

const Calendar = () => {
  const [tasks, setTasks] = useState([])

  const getTasks = useCallback(() => {
    TaskbleService.userProfile()
      .then(user => {
        setTasks(user.tasks)
      })
      //.catch
  }, [tasks])

  useEffect(() => {
    getTasks()
  }, [])

  return(
    <div>
      {tasks.map((task, i) => (
        <TaskCard task={task} key={i}/>
      ))}
    </div>
  )
}

export default Calendar