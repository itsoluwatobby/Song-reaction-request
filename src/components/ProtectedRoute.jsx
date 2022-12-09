import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const ProtectedRoute = () => {
  const user = localStorage.getItem('email')
  const location = useLocation()

  return (
    user 
      ? <Outlet /> 
        : <Navigate to='/' state={{from: location}} replace />
  )
}
