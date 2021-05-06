export const getFirstDayOfTheWeek = (dateInMilliseconds, language) => {
  const weekday = (new Date(dateInMilliseconds)).getDay()
  const oneDayInMiliseconds = 24 * 60 * 60 * 1000
  let firstWeekDay = null

  switch (language) {
    case 'en':
      firstWeekDay = 0
      break
    case 'es':
      firstWeekDay = 1
      break
    default:
      firstWeekDay = 0
  }

  return dateInMilliseconds - ((weekday - firstWeekDay) * oneDayInMiliseconds)
}

export const sortByFinalPriority = (tasks) => {
  return tasks.sort((a, b) => b.finalPriority - a.finalPriority)
}