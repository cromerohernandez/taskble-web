import React from 'react'
import { Link } from 'react-router-dom'

const TaskCard = ({ task }) => {
  return(
    <div>
      <Link to={`/tasks/${task.id}`}>
        <h6>{task.title}</h6>
      </Link>
    </div>
  )
}

export default TaskCard