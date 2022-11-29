import {createContext, useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export const DataContext = createContext({})

export const DataContextProvider = ({children}) => {
  const [isRequest, setIsRequest] = useState(false)
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('email', email)
    navigate('/song/request')
  }

  const value = {
    isRequest, setIsRequest, email, setEmail, handleSubmit
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}