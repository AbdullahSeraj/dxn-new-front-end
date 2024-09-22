import React from 'react'
import { useProductQuery } from '../../redux/features/productApiSlice'
import { resetStringLength } from '../../utils/helper'

const DemoCardItem = ({ item }) => {
    const { data: product } = useProductQuery(item?.productId)

    return (
        <div className='flex items-center justify-between gap-4 border-b py-4'>
            <div className='flex items-center gap-4'>
                <div className="bg-gray-200 rounded-md overflow-hidden w-[100px] h-[100px] p-3">
                    <img src={product?.images[0]} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                </div>

                <div>
                    <h3 className="text-text font-bold text-sm">{resetStringLength(product?.title, 17)}</h3>
                    {item?.color &&
                        <p className='text-gray-400 text-xs my-1'>Color: {item?.color}</p>
                    }
                    {item?.size &&
                        <p className='text-gray-400 text-xs my-1'>Size: {item?.size}</p>
                    }
                    <p className='text-gray-400 text-xs my-1'>Quantity: {item?.quantity}</p>
                </div>
            </div>

            <p className='text-text font-semibold text-sm'>${(product?.newPrice * item?.quantity).toFixed(2)}</p>
        </div>
    )
}

export default DemoCardItem