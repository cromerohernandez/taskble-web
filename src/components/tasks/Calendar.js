import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'

import useModal from '../../hooks/useModal'

import TaskbleService from '../../services/TaskbleService'

import Modal from '../UI/Modal'
import TaskCard from './TaskCard'
import TaskDetail from './TaskDetail'

const Calendar = () => {
  const [tasks, setTasks] = useState([])

  const { show, showModal, hideModal } = useModal()

  const getTasks = useCallback(() => {
    TaskbleService.userProfile()
      .then(user => {
        setTasks(user.tasks)
      })
      //.catch
  }, [])

  useEffect(() => {
    getTasks()
  }, [getTasks])

  return (
    <div>
      {tasks.map((task, i) => (
        <Link
          to={`/tasks/${task.id}`}
          onClick={() => {
            //showModal()
            return (
              //<Modal show={show} handleClose={hideModal}>
                <TaskDetail/>
              //</Modal>
            )
          }}
          key={i}
        >
          <TaskCard task={task} onClick={() => {
            showModal()
            return (
              <Modal show={show} handleClose={hideModal}>
                <TaskDetail/>
              </Modal>
            )
          }}/>
        </Link>
      ))}
    </div>
  )
}

export default Calendar

/*<div>
  {tasks.map((task, i) => (
    <Link to={`/tasks/${task.id}`}>
      <TaskCard task={task} key={i}/>
    </Link>
  ))}
</div>*/