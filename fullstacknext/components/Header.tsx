import React from 'react'
const Header = () => {
  return (
    <div className="w-screen h-max p-8 items-center flex justify-between">

    <div className='flex space-x-8'>
      <h1 className='text-4xl'>ONLINE HTML EDITOR</h1>
      <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-1.5 text-center">
        Share
      </button>
    </div>


    <div className='flex space-x-8'>
      <div className='border-2 border-gray-400 rounded-lg p-2'>version 0.0</div>
      <div className='border-2 border-gray-400 p-2 rounded-lg'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      </div>
    </div>

    </div>
  )
}
export default Header