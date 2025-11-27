import React, { useEffect, useState } from 'react'
import LoadingPage from './LoadingPage'
import Sidebar from '../components/navigation/Sidebar'

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
        className='w-full h-screen max-h-screen bg-slate-200 dark:bg-gray-950'
      >
        
        {/* navbar */}
        <Sidebar/>

      </div>
    )
  }
  
}

export default Home