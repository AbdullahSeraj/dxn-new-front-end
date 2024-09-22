import { useEffect, useRef, useState } from 'react'
import personImg from "../assets/login-animation.gif"
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../components/coms/PasswordInput'
import SigninWithGoogle from '../components/coms/SigninWithGoogle'
import { useSignupMutation } from '../redux/features/authApiSlice'
import { app } from "../../firebase"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import Cookies from "js-cookie"
import { useDispatch } from 'react-redux'
import { handleClickTrue } from '../redux/slices/SnackbarSlice'

const Signup = () => {
    const navigate = useNavigate()
    const [userInputs, setUserInputs] = useState({ avatar: "", username: "", email: "", password: "", cunfirmPassword: "" })
    const uploadImg = useRef(null)
    const [errors, setErrors] = useState({ usernameError: "", emailError: "", passwordError: "", cunfirmPasswordError: "", global: "" })
    const [signup, { isLoading, isError, error }] = useSignupMutation()
    const [file, setFile] = useState(undefined)
    const [filePerc, setFilePerc] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            setErrors({ ...error, global: error?.data?.message })
            dispatch(handleClickTrue({ message: error?.data?.message || errors?.global || "Something Error", condition: "error" }))
        }
    }, [isError])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({ usernameError: "", emailError: "", passwordError: "", cunfirmPasswordError: "", global: "" })

        if (!userInputs.username) {
            setErrors((prev) => { return { ...prev, usernameError: "username is required" } })
            return;
        }
        if (!userInputs.email) {
            setErrors((prev) => { return { ...prev, emailError: "email is required" } })
            return;
        }
        if (!userInputs.password) {
            setErrors((prev) => { return { ...prev, passwordError: "password is required" } })
            return;
        }
        if (!userInputs.cunfirmPassword) {
            setErrors((prev) => { return { ...prev, cunfirmPasswordError: "cunfirm password is required" } })
            return;
        }
        if (userInputs.password !== userInputs.cunfirmPassword) {
            setErrors((prev) => { return { ...prev, global: "password and cunfirm password are not same" } })
            dispatch(handleClickTrue({ message: errors?.global || "Something Error", condition: "error" }))
            return;
        }

        if (userInputs.username && userInputs.email && userInputs.password && userInputs.cunfirmPassword) {
            try {
                const { data } = await signup({
                    avatar: userInputs.avatar,
                    username: userInputs.username,
                    password: userInputs.password,
                    email: userInputs.email
                })

                const accessToken = data?.accessToken
                if (accessToken) {
                    Cookies.set("accessToken", accessToken)
                    setUserInputs({
                        avatar: "", username: "", email: "", password: "", cunfirmPassword: ""
                    })
                    navigate("/")
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000)
                    dispatch(handleClickTrue({ message: "Sign Up Successfully", condition: "success" }))
                }
            } catch (error) {
                dispatch(handleClickTrue({ message: error?.data?.message || error || "Something Error", condition: "error" }))
            }
        }
    }

    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress));
            },
            (error) => {
                setErrors({ ...errors, global: error });
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                    setUserInputs({ ...userInputs, avatar: downloadURL })
                );
            }
        );
    };

    useEffect(() => {
        if (file) {
            handleFileUpload(file)
        }
    }, [file])

    return (
        <div className='flex items-center justify-center px-5' style={{ minHeight: "calc(100vh - 60px)" }}>
            <div className='bg-white shadow-lg rounded-lg p-5 min-w-[400px] max-sm:w-full border'>
                <form onSubmit={handleSubmit}>
                    <fieldset className='mb-4'>
                        <input onChange={(e) => setFile(e.target.files[0])} type="file" hidden ref={uploadImg} accept='image/*' />
                        <div className='relative rounded-full overflow-hidden w-[100px] h-[100px] mx-auto shadow-lg' onClick={() => uploadImg?.current.click()}>
                            <img src={userInputs.avatar ? userInputs.avatar : personImg} alt="" className='w-full h-full object-contain' />
                            <button type='button' className='absolute bottom-0 left-1/2 -translate-x-1/2 w-full bg-gray-100/50 text-xs font-bold pb-6 pt-1 text-center'>Upload Avatar</button>
                        </div>
                    </fieldset>

                    <fieldset className='flex flex-col my-3'>
                        <label htmlFor="username" className='text-sm font-bold text-slate-600'>Username</label>
                        <input type="text" name="username" id="username" placeholder='Username' className='input' value={userInputs.username} onChange={(e) => setUserInputs((prev) => { return { ...prev, username: e.target.value } })} />
                        {errors.usernameError ? <div className='text-red-600 mt-1 text-xs'>{errors.usernameError}</div> : null}
                    </fieldset>

                    <fieldset className='flex flex-col my-3'>
                        <label htmlFor="email" className='text-sm font-bold text-slate-600'>Email</label>
                        <input type="email" name="email" id="email" placeholder='Email' className='input' value={userInputs.email} onChange={(e) => setUserInputs((prev) => { return { ...prev, email: e.target.value } })} />
                        {errors.emailError ? <div className='text-red-600 mt-1 text-xs'>{errors.emailError}</div> : null}
                    </fieldset>

                    <fieldset className='flex flex-col my-3'>
                        <label htmlFor="password" className='text-sm font-bold text-slate-600'>Password</label>
                        <PasswordInput name="password" id="password" placeholder='Password' className='input' value={userInputs.password} onChange={(e) => setUserInputs((prev) => { return { ...prev, password: e.target.value } })} />
                        {errors.passwordError ? <div className='text-red-600 mt-1 text-xs'>{errors.passwordError}</div> : null}
                    </fieldset>

                    <fieldset className='flex flex-col my-3'>
                        <label htmlFor="cunfirm-password" className='text-sm font-bold text-slate-600'>Cunfirm Password</label>
                        <PasswordInput name="cunfirm-password" id="cunfirm-password" placeholder='Cunfirm Password' className='input' value={userInputs.cunfirmPassword} onChange={(e) => setUserInputs((prev) => { return { ...prev, cunfirmPassword: e.target.value } })} />
                        {errors.cunfirmPasswordError ? <div className='text-red-600 mt-1 text-xs'>{errors.cunfirmPasswordError}</div> : null}
                    </fieldset>

                    <fieldset className='flex justify-center mt-7'>
                        <button className='pink-button w-full' disabled={isLoading}>{isLoading ? "Loading..." : "Sign Up"}</button>
                    </fieldset>

                    {errors.global ? <div className='text-red-600 mt-2 text-xs text-center'>{errors.global}</div> : null}

                    <p className='text-xs mt-5 font-semibold'>Already have account? <Link to={"/signin"} className='text-pink font-bold underline hover:text-orange-600'>Login</Link></p>
                </form>

                <SigninWithGoogle />
            </div>
        </div>
    )
}

export default Signup