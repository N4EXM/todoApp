import React from 'react'

const LoadingPage = () => {
  return (
    <div
        className='h-screen w-full flex items-center justify-center fonr-poppins bg-slate-200 dark:bg-slate-800 dark:text-slate-100'
    >   
        <div
            className='text-2xl font-semibold flex flex-row items-center gap-3'
        >
            <svg className='text-emerald-400 animate-spin' xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill={'currentcolor'} viewBox="0 0 24 24">{/* Boxicons v3.0.5 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M13 7h-2V2h2v5M13 22h-2v-5h2v5M22 13h-5v-2h5v2M7 13H2v-2h5v2M16.24 9.17l-.7-.71-.71-.7 1.77-1.77 1.76-1.77.71.71.71.71-1.77 1.76zM5.64 19.78l-.71-.71-.71-.71 1.77-1.76 1.77-1.77.7.71.71.7-1.77 1.77zM18.36 19.78l-1.76-1.77-1.77-1.77.71-.7.7-.71 1.77 1.77 1.77 1.76-.71.71zM7.76 9.17 5.99 7.4 4.22 5.64l.71-.71.71-.71L7.4 5.99l1.77 1.77-.71.7z"></path></svg>
            Loading
        </div>
    </div>
  )
}

export default LoadingPage