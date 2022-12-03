import {ImArrowDown, ImArrowUp} from 'react-icons/im'
import {FaTrashAlt} from 'react-icons/fa'
import {BsFillPenFill} from 'react-icons/bs'
import { format } from 'timeago.js'

export const CompletedRequest = (
  {request, handleDelete, handleCompleted, user, setEditPage, handleVotes, handleEdit}) => {
  return (
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
      <p className='cursor-pointer w-32 mt-2'>
        {
          user?.admin &&
            <div className='flex items-center gap-3'>  
              <input 
                type='checkbox'
                checked={request?.completed}
                onChange={() => handleCompleted(request?._id)}
                className='w-4 h-4 cursor-pointer'
              />
              <span className={`text-[20px] ${request?.completed ? 'text-black' : 'not text-white'}`}>{request?.completed ? 'completed' : 'not completed'}</span>
            </div>
        }
      </p>
      <div className='absolute right-2 top-6 flex items-center'>
        {(user?.admin && !request?.completed) && 
          <div title='Edit Request' className='p-2 rounded-full hover:bg-green-100 cursor-pointer'>
            <BsFillPenFill
            onClick={() => {
              handleEdit(request?._id)
              setEditPage(true)
            }}
            className='text-2xl text-green-800'/>
          </div>
        }
        {user?.admin && 
          <div
            onClick={() => handleDelete(request?._id)}
            title='Delete Request' className='p-2 rounded-full hover:bg-red-100 cursor-pointer'>
            <FaTrashAlt className='text-2xl text-red-800'/>
          </div>
        }
      </div>
    </div>
  )
}
