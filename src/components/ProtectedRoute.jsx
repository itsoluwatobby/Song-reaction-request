import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const user = localStorage.getItem('userRequest')
  
  return user ? <Outlet /> : <Navigate to='/' />
}
