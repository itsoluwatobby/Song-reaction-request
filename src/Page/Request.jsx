import { useState } from 'react'
import { Card } from '../components/Request/Card'
import { Edit } from '../components/Request/Edit'
import { RequestForm } from '../components/Request/RequestForm'
import { UseDataContext } from '../context/UseDataContext'

export const Request = () => {
  const {user, editPage, search, setSearch, searchItem} = UseDataContext()

  return (
    <section className='p-2 flex flex-col w-full h-full overflow-y-scroll relative'>
      {!user?.admin ?
        <marquee className='text_shadow text-gray-200 font-semibold capitalize text-3xl p-2 w-full maxscreen:mb-12'>Welcome <span className='uppercase'>{user?.email && user?.email.split('@')[0]} </span> to my reaction fan page</marquee>
        :
        <marquee className='text_shadow text-gray-200 font-semibold capitalize text-3xl p-2 w-full maxscreen:mb-12'>Welcome Admin <span className='uppercase'>{user?.email && user?.email.split('@')[0]} </span></marquee>
      }
      <div className='flex midscreen:flex-col gap-2'>
        {searchItem && 
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
          </div>}
        {editPage ? <Edit /> : <RequestForm /> }
        <Card/>
      </div>
    </section>
  )
}
