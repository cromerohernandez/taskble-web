import React from 'react'

const TaskCard = ({ task }) => {
  const { title, finalPriority } = task

  return (
    <div>
      <h6>{title}</h6>
      <h6>{finalPriority}</h6>
    </div>
  )
}

export default TaskCard