import React, { useEffect, useState } from 'react'
import LoadingPage from './LoadingPage'
import Sidebar from '../components/navigation/Sidebar'
import { useAuth } from '../context/AuthContext'
import CategoriesCard from '../components/cards/CategoriesCard'

const Home = () => {

  // context
  const { user } = useAuth()

  // toggles
  const [isLoaded, setIsLoaded] = useState(true)
  const [isRefresh, setIsRefresh] = useState(false)

  // state
  const [categories, setCategories] = useState([])
  const [tasks, setTasks] = useState([])

  const handleGetUserCatgories = async () => {
    
    if (!user?.id) {
      // setError("User not available")
      // setLoading(false)
      throw Error('user not authenticated')
    }

    setIsRefresh(true)

    try {

      const response = await fetch(`/api/users/${user.id}/categories`,{
        headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
          credentials: 'include' // Important for cookies
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      console.log(data)

      setCategories(data)      

      setIsRefresh(false)

    }
    catch (error) {
      setIsRefresh(false)
      throw Error(error)
    }

  }

  useEffect(() => {
    handleGetUserCatgories()
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
            categories?.length <= 0 
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
                  <button
                    className='flex flex-row w-fit h-fit text-sm items-center gap-2 p-2 px-4 mt-5 rounded-md bg-emerald-500 hover:bg-emerald-600 font-semibold duration-200 text-slate-200'
                    disabled={isRefresh}
                    onClick={() => handleGetUserCatgories()}
                  >
                    {
                      isRefresh
                      ?   <p
                            className='flex flex-row items-center gap-2'
                          >
                            <i
                              className='animate-spin'
                            >
                              <svg  xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill={"#ffffff"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M13 7h-2V2h2v5M13 22h-2v-5h2v5M22 13h-5v-2h5v2M7 13H2v-2h5v2M16.24 9.17l-.7-.71-.71-.7 1.77-1.77 1.76-1.77.71.71.71.71-1.77 1.76zM5.64 19.78l-.71-.71-.71-.71 1.77-1.76 1.77-1.77.7.71.71.7-1.77 1.77zM18.36 19.78l-1.76-1.77-1.77-1.77.71-.7.7-.71 1.77 1.77 1.77 1.76-.71.71zM7.76 9.17 5.99 7.4 4.22 5.64l.71-.71.71-.71L7.4 5.99l1.77 1.77-.71.7z"></path></svg>
                            </i>
                            Loading
                          </p>
                      :   <p>
                            Try again
                          </p>
                    }
                  </button>
                </div>
            :   <div
                  className='flex flex-row gap-5 w-full h-full overflow-x-scroll'
                >
                  {
                    categories.map((category) => (
                      <CategoriesCard
                        name={category.name}
                        id={category.id}
                      />
                    ))
                  }
                </div>
          }
        </div>

      </div>
    )
  }
  
}

export default Home