import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import TranslateContext from '../../contexts/TranslateContext'
import TaskbleService from '../../services/TaskbleService'

import useInput from '../../hooks/useInput'

import Button from 'react-bootstrap/Button'
import Input from '../UI/Input'

import { dateToDateInputFormat } from '../../helpers/tasksHelper'

const validators = {
  keyword: val => val && val.length <= 10,
  title: val => val,
  userPriority: val => 1 <= val && val <= 5,
  toDoDate: val => val,
  limitDate: val => val
}

const TaskForm = ({ task, type, cancel }) => {
  const history = useHistory()
  const { texts } = useContext(TranslateContext)

  const {
    value: keyword,
    touch: keywordTouch,
    error: keywordError,
    handleInput: keywordHandleInput
  } = useInput(task ? task.keyword : '', validators.keyword, texts.errors.keywordRequired, type)

  const {
    value: title,
    touch: titleTouch,
    error: titleError,
    handleInput: titleHandleInput
  } = useInput(task ? task.title : '', validators.title, texts.errors.titleRequired, type)

  const {
    value: description,
    handleInput: descriptionHandleInput
  } = useInput(task ? task.description : '')

  const {
    value: userPriority,
    touch: userPriorityTouch,
    error: userPriorityError,
    handleInput: userPriorityHandleInput
  } = useInput(task ? task.userPriority : '', validators.userPriority, texts.errors.priorityRequired, type)

  const {
    value: toDoDate,
    touch: toDoDateTouch,
    error: toDoDateError,
    handleInput: toDoDateHandleInput
  } = useInput(task ? dateToDateInputFormat(task.date.toDo) : '', validators.toDoDate, texts.errors.toDoDateRequired, type)

  const {
    value: limitDate,
    touch: limitDateTouch,
    error: limitDateError,
    handleInput: limitDateHandleInput
  } = useInput(task ? dateToDateInputFormat(task.date.limit) : '', validators.limitDate, texts.errors.limitDateRequired, type)

  const anyError = () => {
    const errors = [keywordError.active, titleError.active, userPriorityError.active, toDoDateError.active, limitDateError.active]
    return errors.some(x => x === true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const date = {toDo: toDoDate, limit: limitDate}
    const taskData = { keyword, title, description, userPriority, date}

    if (type === 'create') {
      TaskbleService.createTask(taskData)
      .then(() => {
        history.push('/')
      })
      /*.catch(error => {
        console.log(error.response.data.errors)
      })*/
    } else if (type === 'edit') {
      TaskbleService.updateTask(task.id, taskData)
      .then(() => {
        //setEdit(false)
      })
      /*.catch(error => {
        console.log(error.response.data.errors)
      })*/
    }
  }

  return (
    <div /*id='createTask'*/>

      <h3>{texts.headers.newTask}</h3>

      <form onSubmit={handleSubmit} /*id='form-container'*/>

        <Input type='text' name='keyword' placeholder={texts.inputs.keyword} disabled={type === 'view' ? false : true} {...keywordHandleInput} />
        {keywordTouch && keywordError.active && (
          <div>
            { keywordError.message }
          </div>
        )}

        <Input type='text' name='title' placeholder={texts.inputs.title} disabled={type === 'view' ? false : true} {...titleHandleInput} />
        {titleTouch && titleError.active && (
          <div>
            { titleError.message }
          </div>
        )}

        <Input type='text' name='description' placeholder={texts.inputs.description} disabled={type === 'view' ? false : true} {...descriptionHandleInput} />

        <div>
          <label>{texts.labels.priority}:</label>
          <select type='select' name='userPriority' disabled={type === 'view' ? false : true} {...userPriorityHandleInput} >
            <option>-</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          {userPriorityTouch && userPriorityError.active && (
            <div>
              { userPriorityError.message }
            </div>
          )}
        </div>

        <div>
          <label>{ texts.labels.dateToDo }:</label>
          <Input type='date' name='toDoDate' disabled={type === 'view' ? false : true} {...toDoDateHandleInput} />
          {toDoDateTouch && toDoDateError.active && (
            <div>
              { toDoDateError.message }
            </div>
          )}
        </div>

        <div>
          <label>{ texts.labels.limitDate }:</label>
          <Input type='date' name='limitDate' disabled={type === 'view' ? false : true} {...limitDateHandleInput} />
          {limitDateTouch && limitDateError.active && (
            <div>
              { limitDateError.message }
            </div>
          )}
        </div>

        {type === 'create' && (
          <Button disabled={anyError()} type="submit" variant="primary">
            { texts.buttons.createTask }
          </Button>
        )}

        {type === 'edit' && (
          <Button disabled={anyError()} type="submit" variant="primary">
            { texts.buttons.saveTask }
          </Button>
        )}

        {(type === 'create' || 'edit') && (
          <Button onClick={cancel} variant="primary">
            { texts.buttons.cancel }
          </Button>
        )}

      </form>

    </div>
  )
}

export default TaskForm