import {BsFillShareFill} from 'react-icons/bs'

export const RequestForm = () => {
  
  return (
    <div className='flex-none maxscreen:w-[35%] flex flex-col gap-3 h-full shadow-lg '>
      <form className='flex-none flex flex-col gap-1 p-2 border rounded-lg bg-opacity-30 bg-blue-200'>
      <h1 className='text-center text-2xl font-semibold'>Make A Request</h1>
        <div className='flex flex-col'>
          <label htmlFor="title" className='font-semibold text-lg'>Song Title*:</label>
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
          <label htmlFor="link" className='font-semibold text-lg'>Link to music:</label>
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
        
        <button title='Submit Request' className='flex-none w-28 grid place-content-center p-2 rounded-full shadow-lg bg-blue-400 hover:bg-blue-500 active:bg-blue-400'>
          <BsFillShareFill className='text-2xl text-white'/>
        </button>
      </form>
    </div>
  )
}
