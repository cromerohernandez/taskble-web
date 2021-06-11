import React, { useContext, useState } from 'react'

import TranslateContext from '../../contexts/TranslateContext'
import TaskbleService from '../../services/TaskbleService'

import TaskModal from './TaskModal'

import Button from 'react-bootstrap/Button'

const TaskDisc = ({ task }) => {
  const { texts } = useContext(TranslateContext)

  const [overDisc, setOverDisc] = useState(false)
  const [show, setShow] = useState(false)

  const handleOverDisc = () => setOverDisc(true)

  const handleOutDisc = () => setOverDisc(false)

  /*const handleDone = () => {
    TaskbleService.doneTask(task.id)
      .then(() => {
        //getTask()
        //////////////////////////////////////////////// => ADD ALERT !!!!!
      })
      .catch(() => {
        //////////////////////////////////////////////// => ADD ALERT !!!!!
      })
  }*/

  const handleShow = () => setShow(true)

  return (
    <div onMouseOver={handleOverDisc} onMouseOut={handleOutDisc}>
      <div>
        {task && (
          <div onClick={handleShow}>
            <h6>{task.title}</h6>
            <h6>{task.finalPriority}</h6>
          </div>
        )}

        {overDisc && (
          <Button variant={task.done ? 'success' : 'warning'} /*onClick={handleDone}*/>
            {task.done ? texts.buttons.doneTask : texts.buttons.pendingTask}
          </Button>
        )}
      </div>
      
      {show && (
        <TaskModal taskId={task.id} typeModal={'view'} show={show} setShow={setShow} />
      )}
    </div> 
  )
}

export default TaskDisc