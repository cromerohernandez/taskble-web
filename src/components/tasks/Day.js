import React, { useState, useCallback, useEffect } from 'react'

import TaskbleService from '../../services/TaskbleService'

import TaskDisc from './TaskDisc'

import { sortByFinalPriority } from '../../helpers/tasksHelper'

const Day = ({ date }) => {
  const [tasks, setTasks] = useState([])

  const getTasks = useCallback(() => {
    TaskbleService.dailyTasks(date.getTime())
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
      <h4>{`${date.getDate()} · ${date.getMonth() + 1} · ${date.getFullYear()}`}</h4>

      {tasks.map((task, i) => (
        <TaskDisc task={task} key={i}/>
      ))}
    </div>
  )
}

export default Day