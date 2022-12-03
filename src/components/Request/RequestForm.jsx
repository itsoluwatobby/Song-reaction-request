import { useEffect, useRef, useState } from 'react'
import {BsFillShareFill, BsSearch} from 'react-icons/bs'
import { axiosRequest } from '../../app/axios'
import { UseDataContext } from '../../context/UseDataContext'

export const RequestForm = () => {
  const {user, requestTitle, completed, setCompleted, requestLink, setRequestTitle, setRequestLink,  request, setSearchItem, setRequest, setNewRequest} = UseDataContext()
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading('Submitting request...')
    setError(null)
    try{
      const songRequest = {email: user?.email, requestTitle, requestLink}
      const res = await axiosRequest.post(`/newRequest/${user._id}`, songRequest)
      setRequest([...request, res?.data])
      setNewRequest(res?.data)
      setRequestTitle('')
      setRequestLink('')
    }catch(error){
      !error?.response && setError('No server response')
      error?.response?.status === 409 && setError('Request already made by a user')
      error?.response?.status === 500 && setError('Internal server error')
    }finally{
      setLoading(null)
    }
  }
  
  return (
    <div className='flex-none maxscreen:w-[35%] midscreen:w-full flex flex-col gap-3 h-full shadow-lg relative'>
      <form onSubmit={handleSubmit} className='flex-none flex flex-col gap-1 p-2 border rounded-lg bg-opacity-30 bg-blue-200'>
      <h1 className='text-center text-2xl font-semibold'>Make A Request</h1>
      {loading && <div className='text-gray-50 capitalize text-lg tracking-wider'>{loading}</div>}
      {error && <div className='text-gray-200 m-auto bg-red-600 rounded-full pl-2 pr-2 w-fit capitalize text-lg tracking-wider'>{error}</div>}
        <div
          title='Search Requests'
          onClick={() => setSearchItem(prev => !prev)}
          className='p-2 rounded-full w-8 bg-gray-400 hover:bg-gray-200 cursor-pointer absolute right-2'>
          <BsSearch />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="title" className='font-semibold text-lg'>Song Title*:</label>
          <input 
            type="text"
            id='title'
            ref={inputRef}
            value={requestTitle}
            required
            onChange={e => setRequestTitle(e.target.value)} 
            placeholder='Music Title'
            onFocus={() => setError('')}
            className='bg-white flex-auto pl-2.5 pr-2.5 w-full p-2 rounded-full border-none focus:outline-none'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="link" className='font-semibold text-lg'>Link to music:</label>
          <input 
            type="text"
            id='link'
            value={requestLink}
            onChange={e => setRequestLink(e.target.value)} 
            placeholder='Song link (optional)'
            onFocus={() => setError('')}
            className='bg-white flex-auto pl-2.5 pr-2.5 w-full p-2 rounded-full border-none focus:outline-none'
          />
        </div>
        <div className='flex justify-between'>
          <button type='submit' title='Submit Request' className='focus:outline-none flex-none w-28 grid place-content-center p-2 rounded-full shadow-lg bg-blue-400 hover:bg-blue-500 active:bg-blue-400'>
            <BsFillShareFill className='text-2xl text-white'/>
          </button>
          <button 
            type='button' 
            title='View Completed Requests' 
            onClick={() => setCompleted(prev => !prev)}
            className='focus:outline-none pl-3 pr-3 font-semibold capitalize flex-none grid place-content-center p-2 rounded-full shadow-lg bg-teal-400 hover:bg-teal-500 active:bg-teal-400'>
            {completed ? 'Close' : 'View Completed'}
          </button>
        </div>
      </form>
    </div>
  )
}
