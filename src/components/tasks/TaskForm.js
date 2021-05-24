import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import TranslateContext from '../../contexts/TranslateContext'
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

const TaskForm = ({ task, edit }) => {
  const history = useHistory()
  const { texts } = useContext(TranslateContext)

  console.log(task.date.toDo)

  const {
    value: keyword,
    touch: keywordTouch,
    error: keywordError,
    handleInput: keywordHandleInput
  } = useInput(task ? task.keyword : '', validators.keyword, texts.errors.keywordRequired)

  const {
    value: title,
    touch: titleTouch,
    error: titleError,
    handleInput: titleHandleInput
  } = useInput(task ? task.title : '', validators.title, texts.errors.titleRequired)

  const {
    value: description,
    handleInput: descriptionHandleInput
  } = useInput(task ? task.description : '')

  const {
    value: userPriority,
    touch: userPriorityTouch,
    error: userPriorityError,
    handleInput: userPriorityHandleInput
  } = useInput(task ? task.userPriority : '', validators.userPriority, texts.errors.priorityRequired)

  const {
    value: toDoDate,
    touch: toDoDateTouch,
    error: toDoDateError,
    handleInput: toDoDateHandleInput
  } = useInput(task ? task.date.toDo : '', validators.toDoDate, texts.errors.toDoDateRequired)

  const {
    value: limitDate,
    touch: limitDateTouch,
    error: limitDateError,
    handleInput: limitDateHandleInput
  } = useInput(task ? task.date.limit : '', validators.limitDate, texts.errors.limitDateRequired)

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

  return (
    <div /*id='createTask'*/>

      <h3>{texts.headers.newTask}</h3>

      <form onSubmit={handleSubmit} /*id='form-container'*/>

        <Input type='text' name='keyword' placeholder={texts.inputs.keyword} disabled={!edit} {...keywordHandleInput} />
        {keywordTouch && keywordError.active && (
          <div>
            { keywordError.message }
          </div>
        )}

        <Input type='text' name='title' placeholder={texts.inputs.title} disabled={!edit} {...titleHandleInput} />
        {titleTouch && titleError.active && (
          <div>
            { titleError.message }
          </div>
        )}

        <Input type='text' name='description' placeholder={texts.inputs.description} disabled={!edit} {...descriptionHandleInput} />

        <div>
          <label>{texts.labels.priority}:</label>
          <select type='select' name='userPriority' disabled={!edit} {...userPriorityHandleInput} >
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
          <label>{texts.labels.dateToDo}:</label>
          <Input type='date' name='toDoDate' disabled={!edit} {...toDoDateHandleInput} />
          {toDoDateTouch && toDoDateError.active && (
            <div>
              { toDoDateError.message }
            </div>
          )}
        </div>

        <div>
          <label>{texts.labels.limitDate}:</label>
          <Input type='date' name='limitDate' disabled={!edit} {...limitDateHandleInput} />
          {limitDateTouch && limitDateError.active && (
            <div>
              { limitDateError.message }
            </div>
          )}
        </div>

        <button disabled={anyError()} type="submit" /*id='form-submitButton'*/>
          {texts.buttons.createTask}
        </button>

      </form>

    </div>
  )
}

export default TaskForm