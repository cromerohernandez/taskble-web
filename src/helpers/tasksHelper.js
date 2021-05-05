export const getFirstDayOfTheWeek = (dateInMilliseconds) => {
  const weekday = (new Date(dateInMilliseconds)).getDay()
  const oneDayInMiliseconds = 24 * 60 * 60 * 1000

  return dateInMilliseconds - (weekday * oneDayInMiliseconds)
}

export const sortByFinalPriority = (tasks) => {
  return tasks.sort((a, b) => b.finalPriority - a.finalPriority)
}