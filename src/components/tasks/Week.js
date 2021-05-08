import React, { useState, useCallback, useEffect } from 'react'

import Day from './Day'

import '../../stylesheets/tasks/Week.css'

const oneDayInMiliseconds = 24 * 60 * 60 * 1000

const Week = ({ firstDay }) => {
  const [days, setDays] = useState([])

  const getDays = useCallback(() => {
    let updatedDays = []
    
    for (let i = 0; i < 7; i++) {
      updatedDays.push(new Date(firstDay + (oneDayInMiliseconds * i)))
    }

    setDays(updatedDays)
  }, [firstDay])

  useEffect(() => {
    getDays()
  }, [getDays])

  return (
    <div id='weekContainer'>
      {days.map((day, i) => (      
        <Day date={day} key={i}/>
      ))}
    </div>
  )
}
export default Week