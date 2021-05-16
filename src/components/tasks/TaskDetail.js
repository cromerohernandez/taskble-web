import React, { useContext, useState, useCallback, useEffect } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'

import TranslateContext from '../../contexts/TranslateContext'
import TaskbleService from '../../services/TaskbleService'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const TaskDetail = () => {
  const history = useHistory()
  const { texts } = useContext(TranslateContext)
  const { id } = useParams()

  const [task, setTask] = useState()
  const [show, setShow] = useState(false);

  const getTask = useCallback(() => {
    TaskbleService.taskDetail(id)
      .then(task => {
        setTask(task)
      })
      //.catch
  }, [id])

  useEffect(() => {
    getTask()
    handleShow()
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
  <div>
      {task && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{task.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{task.description}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
   </div> 
  )
}

export default TaskDetail