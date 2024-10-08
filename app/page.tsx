"use client"

import { ModeToggle } from '@/components/modetoggle'
import ReportComponent from '@/components/reportComponent'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { useToast } from '@/hooks/use-toast'
import { Settings } from 'lucide-react'
import React, { useState } from 'react'

type Props = {}

const HomeComponent = (props: Props) => {

  const [reportData, setreportData] = useState("")

  const { toast } = useToast()
  const onReportConfirmation = (data: string) => {
    setreportData(data)
    toast({
      description: 'Updated!'
    })

  }


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
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant={'outline'} size={'icon'} className='md:hidden'>
                  <Settings />
                </Button>
              </DrawerTrigger>
              <DrawerContent className='h-[80vh]'>
                <ReportComponent onReportConfirmation={onReportConfirmation} />
              </DrawerContent>
            </Drawer>
          </div>
        </header>
      </div>
    </div>
  )
}

export default HomeComponent