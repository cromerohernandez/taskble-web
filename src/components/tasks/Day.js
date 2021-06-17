import React, { useState, useCallback, useEffect } from 'react'

import TaskbleService from '../../services/TaskbleService'

import TaskDisc from './TaskDisc'

import { sortByFinalPriority } from '../../helpers/tasksHelper'

import '../../stylesheets/tasks/Day.css'

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
    <div id='dayContainer'>
      <h4>{`${date.getDate()} · ${date.getMonth() + 1} · ${date.getFullYear()}`}</h4>

      {tasks.map((task, i) => (
        <TaskDisc taskData={task} key={i}/>
      ))}
    </div>
  )
}

export default Day