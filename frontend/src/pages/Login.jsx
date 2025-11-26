import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'



const Login = () => {

    // navigation
    const navigate = useNavigate()
    
    // context
    const { login } = useAuth()

    // toggles
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // state
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    // functions
    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            await login(email, password, rememberMe)
            navigate('/')
        }
        catch (error) {
            setError(error.message)
        }
        finally {
            setIsLoading(false)
        }


    }
    

  return (
    <div
        className='w-full gap-5 h-screen grid grid-cols-2 p-5 bg-slate-200 dark:bg-slate-800 dark:text-slate-200 font-poppins'
    >
        {/* welcome stuff */}
        <div
            className='w-full h-full bg-linear-to-tr from-emerald-400 to-emerald-600 rounded-md p-8 px-10 flex justify-start items-end shadow-md shadow-slate-400 dark:shadow-slate-950'
        >
            <div
                className='flex flex-col gap-3 w-full h-fit text-slate-200'
            >
                <h1
                    className='font-bold text-3xl'
                >
                    Welcome!
                </h1>
                <p
                    className='font-medium'
                >
                    Enter your details into the fields to sign into your account and complete your tasks.
                </p>
            </div>
        </div>

        {/* login form */}
        <div
            className='p-24 w-full h-full '
        >   
            
            <form
                className='w-full h-fit flex flex-col gap-10 items-center'
                onSubmit={(e) => handleSubmitLogin(e)}
            >
                

                <div
                    className='flex flex-col gap-4'
                >
                    <h1
                        className='text-5xl font-semibold'
                    >
                        Sign In
                    </h1>
                    <p
                        className='text-slate-300'
                    >
                        Enter your details into the fields to sign into your account and complete your tasks.
                    </p>
                </div>

                {/* fields */}
                <div
                    className='flex flex-col gap-3 w-full h-fit'
                >

                    {/* email */}
                    <div
                        className='w-full h-fit flex flex-col gap-2'
                    >
                        <h6
                            className='font-medium'
                        >
                            Email:
                        </h6>
                        <input 
                            type="email"
                            className='w-full border-slate-400 dark:border-emerald-400 outline-none border-2 p-2 pl-3 rounded-md'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your email...'
                        />
                    </div>

                    {/* password */}
                    <div
                        className='w-full h-fit flex flex-col gap-2 relative'
                    >
                        <h6
                            className='font-medium'
                        >
                            Password:
                        </h6>
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            className='w-full border-slate-400 dark:border-emerald-400 outline-none border-2 p-2 pl-3 rounded-md'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter your password...'
                        />
                        <button
                            className='absolute text-slate-500 dark:text-slate-400 top-[43.5px] font-medium right-3.5 text-sm'
                            onClick={() => setShowPassword(!showPassword)}
                            type='button'
                        >
                            {
                                showPassword
                                ? "Show"
                                : "Hide"
                            }
                        </button>
                    </div>

                    <div
                        className='flex flex-row items-center justify-start gap-2 pt-5'
                    >
                        <input 
                            type="checkbox"
                            className='size-4 border border-emerald-400 accent-emerald-400' 
                            id='rememberMe'
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                        <label 
                            htmlFor="rememberMe"
                            className='text-sm font-light'
                        >
                            remember me
                        </label>
                    </div>

                </div>

                <p
                    className='text-rose-500 w-full h-fit text-center'
                >
                    {error}
                </p>

                {/* submit and link button */}
                <div
                    className='flex flex-col gap-5 w-full h-fit'
                >
                    <button
                        className='w-full h-fit p-2 bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600 rounded-md text-slate-50 font-medium duration-200'
                    >
                        {
                            isLoading
                            ? 'Loading...'
                            : 'Submit'
                        }
                    </button>
                    <Link
                        className='text-center text-xs text-slate-500 dark:text-slate-400'
                        to={'/Register'}
                    >
                        Don't have an account? Sign Up
                    </Link>
                </div>


            </form>

        </div>


    </div>
  )
}

export default Login