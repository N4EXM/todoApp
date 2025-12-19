import React, { useState, useEffect } from 'react'
import Sidebar from '../components/navigation/Sidebar'
import LoadingPage from './LoadingPage'
import { getCurrentMonth, getCurrentYear, getCurrentDate, getDaysInMonth, getFirstDayOfMonth } from '../utils/dateUtils'

const CalendarPage = () => {

    
    // date values
    const currentDayOfMonth = getCurrentDate()
    const currentMonthIndex = getCurrentMonth()
    const currentYear = getCurrentYear()

    // toggles
    const [isLoading, setIsLoading] = useState(false)

    // state
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(getCurrentMonth()) // month num, e.g nov = 11 
    const [selectedYear, setSelectedYear] = useState(getCurrentYear())
    const [selectedDay, setSelectedDay] = useState(5)
    const [daysInSelectedMonth, setDaysInSelectedMonth] = useState(getDaysInMonth(selectedYear, selectedMonthIndex))
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(() => 
        getFirstDayOfMonth(selectedYear, selectedMonthIndex)
    )
    
    // move bewteen months
    const handleMonthNavigation = (direction) => {
        if (direction === 'next') {
        setSelectedMonthIndex(prevMonthIndex => {
            const newMonthIndex = prevMonthIndex + 1
            // If moving past December, go to January of next year
            if (newMonthIndex > 11) {
                setSelectedYear(selectedYear + 1)
                setDaysInSelectedMonth(getDaysInMonth(selectedYear + 1, 0))
                setFirstDayOfMonth(selectedYear + 1, 0)
                return 0
            }
            setDaysInSelectedMonth(getDaysInMonth(selectedYear + 1, newMonthIndex))
            setFirstDayOfMonth(selectedYear + 1, newMonthIndex)


            return newMonthIndex
        })

        } 
        else {
            setSelectedMonthIndex(prevMonthIndex => {
                const newMonthIndex = prevMonthIndex - 1
                // If moving before January, go to December of previous year
                if (newMonthIndex < 0) {
                    setSelectedYear(selectedYear - 1)
                    setDaysInSelectedMonth(getDaysInMonth(selectedYear - 1, 11))
                    setFirstDayOfMonth(selectedYear - 1, 11)
                    return 11
                }
                setDaysInSelectedMonth(getDaysInMonth(selectedYear - 1, newMonthIndex))
                setFirstDayOfMonth(selectedYear - 1, newMonthIndex)
                return newMonthIndex
            })
        }      
    }



    useEffect(() => {
        setTimeout(setIsLoading(true), 10000)
    }, [])

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const adjustedFirstDay = (firstDayOfMonth + 6) % 7 // Convert Sunday=0 to Monday=0 system
    const leadingEmptyCells = adjustedFirstDay

    // Calculate total cells needed (days in month + leading empty cells)
    const totalCells = daysInSelectedMonth + leadingEmptyCells
    // Calculate number of rows needed (7 cells per row)
    const totalRows = Math.ceil(totalCells / 7)


    if (!isLoading) {
        return (
            <LoadingPage/>
        )
    }
    else {
        return (
            <div
                className='w-full h-screen max-h-screen bg-slate-300 dark:bg-slate-950 flex flex-row font-poppins'
            >
                {/* navbar */}
                <Sidebar/>

                {/* grid and main content */}
                <div
                    className='grid grid-cols-12 grid-rows-12 w-12/16 h-screen bg-slate-300 dark:bg-slate-950'
                >
                    
                    {/* selected date viewer */}
                    <div
                        className='col-span-4 row-span-12 bg-slate-200 dark:bg-slate-900 col-start-9'
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
                                {months[selectedMonthIndex]} {selectedYear}
                            </p>
                            <div
                                className='flex flex-row items-center gap-2 w-fit h-fit'
                            >
                                <button
                                    className='w-fit h-fit p-1 rounded-md bg-emerald-500 hover:bg-emerald-600 text-slate-200 hover:text-slate-300 duration-200 shadow shadow-slate-600 '
                                    onClick={() => handleMonthNavigation('previous')}
                                >
                                    <svg className='rotate-180' xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m9.71 17.71 5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path></svg>
                                </button>
                                <button
                                    className='w-fit h-fit p-1 rounded-md bg-emerald-500 hover:bg-emerald-600 text-slate-200 hover:text-slate-300 duration-200 shadow shadow-slate-600'
                                    onClick={() => handleMonthNavigation('next')}
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
                    <div className='col-span-8 row-span-10 w-full h-full grid grid-cols-7 grid-rows-6 gap-2 p-5'>
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
                                    className={`w-full h-full rounded-md text-start flex items-start justify-start p-2 text-sm font-medium dark:shadow-none shadow shadow-slate-400 max-h-40 max-w-40 ${
                                        selectedDay === dayNumber 
                                            ? 'bg-emerald-500 text-slate-200' 
                                            : 'dark:text-slate-200 bg-slate-200 dark:bg-slate-900'
                                    }`}
                                    onClick={() => setSelectedDay(dayNumber)}
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
}

export default CalendarPage