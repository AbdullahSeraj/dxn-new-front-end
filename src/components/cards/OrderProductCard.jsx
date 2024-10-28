import { Link } from 'react-router-dom'
import { useProductQuery } from '../../redux/features/productApiSlice'
import { resetStringLength } from '../../utils/helper'
import { useEffect, useState } from 'react'

const OrderProductCard = ({ currentProduct }) => {
    const [productId, setProductId] = useState(currentProduct?.productId || "")
    const { data: product, isError, error } = useProductQuery(productId)

    useEffect(() => {
        setProductId(currentProduct?.productId || "")
    }, [currentProduct?.productId])

    if (product) {
        return (
            <div className='w-full border rounded-md p-4 flex gap-4 items-center group max-sm:flex-col'>
                <Link to={`/details/${product?._id}`} className='h-[80px] w-[100px] rounded-md overflow-hidden'>
                    <img src={product?.images[0]} alt="" className='w-full h-full object-contain group-hover:scale-105 transition-all duration-300' />
                </Link>

                <div>
                    <div className='flex gap-10 mb-1'>
                        <h3 className='font-bold text-sm text-text'>{resetStringLength(product?.title, 30)}</h3>
                    </div>
                    <p className='text-gray-400 mb-3 text-xs' style={{ wordWrap: "break-word" }}>{resetStringLength(product?.description, 70)}</p>

                    <div>
                        <p className='text-text text-xs'>Quantity: {currentProduct?.quantity}</p>
                        <p className='text-text text-xs'>Color: {currentProduct?.color}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderProductCard