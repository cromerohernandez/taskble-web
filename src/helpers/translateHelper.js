export const translateAPIErrors = (error, language) => {
  let translatedError = error

  /*if (language !== 'en') {
    Object.getOwnPropertyNames(en.a).forEach(key => {
      if (en.a[key] === error) {
        translatedError = [language].a[key]
      }
    })
  }*/

  return translatedError
}