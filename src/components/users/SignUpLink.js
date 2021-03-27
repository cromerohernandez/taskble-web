import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import TranslateContext from '../../contexts/TranslateContext'

const SignUpLink = () => {
  const { texts } = useContext(TranslateContext)

  return (
    <div>
      <h5>{texts.headers.dontHaveAccount}
        <Link to={{pathname:'/signup'}}> {texts.headers.signUpForTaskble}</Link>
      </h5>
    </div>
  )
}

export default SignUpLink