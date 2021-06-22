import React, { useContext, useState } from 'react'

import TranslateContext from '../../contexts/TranslateContext'
import TaskbleService from '../../services/TaskbleService'

import TaskModal from './TaskModal'
import { Button } from 'react-bootstrap'

import '../../stylesheets/tasks/TaskDisc.css'

const TaskDisc = ({ taskData }) => {
  const { texts } = useContext(TranslateContext)

  const [task, setTask] = useState(taskData)
  const [enterDisc, setEnterDisc] = useState(false)
  const [enterButton, setEnterButton] = useState(false)
  const [show, setShow] = useState(false)

  const handleEnterDisc = () => setEnterDisc(true)

  const handleLeaveDisc = () => setEnterDisc(false)

  const handleEnterButton = () => setEnterButton(true)

  const handleLeaveButton = () => setEnterButton(false)

  const handleShow = () => {
    if (!enterButton) {
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
        <div onMouseEnter={handleEnterDisc} onMouseLeave={handleLeaveDisc} onClick={handleShow} id='taskDiscContainer' className={setDiscStyle()}>
          <div>
            <h6>{task.title}</h6>
            <h6>{task.finalPriority}</h6>
          </div>

          {enterDisc && (
            <Button variant={task.done ? 'success' : 'warning'} onMouseEnter={handleEnterButton} onMouseLeave={handleLeaveButton} onClick={handleDone}>
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