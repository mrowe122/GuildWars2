export const validateEmail = e => {
  if (!e) {
    return 'required'
  }
  return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e) ? 'invalid email address' : null
}

export const validatePassword = p => {
  if (!p) {
    return 'required'
  }
  return p.length < 6 ? 'password not long enough' : null
}

export const validateConfirmPassword = (p1, p2) => p1 === p2 ? null : 'passwords do not match'

export const validateApiKey = s => s.length === 72 ? null : 'invalid api key'
