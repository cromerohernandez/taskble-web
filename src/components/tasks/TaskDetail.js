import React, { useContext, useState, useEffect } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'

import TranslateContext from '../../contexts/TranslateContext'
import TaskbleService from '../../services/TaskbleService'

const TaskDetail = () => {
  const history = useHistory()
  const { texts } = useContext(TranslateContext)
  const { id } = useParams()

  const [task, setTask] = useState()

  useEffect(() => {
    TaskbleService.taskDetail(id)
      .then(task => {
        setTask(task)
      })
      //.catch
  }, [id])

  const handleDelete = () => {
    TaskbleService.deleteTask(task.id)
      .then(() => {
        //////////////////////////////////////////////// => ADD ALERT !!!!!
        setTimeout(() => history.push('/'), 4000)
      })
      .catch(() => {
        //////////////////////////////////////////////// => ADD ALERT !!!!!
      })
  }

  const handleBack = () => {
    history.push('/')
  }

  return (
    <div>
      {task && (
        <div>
          <h5>{task.title}</h5>
          <h6>{task.finalPriority}</h6>
          <h6>{task.userPriority}</h6>
          <h6>{task.description}</h6>
          <h6>{task.date.toDo}</h6>
          <h6>{task.date.limit}</h6>
          <Link to={`/edittask/${task.id}`}>{texts.headers.edit}</Link>
        </div>
      )}

      <div>
        <button onClick={handleDelete}>{texts.buttons.deleteTask}</button>
        <button onClick={handleBack}>←</button>
      </div>
    </div>
  )
}

export default TaskDetail