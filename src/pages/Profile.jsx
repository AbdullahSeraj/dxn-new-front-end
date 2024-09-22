import { useEffect, useRef, useState } from "react"
import { useGetProfileQuery, useUpdateProfileMutation } from "../redux/features/userApiSlice"
import PasswordInput from "../components/coms/PasswordInput"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../../firebase"
import personImg from "../assets/login-animation.gif"
import { countryListAllIsoData, resetStringLength } from "../utils/helper"

const Profile = () => {
    const { data } = useGetProfileQuery()
    const [userInputs, setUserInputs] = useState({ avatar: data?.avatar || "", username: data?.username || "", email: data?.email || "", password: "", language: data?.language || "", gender: data?.gender || "", country: data?.country || "" })
    const [errors, setErrors] = useState({ usernameError: "", emailError: "", passwordError: "", global: "" })
    const [updateProfile, { isError, error, isLoading }] = useUpdateProfileMutation()
    const uploadImg = useRef(null)
    const [file, setFile] = useState(undefined)
    const [filePerc, setFilePerc] = useState(0)

    useEffect(() => {
        setUserInputs({ avatar: data?.avatar || "", username: data?.username || "", email: data?.email || "", password: "", language: data?.language || "", gender: data?.gender || "", country: data?.country || "" })
    }, [data])

    const handleEdit = async () => {
        setErrors({ usernameError: "", emailError: "", passwordError: "", global: "" })

        if (!userInputs.username) {
            setErrors((prev) => { return { ...prev, usernameError: "username is required" } })
            return;
        }
        if (!userInputs.email) {
            setErrors((prev) => { return { ...prev, emailError: "email is required" } })
            return;
        }
        // if (!userInputs.password) {
        //     setErrors((prev) => { return { ...prev, passwordError: "password is required" } })
        //     return;
        // }

        const { data } = await updateProfile({
            username: userInputs.username,
            password: userInputs.password,
            avatar: userInputs.avatar,
            language: userInputs.language,
            gender: userInputs.gender,
            country: userInputs.country
        })
    }

    useEffect(() => {
        if (isError) {
            setErrors({ ...errors, global: error?.data?.message })
        }
    }, [isError])

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
        <div className="flex items-center justify-center py-10" style={{ minHeight: "calc(100vh - 60px)" }}>
            <div className="w-[80%] max-md:w-[90%] mx-auto shadow-xl p-10 rounded-xl" style={{ boxShadow: "10px 10px 20px 10px #ddd" }}>
                <div className="flex items-center justify-between gap-5 max-sm:flex-col max-sm:gap-0">
                    <div className="flex items-center gap-5">
                        <fieldset className='mb-4'>
                            <input onChange={(e) => setFile(e.target.files[0])} type="file" hidden ref={uploadImg} accept='image/*' />
                            <div className='relative rounded-full overflow-hidden w-[100px] h-[100px] mx-auto shadow-lg' onClick={() => uploadImg?.current.click()}>
                                <img src={userInputs.avatar ? userInputs.avatar : personImg} alt="" className='w-full h-full object-contain' />
                                <button type='button' className='absolute bottom-0 left-1/2 -translate-x-1/2 w-full bg-gray-100/50 text-xs font-bold pb-6 pt-1 text-center'>{data?.avatar ? "Change Avatar" : "Upload Avatar"}</button>
                            </div>
                        </fieldset>

                        <div>
                            <p className="font-bold">{data?.username}</p>
                            <p className="font-semibold text-gray-500">{data?.email}</p>
                        </div>
                    </div>

                    <div>
                        <button onClick={handleEdit} className="text-white bg-blue-600 shadow-md rounded-md py-2 px-8 font-semibold disabled:bg-blue-300 disabled:cursor-not-allowed" disabled={isLoading}>{isLoading ? "Loading..." : "Edit"}</button>
                    </div>
                </div>

                <div className="mt-7">
                    <div className="flex gap-10 max-xl:flex-col max-xl:gap-0">
                        <fieldset className='flex flex-col my-3 w-full'>
                            <label htmlFor="username" className='text-sm font-bold text-slate-600'>Username</label>
                            <input type="text" name="username" id="username" placeholder='Username' className='input' value={userInputs.username} onChange={(e) => setUserInputs((prev) => { return { ...prev, username: e.target.value } })} />
                            {errors.usernameError ? <div className='text-red-600 mt-1 text-xs'>{errors.usernameError}</div> : null}
                        </fieldset>

                        <fieldset className='flex flex-col my-3 w-full'>
                            <label htmlFor="email" className='text-sm font-bold text-slate-600'>Email</label>
                            <input type="email" name="email" id="email" placeholder='Email' className='input disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400' value={userInputs.email} disabled={true} onChange={(e) => setUserInputs((prev) => { return { ...prev, email: e.target.value } })} />
                            {errors.emailError ? <div className='text-red-600 mt-1 text-xs'>{errors.emailError}</div> : null}
                        </fieldset>
                    </div>

                    <div className="flex gap-10 max-xl:flex-col max-xl:gap-0">
                        <fieldset className='flex flex-col my-3 w-full'>
                            <label htmlFor="password" className='text-sm font-bold text-slate-600'>Password</label>
                            <PasswordInput name="password" id="password" placeholder='Password' className='input' value={userInputs.password} onChange={(e) => setUserInputs((prev) => { return { ...prev, password: e.target.value } })} />
                            {errors.passwordError ? <div className='text-red-600 mt-1 text-xs'>{errors.passwordError}</div> : null}
                        </fieldset>

                        <fieldset className='flex flex-col my-3 w-full'>
                            <label htmlFor="gender" className='text-sm font-bold text-slate-600'>Gender</label>
                            <select name="gender" id="gender" className='input' value={userInputs.gender} onChange={(e) => setUserInputs((prev) => { return { ...prev, gender: e.target.value } })} >
                                <option value="">Select your gender...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {errors.usernameError ? <div className='text-red-600 mt-1 text-xs'>{errors.usernameError}</div> : null}
                        </fieldset>
                    </div>

                    <div className="flex gap-10 max-xl:flex-col max-xl:gap-0">
                        <fieldset className='flex flex-col my-3 w-full'>
                            <label htmlFor="country" className='text-sm font-bold text-slate-600'>Country</label>
                            <select name="country" id="country" className='input w-full' value={userInputs.country} onChange={(e) => setUserInputs((prev) => { return { ...prev, country: e.target.value } })} >
                                <option value="">Select...</option>
                                {countryListAllIsoData && countryListAllIsoData.map((country) => (
                                    <option value={country.code} key={country.code} >{country.name}</option>
                                ))}
                            </select>
                            {errors.usernameError ? <div className='text-red-600 mt-1 text-xs'>{errors.usernameError}</div> : null}
                        </fieldset>

                        <fieldset className='flex flex-col my-3 w-full'>
                            <label htmlFor="language" className='text-sm font-bold text-slate-600'>Language</label>
                            <select name="language" id="language" className='input' value={userInputs.language} onChange={(e) => setUserInputs((prev) => { return { ...prev, language: e.target.value } })} >
                                <option value="en">English</option>
                                <option value="ar">Arabic</option>
                                <option value="tr">Turkish</option>
                            </select>
                            {errors.emailError ? <div className='text-red-600 mt-1 text-xs'>{errors.emailError}</div> : null}
                        </fieldset>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Profile