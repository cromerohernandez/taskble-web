import React, { useContext, useState } from 'react'

import TranslateContext from '../../contexts/TranslateContext'
import TaskbleService from '../../services/TaskbleService'

import TaskModal from './TaskModal'
import Button from 'react-bootstrap/Button'

import '../../stylesheets/tasks/TaskDisc.css'

const TaskDisc = ({ task }) => {
  const { texts } = useContext(TranslateContext)

  const [done, setDone] = useState(task.done)
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
        setDone(updatedTask.done)
        //////////////////////////////////////////////// => ADD ALERT !!!!!
      })
      .catch(() => {
        //////////////////////////////////////////////// => ADD ALERT !!!!!
      })
  }

  return (
    <div>
      {task && (
        <div onMouseOver={handleOverDisc} onMouseLeave={handleLeaveDisc} onClick={handleShow} id='taskDiscContainer'>
          <div>
            <h6>{task.title}</h6>
            <h6>{task.finalPriority}</h6>
          </div>

          {overDisc && (
            <Button variant={done ? 'success' : 'warning'} onMouseOver={handleOverButton} onMouseLeave={handleLeaveButton} onClick={handleDone}>
              {done ? texts.buttons.doneTask : texts.buttons.pendingTask}
            </Button>        
          )}
        </div>
      )}
      
      {show && (
        <TaskModal taskId={task.id} typeModal={'view'} show={show} setShow={setShow} />
      )}
    </div> 
  )
}

export default TaskDisc