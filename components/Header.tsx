'use client';

import React, {useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createSharableLink, fetchCode } from "../slices/userSlice";
import { useRouter } from 'next/navigation';

const Header = () => {
  const localcode = useSelector((state) => state.settings.localCode)
  const isSharing = useSelector((state) => state.settings.isSharing)
  const loadingORresponse = useSelector((state) => state.settings.promiseStates.fetchCode) //loadingORresponse.loading or .response
  const link = useSelector((state) => state.settings.link)
  const { promiseStates:{createSharableLink: {response}}} = useSelector((state) => state.settings)
  useEffect(() => {
    console.log(`link: ${link}`)
  }, [])

  const router = useRouter()
  //share url params to figure out if they accessing via shared link or not 
  
  const [sharedrouteurl, setSharedrouteurl] = useState()
  const handleShare = async () => {
    const d = async() => {
      const promise = await dispatch(createSharableLink('examplddelink'))
      return promise
    }
    d().then((res) => router.push(`/sharedpage/${res.payload.link.link}`))//router.push(`/sharedpage/${res.type}`))
  }
  const dispatch = useDispatch()
  //var response = value
  const r = useRef(false)
  const handleCopy = () => {
    console.log('copied to clipboard')
  }
  return (
    <div className="w-screen h-max p-8 items-center flex justify-between">

    <div className='flex space-x-8'>
      <h1 className='text-4xl'>ONLINE HTML EDITOR</h1>
      <button onClick={response === false ? handleShare : handleCopy} type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-1.5 text-center">
        { response === false ? 'Share' : 'Copy Link'}
      </button>
      <div className='hidden md:inline self-center'>
        {response ? <p className=' border-b-2 border-black'>{response.link.link}</p>: 'share link'}
      </div>
    </div>


    <div className='flex space-x-8'>
      <div className='border-2 border-gray-400 rounded-lg p-2'>version 0.1</div>
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