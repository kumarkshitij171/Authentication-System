/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { UserContext } from '../context/UserContext';
const Login = () => {
    const { setUser } = useContext(UserContext)
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    const navigate = useNavigate();

    useEffect(() => {
        //fetching profile page data
        fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/profile`, {
            method: 'GET',
            headers: {
                token: localStorage.getItem('AuthoBearer')
            }
        })
            .then(response => response.json())
            .then(data => {
                setUser(data.data)
                if (data.success) {
                    toast.success("User already logged in")
                    navigate('/upload-profile-pic')
                }
                else {
                    // remove the token if user is not logged in
                    if (localStorage.getItem('AuthoBearer')) {
                        localStorage.removeItem('AuthoBearer')
                    }
                }
            })
            .catch(err => console.error(err))
    })

    return (
        <div className='flex'>
            <Toaster />
            <div className="left md:w-2/3 relative mx-auto px-1">
                <p className='absolute right-4 text-lg top-2'>Not a member? <button
                    onClick={() => navigate('/')}
                    className='text-blue-600'
                >Sign Up
                </button></p>
                <div className="flex flex-col justify-center items-center mt-24">
                    <h2 className='text-2xl font-bold'>Sign In to dribble</h2>

                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/login`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(values),
                            })
                                .then(response => response.json())
                                .then(data => {
                                    // console.log(data)
                                    setUser(data.data)
                                    if (data.sucess) {
                                        toast.success(data.message)
                                        localStorage.setItem('AuthoBearer', data.token)
                                        setTimeout(() => {
                                            navigate('/option-select')
                                        }, 1000);
                                    }
                                    else {
                                        toast.error(data.message)
                                    }
                                })
                                .catch(err => toast.error(err.message))
                        }}
                    >
                        {() => (
                            <Form>

                                <div className='mt-2'>
                                    <label
                                        className='text-lg font-semibold'>Email</label>
                                    <Field
                                        className='w-full bg-gray-300 py-2 px-5 my-1 rounded-md '
                                        name="email"
                                        type="text"
                                        placeholder="John@example.com" />
                                    <ErrorMessage
                                        className='text-red-400 '
                                        name="email"
                                        component="div" />
                                </div>
                                <div className='mt-2'>
                                    <label
                                        className='text-lg font-semibold'>Password</label>
                                    <Field

                                        className='w-full bg-gray-300 py-2 px-5 my-1 rounded-md '
                                        name="password"
                                        type="password"
                                        placeholder="password" />
                                    <ErrorMessage
                                        className='text-red-400 '
                                        name="password"
                                        component="div" />
                                </div>
                                <div>
                                    <button
                                        className='bg-pink-500 text-white py-3 px-11 rounded-md font-medium text-lg my-2'
                                        type="submit"
                                    >Login</button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                </div>
            </div>
            <div className="right h-screen w-1/3 hidden md:block">
                <img
                    src="image.png"
                    className='h-full w-full' alt="Image" />
            </div>

        </div>
    )
}

export default Login
