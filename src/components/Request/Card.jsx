import {ImArrowDown, ImArrowUp} from 'react-icons/im'
import {FaTrashAlt} from 'react-icons/fa'
import {BsFillPenFill} from 'react-icons/bs'
import { useState } from 'react'
import { UseDataContext } from '../../context/UseDataContext'
import { useEffect } from 'react'
import { axiosRequest } from '../../app/axios'
import { format } from 'timeago.js'

export const Card = () => {
  const {request, reload, setEditPage, refetch, handleEdit, user, setLoading, setError, loading, error, newRequest, setRequest, search} = UseDataContext()

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
        error?.response?.status === 400 && setError('No response available')
        error?.response?.status === 500 && setError('Internal server error')
      }finally{
        setLoading(null)
      }
    } 
    fetchRequests()

    return () => isMounted = false

  }, [newRequest, user, reload])

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

  const sortedRequest = request.sort((a,b) => b?.requestDate.localeCompare(a?.requestDate))
  
  const filteredSearch =  sortedRequest.filter(sorted => sorted?.requestTitle.toLowerCase().includes(search.toLowerCase()))

  return (
    <article className='bg-slate-900 font-serif bg-opacity-80 text-white tracking-wide flex-auto w-full border p-2 rounded-lg overflow-y-scroll max-h-[75vh]'>
      {loading && <div className='text-gtray-200 uppercase text-lg tracking-wider'>{loading}</div>}
      {error && <div className='text-red-500 uppercase text-lg tracking-wider'>{error}</div>}
      {
        filteredSearch?.map(request => (
          <div key={request._id} className='relative border-b-[2px] shadow-lg p-2'>
            <p className='flex items-center gap-8'>
              <span>
                {request?.email}
              </span>
              <span className='text-gray-300'>{format(request?.requestDate)}</span>
            </p>
            <div className='flex items-center gap-2 capitalize font-medium'>
              <span>Song Title:</span>
              <p>
                {!request?.requestTitle.includes('by') ?
                  <span>{request?.requestTitle}</span> : 
                  <>
                    <span>{request?.requestTitle.split('by')[0]} by</span> 
                    <span className='underline text-gray-200'>{request?.requestTitle.split('by')[1]}</span>
                  </>
                }
              </p>
            </div>
            {request?.requestLink && 
            <p className='flex items-center gap-2'>
              <span>Link:</span>
              <a href={request?.requestLink} target="_blank" className='text-green-500 underline hover:text-green-400'>{request?.requestLink}</a>
            </p>}
            <p className='flex items-center gap-2 cursor-pointer w-32 mt-2'>
              <button 
                onClick={() => handleVotes(request?._id)}
                className={`flex hover:bg-blue-300 active:bg-blue-600 items-center gap-1 rounded-full p-1 ${request?.upVote.includes(user?._id) ? 'bg-blue-500' : 'bg-blue-400'}`}>
                Upvote
                <ImArrowUp className={`text-[20px] ${request?.upVote.includes(user?._id) ? 'text-black' : 'text-white'}`}/>
              </button>
              <span className='text-[20px]'>{request?.upVote.length}</span>
            </p>
            <div className='absolute right-2 top-6 flex items-center'>
              {(request?.userId === user?._id || user?.admin) && 
                <div title='Edit Request' className='p-2 rounded-full hover:bg-green-100 cursor-pointer'>
                  <BsFillPenFill
                  onClick={() => {
                    handleEdit(request?._id)
                    setEditPage(true)
                  }}
                  className='text-2xl text-green-800'/>
                </div>
              }
              {(request?.userId === user?._id || user?.admin) && 
                <div
                  onClick={() => handleDelete(request?._id)}
                  title='Delete Request' className='p-2 rounded-full hover:bg-red-100 cursor-pointer'>
                  <FaTrashAlt className='text-2xl text-red-800'/>
                </div>
              }
            </div>
          </div>
        ))
      // ) : (
      //   <div className='text-white uppercase text-lg tracking-wider'>
      //       no request to display
      //   </div>
      // )
      }
    </article>
  )
}
