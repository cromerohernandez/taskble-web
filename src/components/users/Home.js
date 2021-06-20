import React, { useContext, useEffect, useState } from 'react'

import TranslateContext from '../../contexts/TranslateContext'
import AuthContext from '../../contexts/AuthContext'
import CalendarContext from '../../contexts/CalendarContext'
import TaskbleService from '../../services/TaskbleService'

import Calendar from '../tasks/Calendar'
import TaskModal from '../tasks/TaskModal'

import { Button } from 'react-bootstrap'

const Home = () => {
  const auth = useContext(AuthContext)
  const { texts } = useContext(TranslateContext)
  const { removeCurrentFirstDayOfTheWeek } = useContext(CalendarContext)

  const [show, setShow] = useState(false)

   useEffect(() => {
    TaskbleService.userProfile()
  }, [auth.currentUser]) 

  const handleRequestNewPassword = () => {
    TaskbleService.requestNewPassword()
      .then(() => {
        //////////////////////////////////////////////// => ADD ALERT !!!!!
      })
      .catch(() => {
        //////////////////////////////////////////////// => ADD ALERT !!!!!
      })
  }

  const handleNewTask = () => {
    setShow(true)
  }

  const handleLogout = () => {
    auth.logout()
    removeCurrentFirstDayOfTheWeek()
  }

  return (
    <div>
      <Button onClick={handleRequestNewPassword} variant="primary">
        { texts.buttons.changePassword }
      </Button>

      <Button onClick={handleNewTask} variant="primary">
        { texts.headers.newTask }
      </Button>

      <Button onClick={handleLogout} variant="primary">
        ←
      </Button>

      <Calendar/>

      {show && (
        <TaskModal taskId={''} typeModal={'create'} show={show} setShow={setShow} />
      )}
    </div>
  )
}

export default Home