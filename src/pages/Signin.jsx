import { useEffect, useState } from 'react'
import personImg from "../assets/login-animation.gif"
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../components/coms/PasswordInput'
import SigninWithGoogle from '../components/coms/SigninWithGoogle'
import { useSigninMutation } from '../redux/features/authApiSlice'
import Cookies from "js-cookie"
import SuccessSnackbar from '../components/Snackbar/Snackbar'
import { useDispatch } from 'react-redux'
import { handleClickTrue } from '../redux/slices/SnackbarSlice'

const Signin = () => {
    const navigate = useNavigate()
    const [userInputs, setUserInputs] = useState({ email: "", password: "" })
    const [errors, setErrors] = useState({ emailError: "", passwordError: "", global: "" })
    const [signin, { isLoading, isError, error }] = useSigninMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            setErrors({ ...error, global: error?.data?.message })
            dispatch(handleClickTrue({ message: error?.data?.message || errors?.global || "Something Error", condition: "error" }))
        }
    }, [isError])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({ emailError: "", passwordError: "", global: "" })

        if (!userInputs.email)
            setErrors((prev) => { return { ...prev, emailError: "email is required" } })
        if (!userInputs.password)
            setErrors((prev) => { return { ...prev, passwordError: "password is required" } })

        if (userInputs.email && userInputs.password) {
            try {
                const { data } = await signin({
                    username: userInputs.username,
                    email: userInputs.email,
                    password: userInputs.password
                })

                const accessToken = data.accessToken
                if (accessToken) {
                    Cookies.set("accessToken", accessToken)
                    setUserInputs({
                        email: "",
                        password: ""
                    })
                    navigate("/")
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000)
                    dispatch(handleClickTrue({ message: "Sign In Successfully", condition: "success" }))
                }
            } catch (error) {
                dispatch(handleClickTrue({ message: error?.data?.message || "Something Error", condition: "error" }))
            }
        }
    }

    return (
        <div className='flex items-center justify-center px-5' style={{ minHeight: "calc(100vh - 60px)" }}>
            <div className='bg-white shadow-lg rounded-lg p-5 min-w-[400px] max-sm:w-full border'>
                <form onSubmit={handleSubmit}>
                    <fieldset className='mb-4'>
                        <div className='relative rounded-full overflow-hidden w-[100px] mx-auto shadow-lg'>
                            <img src={personImg} alt="" className='w-full h-full' />
                        </div>
                    </fieldset>

                    <fieldset className='flex flex-col my-3'>
                        <label htmlFor="email" className='text-sm font-bold text-slate-600'>Username</label>
                        <input type="email" name="email" id="email" placeholder='Email' className='input' value={userInputs.email} onChange={(e) => setUserInputs((prev) => { return { ...prev, email: e.target.value } })} />
                        {errors.emailError ? <div className='text-red-600 mt-1 text-xs'>{errors.emailError}</div> : null}
                    </fieldset>

                    <fieldset className='flex flex-col my-3'>
                        <label htmlFor="password" className='text-sm font-bold text-slate-600'>Password</label>
                        <PasswordInput name="password" id="password" placeholder='Password' className='input' value={userInputs.password} onChange={(e) => setUserInputs((prev) => { return { ...prev, password: e.target.value } })} />
                        {errors.passwordError ? <div className='text-red-600 mt-1 text-xs'>{errors.passwordError}</div> : null}
                    </fieldset>

                    <fieldset className='flex justify-center mt-7'>
                        {/* <button className='text-white bg-orange-600 py-1 w-[50%] rounded-full font-bold shadow-sm hover:shadow-md hover:shadow-orange-300 shadow-orange-300 transition-all duration-200 disabled:bg-orange-400 disabled:cursor-not-allowed' disabled={isLoading}>{isLoading ? "Loading..." : "Sign In"}</button> */}
                        <button className='pink-button w-full' disabled={isLoading}>{isLoading ? "Loading..." : "Sign In"}</button>
                    </fieldset>

                    {errors.global ? <div className='text-red-600 mt-2 text-xs text-center'>{errors.global}</div> : null}

                    <p className='text-xs mt-5 font-semibold'>Don&apos;t have account? <Link to={"/signup"} className='text-pink font-bold underline hover:text-orange-600'>Sign Up</Link></p>
                </form>

                <SigninWithGoogle />
            </div>
        </div>
    )
}

export default Signin