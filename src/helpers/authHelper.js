export const checkPasswordFormat = (password) => {
  if (password.length > 0) {
    var check = {
      uppercase: false,
      lowercase: false,
      number: false,
      symbol: false
    }
    for (var i = 0; i<password.length; i++) {
      if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
        check.uppercase = true
      } else if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
        check.lowercase = true
      } else if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
        check.number = true
      } else {
        check.symbol = true
      }
    }
    return (check.uppercase === true && check.lowercase === true && check.number === true && check.symbol === true) ? true : false
  } else {
    return false
  }
}