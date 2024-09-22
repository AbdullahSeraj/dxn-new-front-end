import CardIcon from '../../assets/Icons/CardIcon'
import SearchAddIcon from '../../assets/Icons/SearchAddIcon'
import { resetStringLength, Stars } from '../../utils/helper'
import { Link, useNavigate } from 'react-router-dom'
import { handleOpenViewDateils } from '../../redux/slices/ViewDetailsSlice'
import { useDispatch } from 'react-redux'
import { useProductQuery } from '../../redux/features/productApiSlice'
import { useAddCartMutation } from '../../redux/features/cartApiSlice'
import { useAddSavedMutation, useDeleteSavedMutation, useIsSavedQuery } from '../../redux/features/savedApiSlice'
import { handleClickTrue } from '../../redux/slices/SnackbarSlice'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import Radio from '../coms/Radio'
import { useEffect, useState } from 'react'
import Cookies from "js-cookie"

const ProductCardList = ({ product }) => {
    const token = Cookies.get("accessToken")
    const navigate = useNavigate()
    const { data, isError, error } = useProductQuery(product?._id)
    const dispatch = useDispatch()

    const [addCart, { isLoading: isLoadingAddCart, isError: isErrorAddCart, error: errorAddCart }] = useAddCartMutation()
    const [selctedColor, setSelctedColor] = useState(product?.colors[0] || "");
    const [addSaved, { isLoading: isLoadingAddSaved, error: errorAddSaved }] = useAddSavedMutation()
    const [deleteSaved, { isLoading: isLoadingDeleteSaved, error: errorDeleteSaved }] = useDeleteSavedMutation()
    const { data: isSave } = useIsSavedQuery(product?._id)

    useEffect(() => {
        setSelctedColor(product?.colors[0] || "")
    }, [product])

    const handleAddToCart = async () => {
        if (!token) {
            navigate("/signin")
            return;
        }
        try {
            const { data } = await addCart({
                quantity: 1,
                productId: product?._id,
                color: selctedColor == "" ? null : selctedColor
            })

            if (data?.productId) {
                dispatch(handleClickTrue({ message: "Added Product Successfully", condition: "success" }))
            } else {
                dispatch(handleClickTrue({ message: error?.data?.message || "Something Error", condition: "error" }))
            }
        } catch (error) {
            dispatch(handleClickTrue({ message: error?.data?.message || "Something Error", condition: "error" }))
        }
    }

    const handleAddToSaved = async () => {
        if (!token) {
            navigate("/signin")
            return;
        }
        const { data } = await addSaved({
            productId: product?._id
        })

        if (data?.productId) {
            dispatch(handleClickTrue({ message: "Saved Successfully", condition: "success" }))
        } else {
            dispatch(handleClickTrue({ message: errorAddSaved?.data?.message || "Something Error", condition: "error" }))
        }
    }

    const handleRemoveFromSaved = async () => {
        if (!token) {
            navigate("/signin")
            return;
        }
        const { data } = await deleteSaved(product?._id)

        if (data?.productId) {
            dispatch(handleClickTrue({ message: "Removed From Favorifes Successfully", condition: "success" }))
        } else {
            dispatch(handleClickTrue({ message: errorAddSaved?.data?.message || "Something Error", condition: "error" }))
        }
    }

    return (
        <div className='w-full sm:h-[230px] border rounded-md shadow-md p-4 flex gap-4 items-center group max-sm:flex-col'>
            <Link to={`/details/${product?._id}`} className='h-[200px] w-[280px] rounded-md overflow-hidden'>
                <img src={product?.images[0]} alt="" className='w-full h-full object-contain group-hover:scale-105 transition-all duration-300' />
            </Link>

            <div>
                <div className='flex gap-10 mb-2'>
                    <h3 className='font-bold text-lg text-text'>{resetStringLength(product?.title, 30)}</h3>
                    <div className="flex items-center gap-1">
                        {product?.colors.map((color, i) => (
                            <Radio color={color} name="colors" key={i} value={color} checked={color == selctedColor} onChange={(e) => setSelctedColor(e.target.value)} />
                        ))}
                    </div>
                </div>

                <div className='flex items-center gap-5 mb-2'>
                    <div className='flex gap-3'>
                        <p className='text-text'>${product?.newPrice}</p>
                        <p className='text-pink line-through'>${product?.oldPrice}</p>
                    </div>
                    <div className='flex gap-[3px]'>
                        <Stars number={product?.rating} />
                    </div>
                </div>

                <p className='text-gray-400 mb-3' style={{ wordWrap: "break-word" }}>{resetStringLength(product?.description, 70)}</p>

                <div className='flex items-center gap-2'>
                    <button onClick={handleAddToCart} className='shadow-md rounded-full p-2 w-fit border hover:bg-gray-100'>
                        <CardIcon className={"text-text"} />
                    </button>
                    {isSave?.isSaved ?
                        <button onClick={handleRemoveFromSaved} className='shadow-md rounded-full p-2 w-fit border hover:bg-gray-100'>
                            <FaHeart className={"text-text"} />
                        </button>
                        :
                        <button onClick={handleAddToSaved} className='shadow-md rounded-full p-2 w-fit border hover:bg-gray-100'>
                            <FaRegHeart className={"text-text"} />
                        </button>
                    }
                    <button className='shadow-md rounded-full p-2 w-fit border hover:bg-gray-100' onClick={() => { dispatch(handleOpenViewDateils({ data: product, isError: isError, error: error })) }}>
                        <SearchAddIcon className={"text-text"} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCardList