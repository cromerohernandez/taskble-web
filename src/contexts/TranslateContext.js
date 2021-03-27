import React, { useState } from 'react'

import { es, en } from '../helpers/translateHelper'

const TranslateContext = React.createContext()

export const TranslateContextProvider = (props) => {
  const [currentLanguage, setCurrentLanguage] = useState(window.navigator.language)

  const setLanguage = (language) => {
    setCurrentLanguage(language)
  }

  const valueEs = {
    language: currentLanguage,
    setLanguage: setLanguage,
    texts: es
  }

  const valueEn = {
    language: currentLanguage,
    setLanguage: setLanguage,
    texts: en
  }

  if (currentLanguage === 'es-ES') {
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