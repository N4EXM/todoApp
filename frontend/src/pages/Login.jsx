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

        await login(email, password)
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
            >
                

                <div
                    className='flex flex-col gap-4'
                >
                    <h1
                        className='text-5xl font-semibold'
                    >
                        Sign In
                    </h1>
                    <p>
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

                </div>


            </form>

        </div>


    </div>
  )
}

export default Login