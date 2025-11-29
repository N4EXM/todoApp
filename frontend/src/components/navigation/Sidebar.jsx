import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'


const Sidebar = () => {

    const location = useLocation()

    const { logout } = useAuth()

    const navigate = useNavigate()

    // toggles
    const [isLoginWarning, setIsLoginWarning] = useState(false)

    const handleLogout = async () => {
        
        try {
            await logout()
            navigate('/Login')
        }
        catch (error) {
            console.log('error: ',error)
        }

    }

    return (
        <>
            <div
                className='p-4 w-4/16 h-screen bg-gray-950 dark:bg-gray-900 flex flex-col gap-40 font-poppins relative border-r-2 dark:border-slate-800 border-slate-500'
            >

                {/* name */}
                <div
                    className='flex flex-row items-center gap-2'
                >
                    <svg  xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill={"#34d399"} viewBox="0 0 24 24">{/* Boxicons v3.0.5 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M5 19V5h14v14z"></path><path d="M7 7h2v2H7zM11 7h6v2h-6zM7 11h2v2H7zM11 11h6v2h-6zM7 15h2v2H7zM11 15h6v2h-6z"></path></svg>
                    <h1
                        className='font-bold text-2xl text-slate-200'
                    >
                        ClearFlow
                    </h1>
                </div>

                {/* routes */}
                <div
                    className='flex flex-col gap-2 w-full h-fit'
                >
                    <Link
                        to={'/'}
                        className={`text-slate-200 p-2 rounded-md font-medium w-full flex-row flex gap-3 items-center ${location.pathname === '/' && 'bg-emerald-400'}`}
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentcolor"} viewBox="0 0 24 24">{/* Boxicons v3.0.5 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m20,3H4c-1.1,0-2,.9-2,2v14c0,1.1.9,2,2,2h16c1.1,0,2-.9,2-2V5c0-1.1-.9-2-2-2Zm0,5.25h-10v-3.25h10v3.25Zm-10,2h10v3.5s-10,0-10,0v-3.5Zm-2,3.5h-4v-3.5h4v3.5Zm0-8.75v3.25h-4v-3.25h4Zm-4,14v-3.25h4v3.25h-4Zm6,0v-3.25h10v3.25s-10,0-10,0Z"></path></svg>
                        Tasks
                    </Link>
                    <Link
                        to={'/Calendar'}
                        className={`text-slate-200 p-2 rounded-md font-medium w-full flex-row flex gap-3 items-center ${location.pathname === '/Calendar' && 'bg-emerald-400'}`}
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentcolor"} viewBox="0 0 24 24">{/* Boxicons v3.0.5 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m19,4h-2v-2h-2v2h-6v-2h-2v2h-2c-1.1,0-2,.9-2,2v14c0,1.1.9,2,2,2h14c1.1,0,2-.9,2-2V6c0-1.1-.9-2-2-2ZM5,20v-12h14v-2,14s-14,0-14,0Z"></path><path d="M7 11H9V13H7z"></path><path d="M11 11H13V13H11z"></path><path d="M15 11H17V13H15z"></path><path d="M7 15H9V17H7z"></path><path d="M11 15H13V17H11z"></path><path d="M15 15H17V17H15z"></path></svg>
                        Calendar
                    </Link>
                </div>

                <div
                    className='absolute bottom-0 left-0 w-full'
                >
                    <div
                        className='p-4'
                    >
                        <button
                            className='flex flex-row items-center gap-3 text-slate-200 p-2 hover:bg-rose-500 rounded-md font-medium w-full '
                            onClick={() => setIsLoginWarning(true)}
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentcolor"} viewBox="0 0 24 24">{/* Boxicons v3.0.5 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M9 13h7v-2H9V7l-6 5 6 5z"></path><path d="M19 3h-7v2h7v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2"></path></svg>
                            Logout
                        </button>
                    </div>
                    
                </div>


            </div>

            {/* logout warning modal */}
            <div
                className={`${isLoginWarning ? 'flex' : 'hidden'} items-center justify-center bg-slate-950/80 absolute left-0 top-0 w-full h-screen`}
            >

                <div
                    className='flex flex-col gap-3 p-5 items-center w-104 h-56 bg-slate-200 dark:bg-gray-800 rounded-md'
                >
                    <i
                        className='text-rose-500 bg-rose-200 rounded-full p-2'
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width={40} height={40} fill={"currentcolor"} viewBox="0 0 24 24">{/* Boxicons v3.0.5 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M11 7h2v6h-2zM11 15h2v2h-2z"></path><path d="M12 22c5.51 0 10-4.49 10-10S17.51 2 12 2 2 6.49 2 12s4.49 10 10 10m0-18c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8"></path></svg>
                    </i>
                    <div
                        className='flex flex-col gap-2'
                    >
                        <h1
                            className='text-xl font-semibold dark:text-slate-200'
                        >
                            Are you sure you want logout
                        </h1>
                        <p
                            className='text-center text-slate-400'
                        >
                            Any unsaved data will be lost
                        </p>
                    </div>
                    <div
                        className='flex flex-row items-center gap-2 w-full h-full'
                    >
                        <button
                            className='dark:bg-slate-900 bg-slate-300 w-1/2 h-full p-2 text-slate-500 dark:text-slate-300 rounded-md font-medium duration-200 hover:bg-slate-400 hover:text-slate-200 dark:hover:bg-slate-950'
                            onClick={() => setIsLoginWarning(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className='bg-rose-500 w-1/2 h-full p-2 text-slate-200 duration-200 hover:bg-rose-600 rounded-md font-medium'
                            onClick={() => handleLogout()}
                        >
                            Logout
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Sidebar