import React, { useContext, useState, useCallback, useEffect } from 'react'
//import { Link } from 'react-router-dom'

//import useModal from '../../hooks/useModal'

import AuthContext from '../../contexts/AuthContext'
import TaskbleService from '../../services/TaskbleService'

//import Modal from '../UI/Modal'
//import TaskCard from './TaskCard'
//import TaskDetail from './TaskDetail'
import Day from './Day'

import { getFirstDayOfTheWeek } from '../../helpers/tasksHelper'

const oneDayInMiliseconds = 24 * 60 * 60 * 1000

const Calendar = () => {
  const auth = useContext(AuthContext)

  const [currentFirstDayOfTheWeek, setCurrentFirstDayOfTheWeek] = useState(getFirstDayOfTheWeek(Date.now(), auth.currentUser.language))
  const [currentDays, setCurrentDays] = useState([])

  //const { show, showModal, hideModal } = useModal()

  const getCurrentDays = useCallback(() => {
    let days = []
    
    for (let i = 0; i < 7; i++) {
      days.push(new Date(currentFirstDayOfTheWeek + (oneDayInMiliseconds * i)))
    }

    setCurrentDays(days)
  }, [currentFirstDayOfTheWeek])

  useEffect(() => {
    getCurrentDays()
  }, [getCurrentDays])

  const handlePreviousDays = (() => {
    setCurrentFirstDayOfTheWeek(currentFirstDayOfTheWeek - (oneDayInMiliseconds * 7))
  })

  const handleNextDays = (() => {
    setCurrentFirstDayOfTheWeek(currentFirstDayOfTheWeek + (oneDayInMiliseconds * 7))
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