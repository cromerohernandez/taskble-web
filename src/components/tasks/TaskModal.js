import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

import TranslateContext from '../../contexts/TranslateContext'
import TaskbleService from '../../services/TaskbleService'

import TaskForm from './TaskForm'
import OptionButton from '../UI/OptionButton'

import { Modal, Button } from 'react-bootstrap'

import '../../stylesheets/tasks/TaskModal.css'

const TaskModal = ({ task, setTask, typeModal, show, setShow }) => {
  const history = useHistory()
  const { texts } = useContext(TranslateContext)

  const [stateForm, setStateForm] = useState(typeModal)
  const [request, setRequest] = useState(null)
  const [formErrors, setFormErrors] = useState(false)

  const handleClose = () => {
    setShow(false)
    history.go()
  }

  const handleOnHide = () => {
    switch (stateForm) {
      case 'create':
        setRequest('cancelCreate')
        break
      case 'view':
        handleClose()
        break
      case 'edit':
        setRequest('save')
        break
    }
  }

  const handleContinueCreate = () => {
    setRequest(null)
  }

  const handleCancelCreate = () => {
    handleClose()
  }

  const handleEdit = () =>  {
    setStateForm('edit')
  }

  const handleCancelEdit = () =>  {
    setStateForm('view')
    setRequest(null)
  }

  const handleSaveRequest = () => {
    setStateForm('edit')
    setRequest('save')
  }

  const handleDone = () => {
    TaskbleService.doneTask(task.id)
      .then(updatedTask => setTask(updatedTask))//////////////////////////////////////////////// => ADD ALERT !!!!!
      .catch(() => {
        //////////////////////////////////////////////// => ADD ALERT !!!!!
      })
  }

  const handleDeleteRequest = () => {
    setStateForm('delete')
    setRequest('delete')
  }

  const handleDelete = () => {
    TaskbleService.deleteTask(task.id)
      .then(() => {
        //////////////////////////////////////////////// => ADD ALERT !!!!!
        setRequest(null)
        handleClose()
      })
      .catch(() => {
        //////////////////////////////////////////////// => ADD ALERT !!!!!
      })
  }
  
  const handleCancelDelete = () => {
    setStateForm('view')
    setRequest(null)
  }

  return (
    <div>
      {((stateForm === 'create') || (stateForm !== 'create')) && show && (
        <Modal show={show} onHide={handleOnHide}>
          <Modal.Header closeButton>
            {stateForm === 'view' && (
              <div id='option-button-container'>
                <OptionButton option={'edit'} onClick={handleEdit} stateForm={stateForm}/>
                <OptionButton option={'delete'} onClick={handleDeleteRequest} stateForm={stateForm}/>
                <OptionButton option={'close'} onClick={handleClose} stateForm={stateForm}/>
              </div>
            )}
          </Modal.Header>

          <Modal.Body>
            <TaskForm task={task ? task : null} stateForm={stateForm} setFormErrors={setFormErrors} cancel={handleCancelEdit} close={handleClose}/>

            {task && (
              <Button variant={task.done ? 'success' : 'warning'} onClick={handleDone}>
                {task.done ? texts.buttons.done : texts.buttons.pending}
              </Button>
            )}
          </Modal.Body>

          {(stateForm === 'create' || stateForm === 'edit' || request) && (
            <Modal.Footer>
              {stateForm === 'create' && request === null && (
                <Button disabled={formErrors} type='submit' form='taskForm' variant="primary">
                  { texts.buttons.createTask }
                </Button>
              )}

              {stateForm === 'edit' && request === null && (
                <div>
                  <Button disabled={formErrors} variant="primary" onClick={handleSaveRequest}>
                    { texts.buttons.save }
                  </Button>

                  <Button variant="secondary" onClick={handleCancelEdit}>
                    {texts.buttons.cancel}
                  </Button>
                </div>
              )}

              
              {request === 'cancelCreate' && (
                <div>
                  <h4>{texts.headers.cancelCreateTask}</h4>

                  <Button variant="primary" onClick={handleContinueCreate}>
                    {texts.buttons.continue}
                  </Button>

                  <Button variant="secondary" onClick={handleCancelCreate}>
                    {texts.buttons.cancel}
                  </Button>
                </div>
              )}

              {request === 'save' && (
                <div>
                  <h4>{texts.headers.confirmSaveTask}</h4>

                  <Button variant="primary" type='submit' form='taskForm'>
                    {texts.buttons.save}
                  </Button>

                  <Button variant="secondary" onClick={handleCancelEdit}>
                    {texts.buttons.cancel}
                  </Button>
                </div>
              )}

              {request === 'delete' && (
                <div>
                  <h4>{texts.headers.confirmDeleteTask}</h4>

                  <Button variant="danger" onClick={handleDelete}>
                    {texts.buttons.delete}
                  </Button>

                  <Button variant="primary" onClick={handleCancelDelete}>
                    {texts.buttons.cancel}
                  </Button>
                </div>
              )}
            </Modal.Footer>
          )}
        </Modal>
      )}
   </div> 
  )
}

export default TaskModal