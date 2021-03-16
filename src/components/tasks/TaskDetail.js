import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import TaskbleService from '../../services/TaskbleService'

const TaskDetail = ({ taskId }) => {
  const [task, setTask] = useState()
  //const { id } = useParams()

  useEffect(() => {
    TaskbleService.taskDetail(taskId)
      .then(task => {
        setTask(task)
      })
      //.catch
  }, [task])

  return (
    <div>
      {task && (
        <div>
          <h5>{task.title}</h5>
          <h6>{task.description}</h6>
          <h6>{task.date.toDo}</h6>
          <h6>{task.date.limit}</h6>
        </div>
      )}
    </div>
  )
}

export default TaskDetail