import React from 'react'
import { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

export const ProtectedRoute = () => {
  const user = localStorage.getItem('email')
  const location = useLocation()

  return user 
      ? <Outlet /> 
          : <Navigate to='/' state={{from: location}} replace />
}
