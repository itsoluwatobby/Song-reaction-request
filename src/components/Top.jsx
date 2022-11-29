import {FaYoutube} from 'react-icons/fa'

export const Top = () => {
  return (
    <header className='sticky top-0 w-full p-2 flex items-center justify-between bg-blue-200 shadow-2xl z-50 bg-opacity-70'>
      <h1 className='mov bg-transparent font-semibold shadow-sm text-4xl'>GRACIE REACTS</h1>
      <button className='flex items-center gap-2 p-2 bg-red-500 border-none text-white text-lg capitalize shadow-2xl cursor-pointer hover:bg-red-600 active:bg-red-500 transition-all rounded-full'>
        <a href='https://www.youtube.com/@GracieReacts' target='_blank'>
          Join my channel
        </a>
      <FaYoutube className='text-2xl'/>
      </button>
        
    </header>
  )
}
