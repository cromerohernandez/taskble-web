import React, { useContext } from 'react'

import CalendarContext from '../../contexts/CalendarContext'

import Week from './Week'

import { oneDayInMiliseconds } from '../../helpers/tasksHelper'

import '../../stylesheets/tasks/Calendar.css'

const Calendar = () => {
  const { currentFirstDayOfTheWeek, previousWeek, nextWeek} = useContext(CalendarContext)

  const handlePreviousWeek = () => previousWeek()

  const handleNextWeek = () => nextWeek()

  return (
    <div>
      {currentFirstDayOfTheWeek && (
       <div>
          <button onClick={handlePreviousWeek}>←</button>
          <button onClick={handleNextWeek}>→</button>

          <div id='weeksContainer'>
            <Week firstDay={currentFirstDayOfTheWeek - (oneDayInMiliseconds * 7)}/>
            <Week firstDay={currentFirstDayOfTheWeek}/>
            <Week firstDay={currentFirstDayOfTheWeek + (oneDayInMiliseconds * 7)}/>
          </div>
        </div>
      )}
    </div>
  )
}

export default Calendar