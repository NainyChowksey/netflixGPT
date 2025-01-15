import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
      <div className='w-screen aspect-video px-24 text-white pt-[20%] absolute bg-gradient-to-r from-black' >
        <div className='ml-3'>
      <h1 className='text-4xl font-bold'>{title}</h1>
      <p className='hidden md:block text-lg w-1/3 py-6'>{overview}</p>
      </div>
      <div>
      <button className=" hidden md:inline-block py-4 px-10 m-3 bg-white text-black text-xl rounded-lg">Play</button>
      <button className=" md:inline-block  hidden py-4 px-10 m-3 bg-gray-400 text-white text-xl rounded-lg"> More Info</button>
      </div>
      </div>
  )
}

export default VideoTitle