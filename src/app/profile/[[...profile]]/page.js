import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='flex w-full h-full justify-center items-center'>
      <UserProfile></UserProfile>
    </div>
  )
}

export default page
