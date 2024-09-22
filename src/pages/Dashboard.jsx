import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { AiOutlineProduct } from "react-icons/ai";
import { TbUsersGroup } from "react-icons/tb";
import { useGetProfileQuery } from '../redux/features/userApiSlice';
import personImg from "../assets/login-animation.gif"
import Cookies from "js-cookie"
import { useSignoutMutation } from '../redux/features/authApiSlice';
import { MdCategory } from "react-icons/md";
import { MdSlideshow } from "react-icons/md";
import { useState } from 'react';
import { IoIosSettings } from "react-icons/io";

const Dashboard = () => {
    const navigate = useNavigate()
    const { data } = useGetProfileQuery()
    const [signout, { isLoading }] = useSignoutMutation();
    const [showMenu, setShowMenu] = useState(false)
    const handleShowMenu = () => {
        setShowMenu(!showMenu)
    }

    const handleSignout = () => {
        signout()
        Cookies.remove("accessToken")
        window.location.reload();
        window.location.href = "/signin"
        navigate("/signin")
    }

    return (
        <div className='p-5 '>
            <div className='relative bg-white rounded-xl flex shadow-lg border p-5 gap-5' style={{ height: "calc(100vh - 100px)" }}>

                <button className='hidden max-lg:flex absolute top-10 left-0 z-50' onClick={handleShowMenu}><MdSlideshow className='text-xl text-text' /></button>
                <div className={`max-lg:absolute z-40 rounded-xl bg-blue-600 text-white h-full w-[200px] p-4 shadow-xl flex flex-col justify-between items-center ${showMenu ? "flex" : "max-lg:hidden"}`} style={{ height: "calc(100vh - 142px)" }}>
                    <div className='flex flex-col items-center gap-3'>
                        <div className='relative rounded-full overflow-hidden w-[100px] h-[100px] mx-auto shadow-md shadow-blue-500 bg-gray-100'>
                            <img src={data?.avatar ? data?.avatar : personImg} alt="" className='mix-blend-multiply w-full h-full object-contain' />
                        </div>
                        <h3 className='text-white text-sm font-bold text-center'>{data?.username}</h3>
                    </div>

                    <div className='flex flex-col gap-1 text-sm font-semibold w-full'>
                        <NavLink to="products" className={({ isActive }) => `${isActive ? "font-bold bg-blue-50 text-blue-700 hover:bg-blue-100" : "hover:bg-blue-500"} rounded-lg py-2 px-5`}>
                            <div className='flex items-center gap-2'>
                                <AiOutlineProduct size={"20px"} />
                                Products
                            </div>
                        </NavLink>
                        <NavLink to="users" className={({ isActive }) => `${isActive ? "font-bold bg-blue-50 text-blue-700 hover:bg-blue-100" : "hover:bg-blue-500"} rounded-lg py-2 px-5`}>
                            <div className='flex items-center gap-2'>
                                <TbUsersGroup size={"20px"} />
                                Users
                            </div>
                        </NavLink>
                        <NavLink to="categories" className={({ isActive }) => `${isActive ? "font-bold bg-blue-50 text-blue-700 hover:bg-blue-100" : "hover:bg-blue-500"} rounded-lg py-2 px-5`}>
                            <div className='flex items-center gap-2'>
                                <MdCategory size={"20px"} />
                                Categories
                            </div>
                        </NavLink>
                        <NavLink to="settings" className={({ isActive }) => `${isActive ? "font-bold bg-blue-50 text-blue-700 hover:bg-blue-100" : "hover:bg-blue-500"} rounded-lg py-2 px-5`}>
                            <div className='flex items-center gap-2'>
                                <IoIosSettings size={"20px"} />
                                Settings
                            </div>
                        </NavLink>
                    </div>

                    <div></div>
                    <div></div>
                    <div></div>

                    <button className='bg-blue-500 text-white rounded-lg py-1 px-5 shadow-md font-bold hover:bg-blue-400' onClick={handleSignout} disabled={isLoading}>{isLoading ? "Loading..." : "Sign Out"}</button>
                </div>

                <Outlet />
            </div>

        </div>
    )
}

export default Dashboard