import React, { useContext, useState } from 'react'

import AuthContext from './AuthContext'

import { es, en } from '../assets/texts'
import { translateAPIErrors } from '../helpers/translateHelper'

const TranslateContext = React.createContext()

export const TranslateContextProvider = (props) => {
  const auth = useContext(AuthContext)

  const [currentLanguage, setCurrentLanguage] = useState(auth.currentUser ? auth.currentUser.language : window.navigator.language.slice(0,2))

  const setLanguage = (language) => {
    setCurrentLanguage(language)
  }

  const translateAPIerror = (error) => {
    return translateAPIErrors(error, currentLanguage)
  }

  const valueEs = {
    language: currentLanguage,
    setLanguage: setLanguage,
    translateAPIerror: translateAPIerror,
    texts: es
  }

  const valueEn = {
    language: currentLanguage,
    setLanguage: setLanguage,
    translateAPIerror: translateAPIerror,
    texts: en
  }

  if (currentLanguage === 'es') {
    return (
      <TranslateContext.Provider value={valueEs}>
        {props.children}
      </TranslateContext.Provider>
    )
  } else {
    return (
      <TranslateContext.Provider value={valueEn}>
        {props.children}
      </TranslateContext.Provider>
    )
  }
}

export const WithTranslateConsumer = (WrappedComponent) => (props) => (
  <TranslateContext.Consumer>
    {(translateProps) => (<WrappedComponent {...props} {...translateProps} />)}
  </TranslateContext.Consumer>
)

export default TranslateContext