import { axiosRequest } from '../app/axios'
import { UseDataContext } from '../context/UseDataContext'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export const RequestRoute = () => {
  const email = localStorage.getItem('email')
  const location = useLocation()

  const {loggedInUser, setUser, user} = UseDataContext()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'

  useEffect(() => {
    let isMounted = true
    const getUser = async() => {
      try{
        const res = await axiosRequest.get(`/${email}`)
        isMounted && setUser(res?.data)
      }
      catch(error){
        navigate('/', {state: {from}, replace: true} )
      }
    }
    !user && getUser()

    return () => isMounted = false

  }, [loggedInUser])
  
  return <Outlet />
}
