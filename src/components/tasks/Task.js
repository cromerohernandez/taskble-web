import React, { useContext, useState, useCallback, useEffect } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'

import TranslateContext from '../../contexts/TranslateContext'
import TaskbleService from '../../services/TaskbleService'

import TaskForm from './TaskForm'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const Task = ({ taskId }) => {
  const history = useHistory()
  const { texts } = useContext(TranslateContext)
  const { id } = useParams()

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
    getTask()
    setEdit(false)
    setShow(false)
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
              <TaskForm task={task} edit={edit}/>
            </Modal.Body>
            <Button variant={task.done ? 'success' : 'warning'} onClick={handleDone}>
              {task.done ? 'done' : 'pending'}
            </Button>
          <Modal.Footer>
            {!edit && (
              <Button variant="primary" onClick={handleEdit}>
                Edit
              </Button>
            )}
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
   </div> 
  )
}

export default Task