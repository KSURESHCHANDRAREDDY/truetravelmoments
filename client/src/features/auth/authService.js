import axios from '../../utils/axiosConfig'

// Signup a new user
const signup = async (userData) => {
  const response = await axios.post('/auth/signup', userData)
  return response.data
}

// Login user and store cookie token automatically
const login = async (userData) => {
  const response = await axios.post('/auth/login', userData)
  return response.data
}

// Logout user (clears cookie from server)
const logout = async () => {
  const response = await axios.post('/auth/logout')
  return response.data
}

const authService = {
  signup,
  login,
  logout,
}

export default authService
