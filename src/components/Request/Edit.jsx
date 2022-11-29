import React from 'react'
import { FaTimesCircle } from 'react-icons/fa'

export const Edit = ({setEditPage}) => {

  return (
    <article className='flex-none maxscreen:w-[35%] flex flex-col gap-3 h-full shadow-lg '>
    <form className='relative flex-none flex flex-col gap-2 p-2 border rounded-lg bg-opacity-30 bg-blue-200'>
          <h1 className='text-center text-2xl font-semibold'>Edit Your Request</h1>
          <FaTimesCircle 
            onClick={() => setEditPage(false)}
            className='absolute cursor-pointer text-2xl hover:text-gray-700 right-2'/>
          <div className='flex flex-col'>
            <label htmlFor="title" className='font-semibold text-lg'>Edit Title*:</label>
            <input 
              type="email"
              id='title'
              //value={title}
              required
              autoComplete='off'
              // onChange={e => setEmail(e.target.value)} 
              placeholder='Music Title'
              className='bg-white flex-auto pl-2.5 pr-2.5 w-full p-2 rounded-full border-none focus:outline-none'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="link" className='font-semibold text-lg'>Edit Link:</label>
            <input 
              type="email"
              id='link'
              //value={link}
              autoComplete='off'
              // onChange={e => setEmail(e.target.value)} 
              placeholder='Song link (optional)'
              className='bg-white flex-auto pl-2.5 pr-2.5 w-full p-2 rounded-full border-none focus:outline-none'
            />
          </div>
          
          <button className='text-lg font-medium grid place-content-center p-2 rounded-full shadow-lg bg-blue-300 hover:bg-blue-200'>
            Submit Update
          </button>
        </form>
    </article>
  )
}
