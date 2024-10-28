import { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBinFill } from 'react-icons/ri'
import LoadingComponent from '../components/loading/LoadingComponent'
import ErrorComponent from '../components/error/ErrorComponent'
import { useOrdersQuery } from '../redux/features/orderApiSlice'
import OrderCard from '../components/cards/OrderCard'

const DashboardUsers = () => {
    const { data: orders, isLoading, error, isError } = useOrdersQuery()
    const [search, setSearch] = useState("")

    return (
        <div className='w-full'>
            <div className='flex justify-between items-center min-h-[50px] max-sm:flex-col max-sm:text-center'>
                <div>
                    <h2 className='font-bold text-2xl'>Orders</h2>
                    <p className='text-xs'>Dashboard Orders</p>
                </div>

                <div className='flex gap-5'>
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
                <div className="w-full overflow-auto mt-3 p-2 h-[calc(100vh-205px)] max-sm:h-[calc(100vh-245px)]">
                    <div className="max-w-full max-lg:min-w-[800px] max-xl:min-w-[500px]">
                        {/* <table className='w-full shadow-md rounded-md overflow-hidden outline outline-gray-200 text-xs'>
                            <thead>
                                <tr>
                                    <th className='border py-2'>Avatar</th>
                                    <th className='border py-2'>Usename</th>
                                    <th className='border py-2'>Email</th>
                                    <th className='border py-2'>Role</th>
                                    <th className='border py-2'>Gender</th>
                                    <th className='border py-2'>Country</th>
                                    <th className='border py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map((user) => (
                                    <tr key={user._id} className='border-b text-center hover:bg-gray-50'>
                                        <td className='flex justify-center py-1'>
                                            <img src={user?.avatar} alt="" className='rounded-full w-10 h-10' />
                                        </td>
                                        <td>
                                            <p className='font-semibold'>{user?.username}</p>
                                        </td>
                                        <td>
                                            <p className='font-semibold'>{user?.email}</p>
                                        </td>
                                        <td>
                                            <p className='font-semibold'>{user?.role}</p>
                                        </td>
                                        <td>
                                            <p className='font-semibold'>{user?.gender ? user?.gender : "Null"}</p>
                                        </td>
                                        <td>
                                            <p className='font-semibold'>{user?.country ? user?.country : "Null"}</p>
                                        </td>
                                        <td className='flex items-center justify-center gap-4 h-[50px]'>
                                            <button className='rounded-full bg-green-600/10 p-2 shadow-md border' onClick={() => handleOpenUpdateProduct(user?._id)}>
                                                <FiEdit size={13} className='text-green-800' />
                                            </button>
                                            <button className='rounded-full bg-red-600/10 p-2 shadow-md border' onClick={() => handleOpenDeleteProduct(user?._id)}>
                                                <RiDeleteBinFill size={13} className='text-red-800' />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> */}

                        <div className='grid gap-3'>
                            {orders && orders.map((order, i) => (
                                <OrderCard order={order} key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            }
            {/* {showUpdateProduct && <EditUserPopup id={userId} handleShowUpdateProduct={handleShowUpdateProduct} />} */}
            {/* {showDeleteProduct && <DeleteUserPopup id={userId} handleShowDeleteProduct={handleShowDeleteProduct} />} */}
        </div>
    )
}

export default DashboardUsers