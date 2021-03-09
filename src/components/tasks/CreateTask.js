import React, { useContext } from 'react'

import AuthContext from '../../contexts/AuthContext'
import TaskbleService from '../../services/TaskbleService'

import useInput from '../../hooks/useInput'

import Input from '../UI/Input'

const validators = {
  keyword: val => val.length <= 10,
  title: val => val,
  userPriority: val => val,
  toDoDate: val => val,
  limitDate: val => val
}

const errorMessages = {
  keyword: 'keyword can contains 10 chars maximun',
  title: 'title is required',
  userPriority: 'userPriority is required',
  toDoDate: 'toDoDate is required',
  limitDate: 'limitDate is required'
}

const CreateTask = () => {
  const auth = useContext(AuthContext)

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
      /*.then(() => {

      })
      .catch(error => {

      })*/
  }

  return(
    <div /*id="createTask"*/>

      <h3>New Task</h3>

      <form onSubmit={handleSubmit} /*id="form-container"*/>

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

        <Input type='range' min='1' max='5' name='userPriority' placeholder='priority' {...userPriorityHandleInput} />
        {userPriorityTouch && userPriorityError.active && (
          <div>
            { userPriorityError.message }
          </div>
        )}

        <Input type='date' name='toDoDate' placeholder='to do' {...toDoDateHandleInput} />
        {toDoDateTouch && toDoDateError.active && (
          <div>
            { toDoDateError.message }
          </div>
        )}

        <Input type='date' name='limitDate' placeholder='limit' {...limitDateHandleInput} />
        {limitDateTouch && limitDateError.active && (
          <div>
            { limitDateError.message }
          </div>
        )}

        <button disabled={anyError()} type="submit" /*id="form-submitButton"*/>
          Create Task
        </button>

      </form>

    </div>
  )
}

export default CreateTask