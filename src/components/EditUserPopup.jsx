import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useGetUserQuery, useUpdateRoleUserMutation } from '../redux/features/userApiSlice'
import personImg from "../assets/login-animation.gif"
import Loading from './loading/LoadingComponent'
import { handleClickTrue } from '../redux/slices/SnackbarSlice'
import { useDispatch } from 'react-redux'

const EditUserPopup = ({ id, handleShowUpdateProduct }) => {
    const dispatch = useDispatch()
    const { data: getUser, isLoading: isLoadingGetUser } = useGetUserQuery(id)
    const [role, setRole] = useState(getUser?.role || "")
    const [updateRoleUser, { isLoading: isLoadingUpdate, isError: isErrorUpdate, error: errorUpdate }] = useUpdateRoleUserMutation()

    useEffect(() => {
        setRole(getUser?.role || "")
    }, [getUser?.role])

    const handleUpdateRoleUser = async () => {
        const { data } = await updateRoleUser({
            id: id,
            data: {
                role: role,
            }
        })

        if (data) {
            handleShowUpdateProduct()
            dispatch(handleClickTrue({ message: "Updated Successfully", condition: "success" }))
        } else {
            dispatch(handleClickTrue({ message: error?.data?.message || "Something Error", condition: "error" }))
        }
    }

    return (
        <div className='fixed top-0 left-0 bottom-0 right-0 z-[300]'>
            <div className='fixed top-0 left-0 bottom-0 right-0 bg-gray-500/70' onClick={handleShowUpdateProduct}></div>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] max-md:w-[calc(100vw-50px)] min-h-[200px] bg-white rounded-lg py-10'>
                {isLoadingGetUser ?
                    <Loading width={"150px"} />
                    :
                    <>
                        <button className='absolute top-2 right-2 bg-red-600/20 hover:bg-red-600/30 rounded-full p-1 w-fit z-[400]' onClick={handleShowUpdateProduct}>
                            <IoClose size={20} className='text-red-600' />
                        </button>

                        <div>
                            <div className='flex flex-col items-center gap-3 mb-2'>
                                <div className='relative rounded-full overflow-hidden w-[100px] h-[100px] mx-auto shadow-md bg-gray-100'>
                                    <img src={getUser?.avatar ? getUser?.avatar : personImg} alt="" className='mix-blend-multiply w-full h-full object-contain' />
                                </div>
                            </div>

                            <div className='mt-5'>
                                <h3 className='text-sm text-center'><strong>Username:</strong> {getUser?.username}</h3>
                                <h3 className='text-sm text-center'><strong>Email:</strong> {getUser?.email}</h3>

                                <div className='flex justify-center'>
                                    <fieldset className='flex items-center gap-6 my-3'>
                                        <label htmlFor="role" className='text-sm font-bold text-slate-600'>Role</label>
                                        <select name="role" id="role" className='input' value={role} onChange={(e) => setRole(e.target.value)} >
                                            <option value="">Select...</option>
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        {/* {errors.usernameError ? <div className='text-red-600 mt-1 text-xs'>{errors.usernameError}</div> : null} */}
                                    </fieldset>
                                </div>

                                {isErrorUpdate &&
                                    <p className='text-red-600 text-[12px] text-center'>{errorUpdate?.data?.message}</p>
                                }

                                <div className='flex items-center justify-center'>
                                    <button onClick={handleUpdateRoleUser} className='bg-blue-600 hover:bg-blue-600/90 text-white rounded-md py-2 w-1/2 text-xs font-semibold mt-5 shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed' disabled={isLoadingUpdate} >{isLoadingUpdate ? "Loading..." : "Update"}</button>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default EditUserPopup