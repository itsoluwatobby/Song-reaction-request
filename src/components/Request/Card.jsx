import { UseDataContext } from '../../context/UseDataContext'
import { useEffect } from 'react'
import { axiosRequest } from '../../app/axios'
import { UncompletedRequest } from './UncompletedRequest'
import { CompletedRequest } from './CompletedRequest'
import { useState } from 'react'

export const Card = () => {
  const {request, completed, reload, setEditPage, refetch, handleEdit, user, setLoading, setError, loading, error, newRequest, setRequest, search, completedRequest, setCompletedRequest} = UseDataContext()
  const [loading2, setLoading2] = useState('')
  const [error2, setError2] = useState('')

  useEffect(() => {
    let isMounted = true

    const fetchRequests = async() => {
      setLoading('Loading requests...')
      setError(null)
      try{
        const res = await axiosRequest.get('/')
        isMounted && setRequest(res?.data)
      }catch(error){
        !error?.response && setError('No server response')
        error?.response?.status === 400 && setError('No available requests')
        error?.response?.status === 500 && setError('Internal server error')
      }finally{
        setLoading(null)
      }
    } 
    fetchRequests()

    return () => isMounted = false

  }, [newRequest, completed, user._id, reload])

  useEffect(() => {
    let isMounted = true

    const fetchCompletedRequests = async() => {
      setLoading2('Loading completed requests...')
      setError2(null)
      try{
        const completedRes = await axiosRequest.get('/complete')
        isMounted && setCompletedRequest(completedRes?.data)
      }catch(error){
        !error?.response && setError2('No server response')
        error?.response?.status === 400 && setError2('No completed requests')
        error?.response?.status === 500 && setError2('Internal server error')
      }finally{
        setLoading2(null)
      }
    } 
    fetchCompletedRequests()

    return () => isMounted = false

  }, [completed, reload])

  const handleDelete = async(id) => {
    setLoading('Deleting request...')
      setError(null)
    try{
      const res = await axiosRequest.delete(`/delete/${user._id}/${id}`)
      refetch()
    }catch(error){
      !error?.response && setError('No server response')
      error?.response?.status === 400 && setError('requestId required')
      error?.response?.status === 403 && setError('resource not found')
      error?.response?.status === 401 && setError('unauthorized')
      error?.response?.status === 500 && setError('Internal server error')
    }finally{
      setLoading(null)
    }
  }

  const handleVotes = async(id) => {
    try{
      const res = await axiosRequest.put(`/vote/${user._id}/${id}`)
      refetch()
    }catch(error){
      !error?.response && setError('No server response')
      error?.response?.status === 400 && setError('id required')
      error?.response?.status === 403 && setError('resource not found')
      error?.response?.status === 500 && setError('Internal server error')
    }
  }

  const handleCompleted = async(id) => {
    try{
      const res = await axiosRequest.put(`/complete/${user._id}/${id}`)
      refetch()
    }catch(error){
      !error?.response && setError('No server response')
      error?.response?.status === 400 && setError('No response available')
      error?.response?.status === 500 && setError('Internal server error')
    }
  }

  const sortedRequest = request.sort((a,b) => b?.requestDate.localeCompare(a?.requestDate))

  const sortedRequest2 = completedRequest.sort((a,b) => b?.requestDate.localeCompare(a?.requestDate))
  
  const filteredSearch =  sortedRequest.filter(sorted => sorted?.requestTitle.toLowerCase().includes(search.toLowerCase()))

  const filteredSearch2 =  sortedRequest2.filter(sorted => sorted?.requestTitle.toLowerCase().includes(search.toLowerCase()))

  return (
    <article className='bg-slate-900 font-serif bg-opacity-80 text-white tracking-wide flex-auto w-full border p-2 rounded-lg overflow-y-scroll max-h-[75vh]'>
      {(loading || (loading2 && completed)) && <div className='text-gtray-200 uppercase text-lg tracking-wider'>{(loading2 && completed) || loading}</div>}
      {(error || (error2 && completed)) && <div className='text-red-500 uppercase text-lg tracking-wider'>{(completed && error2) || error}</div>}
      {!completed ? 
        filteredSearch?.map(request => (
          <UncompletedRequest
            key={request._id} 
            request={request} 
            handleEdit={handleEdit}
            handleVotes={handleVotes}
            user={user}
            handleDelete={handleDelete}
            setEditPage={setEditPage}
            handleCompleted={handleCompleted}
          />
        )) 
        :
        filteredSearch2?.map(request => (
          <CompletedRequest 
            key={request._id} 
            request={request} 
            handleEdit={handleEdit}
            handleVotes={handleVotes}
            user={user}
            handleDelete={handleDelete}
            setEditPage={setEditPage}
            handleCompleted={handleCompleted}
          />
        ))
      }
    </article>
  )
}
