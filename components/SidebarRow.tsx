import React, { SVGProps } from 'react'

interface Props {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element,
    title: string,
    onClick?: () => {}
}
function SidebarRow({Icon, title, onClick}: Props) {
  return (
    <div onClick={() => onClick?.()} className='flex space-x-2 px-4 py-3 rounded-full transition-all duration-200 cursor-pointer max-w-fit hover:bg-gray-100 group'>
      <Icon className='h-6 w-6 flex-shrink-0' />
        <p className='hidden md:inline-flex text-base font-light lg:text-xl group-hover:text-twitter'>{title}</p>
    </div>
  )
}

export default SidebarRow