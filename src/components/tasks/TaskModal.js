import React, { useContext, useState, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import TranslateContext from '../../contexts/TranslateContext'
import TaskbleService from '../../services/TaskbleService'

import TaskForm from './TaskForm'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const TaskModal = ({ taskId, typeModal, show, setShow }) => {
  const history = useHistory()
  const { texts } = useContext(TranslateContext)

  const [task, setTask] = useState()
  const [typeForm, setTypeForm] = useState(typeModal)
  const [deleteRequest, setDeleteRequest] = useState(false)

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

  const handleClose = () => {
    setShow(false)
    history.go()
  } 

  const handleDone = () => {
    TaskbleService.doneTask(task.id)
      .then(task => {
        setTask(task)
        //////////////////////////////////////////////// => ADD ALERT !!!!!
      })
      .catch(() => {
        //////////////////////////////////////////////// => ADD ALERT !!!!!
      })
  }

  const handleEdit = () =>  {
    setTypeForm('edit')
  }

  const handleCancel = () =>  {
    setTypeForm('view')
  }

  const handleDeleteRequest = () => {
    setDeleteRequest(true)
  }

  const handleDelete = () => {
    TaskbleService.deleteTask(task.id)
      .then(() => {
        //////////////////////////////////////////////// => ADD ALERT !!!!!
        setDeleteRequest(false)
        handleClose()
      })
      .catch(() => {
        //////////////////////////////////////////////// => ADD ALERT !!!!!
      })
  }

  const handleCancelDelete = () => {
    setDeleteRequest(false)
  }

  return (
    <div>
      {((typeForm === 'create') || (typeForm !== 'create' && task)) && show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {typeForm === 'create' && (<Modal.Title>{texts.headers.newTask}</Modal.Title>)}
            {task && (typeForm === 'view' || 'edit') && (<Modal.Title>{task.title}</Modal.Title>)}
          </Modal.Header>

          <Modal.Body>
            <TaskForm task={task ? task : null} typeForm={typeForm} cancel={handleCancel} close={handleClose}/>

            {task && (
              <Button variant={task.done ? 'success' : 'warning'} onClick={handleDone}>
                {task.done ? texts.buttons.doneTask : texts.buttons.pendingTask}
              </Button>
            )}
          </Modal.Body>

          <Modal.Footer>
            {(typeForm === 'view' && !deleteRequest) && (
              <Button variant="primary" onClick={handleEdit}>
                {texts.buttons.editTask}
              </Button>
            )}

            {!deleteRequest && (
              <Button variant="danger" onClick={handleDeleteRequest}>
                {texts.buttons.deleteTask}
              </Button>
            )}

            {deleteRequest && (
              <div>
                <h4>{texts.headers.confirmDeleteTask}</h4>

                <Button variant="danger" onClick={handleDelete}>
                  {texts.buttons.deleteTask}
                </Button>

                <Button variant="primary" onClick={handleCancelDelete}>
                  {texts.buttons.cancel}
                </Button>
              </div>
            )}
          </Modal.Footer>
        </Modal>
      )}
   </div> 
  )
}

export default TaskModal