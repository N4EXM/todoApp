import React, { useEffect, useState } from 'react'
import LoadingPage from './LoadingPage'

const Home = () => {

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setTimeout(setIsLoading(true), 10000)
  }, [])

  if (!isLoading) {
    return (
      <LoadingPage/>
    )
  }
  else {
    return (
      <div
        className='w-full h-screen max-h-screen bg-slate-200 dark:bg-slate-800'
      >
        
        {/* navbar */}
        <nav
          className='p-5 px-8 flex flex-row items-center justify-between'
        >
          <h1
            className='font-bold text-2xl dark:text-slate-200'
          >
            ClearFlow
          </h1>
          <div
            className='relative'
          >
            
          </div>
        </nav>

      </div>
    )
  }
  
}

export default Home