import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import TranslateContext from '../../contexts/TranslateContext'

const Validation = () => {
  const { texts } = useContext(TranslateContext)

  return (
    <div id='validation-container'>
      <h6>{texts.headers.haveSentEmailToConfirmAccount}</h6>
      <h5>{texts.headers.checkItAnd} <Link to="/">{texts.headers.logIn}</Link> {texts.headers.toStart}</h5>
    </div>
  )
}

export default Validation