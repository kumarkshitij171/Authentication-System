/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect } from "react"
import Footer from "./Footer"
import Header from "./Header"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"

const VerifyEmail = () => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)
    useEffect(() => {
        // protected page
        if (!localStorage.getItem('AuthoBearer')) {
            navigate('/')
        }
        if (!user)
            fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/profile`, {
                method: 'GET',
                headers: {
                    token: localStorage.getItem('AuthoBearer')
                }
            })
                .then(response => response.json())
                .then(data => {
                    setUser(data.data)
                    if (data.success === false) {
                        // remove the token if user is not logged in
                        if (localStorage.getItem('AuthoBearer')) {
                            localStorage.removeItem('AuthoBearer')
                        }
                        navigate('/')
                    }
                })
                .catch(err => console.error(err))
    }, [])
    return (
        <div>
            <Header user={user} />
            <div className="flex flex-col items-center mt-8">
                <p className="text-gray-500 text-xl">Please Verify your email...</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-60 h-60">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <p className="text-gray-500 text-xl mt-2">Please verify your email address. We've sent a confirmation email to:</p>
                <p className="font-bold text-xl">{user?.email}</p>
                <p className="text-gray-500 text-xl mt-2">Click the confirmation link in that email to begin using Dribbble.</p>
                <p className="text-gray-500 text-xl mt-2">Didn't receive the email? Check your Spam folder, it may have been caught by a filter. If</p>
                <p className="text-gray-500 text-xl mt-2">you still don't see it, you can <span className="cursor-pointer text-[#ec3251]">resend the confirmation email</span>.</p>
                <p className="text-gray-500 text-xl mt-2">Wrong email address? <span className="cursor-pointer text-[#ec3251]">Change it.</span></p>
            </div>

            <Footer />
        </div>
    )
}

export default VerifyEmail
