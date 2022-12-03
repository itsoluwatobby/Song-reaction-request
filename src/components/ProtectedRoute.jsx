import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const email = localStorage.getItem('email')
  
  return email ? <Outlet /> : <Navigate to='/' />
}
