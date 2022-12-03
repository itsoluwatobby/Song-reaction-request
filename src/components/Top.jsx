import {FaYoutube} from 'react-icons/fa'

export const Top = () => {
  return (
    <header className='sticky top-0 w-full p-2 flex items-center justify-between bg-blue-200 shadow-2xl z-50 bg-opacity-70'>
      <h1 className='mov bg-transparent font-semibold shadow-sm text-4xl'>GRACIE <span className='minscreen:hidden'>REACTS</span></h1>
      <button className='focus:outline-none uppercase flex items-center gap-2 p-2 bg-red-500 border-none text-white text-lg shadow-2xl cursor-pointer hover:bg-red-600 active:bg-red-500 transition-all rounded-full minscreen:uppercase pl-4 pr-4'>
        <a href='https://www.youtube.com/@GracieReacts' target='_blank'>
          Join <span className='minscreen:hidden'>my channel</span>
        </a>
      <FaYoutube className='text-2xl'/>
      </button>
        
    </header>
  )
}
