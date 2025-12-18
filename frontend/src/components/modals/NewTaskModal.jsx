import React, { useState } from 'react'
import useClickOutside from '../../hooks/useClickOutside'


const NewTaskModal = ({isActive, handleCloseNewTask, handleCreateTask}) => {

    // toggles
    const [isDropDownActive, setIsDropDownActive] = useState(false)

    // state
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [selectedPriority, setSelectedPriority] = useState('priority')
    const [description, setDescription] = useState('')

    // hooks
    const outsideRef = useClickOutside(() => setIsDropDownActive(false))

    const priorities = ['Low', 'Medium', 'High']

    const handleSelectPriority = (priority) => {
        setIsDropDownActive(false)
        setSelectedPriority(priority)
    }

    return (
        <div
            className={`${isActive ? 'flex' : 'hidden'} w-full h-screen bg-slate-900/80 absolute top-0 left-0 items-center justify-center font-poppins text-slate-800 dark:text-slate-200 z-50`}
        >

            {/* modal */}
            <div
                className='w-md h-120 bg-slate-200 rounded-md p-4 pt-3.5 shadow-md shadow-slate-700 flex flex-col justify-between gap-5 border-2 border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:shadow-slate-950'
            >
                
                {/* title and exit */}
                <div
                    className='flex flex-col gap-2'
                >
                    <div
                        className='flex flex-row items-center justify-between w-full h-fit'
                    >
                        <h1
                            className='text-xl font-semibold'
                        >
                            Create Task
                        </h1>
                        <button
                            onClick={() => handleCloseNewTask()}
                            className='p-1 hover:bg-rose-500 hover:text-slate-200 rounded-full duration-200'
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path></svg>
                        </button>
                    </div>
                    <p
                        className='text-sm text-slate-500'
                    >
                        Enter your tasks details into the fields 
                    </p>
                </div>

                {/* name, date and priority */}
                <div
                    className='flex flex-col gap-3 w-full h-fit'
                >
                    {/* name */}
                    <div
                        className='relative flex flex-col gap-1 w-full h-fit'
                    >   
                        <p
                            className='text-sm font-medium pl-1'
                        >
                            Name:
                        </p>
                        <input 
                            type="text"
                            placeholder='Name...'
                            className='p-2 pl-3 rounded-md bg-slate-300 text-sm outline-none dark:bg-slate-900'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button
                            className={`${name.length === 0 ? 'hidden' : 'flex'} absolute top-8.5 right-3 text-slate-400`}
                            onClick={() => setName('')}
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path></svg>
                        </button>
                    </div>

                    <div
                        className='w-full flex gap-2 flex-row items-center h-fit'
                    >
                        {/* date */}
                        <div
                            className='flex flex-col gap-1 w-3/4 h-fit'
                        >   
                            <p
                                className='text-sm font-medium pl-1'
                            >
                                Date:
                            </p>    
                            <input 
                                type="date" 
                                className='p-2 pl-3 rounded-md bg-slate-300 dark:bg-slate-900 text-sm outline-none'
                                placeholder='Enter a date...'
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        {/* priority */}
                        <div
                            className='w-1/4 h-full relative font-medium'
                        >   
                            <div
                                className='flex flex-col gap-1 w-full h-fit'
                            >
                                <p
                                    className='text-sm font-medium pl-1'
                                >
                                    Priority:
                                </p>
                                <button
                                    className='w-full bg-slate-300 h-fit p-2 rounded-md flex dark:bg-slate-900 items-center justify-between px-3 gap-2'
                                    onClick={() => setIsDropDownActive(!isDropDownActive)}
                                >
                                    <p
                                        className='text-sm'
                                    >
                                        {selectedPriority}
                                    </p>
                                    <svg className={`${isDropDownActive ? 'rotate-180 duration-200' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M17.35 8H6.65c-.64 0-.99.76-.56 1.24l5.35 6.11c.3.34.83.34 1.13 0l5.35-6.11C18.34 8.76 18 8 17.36 8Z"></path></svg>
                                </button>
                            </div>
                            <div
                                className={`${isDropDownActive ? 'flex' : 'hidden'} flex-col bg-slate-300 dark:bg-slate-900 absolute top-16 right-0 w-full rounded-md z-20 shadow dark:shadow-slate-950 `}
                                ref={outsideRef}
                            >
                                {
                                    priorities.map((priority, index) => (
                                        <button
                                            key={priority}
                                            className={`p-2 text-sm w-full text-start px-4 hover:bg-emerald-500 hover:text-slate-200 ${index === 0 && 'rounded-t-md'} ${index === priorities.length - 1 && 'rounded-b-md'}`}
                                            onClick={() => handleSelectPriority(priority)}
                                        >
                                            {priority}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>


                    </div>

                </div>

                {/* description */}
                <div
                    className='flex flex-col gap-1 w-full h-full'
                >
                    <p
                        className='text-sm pl-1 font-medium'
                    >
                        Description:
                    </p>
                    <textarea
                        className='text-sm w-full bg-slate-300 dark:bg-slate-900 rounded-md p-3 pt-2.5 outline-none h-full resize-none'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Enter a description'
                    >
                    </textarea>
                </div>

                {/* create button */}
                <div
                    className='flex items-center justify-end w-full h-fit'
                >
                    <button
                        className='px-3 p-2 bg-emerald-500 hover:bg-emerald-600 text-slate-200 hover:text-slate-300 duration-200 text-sm rounded-md font-medium cursor-pointer'
                        onClick={() => handleCreateTask(name, date, selectedPriority, description)}
                    >
                        Create
                    </button>
                </div>

            </div>

        </div>
    )
}

export default NewTaskModal