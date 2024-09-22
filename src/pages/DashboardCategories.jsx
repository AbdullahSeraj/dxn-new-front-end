import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import { LuUpload } from 'react-icons/lu'
import LoadingComponent from '../components/loading/LoadingComponent'
import ErrorComponent from '../components/error/ErrorComponent'
import { useCategoriesQuery } from '../redux/features/categoryApiSlice'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBinFill } from 'react-icons/ri'
import DeleteCategoryPopup from '../components/dashboard/popup/DeleteCategoryPopup'
import CreateCategoryPopup from '../components/dashboard/popup/CreateCategoryPopup'

const DashboardCategories = () => {
    const { data, isLoading, error, isError } = useCategoriesQuery()
    const [categories, setCategories] = useState(data || [])
    const [search, setSearch] = useState("")
    const [categoryId, setCategoryId] = useState("")

    useEffect(() => {
        setCategories(data)
    }, [data])

    useEffect(() => {
        if (search === "" || search === null) {
            setCategories(data)
        } else {
            const searchedCat = categories.filter((cat) => cat.title.toLowerCase().includes(search.toLowerCase()) || cat.name.toLowerCase().includes(search.toLowerCase()))
            setCategories(searchedCat)
        }
    }, [search])

    const [showDeleteCat, setShowDeleteCat] = useState(false)
    const handleShowDeleteCat = () => {
        setShowDeleteCat(!showDeleteCat);
    }
    const handleOpenDeleteCat = (id) => {
        setCategoryId(id)
        setShowDeleteCat(true)
    }

    const [showCreateCat, setShowCreateCat] = useState(false)
    const handleShowCreateCat = () => {
        setShowCreateCat(!showCreateCat);
    }

    return (
        <div className='w-full'>
            <div className='flex justify-between items-center gap-3 min-h-[50px] max-lg:flex-col max-sm:text-center'>
                <div>
                    <h2 className='font-bold text-2xl'>Categories</h2>
                    <p className='text-xs'>Dashboard Categories</p>
                </div>

                <div className='flex gap-5 max-sm:flex-col max-sm:gap-3'>
                    <button className='bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-semibold flex items-center gap-2 max-sm:px-20' onClick={handleShowCreateCat}>
                        <LuUpload size={'17px'} />
                        Upload New Category
                    </button>
                    <div className="shadow-md flex items-center gap-2 py-2 px-4 rounded-md bg-gray-50 border">
                        <IoSearchSharp size={15} />
                        <input type="text" placeholder='Search...' className="outline-none bg-transparent text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
            </div>

            {isLoading &&
                <LoadingComponent width={"200px"} />
            }

            {isError &&
                <ErrorComponent message={error?.data?.message} />
            }

            {!isLoading && !isError &&
                <div className="w-full overflow-auto mt-3 p-2 h-[calc(100vh-205px)] max-lg:h-[calc(100vh-261px)] max-sm:h-[calc(100vh-300px)]">
                    <div className="max-w-full max-lg:min-w-[800px] max-xl:min-w-[500px]">
                        <table className='w-full shadow-md rounded-md overflow-hidden outline outline-gray-200 text-xs'>
                            <thead>
                                <tr>
                                    <th className='border py-2'>Title</th>
                                    <th className='border py-2'>Name</th>
                                    <th className='border py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories && categories.map((cat) => (
                                    <tr key={cat._id} className='border-b text-center hover:bg-gray-50'>
                                        <td>
                                            <p className='font-semibold'>{cat?.title}</p>
                                        </td>
                                        <td>
                                            <p className='font-semibold'>{cat?.name}</p>
                                        </td>
                                        <td className='flex items-center justify-center gap-4 h-[50px]'>
                                            <button className='rounded-full bg-red-600/10 p-2 shadow-md border' onClick={() => handleOpenDeleteCat(cat?._id)}>
                                                <RiDeleteBinFill size={13} className='text-red-800' />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            }

            {showDeleteCat && <DeleteCategoryPopup id={categoryId} handleShowDeleteCat={handleShowDeleteCat} />}
            {showCreateCat && <CreateCategoryPopup handleShowCreateCat={handleShowCreateCat} />}
        </div>
    )
}

export default DashboardCategories