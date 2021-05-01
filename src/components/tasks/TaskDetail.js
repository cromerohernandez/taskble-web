import React, { useContext, useState, useCallback, useEffect } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'

import TranslateContext from '../../contexts/TranslateContext'
import TaskbleService from '../../services/TaskbleService'

const TaskDetail = () => {
  const history = useHistory()
  const { texts } = useContext(TranslateContext)
  const { id } = useParams()

  const [task, setTask] = useState()

  const getTask = useCallback(() => {
    TaskbleService.taskDetail(id)
      .then(task => {
        setTask(task)
      })
      //.catch
  }, [id])

  useEffect(() => {
    getTask()
  }, [getTask])


  const handleDone = () => {
    TaskbleService.doneTask(task.id)
      .then(() => {
        getTask()
        //////////////////////////////////////////////// => ADD ALERT !!!!!
      })
      .catch(() => {
        //////////////////////////////////////////////// => ADD ALERT !!!!!
      })
  }

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
          <h6>done: {task.done ? '*yes*' : '*no*'}</h6>
          <button onClick={handleDone}>{task.done ? '*undone*' : '*done*'}</button>
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