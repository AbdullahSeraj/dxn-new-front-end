import { Link, NavLink, useNavigate } from "react-router-dom"
import { MdShoppingCart } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import logo from "../../assets/logo.png"
import { useEffect, useState } from "react";
import Cookies from "js-cookie"
import { useSignoutMutation } from "../../redux/features/authApiSlice";
import { useGetProfileQuery } from "../../redux/features/userApiSlice";
import { FaHeart } from "react-icons/fa";
import { useGetCartQuery } from "../../redux/features/cartApiSlice";
import { IoMenu } from "react-icons/io5";

const Header = () => {
    const token = Cookies.get("accessToken")
    const navigate = useNavigate()
    const [signout, { isLoading }] = useSignoutMutation();
    const { data } = useGetProfileQuery()
    const [avatar, setAvatar] = useState("")
    const [role, setRole] = useState("")

    const [showMenu, setShowMenu] = useState(false)
    const handleShowMenu = () => {
        setShowMenu(!showMenu)
    }

    const [showPages, setShowPages] = useState(false)
    const handleShowPages = () => {
        setShowPages(!showPages)
    }

    const { data: cart } = useGetCartQuery()
    var result = cart?.reduce(function (acc, obj) { return acc + obj.quantity; }, 0);

    const handleSignout = () => {
        signout()
        Cookies.remove("accessToken")
        window.location.reload();
        window.location.href = "/signin"
        navigate("/signin")
    }

    useEffect(() => {
        setAvatar(data?.avatar)
        setRole(data?.role)
    }, [data])

    return (
        <header className="flex justify-between gap-5 items-center h-[60px] shadow-md bg-white py-3 px-6 fixed top-0 left-0 right-0 z-[200]">
            <div>
                <Link to={"/"} className="h-full text-2xl text-text font-bold">DXN New</Link>
            </div>

            <div className="flex gap-5 items-center">
                <div className="flex gap-5 max-sm:hidden">
                    <NavLink to={"/"} className={({ isActive }) => isActive ? "text-accent font-bold" : "font-semibold text-text"}>Home</NavLink>
                    <NavLink to={"products"} className={({ isActive }) => isActive ? "text-accent font-bold" : "font-semibold text-text"}>Products</NavLink>
                    <NavLink to={"about"} className={({ isActive }) => isActive ? "text-accent font-bold" : "font-semibold text-text"}>About</NavLink>
                    <NavLink to={"contact"} className={({ isActive }) => isActive ? "text-accent font-bold" : "font-semibold text-text"}>Contact</NavLink>
                </div>

                {token ?
                    <div className="flex gap-3 items-center">
                        <Link to={"/saved"} className="relative">
                            <FaHeart className="text-xl text-slate-800" />
                        </Link>
                        <Link to={"/cart"} className="relative cursor-pointer" >
                            {cart && cart?.length > 0 &&
                                <div className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white text-xs w-4 h-4 flex justify-center items-center">{result}</div>
                            }
                            <MdShoppingCart className="text-2xl text-slate-800" />
                        </Link>
                        <div className="relative">
                            <button className="w-[30px] h-[30px] rounded-full overflow-hidden shadow-lg bg-gray-100" onClick={token ? handleShowMenu : () => navigate("/signin")}>
                                {avatar ?
                                    <img src={avatar} alt="" className="w-full h-full mix-blend-multiply object-contain" />
                                    :
                                    <IoPersonCircleOutline className="w-full h-full text-slate-800 cursor-pointer" />
                                }
                            </button>
                            {token && showMenu &&
                                <div>
                                    <div className="absolute top-0 right-0 translate-y-[50px] rounded-md p-2 bg-white text-xs flex flex-col gap-1 min-w-[130px] shadow-lg z-50">
                                        <Link to={"profile"} className="list">Profile</Link>
                                        {role === "admin" &&
                                            <Link to={"/dashboard/products"} className="list">Dashboard</Link>
                                        }
                                        <button className="list text-left" onClick={handleSignout}>Logout</button>
                                    </div>

                                    <div className="fixed top-0 left-0 right-0 bottom-0 z-40" onClick={handleShowMenu}></div>
                                </div>
                            }
                        </div>
                    </div>
                    :
                    <Link to={"/signin"}>
                        <button className="pink-button">Sign In Now</button>
                    </Link>
                }

                <div className="hover:bg-text/10 rounded-full p-1 sm:hidden">
                    <IoMenu className="text-2xl text-slate-800 cursor-pointer" onClick={handleShowPages} />
                </div>

            </div>

            {showPages &&
                <>
                    <div className="absolute right-5 rounded-md p-2 bg-white text-xs flex flex-col gap-1 min-w-[130px] shadow-lg z-50" style={{ top: "calc(100% + 5px)" }}>
                        <NavLink to={"/"} className={({ isActive }) => isActive ? "text-accent font-bold list" : "font-semibold text-text list"}>Home</NavLink>
                        <NavLink to={"products"} className={({ isActive }) => isActive ? "text-accent font-bold list" : "font-semibold text-text list"}>Products</NavLink>
                        <NavLink to={"about"} className={({ isActive }) => isActive ? "text-accent font-bold list" : "font-semibold text-text list"}>About</NavLink>
                        <NavLink to={"contact"} className={({ isActive }) => isActive ? "text-accent font-bold list" : "font-semibold text-text list"}>Contact</NavLink>
                    </div>

                    <div className="fixed top-0 left-0 right-0 bottom-0 z-40" onClick={handleShowPages}></div>
                </>
            }
        </header>
    )
}

export default Header