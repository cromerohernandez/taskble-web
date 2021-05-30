import React, { useContext, useState } from 'react'

import AuthContext from '../../contexts/AuthContext'

import Week from './Week'

import { getFirstDayOfTheWeek } from '../../helpers/tasksHelper'

import '../../stylesheets/tasks/Calendar.css'

const oneDayInMiliseconds = 24 * 60 * 60 * 1000

const Calendar = () => {
  const auth = useContext(AuthContext)

  const [currentFirstDayOfTheWeek, setCurrentFirstDayOfTheWeek] = useState(getFirstDayOfTheWeek(Date.now(), auth.currentUser.language))

  const handlePreviousDays = (() => {
    setCurrentFirstDayOfTheWeek(currentFirstDayOfTheWeek - (oneDayInMiliseconds * 7))
  })

  const handleNextDays = (() => {
    setCurrentFirstDayOfTheWeek(currentFirstDayOfTheWeek + (oneDayInMiliseconds * 7))
  })

  return (
    <div>
      <button onClick={handlePreviousDays}>←</button>
      <button onClick={handleNextDays}>→</button>

      <div id='weeksContainer'>
        <Week firstDay={currentFirstDayOfTheWeek - (oneDayInMiliseconds * 7)}/>
        <Week firstDay={currentFirstDayOfTheWeek}/>
        <Week firstDay={currentFirstDayOfTheWeek + (oneDayInMiliseconds * 7)}/>
      </div>
    </div>
  )
}

export default Calendar