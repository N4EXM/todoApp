import React, { useEffect, useState } from 'react'
import LoadingPage from './LoadingPage'
import Sidebar from '../components/navigation/Sidebar'
import { useAuth } from '../context/AuthContext'
import CategoriesCard from '../components/cards/CategoriesCard'
import { createCategory, deleteCategory, getUserCategories } from '../utils/categoriesUtils'

const Home = () => {

  // context
  const { user } = useAuth()

  // toggles
  const [isLoaded, setIsLoaded] = useState(true) // all the catgories are loaded
  const [isRefresh, setIsRefresh] = useState(false) // idk anymore
  const [isCreateCategoryActive, setIsCreateCategoryActive] = useState(false) 


  // state
  const [originalCategories, setOriginalCategories] = useState([])
  const [categories, setCategories] = useState(originalCategories)
  const [query, setQuery] = useState('')
  const [newCategoryName, setNewCategoryName] = useState()
  const [categoryModalError, setCategoryModalError] = useState('This is an error')

  // functions

  const handleGetUserCatgories = async () => {
    
    // toggles
    setIsRefresh(true)
    setIsLoaded(false)

    const data = await getUserCategories(user.id)

    if (data) {
      setIsRefresh(false)
      setIsLoaded(true)
      setOriginalCategories(data)
      setCategories(data)
      console.log(data)
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

  const handleCreateNewCategory = async () => {

    const data = await createCategory(newCategoryName, user.id)

    if (data.success) {
      setCategories([...categories, data.category])
      setIsCreateCategoryActive(false)
    }
    else {
      setCategoryModalError(data.message)
    }

  }

  const filterCategories = (query) => {

    if (!query || query.trim() === '') {
      setCategories(originalCategories); // Return all if no query
    }
    
    const searchTerm = query.toLowerCase().trim();
    
    setCategories(originalCategories.filter(category => 
      category.name.toLowerCase().includes(searchTerm)
    ));

    console.log('original: ', originalCategories)

  }

  const handleQueryClear = () => {

    setQuery('')
    setCategories(originalCategories)

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
        className='w-full h-screen max-h-screen bg-slate-300 dark:bg-gray-950 flex flex-row font-poppins relative'
      >
        
        {/* navigation */}
        <Sidebar/>

        {/* main content */}
        <div
          className={`flex flex-col w-12/16 h-screen max-h-screen overflow-y-scroll relative p-5 gap-5 ${categories.length <= 0 ? 'items-center justify-center' : ''}`}
        >

          {/* search and create new category button */}
          <div
            className='w-full h-fit flex flex-row items-center justify-between p-2 rounded-md bg-slate-200 px-3 dark:bg-gray-800 dark:border-2 dark:border-gray-700/30 shadow shadow-slate-400/50 dark:shadow-none'
          >
            <div
              className='flex flex-row items-center gap-2 w-fit h-fit relative'
            >

              {/* search query */}
              <input 
                type="text" 
                className='w-full outline-none border-2 border-gray-300 rounded-sm p-2 py-1.5 text-xs placeholder:text-gray-400 dark:text-slate-200 dark:border-gray-700 dark:bg-gray-900'
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                placeholder='Search a category'
              />

              {/* clear button */}
              <button
                className={`${query.length === 0 ? 'hidden' : 'flex'} text-slate-500 absolute right-12 cursor-pointer top-2 dark:text-slate-600`}
                onClick={() => handleQueryClear()}
              >
                <svg  xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path></svg>
              </button>

              {/* search button */}
              <button
                className='p-2 rounded-sm bg-emerald-500 hover:bg-emerald-600 hover:text-slate-300 text-slate-200 duration-200 cursor-pointer '
                onClick={() => filterCategories(query)}
              >
                <svg  xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill={"currentcolor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m17.06,14.94l-2.8-1.34c1.08-1.23,1.74-2.84,1.74-4.6,0-3.86-3.14-7-7-7s-7,3.14-7,7,3.14,7,7,7c1.76,0,3.37-.66,4.6-1.74l1.34,2.8h0s5,5,5,5l2.12-2.12-5-5h0Zm-8.06-.94c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5Z"></path></svg>
              </button>
            </div>

            {/* toggle new category button */}
            <button
              className='p-2 rounded-sm bg-emerald-500 hover:bg-emerald-600 hover:text-slate-300 text-slate-200 duration-200 cursor-pointer flex flex-row items-center gap-2'
              onClick={() => setIsCreateCategoryActive(true)}
            >
              <svg  xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0.6 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z"></path></svg>
              <span
                className='text-xs font-medium'
              >
                New Category
              </span>
            </button>
          </div>

          {
            categories.length == 0 
            ?   <div
                  className='bg-slate-200 dark:bg-gray-900 rounded-md w-full h-full gap-5 flex flex-col items-center justify-center shadow-sm shadow-slate-400 dark:shadow-none'
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
                  className='flex flex-row gap-5 w-full h-full scrollbar-hide overflow-x-scroll'
                >
                  {
                    categories.map((category) => (
                      <CategoriesCard
                        key={category.id}
                        name={category.name}
                        id={category.id}
                        percentage_completion={category.percentage_completion}
                        handleDeleteCategory={() => handleDeleteCategory(category.id)}
                      />
                    ))
                  }
                </div>
          }

        </div>
        
        {/* create new category modal */}
        <div
          className={`${isCreateCategoryActive ? 'flex' : 'hidden'} absolute top-0 left-0 bg-gray-950/60 w-full h-screen items-center justify-center`}
        >
          <div
            className='flex flex-col p-4 py-2.5 w-80 min-h-40 gap-5 bg-gray-200 rounded-md shadow shadow-slate-700'
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
                className='p-1  rounded-full hover:bg-gray-400 duration-200'
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
                className='w-full p-2 rounded-md border-2 outline-none text-sm border-gray-400'
                placeholder='Enter a name...'  
              />
            </div>
            <div
              className='flex flex-row items-center justify-between w-full h-fit'
            >
              <p
                className='text-sm text-rose-500'
              >
                {categoryModalError}
              </p>
              <button 
                className='text-xs bg-emerald-500 p-2 px-3 text-slate-200 font-medium rounded-md'
                onClick={() => handleCreateNewCategory()}
              >
                Create
              </button>
            </div>
          </div>
        </div>

      </div>
    )
  }
  
}

export default Home