import React from 'react'
import { useHistory } from 'react-router-dom'

import TaskbleService from '../../services/TaskbleService'

import useInput from '../../hooks/useInput'

import Input from '../UI/Input'

const validators = {
  keyword: val => val && val.length <= 10,
  title: val => val,
  userPriority: val => 1 <= val && val <= 5,
  toDoDate: val => val,
  limitDate: val => val
}

const errorMessages = {
  keyword: 'keyword is required and it can contains 10 chars maximun',
  title: 'title is required',
  userPriority: 'priority is required',
  toDoDate: 'toDoDate is required',
  limitDate: 'limitDate is required'
}

const TaskForm = () => {
  const history = useHistory()

  const {
    value: keyword,
    touch: keywordTouch,
    error: keywordError,
    handleInput: keywordHandleInput
  } = useInput('', validators.keyword, errorMessages.keyword)

  const {
    value: title,
    touch: titleTouch,
    error: titleError,
    handleInput: titleHandleInput
  } = useInput('', validators.title, errorMessages.title)

  const {
    value: description,
    handleInput: descriptionHandleInput
  } = useInput('')

  const {
    value: userPriority,
    touch: userPriorityTouch,
    error: userPriorityError,
    handleInput: userPriorityHandleInput
  } = useInput('', validators.userPriority, errorMessages.userPriority)

  const {
    value: toDoDate,
    touch: toDoDateTouch,
    error: toDoDateError,
    handleInput: toDoDateHandleInput
  } = useInput('', validators.toDoDate, errorMessages.toDoDate)

  const {
    value: limitDate,
    touch: limitDateTouch,
    error: limitDateError,
    handleInput: limitDateHandleInput
  } = useInput('', validators.limitDate, errorMessages.limitDate)

  const anyError = () => {
    const errors = [keywordError.active, titleError.active, userPriorityError.active, toDoDateError.active, limitDateError.active]
    return errors.some(x => x === true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const date = {toDo: toDoDate, limit: limitDate}
    const taskData = { keyword, title, description, userPriority, date}

    TaskbleService.createTask(taskData)
      .then(() => {
        history.push('/')
      })
      /*.catch(error => {
        console.log(error.response.data.errors)
      })*/
  }

  return(
    <div /*id='createTask'*/>

      <h3>New Task</h3>

      <form onSubmit={handleSubmit} /*id='form-container'*/>

        <Input type='text' name='keyword' {...keywordHandleInput} />
        {keywordTouch && keywordError.active && (
          <div>
            { keywordError.message }
          </div>
        )}

        <Input type='text' name='title' {...titleHandleInput} />
        {titleTouch && titleError.active && (
          <div>
            { titleError.message }
          </div>
        )}

        <Input type='text' name='description' {...descriptionHandleInput} />

        <div>
          <label>priority:</label>
          <select type='select' name='userPriority' {...userPriorityHandleInput} >
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
          <label>date to do:</label>
          <Input type='date' name='toDoDate' {...toDoDateHandleInput} />
          {toDoDateTouch && toDoDateError.active && (
            <div>
              { toDoDateError.message }
            </div>
          )}
        </div>

        <div>
          <label>limit date:</label>
          <Input type='date' name='limitDate' {...limitDateHandleInput} />
          {limitDateTouch && limitDateError.active && (
            <div>
              { limitDateError.message }
            </div>
          )}
        </div>

        <button disabled={anyError()} type="submit" /*id='form-submitButton'*/>
          Create Task
        </button>

      </form>

    </div>
  )
}

export default TaskForm