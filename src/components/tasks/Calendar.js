import React, { useState, useCallback, useEffect } from 'react'
//import { Link } from 'react-router-dom'

//import useModal from '../../hooks/useModal'

import TaskbleService from '../../services/TaskbleService'

//import Modal from '../UI/Modal'
//import TaskCard from './TaskCard'
//import TaskDetail from './TaskDetail'
import Day from './Day'

const Calendar = () => {
  const [days, setDays] = useState([])

  //const { show, showModal, hideModal } = useModal()

  const getDays = useCallback(() => {
    const today = new Date(Date.now())
    const tomorrow = new Date(Date.now() + (86400000 * 1))
    
    setDays([today, tomorrow])
  }, [])

  useEffect(() => {
    getDays()
  }, [getDays])

  return (
    <div>
      {days.map((day, i) => (      
        <Day date={day} key={i}/>
      ))}
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