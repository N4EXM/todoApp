import React, { useState, useEffect } from 'react'
import Sidebar from '../components/navigation/Sidebar'
import LoadingPage from './LoadingPage'

const CalendarPage = () => {

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setTimeout(setIsLoading(true), 10000)
    }, [])

    if (!isLoading) {
        return (
            <LoadingPage/>
        )
    }
    else {
        return (
            <div
                className='w-full h-screen max-h-screen bg-slate-300 dark:bg-gray-950'
            >
                {/* navbar */}
                <Sidebar/>
            </div>
        )
    }
}

export default CalendarPage