import React, { useEffect, useState } from 'react'
import { formatDate, formatDateForInput } from '../../utils/textUtils'
import useClickOutside from '../../hooks/useClickOutside';
import { updateTask } from '../../utils/tasksUtils';

const TaskModal = ({ handleCloseTask, task = null, handleUpdateTask, handleTaskIsCompleted }) => {

    // toggles
    const [isCompleted, setIsCompleted] = useState(task?.is_completed || false);
    const [isEditActive, setIsEditActive] = useState(false)
    const [isDropDownActive, setIsDropDownActive] = useState(false)

    // state
    const [name, setName] = useState(task.title)
    const [date, setDate] = useState(formatDate(task.due_date))
    const [selectedPriority, setSelectedPriority] = useState(task.priority)
    const [description, setDescription] = useState(task.description)

    const priorities = ['Low', 'Medium', 'High']

    // hooks
    const outsideRef = useClickOutside(() => setIsDropDownActive(false))


    // functions
    const handleCloseTaskModal = () => {
        setIsEditActive(false)
        handleCloseTask()
    }

    const handleSelectPriority = (priority) => {
        setIsDropDownActive(false)
        setSelectedPriority(priority)
    }

    const toggleEdit = () => {

        if (isEditActive) {
            setName(task.title)
            setDate(formatDateForInput(task.due_date))
            setSelectedPriority(task.priority)
            setDescription(task.description)
            setIsEditActive(false)
        }
        else {
            setIsEditActive(true)
        }

    }

    const editTask = () => {
        
        handleUpdateTask(task.id, name, description, date, isCompleted, selectedPriority)
        setIsEditActive(false)

    }

    const handleToggleTask = async () => {

        const data = await handleTaskIsCompleted(task.id, !isCompleted)
        // console.log(data)

        if (data === true) {
            console.log(data)
            setIsCompleted(!isCompleted) 
        }
        else {
            console.log('failed to toggle: ', data.message)
        }

    }

    return (
        <div
            className={`flex w-full h-screen bg-slate-900/80 absolute top-0 left-0 items-center justify-center font-poppins text-slate-800 dark:text-slate-200 z-50`}
        >

            {/* modal */}
            <div
                className='w-md h-120 bg-gray-200 rounded-md p-4 pt-3.5 shadow-md shadow-gray-700 flex flex-col justify-start gap-5 border-2 border-slate-300 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-950'
            >
                {/* exit and edit button */}
                <div
                    className='flex flex-row gap-2 items-start justify-between w-full'
                >
                    <button 
                        onClick={() => handleCloseTaskModal()}
                        className='p-1 hover:bg-rose-500 bg-gray-300 dark:bg-gray-900 hover:text-slate-200 rounded-full duration-200'
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path></svg>
                    </button>
                    <button
                        className='p-1.5 rounded-md bg-emerald-500 hover:bg-emerald-600 text-slate-200 duration-200'
                        onClick={() => toggleEdit()}
                    >
                        {
                            isEditActive
                            ?   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 32 32">
                                <path fill="currentColor" d="M30 28.6L3.4 2L2 3.4l10.1 10.1L4 21.6V28h6.4l8.1-8.1L28.6 30zM9.6 26H6v-3.6l7.5-7.5l3.6 3.6zM29.4 6.2l-3.6-3.6c-.8-.8-2-.8-2.8 0l-8 8l1.4 1.4L20 8.4l3.6 3.6l-3.6 3.6l1.4 1.4l8-8c.8-.8.8-2 0-2.8M25 10.6L21.4 7l3-3L28 7.6z"/></svg>
                            :   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 32 32">
                                <path fill="currentColor" d="M2 26h28v2H2zM25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4zm-5-5L24 7.6l-3 3L17.4 7zM6 22v-3.6l10-10l3.6 3.6l-10 10z"/></svg>
                        }
                    </button>
                </div>

                {
                    isEditActive
                    ?   <div
                            className='flex flex-col w-full h-full gap-3'
                        >
                            {/* title and exit */}
                            <div
                                className='flex flex-col gap-2'
                            >
                                <h1
                                    className='text-lg font-medium'
                                >
                                    Edit task
                                </h1>
                                <p
                                    className='text-sm text-gray-500'
                                >
                                    Edit your tasks details into the fields 
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
                                        className='p-2 pl-3 pr-10 rounded-md bg-gray-300 text-sm outline-none dark:bg-gray-900'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <button
                                        className={`${name.length === 0 ? 'hidden' : 'flex'} absolute top-8.5 right-3 text-gray-400`}
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
                                            className='p-2 pl-3 rounded-md bg-gray-300 dark:bg-gray-900 text-sm outline-none'
                                            placeholder='Enter a date...'
                                            value={formatDateForInput(date)}
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
                                                className='w-full bg-gray-300 h-fit p-2 rounded-md flex dark:bg-gray-900 items-center justify-between px-3 gap-2'
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
                                            className={`${isDropDownActive ? 'flex' : 'hidden'} flex-col bg-gray-300 dark:bg-gray-900 absolute top-16 right-0 w-full rounded-md z-20 shadow dark:shadow-slate-950 `}
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
                                    className='text-sm w-full bg-gray-300 dark:bg-gray-900 rounded-md p-3 pt-2.5 outline-none h-full resize-none'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder='Enter a description'
                                >
                                </textarea>
                            </div>

                            {/* update button */}
                            <div
                                className='flex items-center justify-end w-full h-fit'
                            >
                                <button
                                    className='px-2.5 p-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-200 hover:text-slate-300 duration-200 text-xs rounded-md font-medium cursor-pointer'
                                    onClick={() => editTask()}
                                >
                                    update
                                </button>
                            </div>

                        </div>

                    :   <div
                            className='flex flex-col gap-5 w-full h-full justify-start items-start'
                        >

                            {/* title */}
                            <h1
                                className='text-lg font-medium pr-12'
                            >
                                {name}
                            </h1>

                            {/* due date and priority */}
                            <div
                                className='flex flex-col gap-4 w-full h-fit'
                            >

                                {/* due date */}
                                <div
                                    className='flex text-sm flex-row items-center gap-2 w-fit h-fit'
                                >
                                    <svg className='text-stone-600 dark:text-stone-400' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20"><path fill="currentColor" d="M5.673 0a.7.7 0 0 1 .7.7v1.309h7.517v-1.3a.7.7 0 0 1 1.4 0v1.3H18a2 2 0 0 1 2 1.999v13.993A2 2 0 0 1 18 20H2a2 2 0 0 1-2-1.999V4.008a2 2 0 0 1 2-1.999h2.973V.699a.7.7 0 0 1 .7-.699M1.4 7.742v10.259a.6.6 0 0 0 .6.6h16a.6.6 0 0 0 .6-.6V7.756zm5.267 6.877v1.666H5v-1.666zm4.166 0v1.666H9.167v-1.666zm4.167 0v1.666h-1.667v-1.666zm-8.333-3.977v1.666H5v-1.666zm4.166 0v1.666H9.167v-1.666zm4.167 0v1.666h-1.667v-1.666zM4.973 3.408H2a.6.6 0 0 0-.6.6v2.335l17.2.014V4.008a.6.6 0 0 0-.6-.6h-2.71v.929a.7.7 0 0 1-1.4 0v-.929H6.373v.92a.7.7 0 0 1-1.4 0z"/></svg>
                                    <p
                                        className='font-semibold text-stone-600 dark:text-stone-300'
                                    >
                                        Due date:
                                    </p>
                                    <p
                                        className='ml-10'
                                    >
                                        {date}
                                    </p>
                                </div>

                                {/* priority */}
                                <div
                                    className='flex text-sm flex-row items-center gap-2 w-fit h-fit'
                                >
                                    <svg className='text-stone-600 dark:text-stone-400' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372"/><path fill="currentColor" d="M464 688a48 48 0 1 0 96 0a48 48 0 1 0-96 0m24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8"/></svg>
                                    <p
                                        className='font-semibold text-stone-600 dark:text-stone-300'
                                    >
                                        Priority:
                                    </p>
                                    <p
                                        className={`ml-13 p-1 px-2 rounded-md text-xs font-medium ${selectedPriority === 'Low' && 'bg-blue-300 text-blue-600'} ${selectedPriority === 'Medium' && 'bg-yellow-300 text-yellow-600'} ${selectedPriority === 'High' && 'bg-rose-300 text-rose-600'}`}
                                    >
                                        {selectedPriority}
                                    </p>
                                </div>

                                {/* progress */}
                                <div
                                    className='flex text-sm flex-row items-center gap-2 w-fit h-fit'
                                >
                                    <svg className='text-stone-600 dark:text-stone-400' xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M19 3h-2c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1H5c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 17H5V5h2v2h10V5h2z"></path><path d="M11 14.09 8.71 11.8 7.3 13.21l3 3c.2.2.45.29.71.29s.51-.1.71-.29l5-5-1.41-1.41-4.29 4.29Z"></path></svg>
                                    <p
                                        className='font-semibold text-stone-600 dark:text-stone-300'
                                    >
                                        Completed:
                                    </p>
                                    <p
                                        className={`ml-5 font-medium pr-2 p-1 rounded-full flex flex-row items-center gap-1 text-xs ${isCompleted == 1 ? 'bg-emerald-300 text-emerald-600' : 'bg-rose-300 text-rose-600'}`}
                                    >
                                        <svg  xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 5a7 7 0 1 0 0 14 7 7 0 1 0 0-14"></path></svg>
                                        {
                                            isCompleted == 0
                                            ? 'In progress'
                                            : 'Completed'
                                        }
                                    </p>
                                </div>

                            </div>

                            {/* description */}
                            <div
                                className='flex flex-col gap-2 w-full h-full'
                            >
                                <h3
                                    className='font-medium text-sm'
                                >
                                    Description
                                </h3>
                                <p
                                    className='p-2 text-sm bg-gray-300 dark:bg-gray-900 w-full h-full rounded-md'
                                >
                                    {description}
                                </p>
                            </div>

                            {/* toggle button */}
                            <div
                                className='flex items-center justify-end w-full h-fit'
                            >
                                <button
                                    className={`border-2 rounded-md bg-gray-200 dark:bg-gray-800 items-center justify-center border-emerald-500 p-1 flex min-w-8 min-h-8 ${!isCompleted && 'p-0.5'}`}
                                    onClick={() => handleToggleTask()}
                                >
                                    {
                                    isCompleted
                                    ? <svg
                                        xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"#34d399"} viewBox="0 0 24 24"><path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
                                        </svg>
                                    : ''
                                    }
                                </button>
                            </div>

                        </div>
                }

            </div>
        </div>
    )
}

export default TaskModal