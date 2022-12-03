import React from 'react'
import { UseDataContext } from '../../context/UseDataContext'

export const Search = () => {
  const {search, setSearch} =UseDataContext()
  
  return (
    <div className='flex flex-col maxscreen:absolute top-14 right-2 maxscreen:w-[63%]'>
      <input 
        type="text"
        id='search'
        value={search}
        required
        onChange={e => setSearch(e.target.value)} 
        placeholder='Search Requests'
        className='bg-white flex-auto pl-2.5 pr-2.5 w-full p-2 rounded-full border-none focus:outline-none'
      />
    </div>
  )
}
