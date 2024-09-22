import { Link } from 'react-router-dom'
import { resetStringLength } from '../../utils/helper'
import { IoClose } from 'react-icons/io5'
import { useProductQuery } from '../../redux/features/productApiSlice'
import { useDispatch } from 'react-redux'
import { handleClickTrue } from '../../redux/slices/SnackbarSlice'
import { useDeleteSavedMutation } from '../../redux/features/savedApiSlice'

const SavedCard = ({ fav }) => {
    const dispatch = useDispatch()
    const { data: product } = useProductQuery(fav?.productId)
    const [deleteSaved, { isLoadingDelteSaved }] = useDeleteSavedMutation()

    const handleRemoveFromSaved = async () => {
        const { data } = await deleteSaved(fav?.productId)

        if (data?.productId) {
            dispatch(handleClickTrue({ message: "Removed From Favorifes Successfully", condition: "success" }))
        } else {
            dispatch(handleClickTrue({ message: errorAddSaved?.data?.message || "Something Error", condition: "error" }))
        }
    }

    return (
        <div className='relative bg-white border shadow-md p-2 text-center w-[270px] h-[350px] group'>
            <Link to={`/details/${product?._id}`} className='bg-gray-100 h-[245px] flex items-center justify-center cursor-pointer p-7'>
                <img src={product?.images[0]} alt="" className='group-hover:scale-105 transition-all duration-300 mix-blend-multiply object-contain' />
            </Link>

            <div className='py-5'>
                <h3 className='text-lg text-text font-bold mb-2'>{resetStringLength(product?.title, 17)}</h3>
                <div className='text-xs flex items-center gap-4 justify-center'>
                    <p className='text-text'>${product?.newPrice.toFixed(2)}</p>
                    <p className='line-through text-gray-400'>${product?.oldPrice.toFixed(2)}</p>
                </div>
            </div>

            <button className='absolute top-3 right-3 bg-red-600/20 hover:bg-red-600/30 rounded-full p-1 w-fit z-[400]' onClick={handleRemoveFromSaved}>
                <IoClose size={20} className='text-red-600' />
            </button>

        </div>
    )
}

export default SavedCard