import React from 'react'

function _offline() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center md:flex-row md:space-x-3 md:justify-between md:mx-auto md:max-w-4xl lg:max-w-6xl'>
        <img className='h-96 w-96 lg:h-[40rem] lg:w-[36rem]' src="/404.png" alt="Page not found!" />
        <div className='space-y-2'>
            <p className='text-gray-600 font-light text-center text-4xl md:text-left'>You seem to be <span className='font-bold'>Offline</span></p>
            <p className='text-gray-400 font-light text-center text-lg md:text-left'>Please check your internet connectivity...</p>
        </div>
    </div>
  )
}

export default _offline