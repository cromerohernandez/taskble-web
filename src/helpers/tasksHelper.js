export const sortByFinalPriority = (tasks) => {
  return tasks.sort((a, b) => b.finalPriority - a.finalPriority)
}