import axios from 'axios'

const API_URL = 'https://sms-express-app-1-production-a843.up.railway.app/api/auth'

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials)
  return response.data
}

export const registerUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/register`, credentials)
  return response.data
}

export const verifyOtp = async (payload) => {
  const response = await axios.post(`${API_URL}/verify-email`, payload)
  return response.data
}
