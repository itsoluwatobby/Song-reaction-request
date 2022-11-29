import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const isEmail = localStorage.getItem('email')
  
  return isEmail !== null ? <Outlet /> : <Navigate to='/' />
}
