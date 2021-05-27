import React, { useContext, useState, useCallback, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'

import TranslateContext from '../../contexts/TranslateContext'
import TaskbleService from '../../services/TaskbleService'

import TaskForm from './TaskForm'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const Task = ({ taskId, getTasks }) => {
  const history = useHistory()
  const { texts } = useContext(TranslateContext)

  const [task, setTask] = useState()
  const [show, setShow] = useState(false)
  const [edit, setEdit] = useState(false)

  const getTask = useCallback(() => {
    TaskbleService.taskDetail(taskId)
      .then(task => {
        setTask(task)
      })
      //.catch
  }, [taskId])

  useEffect(() => {
    getTask()
  }, [getTask])

  const handleShow = () => setShow(true)

  const handleClose = () => {
    setEdit(false)
    setShow(false)
    getTasks()
  } 

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

  const handleEdit = () =>  {
    setEdit(true)
  }

  const handleCancel = () =>  {
    setEdit(false)
  }

  const handleDelete = () => {
    TaskbleService.deleteTask(task.id)
      .then(() => {
        //////////////////////////////////////////////// => ADD ALERT !!!!!
        handleClose()
      })
      .catch(() => {
        //////////////////////////////////////////////// => ADD ALERT !!!!!
      })
  }

  return (
  <div>
      {task && (
        <div onClick={handleShow}>
          <h6>{task.title}</h6>
          <h6>{task.finalPriority}</h6>
        </div>
      )}

      {task && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{task.title}</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <TaskForm task={task} edit={edit} cancel={handleCancel}/>
            </Modal.Body>
            <Button variant={task.done ? 'success' : 'warning'} onClick={handleDone}>
              {task.done ? texts.buttons.doneTask : texts.buttons.pendingTask}
            </Button>
          <Modal.Footer>
            {!edit && (
              <Button variant="primary" onClick={handleEdit}>
                {texts.buttons.editTask}
              </Button>
            )}
            <Button variant="danger" onClick={handleDelete}>
              {texts.buttons.deleteTask}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
   </div> 
  )
}

export default Task