import React, { useState } from 'react'

const TodoItem = ({id, title, completed, updateFunction, deleteFunction, onToggle}) => {

    const [isCompleted, setIsCompleted] = useState(completed)
    const [isEditOn, setIsEditOn] = useState(false)
    const [newTitle, setNewTitle] = useState(title || "")

  return (
    <div
        className='flex flex-row items-center justify-between p-2 border-2 rounded-md'
    >
        <div
            className='flex flex-row gap-2 '
        >
            <p>{id}.</p>
            
            {
                isEditOn 
                ? <input 
                    onChange={(e) => setNewTitle(e.target.value)}
                    type="text" 
                    className={`outline-none bg-transparent`}    
                    value={newTitle}
                  />
                : <p>{title}</p>
            }
        </div>
            
            {
                isEditOn 
                ? <div
                    className='flex flex-row gap-1'
                  >
                    {/* exit edit button */}
                    <button
                        onClick={() => setIsEditOn(false)}
                        className='p-1 rounded border-2 bg-rose-500'
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                        fill="currentColor" viewBox="0 0 24 24" >
                        <path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path>
                        </svg>
                    </button>
                    {/* confirm edit */}
                    <button
                        onClick={() => {}}
                        className='p-1 rounded border-2 bg-emerald-500'
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                        fill="currentColor" viewBox="0 0 24 24" >
                        <path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
                        </svg>
                    </button>

                  </div>
                : <div
                    className='flex flex-row gap-1'
                  >
                    {/* toggle box */}
                    <button
                        className={`border-2 rounded size-8 flex items-center justify-center ${isCompleted && "bg-sky-500"}`}
                        onClick={() => setIsCompleted(!isCompleted)}
                    >
                        {
                            isCompleted
                            ? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                              fill="currentColor" viewBox="0 0 24 24" >
                              <path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
                              </svg>
                            : ""
                        }
                    </button>

                    {/* turn on edit */}
                    <button
                        onClick={() => setIsEditOn(true)}
                        className='p-1 rounded border-2 bg-blue-500'
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                        fill="currentColor" viewBox="0 0 24 24" >
                        <path d="M5 21h14c1.1 0 2-.9 2-2v-7h-2v7H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2"></path><path d="M7 13v3c0 .55.45 1 1 1h3c.27 0 .52-.11.71-.29l9-9a.996.996 0 0 0 0-1.41l-3-3a.996.996 0 0 0-1.41 0l-9.01 8.99A1 1 0 0 0 7 13m10-7.59L18.59 7 17.5 8.09 15.91 6.5zm-8 8 5.5-5.5 1.59 1.59-5.5 5.5H9z"></path>
                        </svg>
                    </button>
                    {/* delete button */}
                    <button
                        onClick={() => {}}
                        className='p-1 rounded border-2 bg-rose-500'
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                        fill="currentColor" viewBox="0 0 24 24" >
                        <path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path><path d="M9 10h2v8H9zM13 10h2v8h-2z"></path>
                        </svg>
                    </button>


                </div>
            }

    </div>
  )
}

export default TodoItem