import React, { useState } from 'react'

import { getFirstDayOfTheWeek, oneDayInMiliseconds } from '../helpers/tasksHelper'

const CalendarContext = React.createContext()

export const CalendarContextProvider = (props) => {
  const [currentFirstDayOfTheWeek, setCurrentFirstDayOfTheWeek] = useState(parseInt(localStorage.getItem('currentFirstDayOfTheWeek')))

  const updateCurrentFirstDayOfTheWeek = ((dateInMilliseconds) => {
    const updatedFirstDayOfTheWeek = dateInMilliseconds ? dateInMilliseconds.toString() : null

    localStorage.setItem('currentFirstDayOfTheWeek', updatedFirstDayOfTheWeek)
    setCurrentFirstDayOfTheWeek(parseInt(updatedFirstDayOfTheWeek))
  })

  const setToday = ((language) => {
    updateCurrentFirstDayOfTheWeek(getFirstDayOfTheWeek(Date.now(), language))
  })

  const removeCurrentFirstDayOfTheWeek = (() => {
    updateCurrentFirstDayOfTheWeek()
    localStorage.removeItem('currentFirstDayOfTheWeek')
  })
  
  const previousWeek = (() => {
    updateCurrentFirstDayOfTheWeek(currentFirstDayOfTheWeek - (oneDayInMiliseconds * 7))
  })

  const nextWeek = (() => {
    updateCurrentFirstDayOfTheWeek(currentFirstDayOfTheWeek + (oneDayInMiliseconds * 7))
  })

  const value = {
    currentFirstDayOfTheWeek: currentFirstDayOfTheWeek,
    updateCurrentFirstDayOfTheWeek: updateCurrentFirstDayOfTheWeek,
    setToday: setToday,
    removeCurrentFirstDayOfTheWeek: removeCurrentFirstDayOfTheWeek,
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