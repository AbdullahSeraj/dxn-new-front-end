import { FaMinus, FaPlus } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import { resetStringLength } from '../../utils/helper'
import { useProductQuery } from '../../redux/features/productApiSlice'
import { useEffect, useState } from 'react'
import { useDeleteCartMutation, useUpdateCartMutation } from '../../redux/features/cartApiSlice'
import { handleClickTrue } from '../../redux/slices/SnackbarSlice'
import { useDispatch } from 'react-redux'

const ColumnTable = ({ item }) => {
    const dispatch = useDispatch()
    const { data: product } = useProductQuery(item?.productId)
    const [updateCart, { isLoading: updateIsLoading }] = useUpdateCartMutation()
    const [number, setNumber] = useState(item?.quantity)
    const [daleteCart, { isLoading }] = useDeleteCartMutation()

    useEffect(() => {
        setNumber(item?.quantity)
    }, [item])

    useEffect(() => {
        if (number != item?.quantity) {
            setTimeout(() => {
                handleUpdateNumber();
            }, 500);
        } else {
            setTimeout(() => {
                setNumber(item?.quantity)
            }, 500);
        }

    }, [number]);

    const handleUpdateNumber = async () => {
        if (number && number > 0) {
            const { data } = await updateCart({
                id: item?._id,
                data: { quantity: number }
            })

            if (data?._id) {
                dispatch(handleClickTrue({ message: "Updated Successfully", condition: "success" }))
            }
        }
    }

    const handlePlusNumber = async () => {
        const { data } = await updateCart({
            id: item?._id,
            data: { plusOne: true }
        })

        if (data?._id) {
            dispatch(handleClickTrue({ message: "Updated Successfully", condition: "success" }))
        }
    }

    const handleMinusNumber = async () => {
        const { data } = await updateCart({
            id: item?._id,
            data: { minusOne: true }
        })

        if (data?._id) {
            dispatch(handleClickTrue({ message: "Updated Successfully", condition: "success" }))
        }
    }

    const handleDaleteCart = async (id) => {
        const { data } = await daleteCart(id)
        if (data?._id) {
            dispatch(handleClickTrue({ message: "Daleted Successfully", condition: "success" }))
        }
    }

    return (
        <tr className="border-b">
            <td>
                <div className="flex items-center gap-3 py-3">
                    <div className="relative w-[85px] h-[85px]">
                        <img src={product?.images[0]} className="w-full h-full object-contain mix-blend-multiply rounded-md" alt="" />
                        <button onClick={() => handleDaleteCart(item?._id)} className="absolute -top-2 -right-2 bg-black rounded-full p-[2px]"><IoClose className="text-white text-xs" /></button>
                    </div>

                    <div>
                        <h3 className="text-text font-bold">{resetStringLength(product?.title, 20)}</h3>
                        {item?.color && <p className="text-xs text-gray-400">Color: {item?.color}</p>}
                        {item?.size && <p className="text-xs text-gray-400">Size: {item?.size}</p>}
                    </div>
                </div>
            </td>
            <td>
                <p className="text-text">${product?.newPrice.toFixed(2)}</p>
            </td>
            <td>
                <div className="flex items-center gap-4 px-2 py-1 border-2 border-text/50 rounded-lg w-fit remove-arrow">
                    <button onClick={handleMinusNumber}><FaMinus className="text-xs" /></button>
                    <input type="number" value={number} className="w-[30px] text-center" onChange={(e) => setNumber(e.target.value)} />
                    <button onClick={handlePlusNumber}><FaPlus className="text-xs" /></button>
                </div>
            </td>
            <td>
                <p className="text-text font-semibold">${(item?.quantity * product?.newPrice).toFixed(2)}</p>
            </td>
        </tr>
    )
}

export default ColumnTable