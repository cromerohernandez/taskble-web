import React from 'react'

const TaskCard = ({ task }) => {
  return (
    <div>
      <h6>{task.title}</h6>
      <h6>{task.finalPriority}</h6>
    </div>
  )
}

export default TaskCard