import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

import TranslateContext from '../../contexts/TranslateContext'
import TaskbleService from '../../services/TaskbleService'

import TaskForm from './TaskForm'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const TaskModal = ({ task, setTask, typeModal, show, setShow }) => {
  const history = useHistory()
  const { texts } = useContext(TranslateContext)

  const [typeForm, setTypeForm] = useState(typeModal)
  const [deleteRequest, setDeleteRequest] = useState(false)

  const handleClose = () => {
    setShow(false)
    history.go()
  } 

  const handleEdit = () =>  {
    setTypeForm('edit')
  }

  const handleCancelEdit = () =>  {
    setTypeForm('view')
  }

  const handleDone = () => {
    TaskbleService.doneTask(task.id)
      .then(updatedTask => setTask(updatedTask))//////////////////////////////////////////////// => ADD ALERT !!!!!
      .catch(() => {
        //////////////////////////////////////////////// => ADD ALERT !!!!!
      })
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
      {((typeForm === 'create') || (typeForm !== 'create')) && show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {typeForm === 'view' && (
              <Button variant="primary" onClick={handleEdit}>
                {texts.buttons.editTask}
              </Button>
            )}

            {typeForm === 'view' && !deleteRequest && (
              <Button variant="danger" onClick={handleDeleteRequest}>
                {texts.buttons.deleteTask}
              </Button>
            )}
          </Modal.Header>

          <Modal.Body>
            <TaskForm task={task ? task : null} typeForm={typeForm} setTypeForm={setTypeForm} cancel={handleCancelEdit} close={handleClose}/>

            {task && (
              <Button variant={task.done ? 'success' : 'warning'} onClick={handleDone}>
                {task.done ? texts.buttons.doneTask : texts.buttons.pendingTask}
              </Button>
            )}
          </Modal.Body>

          <Modal.Footer>
            {typeForm === 'create' && (
              <Button /*disabled={anyError()}*/ type='submit' form='taskForm' variant="primary">
                { texts.buttons.createTask }
              </Button>
            )}

            {typeForm === 'edit' && (
              <div>
                <Button /*disabled={anyError()}*/ type='submit' form='taskForm' variant="primary">
                  { texts.buttons.saveTask }
                </Button>

                <Button variant="primary" onClick={handleCancelEdit}>
                  {texts.buttons.cancel}
                </Button>
              </div>
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