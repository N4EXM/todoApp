import React, { useState } from 'react'
import { truncateString, formatDate } from '../../utils/textUtils'
import { updateTask } from '../../utils/tasksUtils'


const TaskCard = ({id, due_date, is_completed, priority, title, handleTaskIsCompleted, handleDeleteTask}) => {
  
  // toggles
  const [isCompleted, setIsCompleted] = useState(is_completed)
  
  const handleToggleTask = async () => {

    const data = await handleTaskIsCompleted(id, !isCompleted)
    // console.log(data)

    if (data.success === true) {
      console.log(data)
      setIsCompleted(data.isComplete) 
    }
    else {
      console.log('failed to toggle: ', data.message)
    }

  }

  return (
    <div
      className='flex flex-row gap-3 w-full min-h-32 max-h-32 p-4 rounded-md shadow-sm bg-slate-100 shadow-slate-400 text-slate-800 dark:bg-gray-900 dark:shadow-slate-950 dark:text-slate-200  '
    >

      {/* title and date */}
      <div
        className='flex flex-col h-full w-4/5 cursor-pointer'
      >
        <h3
          className='text-sm font-medium pr-8 h-10/12'
        >
          {truncateString(title, 40)}
        </h3>
        <p
          className='text-xs dark:text-slate-400 h-2/12'
        >
          {formatDate(due_date)}
        </p>  
      </div>

      {/* priority and is completed */}
      <div
        className='flex flex-col h-full w-1/5 items-end justify-between'
      >
        <p
          className={`text-xs font-medium p-1 rounded-md ${priority === 'Low' && 'text-blue-700 bg-blue-300'} ${priority === 'Medium' && 'text-yellow-700 bg-yellow-300'} ${priority === 'High' && 'text-red-700 bg-rose-300'} h-fit w-fit px-2`}
        >
          {priority}
        </p>
        <div
          className='flex flex-row items-center gap-2 w-fit h-fit'
        >
          <button
            className='p-1.5 border-2 border-rose-500 rounded-md bg-rose-500 hob'
            onClick={handleDeleteTask}
          >
            <svg  xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path><path d="M9 10h2v8H9zM13 10h2v8h-2z"></path></svg>
          </button>
          <button
            className={`border-2 rounded-md bg-slate-50 dark:bg-gray-800 items-center justify-center border-emerald-500 p-1 flex min-w-8 min-h-8 ${!is_completed && 'p-0.5'}`}
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


    </div>
  )
}

export default TaskCard