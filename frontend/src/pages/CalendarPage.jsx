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
import { useAuth } from '../context/AuthContext'
import { getAllUserTasks, toggleIsCompleted, deleteTask, updateTask } from '../utils/tasksUtils'
import TaskCard from '../components/cards/TaskCard'
import TaskModal from '../components/modals/TaskModal'

const CalendarPage = () => {

    // context 
    const { user } = useAuth()

    // date values
    const currentDayOfMonth = getCurrentDate()
    const currentMonthIndex = getCurrentMonth()
    const currentYear = getCurrentYear()

    // toggles
    const [isLoading, setIsLoading] = useState(true)
    const [isTaskModalActive, setIsTaskModalActive] = useState(false)

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
    const [filteredtasks, setFilteredTasks] = useState([])
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

        handleFilterTasks(clickedDay)

        setSelectedDayNameIndex((getCurrentDayNameIndex(selectedYear, selectedMonthIndex, clickedDay) + 6) % 7)

    }

    const handleSelectedTask = (task) => {

        if (task !== null) {
            setSelectedTask(task)
            setIsTaskModalActive(true)
        }

    }

    const handleCloseTask = () => {
        setIsTaskModalActive(false)
        setSelectedTask(null)
    }

    const handleUpdateTask = async (id, title, description, due_date, is_completed, priority) => {
    
        const data = await updateTask(id, title, description, due_date, is_completed, priority)
    
        if (data.success === true) {
            const updatedTask = {
                id: id,
                title: title, 
                description: description,
                due_date: due_date,
                is_completed: is_completed,
                priority: priority
            }
            
            setTasks(prevTasks => 
                prevTasks.map(task => 
                task.id === id 
                ? updatedTask 
                : task
            ));

            const filterTasks = filteredtasks.filter(task => task.id !== id)

            setFilteredTasks(filterTasks)
    
        }
        else {
            alert('failed to updated task')
        }
    
    }

    const handleTaskIsCompleted = async (id, is_completed) => {

        const data = await toggleIsCompleted(id, is_completed)

        if (data.success) {
            return true
        }
        else {
            return false
        }

    }

    const handleGetUserTasks = async () => {

        setIsLoading(true)

        const data = await getAllUserTasks(user.id)

        if (data.success === true) {
            setTasks(data.tasks)
            setIsLoading(false)
        }
        else {
            return false
        }

    }

    const handleFilterTasks = (selectedDay) => {

        // Create date string for the selected date
        const selectedMonth = (selectedMonthIndex + 1).toString().padStart(2, '0');
        const selectedDayStr = selectedDay.toString().padStart(2, '0');
        const selectedDateStr = `${selectedYear}-${selectedMonth}-${selectedDayStr}`;

        const filterTasks = tasks.filter(task => task.due_date.substring(0,10) === selectedDateStr)

        setFilteredTasks(filterTasks)

    }

    const handleDeleteTask = async (id) => {
    
        const data = await deleteTask(id)
    
        if (data.success == true) {
    
            const filtered = filteredtasks.filter(task => task.id !== id);
            const filterAllTasks = tasks.filter(task => task.id !== id)

            setTasks(filterAllTasks)
            setFilteredTasks(filtered)
    
            alert('Task deleted successfully')
    
        }
        else {
            alert(data.message)
        }
    
    }

    // Update first day of month when month or year changes
    useEffect(() => {
        setFirstDayOfMonth(getFirstDayOfMonth(selectedYear, selectedMonthIndex))
    }, [selectedYear, selectedMonthIndex])

    useEffect(() => {
        handleGetUserTasks()
    }, [])


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


    if (isLoading) {
        return <LoadingPage/>
    }

    return (
        <div className='w-full h-screen max-h-screen bg-slate-300 dark:bg-slate-950 flex flex-row font-poppins overflow-hidden relative'>
            {/* navbar */}
            <Sidebar/>

            {/* grid and main content */}
            <div className='grid grid-cols-12 grid-rows-12 w-12/16 h-screen bg-slate-300 dark:bg-slate-950'>
                {/* selected date viewer */}
                <div className='col-span-5 row-span-12 col-start-9 p-4 pl-0 w-full h-full '>

                    {
                        selectedDay !== null
                        ?   <div
                                className='flex flex-col gap-4 w-full h-full'
                            >
                                {/* current day */}
                                <div
                                    className='w-fit font-semibold text-2xl dark:text-slate-200 flex flex-row-reverse gap-2 mt-22'
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
                                    className='flex items-start justify-start w-full h-full'
                                >
                                    {
                                        filteredtasks.length > 0
                                        ?   <div
                                                className='w-full h-full overflow-y-scroll flex flex-col gap-2 scrollbar-hide'
                                            >
                                                {
                                                    filteredtasks.map((task) => (
                                                        <TaskCard
                                                            key={task.id}
                                                            id={task.id}
                                                            title={task.title}
                                                            description={task.description}
                                                            due_date={task.due_date}
                                                            is_completed={task.is_completed}
                                                            priority={task.priority}
                                                            handleTaskIsCompleted={handleTaskIsCompleted}
                                                            handleDeleteTask={() => handleDeleteTask(task.id)}
                                                            handleSelectedTask={handleSelectedTask}
                                                        />
                                                    ))
                                                }
                                            </div>
                                        :   <div
                                                className='flex flex-col gap-4 w-full h-full items-center justify-center bg-slate-200 dark:bg-slate-900 rounded-md shadow shadow-slate-400 dark:shadow-none'
                                            >
                                                <svg className='p-2 rounded-full bg-slate-300/60 dark:bg-slate-700/60 text-emerald-500 shadow shadow-slate-800' xmlns="http://www.w3.org/2000/svg" width={56} height={56} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M4 11H12V13H4z"></path><path d="M4 6H20V8H4z"></path><path d="M4 16H12V18H4z"></path><path d="M20.29 13.29 18 15.59 15.71 13.29 14.29 14.71 16.59 17 14.29 19.29 15.71 20.71 18 18.41 20.29 20.71 21.71 19.29 19.41 17 21.71 14.71 20.29 13.29z"></path></svg>
                                                <div
                                                    className='flex flex-col gap-2 w-full h-fit text-center'
                                                >
                                                    <h1
                                                        className='font-semibold text-slate-900 dark:text-slate-200'
                                                    >
                                                        No Tasks for this date
                                                    </h1>
                                                    <p
                                                        className='px-8 text-sm text-center text-slate-600 dark:text-slate-400'
                                                    >
                                                        There are no tasks for this date, select another date.
                                                    </p>
                                                </div>
                                            </div> 
                                    }
                                </div>
                            </div>

                        :   

                            <div
                                className='w-full h-full items-center justify-center flex dark:text-slate-200 bg-slate-200 dark:bg-slate-900 rounded-md shadow shadow-slate-500 dark:shadow-none'
                            >
                                <div
                                    className='flex flex-col gap-4 w-full h-fit items-center justify-center'
                                >
                                    <svg className='p-2 rounded-full bg-slate-300/60 dark:bg-slate-700/60 text-emerald-500 shadow shadow-slate-800' xmlns="http://www.w3.org/2000/svg" width={56} height={56} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M14.29 10.29 12 12.59 9.71 10.29 8.29 11.71 10.59 14 8.29 16.29 9.71 17.71 12 15.41 14.29 17.71 15.71 16.29 13.41 14 15.71 11.71 14.29 10.29z"></path><path d="m19,4h-2v-2h-2v2h-6v-2h-2v2h-2c-1.1,0-2,.9-2,2v14c0,1.1.9,2,2,2h14c1.1,0,2-.9,2-2V6c0-1.1-.9-2-2-2ZM5,20v-12h14v-2,14s-14,0-14,0Z"></path></svg>
                                    <div
                                        className='flex flex-col gap-2 w-full h-fit text-center'
                                    >
                                        <h1
                                            className='font-semibold text-slate-900 dark:text-slate-200'
                                        >
                                            No day has been selected
                                        </h1>
                                        <p
                                            className='px-14 text-sm text-center text-slate-600 dark:text-slate-400'
                                        >
                                            Select a date to view your tasks that need to be completed.
                                        </p>
                                    </div>
                                </div>
                            </div>
                    }

                    

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
                <div className='col-span-8 row-span-10 w-full h-full grid grid-cols-7 grid-rows-8 gap-2 p-5 '>
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
            {
                isTaskModalActive 
                && <TaskModal
                        handleCloseTask={() => handleCloseTask()}
                        task={selectedTask}
                        handleUpdateTask={handleUpdateTask}
                        handleTaskIsCompleted={handleTaskIsCompleted}
                    />
            }
        </div>
    )
}

export default CalendarPage