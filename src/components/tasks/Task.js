import React, { useContext, useState, useCallback, useEffect } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'

import TranslateContext from '../../contexts/TranslateContext'
import TaskbleService from '../../services/TaskbleService'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const Task = ({ taskId }) => {
  const history = useHistory()
  const { texts } = useContext(TranslateContext)
  const { id } = useParams()

  const [task, setTask] = useState()
  const [show, setShow] = useState(false);

  const getTask = useCallback(() => {
    TaskbleService.taskDetail(taskId)
      .then(task => {
        setTask(task)
      })
      //.catch
  }, [id])

  useEffect(() => {
    getTask()
  }, [getTask])

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

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
            <h4>{task.keyword}</h4>
            <p>{task.description}</p>
            <h4>{task.date.toDo}</h4>
            <h4>{task.date.limit}</h4>
            <h4>{task.finalPriority}</h4>
            <Button variant={task.done ? 'success' : 'warning'} onClick={handleDone}>
              {task.done ? 'done' : 'pending'}
            </Button>
          </Modal.Body>
          <Modal.Footer>
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