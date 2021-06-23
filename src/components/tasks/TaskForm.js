import React, { useContext } from 'react'

import TranslateContext from '../../contexts/TranslateContext'
import TaskbleService from '../../services/TaskbleService'

import useInput from '../../hooks/useInput'

import Input from '../UI/Input'

import { dateToDateInputFormat } from '../../helpers/tasksHelper'

const validators = {
  keyword: val => val && val.length <= 10,
  title: val => val,
  userPriority: val => 1 <= val && val <= 5,
  toDoDate: val => val,
  limitDate: val => val
}

const TaskForm = ({ task, stateForm, cancel, close }) => {
  const { texts } = useContext(TranslateContext)

  const {
    value: keyword,
    touch: keywordTouch,
    error: keywordError,
    handleInput: keywordHandleInput
  } = useInput(task ? task.keyword : '', validators.keyword, texts.errors.keywordRequired, stateForm)

  const {
    value: title,
    touch: titleTouch,
    error: titleError,
    handleInput: titleHandleInput
  } = useInput(task ? task.title : '', validators.title, texts.errors.titleRequired, stateForm)

  const {
    value: description,
    handleInput: descriptionHandleInput
  } = useInput(task ? task.description : '')

  const {
    value: userPriority,
    touch: userPriorityTouch,
    error: userPriorityError,
    handleInput: userPriorityHandleInput
  } = useInput(task ? task.userPriority : '', validators.userPriority, texts.errors.priorityRequired, stateForm)

  const {
    value: toDoDate,
    touch: toDoDateTouch,
    error: toDoDateError,
    handleInput: toDoDateHandleInput
  } = useInput(task ? dateToDateInputFormat(task.date.toDo) : '', validators.toDoDate, texts.errors.toDoDateRequired, stateForm)

  const {
    value: limitDate,
    touch: limitDateTouch,
    error: limitDateError,
    handleInput: limitDateHandleInput
  } = useInput(task ? dateToDateInputFormat(task.date.limit) : '', validators.limitDate, texts.errors.limitDateRequired, stateForm)

  /*const anyError = () => {
    const errors = [keywordError.active, titleError.active, userPriorityError.active, toDoDateError.active, limitDateError.active]
    return errors.some(x => x === true)
  }*/

  const handleSubmit = (event) => {
    event.preventDefault()

    const date = {toDo: toDoDate, limit: limitDate}
    const taskData = { keyword, title, description, userPriority, date}

    if (stateForm === 'create') {
      TaskbleService.createTask(taskData)
      .then(() => {
        close()
      })
      /*.catch(error => {
        console.log(error.response.data.errors)
      })*/
    } else if (stateForm === 'edit') {
      TaskbleService.updateTask(task.id, taskData)
      .then(() => {
        cancel()
      })
      /*.catch(error => {
        console.log(error.response.data.errors)
      })*/
    }
  }

  return (
    <div>
      <form id='taskForm' onSubmit={handleSubmit} >
        <Input type='text' name='keyword' placeholder={texts.inputs.keyword} disabled={stateForm === 'view' ? true : false} {...keywordHandleInput} />
        {keywordTouch && keywordError.active && (
          <div>
            { keywordError.message }
          </div>
        )}

        <Input type='text' name='title' placeholder={texts.inputs.title} disabled={stateForm === 'view' ? true : false} {...titleHandleInput} />
        {titleTouch && titleError.active && (
          <div>
            { titleError.message }
          </div>
        )}

        <Input type='text' name='description' placeholder={texts.inputs.description} disabled={stateForm === 'view' ? true : false} {...descriptionHandleInput} />

        <div>
          <label>{texts.labels.priority}:</label>
          <select type='select' name='userPriority' disabled={stateForm === 'view' ? true : false} {...userPriorityHandleInput} >
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
          <Input type='date' name='toDoDate' disabled={stateForm === 'view' ? true : false} {...toDoDateHandleInput} />
          {toDoDateTouch && toDoDateError.active && (
            <div>
              { toDoDateError.message }
            </div>
          )}
        </div>

        <div>
          <label>{ texts.labels.limitDate }:</label>
          <Input type='date' name='limitDate' disabled={stateForm === 'view' ? true : false} {...limitDateHandleInput} />
          {limitDateTouch && limitDateError.active && (
            <div>
              { limitDateError.message }
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default TaskForm