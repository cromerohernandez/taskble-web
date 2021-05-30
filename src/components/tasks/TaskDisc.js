import React, { useContext, useState, useCallback, useEffect } from 'react'

import TaskModal from './TaskModal'

const TaskDisc = ({ task }) => {
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)

  return (
    <div>
      {task && (
        <div onClick={handleShow}>
          <h6>{task.title}</h6>
          <h6>{task.finalPriority}</h6>
        </div>
      )}
      
      {show && (
        <TaskModal taskId={task.id} show={show} setShow={setShow}/>
      )}
    </div> 
  )
}

export default TaskDisc