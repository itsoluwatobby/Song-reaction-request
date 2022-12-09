import {ImArrowDown, ImArrowUp} from 'react-icons/im'
import {FaTrashAlt} from 'react-icons/fa'
import {BsFillPenFill} from 'react-icons/bs'
import { format } from 'timeago.js'
import { UseDataContext } from '../../context/UseDataContext'

export const UncompletedRequest = (
  {request, handleDelete, handleCompleted, user, setEditPage, handleVotes, handleEdit}) => {
    const {setError} = UseDataContext()

  return (
    <li 
    onClick={() => setError(null)}
      className='relative border-b-[2px] shadow-lg p-2 last:border-b-0'>
      <p className='flex items-center gap-8'>
        <span>
          {request?.email.split('@')[0]}
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
        <a href={request?.requestLink} target="_blank" className='text-green-500 underline hover:text-green-400'>{request?.requestLink.slice(0,22)}...</a>
      </p>}
      <p className='flex items-center gap-10 cursor-pointer w-full mt-2'>
        <div className='flex items-center gap-3'>
          <button 
            onClick={() => handleVotes(request?._id)}
            className={`flex hover:bg-blue-300 active:bg-blue-600 items-center gap-1 rounded-full p-1 ${request?.upVote.includes(user?._id) ? 'bg-blue-500' : 'bg-blue-400'}`}>
            {request?.upVote.includes(user._id) ? 'Unvote' : 'Upvote'}
            <ImArrowUp className={`text-[20px] ${request?.upVote.includes(user?._id) ? 'text-black' : 'text-white'}`}/>
          </button>
          <span className='text-[20px]'>{request?.upVote.length}</span>
        </div>
        {(request?.completed || user?.admin) &&
          <div className='flex items-center gap-3'>  
           {user?.admin && 
              <input 
                type='checkbox'
                checked={request?.completed}
                onChange={() => handleCompleted(request?._id)}
                className='w-4 h-4 cursor-pointer'
              />
            }
            <span className={`text-[20px] ${request?.completed ? 'text-gray-400' : 'not text-gray-100'}`}>{request?.completed ? 'completed' : 'not completed'}</span>
          </div>
        }
      </p>
      <div className='absolute right-2 top-6 flex items-center'>
        {((request?.userId === user?._id && !request?.completed) || (user?.admin && !request?.completed)) && 
          <div title='Edit Request' className='p-2 rounded-full hover:bg-green-100 cursor-pointer'>
            <BsFillPenFill
            onClick={() => {
              handleEdit(request?._id)
              setEditPage(true)
            }}
            className='text-2xl text-green-800'/>
          </div>
        }
        {((request?.userId === user?._id && !request?.completed) || user?.admin) && 
          <div
            onClick={() => handleDelete(request?._id)}
            title='Delete Request' className='p-2 rounded-full hover:bg-red-100 cursor-pointer'>
            <FaTrashAlt className='text-2xl text-red-800'/>
          </div>
        }
      </div>
    </li>
  )
}
