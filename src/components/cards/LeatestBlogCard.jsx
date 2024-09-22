import PensolIcon from '../../assets/Icons/PensolIcon'
import CalendarIcon from '../../assets/Icons/CalendarIcon'
import { formatDate, resetStringLength } from '../../utils/helper'
import { Link } from 'react-router-dom'

const LeatestBlogCard = ({ product }) => {
    return (
        <div className='w-[370px] h-[500px] rounded-md shadow-md hover:shadow-lg border group'>
            <Link to={`/details/${product?._id}`} className='block h-1/2 w-full rounded-md overflow-hidden p-7'>
                <img src={product?.images[0]} alt="" className='w-full h-full object-contain group-hover:scale-105 transition-all duration-300 mix-blend-multiply' />
            </Link>

            <div className='p-5 h-1/2 flex flex-col'>
                <div className='flex items-center gap-4 text-xs mb-6'>
                    <div className='flex items-center gap-1'>
                        <PensolIcon className="text-pink w-[12px] h-[12px]" />
                        <span>{product?.createdBy?.username}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <CalendarIcon className="text-orange-400 w-[12px] h-[12px]" />
                        <span>{formatDate(product?.createdAt)}</span>
                    </div>
                </div>

                <div className='flex flex-col items-start justify-between h-full'>
                    <div>
                        <h2 className='text-text font-bold text-xl mb-2 group-hover:text-pink'>{resetStringLength(product?.title, 20)}</h2>
                        <p className='text-text text-sm mb-10 leading-6'>{resetStringLength(product?.title, 130)}</p>
                    </div>
                    <Link to={`/details/${product?._id}`} className='text-text underline group-hover:text-pink'>Read More</Link>
                </div>
            </div>

        </div>
    )
}

export default LeatestBlogCard