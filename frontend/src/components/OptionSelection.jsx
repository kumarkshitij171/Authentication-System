/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const OptionSelection = () => {
    const [checked1, setChecked1] = useState(false)
    const [checked2, setChecked2] = useState(false)
    const [checked3, setChecked3] = useState(false)

    const navigate = useNavigate()

    const handleFinish = () => {
        fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/verify-email`, {
            method: 'PUT',
            headers: {
                token: localStorage.getItem('AuthoBearer'),
            }
        }).then(response => response.json())
            .then(data => {
                // console.log(data)
                if (data.success) {
                    toast.success(data.message)
                    setTimeout(() => {
                        navigate('/verify-email')
                    }, 1000);
                } else {
                    toast.error(data.message)
                }

            })
            .catch(err => toast.error(err.message))
    }

    useEffect(() => {
        //protected page
        if (!localStorage.getItem('AuthoBearer')) {
            navigate('/')
        }
    }, [])

    return (
        <div className="mt-24 ">
            <Toaster />
            <div className="mb-32 px-7">
                <h1 className="text-4xl font-bold text-center mb-2">What are you looking for?</h1>
                <p className="text-center text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ullam non ratione totam nulla, necessitatibus ea optio delectus ipsam architecto.</p>

            </div>

            <div className="flex flex-wrap w-full items-center justify-center">

                <div className={`h-[20rem] w-[22rem] relative m-5 p-5 flex flex-col gap-10 justify-center items-center border-2 rounded-xl ${checked1 ? "border-[#ec3251]" : ""}`}>
                    {!checked1 && <div className="absolute space-y-5">
                        <img
                            className='h-40'
                            src="im1.png" alt="" />
                        <p className='font-bold text-xl text-center mb-6 '>I'm designer looking for share my work</p>
                    </div>

                    }

                    {checked1 && <div className="absolute space-y-5 translate-y-[-5rem] ">
                        <img
                            className='h-40'
                            src="im1.png"
                            alt="" />
                        <p className='font-bold text-xl text-center'>I'm designer looking for share my work</p>
                        <p className='text-center'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam ullam non ratione totam nulla, necessitatibus ea optio delectus ipsam architecto.</p>
                    </div>}

                    <div className="container absolute bottom-5 flex justify-center">
                        <div className="round">
                            <input type="checkbox"
                                className="cursor-pointer "
                                id="exportvideo1"
                                value={checked1}
                                onChange={() => setChecked1(!checked1)} />
                            <label htmlFor="exportvideo1" />
                        </div>
                    </div>
                </div>

                <div className={`h-[20rem] w-[22rem] relative m-5 p-5 flex flex-col gap-10 justify-center items-center border-2 rounded-xl ${checked2 ? "border-[#ec3251]" : ""}`}>
                    {!checked2 && <div className="absolute space-y-5">
                        <img
                            className='h-40'
                            src="im2.png" alt="" />
                        <p className='font-bold text-xl text-center mb-6 '>I'm looking for hire a designer</p>
                    </div>

                    }

                    {checked2 && <div className="absolute space-y-5 translate-y-[-5rem] ">
                        <img
                            className='h-40'
                            src="im2.png"
                            alt="" />
                        <p className='font-bold text-xl text-center'>I'm looking for hire a designer</p>
                        <p className='text-center'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam ullam non ratione totam nulla, necessitatibus ea optio delectus ipsam architecto.</p>
                    </div>}

                    <div className="container absolute bottom-5 flex justify-center">
                        <div className="round">
                            <input type="checkbox"
                                className="cursor-pointer "
                                id="exportvideo2"
                                value={checked2}
                                onChange={() => setChecked2(!checked2)} />
                            <label htmlFor="exportvideo2" />
                        </div>
                    </div>
                </div>

                <div className={`h-[20rem] w-[22rem] relative m-5 p-5 flex flex-col gap-10 justify-center items-center border-2 rounded-xl ${checked3 ? "border-[#ec3251]" : ""}`}>
                    {!checked3 && <div className="absolute space-y-5">
                        <img
                            className='h-40'
                            src="im3.png" alt="" />
                        <p className='font-bold text-xl text-center mb-6 '>I'm looking for design Inspiration</p>
                    </div>

                    }

                    {checked3 && <div className="absolute space-y-5 translate-y-[-5rem] ">
                        <img
                            className='h-40'
                            src="im3.png"
                            alt="" />
                        <p className='font-bold text-xl text-center'>I'm looking for design Inspiration</p>
                        <p className='text-center'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam ullam non ratione totam nulla, necessitatibus ea optio delectus ipsam architecto.</p>
                    </div>}

                    <div className="container absolute bottom-5 flex justify-center">
                        <div className="round">
                            <input type="checkbox"
                                className="cursor-pointer "
                                id="exportvideo3"
                                value={checked3}
                                onChange={() => setChecked3(!checked3)} />
                            <label htmlFor="exportvideo3" />
                        </div>
                    </div>
                </div>

            </div>
            <p className='text-xl font-semibold text-center mt-10'>Anything else? you can select multiple</p>
            <div className="flex justify-center mt-3">
                <button
                    onClick={handleFinish}
                    className='bg-pink-500 text-white py-3 px-28 rounded-md font-medium text-lg m-2'
                >Finish</button>
            </div>
        </div >

    )
}

export default OptionSelection
