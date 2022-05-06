import React, { useEffect, useState } from 'react'
import { Comment, CommentBody, Tweet } from '../typings'
import TimeAgo from 'react-timeago'
import { ChatAlt2Icon, HeartIcon, SwitchHorizontalIcon, UploadIcon } from '@heroicons/react/outline';
import { fetchComments } from '../utils/fetchComments';
import { useSession } from 'next-auth/react';

interface Props {
  tweet: Tweet,
}
function Tweet({ tweet }: Props) {

  const {data: session} = useSession()

  const [comments, setComments] = useState<Comment[]>([])
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
  const [input, setInput] = useState<string>("")

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id)
    setComments(comments)
  }

  const postComment = async () => {
    const postBody: CommentBody = {
      comment: input,
      username: session?.user?.name || "Unknown User",
      profileImg: session?.user?.image || "https://links.papareact.com/gll",
      tweetId: tweet._id
    }

    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/addComment`, {
      body: JSON.stringify(postBody),
      method: 'POST'
    })
    const json = result.json()
    return json;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    postComment()
    setInput('')
    setCommentBoxVisible(false)
    refreshComments()
  }

  useEffect(() => {
    refreshComments()
  },[comments])

  return <div className='flex flex-col space-x-3 border-y border-gray-100 p-5'>
    <div className='flex space-x-3'>
      <img 
        className='h-10 w-10 rounded-full object-cover' 
        src={tweet.profileImg} 
        alt="profile image" 
      />

      <div>
        <div className='flex align-middle space-x-1'>
          <p className='mr-1 font-bold'>{tweet.username}</p>
          <p className='hidden text-sm text-gray-500 lg:inline'>@{tweet.username.replace(/\s+/g,'').toLowerCase()} •</p>

          <TimeAgo
            date={tweet._createdAt}
            className='text-sm text-gray-500'
          />
        </div>
        <p className='pt-1'>{tweet.text}</p>
        {
          tweet.image && <img src={tweet.image} className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm" alt="tweet" />
        }
      </div>
    </div>
    <div className='mt-5 flex justify-between'>
      <div onClick={() => session && setCommentBoxVisible(!commentBoxVisible)} className='flex cursor-pointer items-center space-x-3 text-gray-400'>
        <ChatAlt2Icon className='h-5 w-5' />
        <p>{comments.length}</p>
      </div>
      <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
        <SwitchHorizontalIcon className='h-5 w-5' />
      </div>
      <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
        <HeartIcon className='h-5 w-5' />
      </div>
      <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
        <UploadIcon className='h-5 w-5' />
      </div>
    </div>
    {/* Comments */}
    
    {
      commentBoxVisible && (
        <form onSubmit={handleSubmit} className='mt-3 flex items-center space-x-3'>
          <img className='h-7 w-7 rounded-full' src={session?.user?.image || "https://links.papareact.com/gll"} alt="profile-image" />
          <input
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            className='flex-1 rounded-lg outline-none bg-gray-100 p-2' 
            type="text" 
            placeholder='Write a comment...' />
          <button type="submit"  disabled={!input || !session} className='text-twitter disabled:text-gray-200'>Post</button>
        </form>
      )
    }
    {
      comments?.length > 0 && (
       <div className='my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5 scrollbar-hide'>
         {
           comments.map((comment,index) => (
             <div key={comment._id} className='relative flex space-x-2'>
               {
                 index < comments.length-1 ? (<hr className='absolute left-5 top-10 h-8 border-x border-twitter/30' />) : (<hr className='absolute left-5 top-10 h-8 border-x border-twitter/0' />)
               }               
               <img className='mt-2 h-7 w-7 rounded-full object-cover' src={comment.profileImg} alt="Profile Image" />
                <div className=''>
                  <div className='flex align-middle space-x-1'>
                    <p className='mr-1 font-bold'>{comment.username}</p>
                    <p className='hidden text-sm text-gray-500 lg:inline'>@{comment.username.replace(/\s+/g,'').toLowerCase()} •</p>

                    <TimeAgo
                      date={comment._createdAt}
                      className='text-sm text-gray-500'
                    />
                  </div>
                  <p>{comment.comment}</p> 
                </div>
             </div>
           ))
         }
       </div>
      )
    }
  </div>
}

export default Tweet
