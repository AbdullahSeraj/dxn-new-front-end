import { Link } from "react-router-dom"
import { resetStringLength } from "../../utils/helper"

const CircleCard = ({ product }) => {
    return (
        <div className="flex flex-col items-center gap-5">
            <div className='relative w-[270px] h-[270px] rounded-full overflow-hidden bg-gray-50 shadow-md hover:shadow-lg hover:shadow-violet group flex items-center justify-center group'>
                <Link to={`/details/${product?._id}`} className="w-[180px] h-[180px]">
                    <img src={product?.images[0]} alt="" className="w-full h-full object-contain group-hover:scale-105 transition-all duration-300 mix-blend-multiply" />
                </Link>

                <div className="absolute -bottom-full left-1/2 -translate-x-1/2 group-hover:bottom-7 transition-all duration-300 z-40 shadow-lg">
                    <Link to={`/details/${product?._id}`} className="bg-green-400 hover:bg-green-500 text-white text-xs py-2 px-5 rounded-md">View Shop</Link>
                </div>
            </div>

            <div className="text-center">
                <h3 className="text-text font-semibold text-lg">{resetStringLength(product?.title, 15)}</h3>
                <p className="text-text">${product?.newPrice.toFixed(2)}</p>
            </div>
        </div>
    )
}

export default CircleCard