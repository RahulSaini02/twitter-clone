import React, { useRef, useState } from 'react'

import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react';
import { Tweet, TweetBody } from '../typings';
import toast from 'react-hot-toast';
import { fetchTweets } from '../utils/fetchTweets';

interface Props {
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
}


function TweetBox({setTweets}: Props) {
  const [input, setInput] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const imageInputRef = useRef<HTMLInputElement>(null)

  const {data: session} = useSession()
  const [imageUrlBoxOpen, setImageUrlBoxOpen] = useState<boolean>(false)

  const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if(!imageInputRef.current?.value) return

    setImage(imageInputRef.current.value)
    imageInputRef.current.value = ''
    setImageUrlBoxOpen(false)
  }

  const postTweet = async () => {
    const postBody: TweetBody = {
      text: input,
      username: session?.user?.name || "Unknown User",
      profileImg: session?.user?.image || "https://links.papareact.com/gll",
      image: image
    }

    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/addTweet`, {
      body: JSON.stringify(postBody),
      method: 'POST'
    })
    const json = result.json()

    const newTweets = await fetchTweets();

    setTweets(newTweets)
    return json;
  }

  const handleSubmit  = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    postTweet();

    toast.success('Tweet Posted!!', {
      icon: '🎊'
    })

    setImageUrlBoxOpen(false)
    setInput('')
    setImage('')
  }

  return (
    <div className=' sticky flex space-x-2 p-5 border-b'>
        <img className='h-14 w-14 mt-4 object-cover rounded-full' src={session?.user?.image || "https://links.papareact.com/gll"} alt={session?.user?.name || "profile"} />

        <div className='flex flex-1 items-center pl-2'>
          <form action="#" className='flex flex-1 flex-col'>
            <input type="text" placeholder="What's Happening?" value={input} onChange={(e) => setInput(e.target.value)}  className='h-24 w-full text-xl outline-none placeholder:text-xl' />
            <div className='flex items-center justify-between'>
              <div className='flex flex-1 space-x-2'>
                <PhotographIcon onClick={() => setImageUrlBoxOpen(!imageUrlBoxOpen)} className='h-5 w-5 text-twitter cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                <SearchCircleIcon className='h-5 w-5 text-twitter cursor-pointer' />
                <EmojiHappyIcon className='h-5 w-5 text-twitter cursor-pointer' />
                <CalendarIcon className='h-5 w-5 text-twitter cursor-pointer' />
                <LocationMarkerIcon className='h-5 w-5 text-twitter cursor-pointer' />
              </div>
              <button onClick={handleSubmit} disabled={!input || !session} className='bg-twitter text-white px-5 py-2 font-bold rounded-full disabled:opacity-40'>Tweet</button>
            </div>

            {imageUrlBoxOpen && (
              <form className='mt-5 flex rounded-lg bg-twitter/80 py-2 px-4'>
                <input 
                  ref = {imageInputRef}
                  className='bg-transparent flex-1 p-2 text-white outline-none placeholder:text-white' type="text" 
                  placeholder='Enter Image URL..' 
                />
                <button 
                  type="submit" 
                  onClick={addImageToTweet}
                  className='font-bold text-white'
                >Add Image</button>
              </form>
            )}

            {
              image && (
                <img className='mt-10 h-40 rounded-xl object-contain shadow-lg' src={image} alt="Tweet Image to upload" />
              )
            }
          </form>
        </div>
    </div>
  )
}

export default TweetBox