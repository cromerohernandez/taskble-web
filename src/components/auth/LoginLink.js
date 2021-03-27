import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import TranslateContext from '../../contexts/TranslateContext'

const LoginLink = () => {
  const { texts } = useContext(TranslateContext)

  return (
    <div>
      <h5>{texts.headers.goBackTo}
        <Link to={{pathname:'/login'}}> {texts.headers.login}</Link>
      </h5>
    </div>
  )
}

export default LoginLink