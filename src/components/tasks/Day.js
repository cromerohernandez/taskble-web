import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'

import TaskbleService from '../../services/TaskbleService'

import TaskCard from './TaskCard'

const Day = (date) => {
  const [tasks, setTasks] = useState([])

  const getTasks = useCallback(() => {
    TaskbleService.dailyTasks(date.date)
      .then(tasks => {
        setTasks(tasks)
      })
      //.catch
  }, [date])

  useEffect(() => {
    getTasks()
  }, [getTasks])

  return (
    <div>
      {tasks.map((task, i) => (
        <Link to={`/tasks/${task.id}`}>
          <TaskCard task={task} key={i}/>
        </Link>
      ))}
    </div>
  )
}

export default Day