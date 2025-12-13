import React from 'react'
import { useState } from 'react'

const NewCategoryModal = ({ isCreateCategoryActive, setIsCreateCategoryActive, handleCreateNewCategory }) => {
    
    // state
    const [newCategoryName, setNewCategoryName] = useState('')

    return (
        <div
            className={`${isCreateCategoryActive ? 'flex' : 'hidden'} absolute top-0 left-0 bg-gray-950/60 w-full h-screen items-center justify-center`}
        >
            <div
                className='flex flex-col p-4 pt-2.5 w-80 min-h-40 gap-5 bg-gray-200 dark:bg-gray-800 dark:shadow-slate-900 rounded-md shadow shadow-slate-700 dark:text-slate-200'
            >
                {/* title and close button */}
                <div
                    className='flex flex-row items-center justify-between w-full h-fit'
                >
                    <h1
                        className='text-lg font-semibold'
                    >
                        New Category
                    </h1>
                    <button
                        className='p-1 rounded-full hover:bg-gray-400 dark:hover:bg-rose-600 duration-200'
                        onClick={() => setIsCreateCategoryActive(false)}
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path></svg>
                    </button>
                </div>
                <div
                    className='flex flex-col gap-1 w-full h-fit'
                >
                    <p
                        className='text-sm'
                    >
                        Name:
                    </p>
                    <input 
                        type="text"
                        className='w-full p-2 rounded-md border-2 outline-none text-sm border-gray-400 dark:border-emerald-400'
                        placeholder='Enter a name...'  
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                </div>
                <div
                    className='flex flex-row items-center justify-end w-full h-fit'
                >
                    <button 
                        className='text-xs bg-emerald-500 p-2 px-3 text-slate-200 font-medium rounded-md'
                        onClick={() => handleCreateNewCategory(newCategoryName)}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewCategoryModal