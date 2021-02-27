import React from 'react'
import { Link } from 'react-router-dom'

const Validation = () => {
  return(
    <div id='validation-container'>
      <h6>We have sent you an email to confirm your account</h6>
      <h5>Check it and <Link to="/"> log in </Link> to start!</h5>
    </div>
  )
}

export default Validation