import { Link } from 'react-router-dom'
import { resetStringLength } from '../../utils/helper'

const TrandingCard = ({ product }) => {
    return (
        <div className='bg-white border shadow-md p-2 text-center w-[270px] h-[350px] group'>
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
        </div>
    )
}

export default TrandingCard