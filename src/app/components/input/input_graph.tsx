"use client"
import { Select } from '@/components/ui/select'
import { PlayIcon, PlusIcon, SettingsIcon } from 'lucide-react'
import React, { useState } from 'react'
import Select_message from './select_message'

const Input_graph = () => {
    const [show_message, setshow_message] = useState(false)
    return (
        <div className=' w-full  px-8  '>
            <div className='w-full  bg-blue-950/40 rounded-md flex flex-col gap-4'>
                <div className='flex flex-col gap-4 p-5  border-b-2 border-gray-300'>
                    <label className='font-bold'>Input</label>
                    <div className='flex w-full'>
                        <div className='flex flex-col text-sm gap-2 w-full '>
                            <label>Message</label>
                            <div className='flex flex-col gap-2 rounded-md border px-3 border-gray-400 py-3'>
                                <Select_message />
                                <input className='my-2 border w-full text-white bg-transparent ring-0 border-none outline-none ' placeholder='Enter Message' />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={(e) => {
                            setshow_message(true)
                        }} className='hover:bg-gray-500 flex gap-2  items-center justify-center text-sm py-1 px-2 border border-gray-300 rounded-md'>
                            <PlusIcon />
                            Message
                        </button>
                    </div>
                </div>
                <div className='w-full flex justify-between p-5 pt-2 items-center'>
                    <button onClick={(e) => {
                        setshow_message(true)
                    }} className='hover:bg-gray-500 flex gap-2  items-center justify-center text-sm py-1 px-2 border border-gray-300 rounded-md'>
                        <SettingsIcon />
                        Configure
                    </button>
                    <button onClick={(e) => {
                        setshow_message(true)
                    }} className='hover:bg-blue-500 bg-blue-700 flex gap-2  items-center justify-center text-sm py-1 px-2 border border-blue-300 rounded-md'>
                        <PlayIcon />
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Input_graph