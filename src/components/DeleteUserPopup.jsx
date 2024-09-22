import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useDeleteUserMutation, useGetUserQuery, useUpdateRoleUserMutation } from '../redux/features/userApiSlice'
import personImg from "../assets/login-animation.gif"
import { handleClickTrue } from '../redux/slices/SnackbarSlice'
import { useDispatch } from 'react-redux'

const DeleteUserPopup = ({ id, handleShowDeleteProduct }) => {
    const dispatch = useDispatch()
    const [deleteUser, { isLoading, isError, error }] = useDeleteUserMutation()

    const handleUpdateRoleUser = async () => {
        try {
            const data = await deleteUser(id)

            if (data) {
                handleShowDeleteProduct()
                dispatch(handleClickTrue({ message: "Deleted Successfully", condition: "success" }))
            } else {
                dispatch(handleClickTrue({ message: error?.data?.message || "Something Error", condition: "error" }))
            }
        } catch (error) {
            dispatch(handleClickTrue({ message: error?.data?.message || "Something Error", condition: "error" }))
        }
    }

    return (
        <div className='fixed top-0 left-0 bottom-0 right-0 z-[300]'>
            <div className='fixed top-0 left-0 bottom-0 right-0 bg-gray-500/70' onClick={handleShowDeleteProduct}></div>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-md:w-[calc(100vw-50px)] bg-white rounded-lg px-10 py-5'>
                <>
                    <button className='absolute top-2 right-2 bg-red-600/20 hover:bg-red-600/30 rounded-full p-1 w-fit z-[400]' onClick={handleShowDeleteProduct}>
                        <IoClose size={20} className='text-red-600' />
                    </button>

                    <div className='my-5'>
                        <h3 className='text-center font-semibold text-sm'>Are you sure to want to delete this user</h3>

                        <div className='flex items-center gap-5'>
                            <div className='flex items-center justify-center flex-1'>
                                <button onClick={handleShowDeleteProduct} className='bg-gray-100 border hover:bg-gray-200 text-black rounded-md py-2 w-full text-xs font-semibold mt-5 shadow-md'>Cancel</button>
                            </div>

                            <div className='flex items-center justify-center flex-1'>
                                <button onClick={handleUpdateRoleUser} className='bg-red-600 hover:bg-red-600/90 text-white rounded-md py-2 w-full text-xs font-semibold mt-5 shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed' disabled={isLoading} >{isLoading ? "Loading..." : "Delete"}</button>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </div>
    )
}

export default DeleteUserPopup