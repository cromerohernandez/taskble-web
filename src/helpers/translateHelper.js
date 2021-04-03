import { es, en } from '../assets/texts'

export const translateAPIErrors = (error, language) => {
  let translatedError = error

  if (language === 'es') {
    Object.getOwnPropertyNames(en.APIErrors).forEach(key => {
      if (en.APIErrors[key] === error) {
        translatedError = es.APIErrors[key]
      }
    })
  }

  return translatedError
}