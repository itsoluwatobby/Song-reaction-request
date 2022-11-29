import {ImArrowDown, ImArrowUp} from 'react-icons/im'
import {FaTrashAlt} from 'react-icons/fa'
import {BsFillPenFill} from 'react-icons/bs'
import { requests } from '../../data'
import { useState } from 'react'

export const Card = ({songLink, songTitle, setEditPage}) => {
  const [vote, setVote] = useState(false);
  
  return (
    <article className='bg-slate-900 font-serif bg-opacity-80 text-white tracking-wide flex-auto w-full border max-h-[20%] sticky -top-5 p-2 rounded-lg overflow-y-scroll'>
      {
        requests.map(request => (
          <div key={request.id} className='relative border-b-[2px] shadow-lg p-2'>
            <p className='flex items-center gap-8'>
              <span>
                {request?.email}
              </span>
              <span className='text-gray-300'>2 days ago</span>
            </p>
            <p className='flex items-center gap-2 capitalize font-medium'>
              <span>Song Title:</span>
              <span>
                {request?.songTitle}
              </span>
            </p>
            {request?.songLink && 
            <p className='flex items-center gap-2'>
              <span>Link:</span>
              <a href={request?.songLink} target="_blank" className='text-green-500 underline hover:text-green-400'>{request?.songLink}</a>
            </p>}
            <p className='flex items-center gap-2 cursor-pointer w-32 mt-2'>
              <span className={`flex items-center gap-1 rounded-full p-1 ${vote ? 'bg-blue-500' : 'bg-blue-400'}`}>
                Upvote
                <ImArrowUp className={`text-[20px] ${vote ? 'text-black' : 'text-white'}`}/>
              </span>
              <span>5</span>
            </p>
            <div className='absolute right-2 top-6 flex items-center'>
              <div title='Edit Request' className='p-2 rounded-full hover:bg-green-100 cursor-pointer'>
                <BsFillPenFill
                 onClick={() => setEditPage(true)}
                 className='text-2xl text-green-800'/>
              </div>
              <div title='Delete Request' className='p-2 rounded-full hover:bg-red-100 cursor-pointer'>
                <FaTrashAlt className='text-2xl text-red-800'/>
              </div>
            </div>
          </div>
        ))
      }
    </article>
  )
}
