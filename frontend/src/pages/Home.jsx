import React, { useEffect, useState } from 'react'
import LoadingPage from './LoadingPage'
import Sidebar from '../components/navigation/Sidebar'
import { useAuth } from '../context/AuthContext'
import CategoriesCard from '../components/cards/CategoriesCard'
import { deleteCategory, getUserCategories } from '../utils/categoriesUtils'

const Home = () => {

  // context
  const { user } = useAuth()

  // toggles
  const [isLoaded, setIsLoaded] = useState(true)
  const [isRefresh, setIsRefresh] = useState(false)

  // state
  const [categories, setCategories] = useState([])

  const handleGetUserCatgories = async () => {
    
    setIsRefresh(true)
    setIsLoaded(false)

    const data = await getUserCategories(user.id)

    if (data) {
      setIsRefresh(false)
      setIsLoaded(true)
      setCategories(data)
    }
    else {
      setIsLoaded(false)
    }

  }

  const handleDeleteCategory = async (id) => {

    const data = await deleteCategory(id)

    if (data === true) {
      alert('category successfully deleted')
      handleGetUserCatgories()
    }
    else {
      alert('category deletion unsuccessful')
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
        className='w-full h-screen max-h-screen bg-slate-300 dark:bg-gray-950 flex flex-row font-poppins'
      >
        
        {/* navigation */}
        <Sidebar/>

        {/* main content */}
        <div
          className={`flex flex-col w-12/16 h-screen max-h-screen overflow-y-scroll p-6 ${categories.length <= 0 ? 'items-center justify-center' : ''}`}
        >
          {
            categories.length == 0 
            ?   <div
                  className='bg-slate-400/30 dark:bg-gray-900 rounded-md w-full h-full gap-5 flex flex-col items-center justify-center shadow-sm shadow-slate-400 dark:shadow-none'
                >

                  <i
                    className='text-emerald-400 bg-slate-200/60 rounded-full p-3 w-fit h-fit shadow-sm shadow-slate-400 dark:shadow-none dark:bg-slate-700/60'
                  >
                    <svg  xmlns="http://www.w3.org/2000/svg" width={64} height={64} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M3 3H7V7H3z"></path><path d="M10 3H14V7H10z"></path><path d="M10 3H14V7H10z"></path><path d="M17 3H21V7H17z"></path><path d="M3 17H7V21H3z"></path><path d="M10 17H14V21H10z"></path><path d="M10 17H14V21H10z"></path><path d="M17 17H21V21H17z"></path><path d="M3 10H7V14H3z"></path><path d="M10 10H14V14H10z"></path><path d="M10 10H14V14H10z"></path><path d="M17 10H21V14H17z"></path></svg>
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
                  className='flex flex-row gap-5 w-full h-full scrollbar-hide overflow-x-scroll scroll p-2'
                >
                  {
                    categories.map((category) => (
                      <CategoriesCard
                        key={category.id}
                        name={category.name}
                        id={category.id}
                        // percentage_completion={category.percentage_completion}
                        percentage_completion={category.percentage_completion}
                        handleDeleteCategory={() => handleDeleteCategory(category.id)}
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