import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'

import TaskbleService from '../../services/TaskbleService'

import TaskCard from './TaskCard'

import { sortByFinalPriority } from '../../helpers/tasksHelper'

const Day = (date) => {
  const [tasks, setTasks] = useState([])

  const getTasks = useCallback(() => {
    TaskbleService.dailyTasks(date.date)
      .then(tasks => {
        const sortedTasks = sortByFinalPriority(tasks)
        setTasks(sortedTasks)
      })
      //.catch
  }, [date])

  useEffect(() => {
    getTasks()
  }, [getTasks])

  return (
    <div>
      {tasks.map((task, i) => (
        <Link to={`/tasks/${task.id}`} key={i}>
          <TaskCard task={task}/>
        </Link>
      ))}
    </div>
  )
}

export default Day