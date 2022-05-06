import {  SearchIcon } from '@heroicons/react/outline';
import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed';

function Widgets() {
  return (
      <div className='mt-2 px-2 col-span-2 hidden lg:inline '>
        <div className=' mt-2 flex item-center space-x-2 bg-gray-100 rounded-full p-3'>
            {/* Search */}
            <SearchIcon  className='h-5 w-5 flex-shrink-0 text-gray-500' />
            <input type="text" className='bg-transparent flex-1 outline-none' placeholder="Search Twitter" />
        </div>
        <TwitterTimelineEmbed
            sourceType='profile'
            // screenName="Rahul_Saini_02"
            screenName='sonnysangha'
            options={{height: 1000}}
        />
      </div>
  )
}

export default Widgets