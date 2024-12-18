import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className='max-w-[1400px] mx-auto flex flex-col gap-4 items-center justify-center min-h-[70vh]'>
      <span>Error 404 | Page Not Found</span>
      <Link href={"/"} className='text-blue-500 font-semibold'>Go to home</Link>
    </div>
  )
}
