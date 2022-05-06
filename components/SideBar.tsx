import React from 'react'
import SidebarRow from './SidebarRow'
import {
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    CollectionIcon,
    DotsCircleHorizontalIcon,
    MailIcon,
    UserIcon,
    HomeIcon
} from '@heroicons/react/outline';
import { signIn, signOut, useSession } from 'next-auth/react';


function SideBar() {
  const {data: session} = useSession()
  return (
    <div className='col-span-2 items-center px-4 md:items-start'>
        <img className='h-10 w-10 m-3 cursor-pointer' src="https://links.papareact.com/drq" alt="twitter-icon" />
        <SidebarRow  Icon={HomeIcon} title="Home" />
        <SidebarRow  Icon={HashtagIcon} title="Explore" />
        <SidebarRow  Icon={BellIcon} title="Notifications" />
        <SidebarRow  Icon={MailIcon} title="Messages" />
        <SidebarRow  Icon={BookmarkIcon} title="Bookmarks" />
        <SidebarRow  Icon={CollectionIcon} title="Lists" />
        <SidebarRow onClick={session ? signOut: signIn }  Icon={UserIcon} title={session ? "Sign Out" : "Sign in"} />
        <SidebarRow  Icon={DotsCircleHorizontalIcon} title="More" />       
    </div>
  )
}

export default SideBar