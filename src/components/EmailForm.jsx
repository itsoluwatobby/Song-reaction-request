import { useEffect, useRef } from 'react'
import { UseDataContext } from '../context/UseDataContext'

export const EmailForm = () => {
  const {email, setEmail, setLoading, setError, handleSubmit, loading, error} = UseDataContext()
  const textRef = useRef()

  useEffect(() => {
    textRef.current.focus()
  }, [])
  
  useEffect(() => {
    setError(null)
    setLoading(null)
  }, [])

  return (
    <div 
      onClick={() => setError('')}
      className='w-full flex gap-2 pb-2 flex-col'>
      <form onSubmit={handleSubmit} className='bg-slate-500 bg-opacity-60 rounded-full flex flex-col m-auto mt-8 border p-2 pb-4 midscreen:w-[65%] w-[40%] items-center shadow-lg'>
        <h1 className='mt-1 text-2xl text-white text-center font-medium'>Gracie Fans Page</h1>
        {loading && <p className='text-gray-50 text-lg capitalize'>{loading}</p>}
        {!loading && error && <p className='text-gray-200 m-auto bg-red-600 rounded-full pl-2 pr-2 w-fit capitalize text-lg tracking-wider'>{error}</p>}
        <div className='w-full flex flex-col'>
          <label htmlFor="email" className='font-semibold ml-2'>Email Address:</label>
          <input 
            type="email"
            id="email"
            ref={textRef}
            value={email}
            required
            onChange={e => setEmail(e.target.value)} 
            placeholder='gracie@gmail.com'
            className='text-lg pl-2.5 pr-2.5 w-full p-2 rounded-full border-none focus:outline-none'
          />
        </div>
        <button className='mt-2 w-[80%] p-1 bg-blue-200 box-border rounded-full cursor-pointer hover:bg-blue-300 active:bg-blue-200 transition duration-200 ease-in-out text-[20px]'>Submit</button>
      </form>
      <p className='capitalize mt-4 p-2 text-center text-white bg-slate-500 bg-opacity-50 shadow-2xl font-[500] text-lg rounded-lg'>This is gracie reacts fans page. A space where you can always submit your song requests for me to react to.</p>
      <img src="https://i.ytimg.com/vi/uOf9PHk4vj8/hq720_2.jpg?sqp=-oaymwEdCI4CEOADSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLC_iUSdNuYQ9geGMoOsz8nqUg59eA" alt="gracie" 
        title='Gracie Reacts' className='border-8 rounded-full w-[360px] h-[300px] object-cover m-auto'
      />
    </div>
  )
}
