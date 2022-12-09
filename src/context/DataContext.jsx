import {createContext, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { axiosRequest } from '../app/axios'

export const DataContext = createContext({})

export const DataContextProvider = ({children}) => {
  const [user, setUser] = useState({})
  const [loggedInUser, setLoggedInUser] = useState('')
  const [email, setEmail] = useState('')
  const [request, setRequest] = useState([])
  const [completedRequest, setCompletedRequest] = useState([])
  const [newRequest, setNewRequest] = useState({})
  const [requestTitle, setRequestTitle] = useState('')
  const [requestLink, setRequestLink] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [requestId, setRequestId] = useState('')
  const [editLink, setEditLink] = useState('')
  const [search, setSearch] = useState('')
  const [editPage, setEditPage] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [searchItem, setSearchItem] = useState(false);
  const [reload, setReload] = useState(1);
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)
  const [loading1, setLoading1] = useState(null)
  const [error1, setError1] = useState(null)

  const location = useLocation()
  //const from = location.state?.from?.pathname || '/'

  const navigate = useNavigate()

  const refetch = () => setReload(prev => prev + 1)

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading('Signing In...')
    setError(null)
    try{
      const res = await axiosRequest.post('/new', {
        emailAddress: email
      })
      setLoggedInUser(res?.data)
      navigate('/song/request')
      localStorage.setItem('email', res?.data)
      setEmail('')
    }catch(error){
    !error?.response && setError('No server response')
    error?.response.status === 500 && setError('Internal server error')
    }finally{
      setLoading(null)
    }
  }

  const logout = () => {
    setUser({})
    localStorage.removeItem('email')
  }

  const handleEdit = async(id) => {
    const targetRequest = request.find(req => req._id === id)
    setEditTitle(targetRequest.requestTitle)
    setEditLink(targetRequest.requestLink)
    setRequestId(targetRequest._id)
  }

  const submitEdit = async(e) => {
    e.preventDefault()
    setLoading1('Submiting update...')
    setError1(null)
    try{
      const res = await axiosRequest.put(`/edit/${user?._id}`, {
        id: requestId,
        email: user?.email,
        requestTitle: editTitle,
        requestLink: editLink
      })
      refetch()
      setEditPage(false)
      setEditTitle('')
      setEditLink('')
    }catch(error){
    !error?.response && setError1('No server response')
    error?.response?.status === 401 && setError1('unauthorized')
    error?.response?.status === 403 && setError1('Resourse not found')
    error?.response?.status === 500 && setError1('Internal server error')
    }finally{
      setLoading1(null)
    }
  }

  const value = {
    user, setUser, email, setEmail, handleEdit, handleSubmit, setLoading, setError, request, setRequest, requestTitle, requestLink, editTitle, setEditTitle, editLink, setEditLink, setRequestTitle, setRequestLink, newRequest, setNewRequest, submitEdit, reload, refetch, editPage, setEditPage, searchItem, setSearchItem, search, setSearch, loading, error, logout, completed, setCompleted, completedRequest, setCompletedRequest, setLoading1, setError1, loading1, error1, loggedInUser
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}