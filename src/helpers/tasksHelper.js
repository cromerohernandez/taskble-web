export const dateToDateInputFormat = (date) => {
  return date.substr(0, 10)
}

export const oneDayInMiliseconds = 24 * 60 * 60 * 1000

export const getFirstDayOfTheWeek = (dateInMilliseconds, language) => {
  const weekday = (new Date(dateInMilliseconds)).getDay()
  let prevWeek = (weekday === 0) && (language === 'es') ? 7 : 0
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

  return dateInMilliseconds - ((weekday + prevWeek - firstWeekDay) * oneDayInMiliseconds)
}

export const sortByFinalPriority = (tasks) => {
  let doneTasks = []
  let pendingTasks = []

  for (let i = 0; i < tasks.length; i++) {
    tasks[i].done ? doneTasks.push(tasks[i]) : pendingTasks.push(tasks[i])
  }

  doneTasks.sort((a, b) => b.finalPriority - a.finalPriority)
  pendingTasks.sort((a, b) => b.finalPriority - a.finalPriority)
  
  return [...pendingTasks, ...doneTasks]
}