/* eslint-disable react/prop-types */
const Header = ({ user }) => {
    return (
        <div>
            <header>
                <div className="bg-gray-100 border-b border-gray-200">
                    <div className="px-4 mx-auto sm:px-6 lg:px-8">
                        <nav className="relative flex items-center justify-between h-16 lg:h-20">
                            <div className="hidden lg:flex lg:items-center lg:space-x-10">
                                <a href="#" title="" className="text-base font-medium text-black"> Features </a>

                                <a href="#" title="" className="text-base font-medium text-black"> Solutions </a>

                                <a href="#" title="" className="text-base font-medium text-black"> Resources </a>

                                <a href="#" title="" className="text-base font-medium text-black"> Pricing </a>
                            </div>

                            <div className="lg:absolute lg:-translate-x-1/2 lg:inset-y-5 lg:left-1/2">
                                <div className="flex-shrink-0">
                                    <a href="#" title="" className="flex">
                                        <img className="w-auto h-8 lg:h-10 " src="logo.png" alt="" />
                                    </a>
                                </div>
                            </div>

                            <button type="button" className="flex items-center justify-center ml-auto text-white bg-black rounded-full w-9 h-9 lg:hidden">
                                <img
                                    className='rounded-full object-cover max-h-10'
                                    src={user?.profilePicture ? user.profilePicture : "profile.png"} alt="" />
                            </button>

                            <button type="button" className="inline-flex p-2 ml-5 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100">
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>

                            <div className="hidden lg:flex lg:items-center lg:space-x-10">

                                <div className='flex items-center bg-[#e8e6e6] md:p-1 rounded-md shadow-sm cursor-pointer h-9 md:h-10 w-44 md:w-52 pl-1 '>
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                        </svg>
                                    </button>
                                    <input
                                        className="bg-transparent rounded-md md:p-1 mx-1 w-inherit outline-none"
                                        placeholder="search"
                                        type="search"
                                    />
                                </div>

                                <button className="flex items-center justify-center w-10 h-10 text-white bg-black rounded-full">
                                    <img className="rounded-full object-cover max-h-10" src={user?.profilePicture ? user.profilePicture : "profile.png"} alt="" />
                                </button>
                                <p className="text-base font-medium text-black">{user?.name} </p>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

        </div>
    )
}

export default Header
