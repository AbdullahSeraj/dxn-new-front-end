import { FiEdit } from "react-icons/fi"
import { RiDeleteBinFill } from "react-icons/ri"
import { resetStringLength } from "../../utils/helper"
import { useNavigate } from "react-router-dom"

const ColumnProductsDashboard = ({ product, handleOpenEditProduct, handleOpenDeleteProduct }) => {
    const navigate = useNavigate()

    return (
        <tr className='border-b text-center hover:bg-gray-50'>
            <td className='flex justify-center py-1'>
                <img src={product?.images[0]} alt="" className='w-10 h-10 object-contain mix-blend-multiply cursor-pointer' onClick={() => navigate(`/details/${product?._id}`)} />
            </td>
            <td>
                <p className='font-semibold text-start pl-4'>{resetStringLength(product?.title, 20)}</p>
            </td>
            <td>
                <p className='font-semibold'>${product?.newPrice.toFixed(2)}</p>
            </td>
            <td>
                <p className='font-semibold line-through text-gray-400'>${product?.oldPrice.toFixed(2)}</p>
            </td>
            <td>
                <p className='font-semibold'>{product?.rating.toFixed(1)}</p>
            </td>
            <td>
                <p className='font-semibold'>{product?.group ? product?.group : "Null"}</p>
            </td>
            <td>
                <p className='font-semibold'>{product?.createdBy?.username ? resetStringLength(product?.createdBy?.username, 20) : "Null"}</p>
            </td>
            <td className='flex items-center justify-center gap-4 h-[50px]'>
                <button className='rounded-full bg-green-600/10 p-2 shadow-md border' onClick={() => handleOpenEditProduct(product?._id)}>
                    <FiEdit size={13} className='text-green-800' />
                </button>
                <button className='rounded-full bg-red-600/10 p-2 shadow-md border' onClick={() => handleOpenDeleteProduct(product?._id)}>
                    <RiDeleteBinFill size={13} className='text-red-800' />
                </button>
            </td>
        </tr>
    )
}

export default ColumnProductsDashboard