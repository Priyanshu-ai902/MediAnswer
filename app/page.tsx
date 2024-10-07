import { ModeToggle } from '@/components/modetoggle'
import React from 'react'

type Props = {}

const HomeComponent = (props: Props) => {
  return (
    <div className='grid h-screen w-full'>
      <div className="flex flex-col">
        <header className='sticky top-0 z-10 h-[57px] bg-background flex items-center gap-1 border-b px-4'>
          <h1 className='text-xl font-semibold'>
            <span className='text-[#5e9dfb]'>Medi</span>
            <span className='text-[#255dd5]'>Answer</span>
          </h1>

          <div className="w-full flex flex-row justify-end gap-2">
            <ModeToggle />
          </div>
        </header>
      </div>
    </div>
  )
}

export default HomeComponent