import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

import TranslateContext from '../../contexts/TranslateContext'
import TaskbleService from '../../services/TaskbleService'

import TaskModal from './TaskModal'
import Button from 'react-bootstrap/Button'

import '../../stylesheets/tasks/TaskDisc.css'

const TaskDisc = ({ taskData }) => {
  const history = useHistory()
  const { texts } = useContext(TranslateContext)

  const [task, setTask] = useState(taskData)
  const [overDisc, setOverDisc] = useState(false)
  const [overButton, setOverButton] = useState(false)
  const [show, setShow] = useState(false)

  const handleOverDisc = () => setOverDisc(true)

  const handleLeaveDisc = () => setOverDisc(false)

  const handleOverButton = () => setOverButton(true)

  const handleLeaveButton = () => setOverButton(false)

  const handleShow = () => {
    if (!overButton) {
      setShow(true)
    }
  }

  const handleDone = () => {
    TaskbleService.doneTask(task.id)
      .then(updatedTask => {
        setTask(updatedTask)
      })        //////////////////////////////////////////////// => ADD ALERT !!!!!
      .catch(() => {
        //////////////////////////////////////////////// => ADD ALERT !!!!!
      })
  }

 const setDiscStyle = () => {
    let currentClassName = task.done ? 'taskDiscContainer-done' : 'taskDiscContainer-pending'

    if (task.date.current > task.date.limit && !task.done) {
      currentClassName += ' taskDiscContainer-delayed'
    }

    return currentClassName
  }

  return (
    <div>
      {task && (
        <div onMouseOver={handleOverDisc} onMouseLeave={handleLeaveDisc} onClick={handleShow} id='taskDiscContainer' className={setDiscStyle()}>
          <div>
            <h6>{task.title}</h6>
            <h6>{task.finalPriority}</h6>
          </div>

          {overDisc && (
            <Button variant={task.done ? 'success' : 'warning'} onMouseOver={handleOverButton} onMouseLeave={handleLeaveButton} onClick={handleDone}>
              {task.done ? texts.buttons.doneTask : texts.buttons.pendingTask}
            </Button>        
          )}
        </div>
      )}
      
      {show && (
        <TaskModal task={task} setTask={setTask} typeModal={'view'} show={show} setShow={setShow} />
      )}
    </div> 
  )
}

export default TaskDisc