/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const UploadProfilePic = () => {
    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        if (!localStorage.getItem('AuthoBearer')) {
            navigate('/login');
        }
        console.log(user)
        fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/profile`, {
            method: 'GET',
            headers: {
                token: localStorage.getItem('AuthoBearer')
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log("data ", data.data)
                setUser(data.data)
                if (data.success) {
                    toast.success("User already logged in")
                }
                else {
                    // remove the token if user is not logged in
                    if (localStorage.getItem('AuthoBearer')) {
                        setUser(null)
                        localStorage.removeItem('AuthoBearer')
                        navigate('/login')
                    }
                }
            })
            .catch(err => console.error(err))
    }, [])

    const [selectedImage, setSelectedImage] = useState(null);
    const [ImageFile, setImageFile] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // console.log(file)
        setImageFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNext = () => {
        const formData = new FormData();
        formData.append('profilePicture', ImageFile);
        // if user not select profile picture then redirect to option-select page 
        if (!ImageFile && !user?.profilePicture) {
            navigate('/option-select')
        }
        // else upload the profile picture and then redirect to option-select page
        else {
            fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/upload-profile-pic`, {
                method: 'PUT',
                body: formData,
                headers: {
                    token: localStorage.getItem('AuthoBearer')
                }
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    setUser(data.data)
                    if (data.success) {
                        toast.success(data.message)
                        setTimeout(() => {
                            navigate('/option-select')
                        }, 1000);
                    }
                    else {
                        toast.error(data.message)
                    }
                })
        }
    }

    return (
        <div className="flex flex-col justify-center">
            <Toaster />
            <div className="mx-auto">
                <h2 className="mt-40 font-bold text-5xl mb-3">Welcome! Let's create your profile</h2>
                <p className="text-xl mb-5 text-gray-500">Let others get you to know better! you can do these things later</p>

                <p className="font-medium text-xl mb-3">Add an avatar</p>
                <div className="flex gap-4 items-center flex-wrap">
                    <img
                        className="w-40 h-40 rounded-full object-cover"
                        src={selectedImage === null ? (user?.profilePicture ? user.profilePicture : "profile.png") : (selectedImage)}
                        alt="Profile Image" />
                    <input
                        className="text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer px-3 py-1"
                        type="file"
                        name="profile-pic"
                        onChange={handleImageChange} />
                </div>
                <div className="">
                    <h4 className="font-medium text-xl mb-3 mt-6">Add your location</h4>
                    <input
                        className="w-96 py-2 px-5 mt-1 mb-10 bg-transparent border-0 border-b-2 border-gray-200 font-medium text-xl appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                        type="text"
                        placeholder="Location" />
                </div>
                <button
                    className='bg-pink-500 text-white py-3 px-28 rounded-md font-medium text-lg m-2'
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default UploadProfilePic
