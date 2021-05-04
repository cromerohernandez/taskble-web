import React, { useState, useCallback, useEffect } from 'react'
//import { Link } from 'react-router-dom'

//import useModal from '../../hooks/useModal'

import TaskbleService from '../../services/TaskbleService'

//import Modal from '../UI/Modal'
//import TaskCard from './TaskCard'
//import TaskDetail from './TaskDetail'
import Day from './Day'

const Calendar = () => {
  const [currentSunday, setCurrentSunday] = useState(Date.now())
  const [currentDays, setCurrentDays] = useState([])


  //const { show, showModal, hideModal } = useModal()

  const getCurrentDays = useCallback(() => {
    let days = []
    
    for (let i = 0; i < 7; i++) {
      days.push(new Date(currentSunday + (24 * 60 * 60 * 1000 * i)))
    }

    setCurrentDays(days)
  }, [currentSunday])

  useEffect(() => {
    getCurrentDays()
  }, [getCurrentDays])

  const handlePreviousDays = (() => {
    setCurrentSunday(currentSunday - (24 * 60 * 60 * 1000 * 7))
  })

  const handleNextDays = (() => {
    setCurrentSunday(currentSunday + (24 * 60 * 60 * 1000 * 7))
  })

  return (
    <div>
      {currentDays.map((day, i) => (      
        <Day date={day} key={i}/>
      ))}

      <button onClick={handlePreviousDays}>←</button>
      <button onClick={handleNextDays}>→</button>
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