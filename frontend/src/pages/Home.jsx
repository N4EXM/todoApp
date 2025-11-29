import React, { useEffect, useState } from 'react'
import LoadingPage from './LoadingPage'
import Sidebar from '../components/navigation/Sidebar'
import { useAuth } from '../context/AuthContext'

const Home = () => {

  // context
  const { user } = useAuth()

  // toggles
  const [isLoaded, setIsLoaded] = useState(true)

  // state
  const [categories, setCategories] = useState([])
  const [tasks, setTasks] = useState([])

  const handleGetUserCatgories = () => {
    
    if (!user?.id) {
      setError("User not available")
      setLoading(false)
      throw Error('user is not logged in')
    }

    try {

      const token = localStorage.getItem('token')




    }
    catch {

    }

  }

  useEffect(() => {
    // setTimeout(setIsLoading(true), 10000)
  }, [])

  if (!isLoaded) {
    return (
      <LoadingPage/>
    )
  }
  else {
    return (
      <div
        className='w-full h-screen max-h-screen bg-slate-200 dark:bg-gray-950 flex flex-row font-poppins'
      >
        
        {/* navigation */}
        <Sidebar/>

        {/* main content */}
        <div
          className={`flex flex-col w-12/16 h-screen max-h-screen overflow-y-scroll p-8 ${categories.length <= 0 ? 'items-center justify-center' : ''}`}
        >
          {
            categories.length <= 0 
            ?   <div
                  className='bg-slate-400/30 dark:bg-gray-900 rounded-md w-full h-full gap-5 flex flex-col items-center justify-center shadow-sm shadow-slate-400 dark:shadow-none'
                >

                  <i
                    className='text-emerald-400 bg-slate-200/60 rounded-full p-3 w-fit h-fit shadow-sm shadow-slate-400 dark:shadow-none dark:bg-slate-700/60'
                  >
                    <svg  xmlns="http://www.w3.org/2000/svg" width={64} height={64} fill={"currentcolor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m21.53,5.15c-.29-.18-.66-.2-.97-.04l-10,5c-.34.17-.55.52-.55.89v10c0,.35.18.67.47.85.16.1.34.15.53.15.15,0,.31-.04.45-.11l10-5c.34-.17.55-.52.55-.89V6c0-.35-.18-.67-.47-.85Zm-1.53,10.23l-8,4v-7.76l8-4v7.76Z"></path><path d="m16.55,3.11l-10,5c-.34.17-.55.52-.55.89v10h2v-9.38l9.45-4.72-.89-1.79Z"></path><path d="m12.55,1.11L2.55,6.11c-.34.17-.55.52-.55.89v10h2V7.62L13.45,2.89l-.89-1.79Z"></path></svg>
                  </i>

                  <div
                    className='flex flex-col gap-1 w-fit h-fit text-center '
                  >
                    <h1
                      className='text-xl font-semibold dark:text-slate-200'
                    >
                      No categories found
                    </h1>
                    <p
                      className='text-sm px-60 dark:text-slate-200/60'
                    >
                      Couldn't retrieve any categories from the server, try again
                    </p>
                  </div>

                </div>
            :   <div>

                </div>
          }
        </div>

      </div>
    )
  }
  
}

export default Home