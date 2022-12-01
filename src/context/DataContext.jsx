import {createContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosRequest } from '../app/axios'

export const DataContext = createContext({})

export const DataContextProvider = ({children}) => {
  const [user, setUser] = useState({})
  const [email, setEmail] = useState('')
  const [request, setRequest] = useState([])
  const [newRequest, setNewRequest] = useState({})
  const [requestTitle, setRequestTitle] = useState('')
  const [requestLink, setRequestLink] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [requestId, setRequestId] = useState('')
  const [editLink, setEditLink] = useState('')
  const [search, setSearch] = useState('')
  const [editPage, setEditPage] = useState(false);
  const [searchItem, setSearchItem] = useState(false);
  const [edit, setEdit] = useState({
    title: '', link: ''
  })
  const [reload, setReload] = useState(1);
  const [message, setMessage] = useState({
    loading: false, error: ''
  })
  const navigate = useNavigate()

  const refetch = () => setReload(prev => prev + 1)

  const handleSubmit = async(e) => {
    e.preventDefault()
    setMessage({loading: true})
    setMessage({error: ''})
    try{
      const res = await axiosRequest.post('/new', {
        email
      })
      setUser(res.data)
      navigate('/song/request')
      localStorage.setItem('email', res?.data.email)
      setEmail('')
    }catch(error){
    !error?.response && setMessage({error: 'No server response'})
    error?.response?.status === 500 && setMessage({error: 'Internal server error'})
    }finally{
      setMessage({error: ''})
      setMessage({loading: false})
    }
  }

  const handleEdit = async(id) => {
    const targetRequest = request.find(req => req._id === id)
    setEditTitle(targetRequest.requestTitle)
    setEditLink(targetRequest.requestLink)
    setRequestId(targetRequest._id)
    setMessage({loading: true})
    setMessage({error: ''})
  }

  const submitEdit = async(e) => {
    e.preventDefault()
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
    !error?.response && setMessage({error: 'No server response'})
    error?.response?.status === 403 && setMessage({error: 'Resourse not found'})
    error?.response?.status === 500 && setMessage({error: 'Internal server error'})
    }finally{
      setMessage({error: ''})
      setMessage({loading: false})
    }
  }

  const value = {
    user, setUser, email, setEmail, handleEdit, handleSubmit, message, setMessage, request, setRequest, requestTitle, requestLink, editTitle, setEditTitle, editLink, setEditLink, setRequestTitle, setRequestLink, newRequest, setNewRequest, setEdit, submitEdit, reload, refetch, editPage, setEditPage, searchItem, setSearchItem, search, setSearch
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}