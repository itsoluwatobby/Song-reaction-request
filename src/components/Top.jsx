import {FaYoutube} from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import { UseDataContext } from '../context/UseDataContext'

export const Top = () => {
  const {pathname} = useLocation()
  const {logout} = UseDataContext()
  
  return (
    <header className='sticky top-0 w-full p-2 flex items-center justify-between bg-blue-200 shadow-2xl z-50 bg-opacity-50'>
      <h1 className='mov bg-transparent font-semibold shadow-sm text-4xl'>GRACIE <span className='minscreen:hidden'>REACTS</span></h1>
      <div>
      {
        pathname === '/song/request' ?
        <button
          onClick={logout}
          className='focus:outline-none p-2 text-xl bg-red-400 rounded-lg capitalize hover:bg-red-500 active:bg-red-400'
        >logout</button> :
        <button className='focus:outline-none uppercase flex items-center gap-2 p-2 bg-red-500 border-none text-white text-lg shadow-2xl cursor-pointer hover:bg-red-600 active:bg-red-500 transition-all rounded-full minscreen:uppercase pl-4 pr-4'>
          <a href='https://www.youtube.com/@GracieReacts' target='_blank'>
            Join <span className='minscreen:hidden'>my channel</span>
          </a>
        <FaYoutube className='text-2xl'/>
        </button>
        
        }
      </div>
    </header>
  )
}
