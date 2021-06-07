import React, { useContext, useState } from 'react'

import AuthContext from './AuthContext'

import { getFirstDayOfTheWeek, oneDayInMiliseconds } from '../helpers/tasksHelper'

const CalendarContext = React.createContext()

export const CalendarContextProvider = (props) => {
  const auth = useContext(AuthContext)

  const [currentFirstDayOfTheWeek, setCurrentFirstDayOfTheWeek] = useState(null)

  const setToday = (() => {
    setCurrentFirstDayOfTheWeek(getFirstDayOfTheWeek(Date.now(), auth.currentUser.language))
  })
  
  const previousWeek = (() => {
    setCurrentFirstDayOfTheWeek(currentFirstDayOfTheWeek - (oneDayInMiliseconds * 7))
  })

  const nextWeek = (() => {
    setCurrentFirstDayOfTheWeek(currentFirstDayOfTheWeek + (oneDayInMiliseconds * 7))
  })

  const value = {
    currentFirstDayOfTheWeek: currentFirstDayOfTheWeek,
    setToday: setToday,
    previousWeek: previousWeek,
    nextWeek: nextWeek
  }

  return (
    <CalendarContext.Provider value={value}>
      {props.children}
    </CalendarContext.Provider>
  )
}

export const WithCalendarConsumer = (WrappedComponent) => (props) => (
  <CalendarContext.Consumer>
    {(calendarProps) => (<WrappedComponent {...props} {...calendarProps} />)}
  </CalendarContext.Consumer>
)

export default CalendarContext