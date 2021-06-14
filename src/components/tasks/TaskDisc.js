import React, { useContext, useState } from 'react'

import TranslateContext from '../../contexts/TranslateContext'
import TaskbleService from '../../services/TaskbleService'

import TaskModal from './TaskModal'

import Button from 'react-bootstrap/Button'

const TaskDisc = ({ task }) => {
  const { texts } = useContext(TranslateContext)

  const [done, setDone] = useState(task.done)
  const [overDisc, setOverDisc] = useState(false)
  const [show, setShow] = useState(false)

  const handleOverDisc = () => setOverDisc(true)

  const handleLeaveDisc = () => setOverDisc(false)

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

  const handleShow = () => setShow(true)

  return (
    <div>
      {task && (
        <div onMouseOver={handleOverDisc} onMouseLeave={handleLeaveDisc}>
          <div onClick={handleShow}>
            <h6>{task.title}</h6>
            <h6>{task.finalPriority}</h6>
          </div>

          {overDisc && (
            <Button variant={done ? 'success' : 'warning'} onClick={handleDone}>
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