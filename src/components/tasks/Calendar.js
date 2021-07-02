import React, { useContext } from 'react'

import TranslateContext from '../../contexts/TranslateContext'
import CalendarContext from '../../contexts/CalendarContext'

import Week from './Week'

import { oneDayInMiliseconds } from '../../helpers/tasksHelper'

import '../../stylesheets/tasks/Calendar.css'

const Calendar = () => {
  const { texts } = useContext(TranslateContext)
  const { currentFirstDayOfTheWeek, setToday, previousWeek, nextWeek } = useContext(CalendarContext)

  const handleToday = () => setToday()

  const handlePreviousWeek = () => previousWeek()

  const handleNextWeek = () => nextWeek()

  return (
    <div>
      {currentFirstDayOfTheWeek && (
       <div>
            <button onClick={handleToday}>{ texts.buttons.today }</button>

          <div>
            <button onClick={handlePreviousWeek}>←</button>
            <button onClick={handleNextWeek}>→</button>
          </div>

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