import React, { useState, useCallback, useEffect } from 'react'
//import { Link } from 'react-router-dom'

//import useModal from '../../hooks/useModal'

import TaskbleService from '../../services/TaskbleService'

//import Modal from '../UI/Modal'
//import TaskCard from './TaskCard'
//import TaskDetail from './TaskDetail'
import Day from './Day'

const Calendar = () => {
  //const [tasks, setTasks] = useState([])

  //const { show, showModal, hideModal } = useModal()

  /*const getTasks = useCallback(() => {
    TaskbleService.userProfile()
      .then(user => {
        setTasks(user.tasks)
      })
      //.catch
  }, [])*/

  /*useEffect(() => {
    getTasks()
  }, [getTasks])*/

  return (
    <div>
      <div>
        <h4>{ `${(new Date(Date.now())).getDate()} · ${(new Date(Date.now())).getMonth() + 1} · ${(new Date(Date.now())).getFullYear()}`}</h4>
        <Day date={Date.now()}/>
      </div>

      <div>
        <h4>{ `${(new Date(Date.now() + (86400000 * 1))).getDate()} · ${(new Date(Date.now() + (86400000 * 1))).getMonth() + 1} · ${(new Date(Date.now() + (86400000 * 1))).getFullYear()}`}</h4>
        <Day date={Date.now() + (86400000 * 1)}/>
      </div>

      <div>
        <h4>{ `${(new Date(Date.now() + (86400000 * 2))).getDate()} · ${(new Date(Date.now() + (86400000 * 2))).getMonth() + 1} · ${(new Date(Date.now() + (86400000 * 2))).getFullYear()}`}</h4>
        <Day date={Date.now() + (86400000 * 2)}/>
      </div>

      <div>
        <h4>{ `${(new Date(Date.now() + (86400000 * 3))).getDate()} · ${(new Date(Date.now() + (86400000 * 3))).getMonth() + 1} · ${(new Date(Date.now() + (86400000 * 3))).getFullYear()}`}</h4>
        <Day date={Date.now() + (86400000 * 3)}/>
      </div>

      <div>
        <h4>{ `${(new Date(Date.now() + (86400000 * 4))).getDate()} · ${(new Date(Date.now() + (86400000 * 4))).getMonth() + 1} · ${(new Date(Date.now() + (86400000 * 4))).getFullYear()}`}</h4>
        <Day date={Date.now() + (86400000 * 4)}/>
      </div>

    </div>
  )
}

export default Calendar

/*    <div>
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
    </div>*/