import axios from 'axios'

export const axiosRequest = axios.create({
  baseURL: 'http://localhost:4000/user',
  headers: { 'Content-Type': 'application/json' }
})