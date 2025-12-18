import React, { useState, useEffect } from 'react'
import Sidebar from '../components/navigation/Sidebar'
import LoadingPage from './LoadingPage'

const CalendarPage = () => {

    // toggles
    const [isLoading, setIsLoading] = useState(false)

    // state
    const [selectedMonth, setSelectedMonth] = useState('December')
    const [selectedYear, setSelectedYear] = useState('2025')

    // date attributes
    const [daysInSelectedMonth, setDaysInSelectedMonth] = useState(31)
    
    
    useEffect(() => {
        setTimeout(setIsLoading(true), 10000)
    }, [])

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']



    if (!isLoading) {
        return (
            <LoadingPage/>
        )
    }
    else {
        return (
            <div
                className='w-full h-screen max-h-screen bg-slate-300 dark:bg-gray-950 flex flex-row font-poppins'
            >
                {/* navbar */}
                <Sidebar/>

                {/* grid and main content */}
                <div
                    className='grid grid-cols-12 grid-rows-12 w-12/16 h-screen bg-gray-300 dark:bg-gray-950'
                >
                    
                    {/* selected date viewer */}
                    <div
                        className='col-span-4 row-span-12 bg-gray-200 dark:bg-gray-900 col-start-9'
                    >   

                    </div>

                    {/* current month */}
                    <div
                        className='grid grid-rows-12 w-full col-span-8 row-start-1 p-5 h-full'
                    >
                        <div
                            className='flex flex-row items-center justify-between w-full h-fit'
                        >
                            <p
                                className='text-2xl font-semibold dark:text-slate-200'
                            >
                                {selectedMonth} {selectedYear}
                            </p>
                            <div
                                className='flex flex-row items-center gap-2 w-fit h-fit'
                            >
                                <button
                                    className='w-fit h-fit p-1 rounded-md bg-emerald-500 hover:bg-emerald-600 text-slate-200 hover:text-slate-300 duration-200 shadow shadow-slate-600 '
                                >
                                    <svg className='rotate-180' xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m9.71 17.71 5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path></svg>
                                </button>
                                <button
                                    className='w-fit h-fit p-1 rounded-md bg-emerald-500 hover:bg-emerald-600 text-slate-200 hover:text-slate-300 duration-200 shadow shadow-slate-600'
                                >
                                    <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m9.71 17.71 5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path></svg>
                                </button>
                            </div>
                        </div>  
                    </div>

                    {/* days in the week */}
                    <div
                        className='flex flex-row items-end justify-between w-full px-5 h-full col-span-8 row-start-2'
                    >
                        {
                            days.map((day) => (
                                <p
                                    className='text-sm font-medium text-slate-500 w-full h-full flex items-end justify-start dark:text-slate-400 px-1.5'
                                >
                                    {day}
                                </p>
                            ))
                        }
                    </div>

                    {/* days in selected month */}
                    <div
                        className='col-span-8 row-span-10 w-full h-full grid grid-cols-7 grid-rows-8 gap-2 p-5'
                    >
                        {
                            Array.from({ length: daysInSelectedMonth }, (_, index) => {
                                return (
                                    <button
                                        className='w-full h-full bg-slate-200 dark:bg-slate-900 rounded-md text-start flex items-start justify-start p-2 text-sm font-medium dark:text-emerald-500'
                                    >
                                        {index + 1}
                                    </button>
                                )
                            })
                        }
                    </div>


                </div>

            </div>
        )
    }
}

export default CalendarPage