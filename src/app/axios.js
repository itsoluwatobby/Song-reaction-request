import axios from 'axios'

export const axiosRequest = axios.create({
  baseURL: 'https://graciereacts-api.onrender.com/user',
  headers: { 'Content-Type': 'application/json' }
})