import { useEffect, useRef } from 'react'
import {BsFillShareFill, BsSearch} from 'react-icons/bs'
import { axiosRequest } from '../../app/axios'
import { UseDataContext } from '../../context/UseDataContext'

export const RequestForm = () => {
  const {user, message, setMessage, requestTitle, requestLink, setRequestTitle, setRequestLink,  request, setSearchItem, setRequest, setNewRequest} = UseDataContext()
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    setMessage({loading: 'Submitting request...'})
    try{
      const songRequest = {email: user?.email, requestTitle, requestLink}
      const res = await axiosRequest.post(`/newRequest/${user._id}`, songRequest)
      setRequest([...request, res?.data])
      setNewRequest(res?.data)
      setRequestTitle('')
      setRequestLink('')
    }catch(error){
      !error?.response && setMessage({error: 'No server response'})
      error?.response?.status === 500 && setMessage({error: 'Internal server error'})
    }finally{
      setMessage({loading: null})
    }
  }
  
  return (
    <div className='flex-none maxscreen:w-[35%] flex flex-col gap-3 h-full shadow-lg relative'>
      <form onSubmit={handleSubmit} className='flex-none flex flex-col gap-1 p-2 border rounded-lg bg-opacity-30 bg-blue-200'>
      <h1 className='text-center text-2xl font-semibold'>Make A Request</h1>
      {message?.loading && <span className='text-red-700'>{message?.loading}</span>
           || message?.error && <span className='text-red-700'>{message?.error}</span>}
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
            className='bg-white flex-auto pl-2.5 pr-2.5 w-full p-2 rounded-full border-none focus:outline-none'
          />
        </div>
        
        <button type='submit' title='Submit Request' className='flex-none w-28 grid place-content-center p-2 rounded-full shadow-lg bg-blue-400 hover:bg-blue-500 active:bg-blue-400'>
          <BsFillShareFill className='text-2xl text-white'/>
        </button>
      </form>
    </div>
  )
}
