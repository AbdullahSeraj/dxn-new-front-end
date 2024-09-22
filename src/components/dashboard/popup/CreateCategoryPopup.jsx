import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useAddCategoryMutation } from '../../../redux/features/categoryApiSlice'
import { handleClickTrue } from '../../../redux/slices/SnackbarSlice'
import { useDispatch } from 'react-redux'

const CreateCategoryPopup = ({ handleShowCreateCat }) => {
    const dispatch = useDispatch()
    const [addCategory, { isLoading, isError, error }] = useAddCategoryMutation()
    const [categoryInputs, setCategoryInputs] = useState({ title: "", name: "" })

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await addCategory({
                title: categoryInputs.title,
                name: categoryInputs.name
            })

            if (data) {
                handleShowCreateCat()
                dispatch(handleClickTrue({ message: "Created New Category Successfully", condition: "success" }))
            }
        } catch (err) {
            dispatch(handleClickTrue({ message: error?.data?.message || "Something Error", condition: "error" }))
        }
    }

    return (
        <div className='fixed top-0 left-0 bottom-0 right-0 z-[300]'>
            <div className='fixed top-0 left-0 bottom-0 right-0 bg-gray-500/70' onClick={handleShowCreateCat}></div>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-md:w-[calc(100vw-50px)] min-h-[200px] max-h-[530px] overflow-y-auto bg-white rounded-lg p-3'>

                <button className='absolute top-2 right-2 bg-red-600/20 hover:bg-red-600/30 rounded-full p-1 w-fit z-[400]' onClick={handleShowCreateCat}>
                    <IoClose size={20} className='text-red-600' />
                </button>

                <div className="p-5">
                    <form onSubmit={handleSubmit}>
                        <h2 className='text-text font-bold text-xl mb-6'>Create New Category</h2>

                        <fieldset className='flex flex-col my-3 w-full'>
                            <label htmlFor="title" className='text-sm font-bold text-slate-600'>Title</label>
                            <input type="text" name="title" id="title" placeholder='title' className='input' value={categoryInputs.title} onChange={(e) => setCategoryInputs((prev) => { return { ...prev, title: e.target.value } })} />
                            {/* {errors.usernameError ? <div className='text-red-600 mt-1 text-xs'>{errors.usernameError}</div> : null} */}
                        </fieldset>

                        <fieldset className='flex flex-col my-3 w-full'>
                            <label htmlFor="name" className='text-sm font-bold text-slate-600'>Name</label>
                            <input type="text" name="name" id="name" placeholder='name' className='input' value={categoryInputs.name} onChange={(e) => setCategoryInputs((prev) => { return { ...prev, name: e.target.value } })} />
                            {/* {errors.usernameError ? <div className='text-red-600 mt-1 text-xs'>{errors.usernameError}</div> : null} */}
                        </fieldset>

                        {isError &&
                            <div className='text-red-600 text-center text-xs'>{error?.data?.message}
                            </div>
                        }

                        <fieldset>
                            <button className="bg-blue-600 text-white w-full py-2 px-5 font-semibold rounded-md shadow-md mt-4 hover:bg-blue-500 disabled:bg-blue-200 disabled:cursor-not-allowed" disabled={isLoading}>{isLoading ? "Loading..." : "Create Category"}</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateCategoryPopup