import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { FaTimesCircle } from 'react-icons/fa'
import { UseDataContext } from '../../context/UseDataContext'

export const Edit = () => {
  const {editTitle, setEditPage, editLink, setEditTitle, setEditLink, submitEdit, loading1, setLoading1, error1, setError1} = UseDataContext()
  const textRef = useRef()
  
  useEffect(() => {
    setError1(null)
    setLoading1(null)
  }, [])

  useEffect(() => {
    textRef.current.focus()
  }, [])

  return (
    <article 
      onClick={() => setError1(null)}
      className='flex-none maxscreen:w-[35%] flex flex-col gap-3 h-full shadow-lg '>
    <form onSubmit={submitEdit} className='relative flex-none flex flex-col gap-2 p-2 border rounded-lg bg-opacity-20 bg-blue-400'>
          <h1 className='text-center text-2xl font-semibold'>Edit Your Request</h1>
          <FaTimesCircle 
            onClick={() => setEditPage(false)}
            className='absolute cursor-pointer text-2xl hover:text-gray-700 right-2'/>
          {loading1 && <p className='text-gray-50 capitalize text-lg'>{loading1}</p>}
          {!loading1 && error1 && <p className='text-gray-200 m-auto bg-red-600 rounded-full pl-2 pr-2 w-fit capitalize text-lg tracking-wider'>{error1}</p>}
          <div className='flex flex-col'>
            <label htmlFor="title" className='font-semibold text-lg'>Edit Title*:</label>
            <input 
              type="text"
              id='title'
              ref={textRef}
              value={editTitle}
              required
              autoComplete='off'
              onChange={e => setEditTitle(e.target.value)}  
              placeholder='Music Title'
              className='bg-gray-100 text-lg flex-auto pl-2.5 pr-2.5 w-full p-2 rounded-full border-none focus:outline-none'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="link" className='font-semibold text-lg'>Edit Link:</label>
            <input 
              type="text"
              id='link'
              value={editLink}
              autoComplete='off'
              onChange={e => setEditLink(e.target.value)} 
              placeholder='Song link (optional)'
              className='bg-gray-100 text-lg flex-auto pl-2.5 pr-2.5 w-full p-2 rounded-full border-none focus:outline-none'
            />
          </div>
          
          <button className='text-lg font-medium grid place-content-center p-2 rounded-full shadow-lg bg-blue-300 hover:bg-blue-200'>
            Submit Update
          </button>
        </form>
    </article>
  )
}
