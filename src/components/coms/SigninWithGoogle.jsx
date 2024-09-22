import { useNavigate } from 'react-router-dom'
import { auth, provider } from '../../../firebase'
import { signInWithPopup } from 'firebase/auth'
import googleIcon from "../../assets/google.png"
import { useSigninWithGoogleMutation } from '../../redux/features/authApiSlice'
import Cookies from "js-cookie"
import { handleClickTrue } from '../../redux/slices/SnackbarSlice'
import { useDispatch } from 'react-redux'

const SigninWithGoogle = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [signinWithGoogle, { isError, isLoading, error }] = useSigninWithGoogleMutation()

    const handleClick = async () => {
        try {
            const result = await signInWithPopup(auth, provider)

            const { data } = await signinWithGoogle({ avatar: result.user.photoURL, username: result.user.displayName, email: result.user.email })

            if (data?.accessToken) {
                Cookies.set("accessToken", data.accessToken)
                window.location.reload();
                window.location.href = "/"
                navigate("/")
                dispatch(handleClickTrue({ message: "Sign In With Google Successfully", condition: "success" }))
            }
        } catch (error) {
            dispatch(handleClickTrue({ message: error?.data?.message || "Something Error", condition: "error" }))
        }
    }

    return (
        <button onClick={handleClick} className='flex items-center gap-5 border-2 border-slate-800 py-1 px-3 bg-gray-100 rounded-md mt-5 mx-auto'>
            <img src={googleIcon} alt="google" className='w-[20px] mix-blend-multiply' />
            <span className='font-bold text-xs'>{isLoading ? "Loading" : "Sign In With Google"}</span>
        </button>
    )
}

export default SigninWithGoogle