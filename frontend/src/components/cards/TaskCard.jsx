import React from 'react'
import { truncateString, formatDate } from '../../utils/textUtils'

const TaskCard = ({due_date, is_completed, priority, title}) => {
  return (
    <div
      className='flex flex-col gap-3 w-full min-h-32 max-h-32 p-4 rounded-md shadow-sm bg-slate-100 shadow-slate-400 text-slate-800 dark:bg-gray-900 dark:shadow-slate-950 dark:text-slate-200  '
    >
      {/* title and priority */}
      <div
        className='flex flex-row w-full h-full'
      >
        <h3
          className='text-sm font-medium pr-8'
        >
          {truncateString(title, 40)}
        </h3>
        <p
          className={`text-xs font-medium p-1 rounded-md ${priority === 'Low' && 'text-blue-700 bg-blue-300'} ${priority === 'Medium' && 'text-yellow-700 bg-yellow-300'} ${priority === 'High' && 'text-red-700 bg-rose-300'} h-fit px-2`}
        >
          {priority}
        </p>
      </div>
      
      {/* date and checkbox */}
      <div
        className='flex flex-row items-end justify-between w-full'
      > 
        <p
          className='text-xs dark:text-slate-400'
        >
          {formatDate(due_date)}
        </p>
        <button
          className={`border-2 items-center justify-center border-emerald-500 p-1 flex ${!is_completed && 'size-8.5'}`}
        >
          {
            is_completed
            ? <svg
                xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"#34d399"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
              </svg>
            : ''
          }
        </button>
      </div>

    </div>
  )
}

export default TaskCard