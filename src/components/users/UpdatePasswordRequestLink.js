import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import TranslateContext from '../../contexts/TranslateContext'

const UpdatePasswordRequestLink = () => {
  const { texts } = useContext(TranslateContext)

  return (
    <div>
      <h5>
        <Link to={{pathname:'/passwordrequest'}}>{texts.headers.forgotPassword}</Link>
      </h5>
    </div>
  )
}

export default UpdatePasswordRequestLink