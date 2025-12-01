import React, { useState } from 'react'

const CategoriesCard = ({ name, id }) => {

  // toggles
  const [isLoading, setIsLoading] = useState(true)


  // state
  const [tasks, setTasks] = useState([])

  const handleGetUserTasks = async () => {

  }


  return (
    <div
      className='flex flex-col gap-4 w-2/5 min-w-100 h-full bg-slate-200 rounded-md p-5 shadow-md shadow-slate-400 dark:bg-gray-800 dark:text-slate-200 dark:shadow-none '
    >
      
      <div
        className='flex flex-row items-center justify-between w-full h-fit' 
      >
        <h1>
          {name}
        </h1>

        {/* buttons */}
        <div
          className='flex flex-row items-center gap-2'
        >

          {/* closest date */}
          <button
            className='bg-slate-300 p-2 rounded-md text-emerald-400 shadow-sm shadow-slate-400/60 hover:bg-emerald-400 hover:text-slate-200 duration-200 dark:shadow-slate-800 dark:bg-gray-900'
          > 
            <svg  xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill={"currentcolor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m19.07,4.93c-.92-.92-1.99-1.64-3.18-2.14-1.23-.52-2.54-.79-3.89-.79-.55,0-1,.45-1,1v5h2v-3.94c.73.09,1.44.28,2.11.57.95.4,1.81.98,2.54,1.72.74.73,1.31,1.59,1.71,2.54.42.99.63,2.03.63,3.11s-.21,2.13-.63,3.11c-.4.95-.98,1.81-1.72,2.54-.73.74-1.59,1.31-2.54,1.71-1.97.83-4.26.83-6.23,0-.95-.4-1.81-.98-2.54-1.72-.74-.73-1.31-1.59-1.71-2.54-.42-.99-.63-2.03-.63-3.11s.21-2.13.63-3.11c.4-.95.98-1.81,1.72-2.54l-1.41-1.42c-.92.92-1.64,1.99-2.14,3.18-.52,1.23-.79,2.54-.79,3.89s.26,2.66.79,3.89c.5,1.19,1.23,2.26,2.14,3.18s1.99,1.64,3.18,2.14c1.23.52,2.54.79,3.89.79s2.66-.26,3.89-.79c1.19-.5,2.26-1.23,3.18-2.14s1.64-1.99,2.14-3.18c.52-1.23.79-2.54.79-3.89s-.26-2.66-.79-3.89c-.5-1.19-1.23-2.26-2.14-3.18Z"></path><path d="m12.88,11.12l-4.88-3.12,3.12,4.88c1.22,1.68,3.45-.55,1.77-1.77Z"></path></svg>
          </button>

          {/* reverse list */}
          <button
            className='bg-slate-300 p-2 rounded-md text-emerald-400 shadow-sm shadow-slate-400/60 hover:bg-emerald-400 hover:text-slate-200 duration-200 dark:shadow-slate-800 dark:bg-gray-900'
          > 
            <svg  xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill={"currentcolor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M6 22 8 22 8 8 12 8 7 2 2 8 6 8 6 22z"></path><path d="M19 2 17 2 17 16 13 16 18 22 23 16 19 16 19 2z"></path></svg>
          </button>

          {/* add new task */}
          <button
            className='bg-slate-300 p-2 rounded-md text-emerald-400 shadow-sm shadow-slate-400/60 hover:bg-emerald-400 hover:text-slate-200 duration-200 dark:shadow-slate-800 dark:bg-gray-900'
          > 
            <svg  xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z"></path></svg>
          </button>

          {/*  delete category */}
          <button
            className='bg-slate-300 p-2 rounded-md text-rose-500 shadow-sm shadow-slate-400/60 hover:bg-rose-500 hover:text-slate-200 duration-200 dark:shadow-slate-800 dark:bg-gray-900'
          > 
            <svg  xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path><path d="M9 10h2v8H9zM13 10h2v8h-2z"></path></svg>
          </button>



        </div>

      </div>

      {
        tasks.length == 0
        ?   <div
              className='w-full h-full bg-slate-400 rounded-md flex flex-col overflow-y-scroll'
            >
              
            </div>
        :   <div>

            </div>
      }

    </div>
  )
}

export default CategoriesCard