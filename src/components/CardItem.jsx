import { resetStringLength, Stars } from "../utils/helper"

import { FiEdit } from "react-icons/fi";
import { RiDeleteBinFill } from "react-icons/ri";

const CardItem = ({ className, box, product, handleOpenEditProduct, handleOpenDeleteProduct }) => {
    return (
        <div className={"bg-white shadow-md hover:shadow-lg rounded-md min-w-[230px] group border " + className}>
            <div className="overflow-hidden h-[140px] p-3">
                <img src={product?.images[0]} alt="" className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-all duration-300" />
            </div>

            <div className="text-center p-3">
                <h3 className="font-bold">{resetStringLength(product?.title, 20)}</h3>
                <div className="mx-auto">
                    <Stars number={product?.rating} />
                </div>
                <p className="font-bold text-green-500 text-2xl">${product?.newPrice}</p>
                <p className="text-gray-500 text-xs">{resetStringLength(product?.description, 80)}</p>

                {box ?
                    <button className="rounded-bl-xl rounded-tr-xl rounded-tl-md rounded-br-md bg-green-500 hover:bg-green-600 text-white py-[6px] px-4 text-xs mt-3 font-semibold">Add to Cart</button>
                    :
                    <div className="flex items-center gap-3 justify-center">
                        <button onClick={() => handleOpenEditProduct(product?._id)} className="rounded-bl-xl rounded-tr-xl rounded-tl-md rounded-br-md bg-green-500 hover:bg-green-600 text-white py-[6px] px-4 text-xs mt-3 font-semibold">
                            <div className="flex items-center gap-2">
                                <FiEdit size={12} />
                                Edit
                            </div>
                        </button>
                        <button onClick={() => handleOpenDeleteProduct(product?._id)} className="rounded-bl-xl rounded-tr-xl rounded-tl-md rounded-br-md bg-red-500 hover:bg-red-600 text-white py-[6px] px-4 text-xs mt-3 font-semibold">
                            <div className="flex items-center gap-2">
                                <RiDeleteBinFill size={12} />
                                Delete
                            </div>
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default CardItem