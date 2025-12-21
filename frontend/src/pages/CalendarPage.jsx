import React, { useState, useEffect } from 'react'
import Sidebar from '../components/navigation/Sidebar'
import LoadingPage from './LoadingPage'
import { 
    getCurrentMonth, 
    getCurrentYear, 
    getCurrentDate, 
    getDaysInMonth, 
    getFirstDayOfMonth,
    getCurrentDayNameIndex,
    getDayWithSuffix
} from '../utils/dateUtils'


const CalendarPage = () => {
    // date values
    const currentDayOfMonth = getCurrentDate()
    const currentMonthIndex = getCurrentMonth()
    const currentYear = getCurrentYear()

    // toggles
    const [isLoading, setIsLoading] = useState(false)

    // calendar state
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(currentMonthIndex)
    const [selectedYear, setSelectedYear] = useState(currentYear)
    const [selectedDay, setSelectedDay] = useState(currentDayOfMonth)
    const [selectedDayNameIndex, setSelectedDayNameIndex] = useState((getCurrentDayNameIndex(selectedYear, selectedMonthIndex, selectedDay) + 6) % 7)
    const [daysInSelectedMonth, setDaysInSelectedMonth] = useState(getDaysInMonth(selectedYear, selectedMonthIndex))
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(() => 
        getFirstDayOfMonth(selectedYear, selectedMonthIndex)
    )

    // task state
    const [tasks, setTasks] = useState([])
    const [selectedTask, setSelectedTask] = useState({})

    // move between months
    const handleMonthNavigation = (direction) => {
        if (direction === 'next') {
            setSelectedMonthIndex(prevMonthIndex => {
                const newMonthIndex = prevMonthIndex + 1
                const nextYear = selectedYear + 1 // only used if the month goes to next year
                // If moving past December, go to January of next year
                if (newMonthIndex > 11) {
                    setSelectedYear(nextYear)
                    setDaysInSelectedMonth(getDaysInMonth(nextYear, 0))
                    return 0
                }
                setDaysInSelectedMonth(getDaysInMonth(selectedYear, newMonthIndex))

                // checks if the calendar is at the current date
                if (newMonthIndex !== currentMonthIndex && selectedYear !== currentYear) {
                    setSelectedDay(null)
                }
                return newMonthIndex
            })

        } 
        else {
            setSelectedMonthIndex(prevMonthIndex => {
                const newMonthIndex = prevMonthIndex - 1
                // If moving before January, go to December of previous year
                if (newMonthIndex < 0) {
                    const prevYear = selectedYear - 1
                    setSelectedYear(prevYear)
                    setDaysInSelectedMonth(getDaysInMonth(prevYear, 11))

                    if (newMonthIndex !== currentMonthIndex && selectedYear !== currentYear) {
                        setSelectedDay(null)
                    }

                    return 11

                }
                setDaysInSelectedMonth(getDaysInMonth(selectedYear, newMonthIndex))
                return newMonthIndex
            })
        }      
    }

    const handleCalendarBtnClick = (clickedDay) => {

        setSelectedDay(clickedDay)

        setSelectedDayNameIndex((getCurrentDayNameIndex(selectedYear, selectedMonthIndex, clickedDay) + 6) % 7)

    }

    const handleGetUserTasks = async () => {

        const data = await fetch(``)

    }

    useEffect(() => {
        setTimeout(() => setIsLoading(true), 1000) // Fixed: wrapped in arrow function
    }, [])


    // Update first day of month when month or year changes
    useEffect(() => {
        setFirstDayOfMonth(getFirstDayOfMonth(selectedYear, selectedMonthIndex))
    }, [selectedYear, selectedMonthIndex])

    const days = [
        {
            short: 'Mon',
            full: 'Monday'
        },
        {
            short: 'Tue',
            full: 'Tuesday'
        },
        {
            short: 'Wed',
            full: 'Wednesday'
        },
        {
            short: 'Thu',
            full: 'Thursday'
        },
        {
            short: 'Fri',
            full: 'Friday'
        },
        {
            short: 'Sat',
            full: 'Saturday'
        },
        {
            short: 'Sun',
            full: 'Sunday'
        },

    ]
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                    'August', 'September', 'October', 'November', 'December']

    // Calculate the number of empty cells needed before the first day
    // Note: getDay() returns 0-6 where 0 = Sunday, but we have Monday first
    // We need to adjust: 0=Sunday, 1=Monday, etc.
    // To convert to our array where 0=Monday: (getDay() + 6) % 7
    const adjustedFirstDay = (firstDayOfMonth + 6) % 7 // Convert Sunday=0 to Monday=0 system
    const leadingEmptyCells = adjustedFirstDay


    if (!isLoading) {
        return <LoadingPage/>
    }

    return (
        <div className='w-full h-screen max-h-screen bg-slate-300 dark:bg-slate-950 flex flex-row font-poppins'>
            {/* navbar */}
            <Sidebar/>

            {/* grid and main content */}
            <div className='grid grid-cols-12 grid-rows-12 w-12/16 h-screen bg-slate-300 dark:bg-slate-950'>
                {/* selected date viewer */}
                <div className='col-span-4 row-span-12 col-start-9 mt-28'>

                    {/* current day */}
                    <div
                        className='w-fit font-semibold text-2xl dark:text-slate-200 flex flex-row-reverse gap-2'
                    >
                        <p>
                            {getDayWithSuffix(selectedDay)}
                        </p>
                        <h1>
                            {days[selectedDayNameIndex].full}
                        </h1>
                    </div>

                    {/* task cards */}
                    <div
                        className='w-full h-full overflow-y-scroll '
                    >
                        {
                        }
                    </div>



                </div>

                {/* current month */}
                <div className='grid grid-rows-12 w-full col-span-8 row-start-1 p-5 h-full'>
                    <div className='flex flex-row items-center justify-between w-full h-fit'>
                        <p className='text-2xl font-semibold dark:text-slate-200'>
                            {months[selectedMonthIndex]} {selectedYear}
                        </p>
                        <div className='flex flex-row items-center gap-2 w-fit h-fit'>
                            <button
                                className='w-fit h-fit p-1 rounded-md bg-emerald-500 hover:bg-emerald-600 text-slate-200 hover:text-slate-300 duration-200 shadow shadow-slate-600'
                                onClick={() => handleMonthNavigation('previous')}
                            >
                                <svg className='rotate-180' xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">
                                    <path d="m9.71 17.71 5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path>
                                </svg>
                            </button>
                            <button
                                className='w-fit h-fit p-1 rounded-md bg-emerald-500 hover:bg-emerald-600 text-slate-200 hover:text-slate-300 duration-200 shadow shadow-slate-600'
                                onClick={() => handleMonthNavigation('next')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">
                                    <path d="m9.71 17.71 5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>  
                </div>

                {/* days in the week */}
                <div className='flex flex-row items-end justify-between w-full px-5 h-full col-span-8 row-start-2'>
                    {days.map((day, index) => (
                        <p 
                            key={day.full}
                            className='text-sm font-medium text-slate-500 w-full h-full flex items-end justify-start dark:text-slate-400 px-1.5'
                        >
                            {day.short}
                        </p>
                    ))}
                </div>

                {/* days in selected month - UPDATED */}
                <div className='col-span-8 row-span-10 w-full h-full grid grid-cols-7 grid-rows-7 gap-2 p-5'>
                    {/* Add empty cells for days before the first of the month */}
                    {Array.from({ length: leadingEmptyCells }, (_, index) => (
                        <div 
                            key={`empty-${index}`}
                            className='w-full h-full rounded-md'
                            // Empty cell, no content
                        />
                    ))}

                    {/* Add actual day buttons */}
                    {Array.from({ length: daysInSelectedMonth }, (_, index) => {
                        const dayNumber = index + 1
                        return (
                            <button
                                key={dayNumber}
                                className={`w-full h-full rounded-md text-start flex items-start justify-start p-2 text-sm font-medium dark:shadow-none shadow shadow-slate-400 ${
                                    selectedDay === dayNumber 
                                        ? 'bg-emerald-500 text-slate-200' 
                                        : 'dark:text-slate-200 bg-slate-200 dark:bg-slate-900'
                                }`}
                                onClick={() => handleCalendarBtnClick(dayNumber)}
                            >
                                {dayNumber}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CalendarPage