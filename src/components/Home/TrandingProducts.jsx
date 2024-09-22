import TrandingCard from '../cards/TrandingCard'
import { resetStringLength } from '../../utils/helper'
import { Link } from 'react-router-dom'

const TrandingProducts = ({ products, leftProducts, rightProducts }) => {
    return (
        <div className="py-10 max-lg:px-5 w-[90%] mx-auto">
            <h2 className="text-title_color text-center text-3xl font-bold my-7">Trending Products</h2>

            <div className='flex flex-wrap justify-center gap-6'>
                {products.map((product, i) => (
                    <TrandingCard product={product} key={i} />
                ))}
            </div>

            <div className='flex justify-center mt-7'>
                <div className='flex flex-wrap justify-center gap-5'>
                    {leftProducts && leftProducts.map((product, i) => (
                        <div className={`relative w-[420px] max-sm:w-full h-[270px] ${i == 0 ? "bg-pink/5" : "bg-text/5"} p-8 shadow-md rounded-md`} key={i}>
                            <div>
                                <h3 className='text-text font-semibold text-xl'>{((product?.oldPrice - product?.newPrice) / product?.oldPrice * 100).toFixed(0)}% off in all products</h3>
                                <Link to={`/details/${product?._id}`} className='border-b border-pink text-pink'>Shop Now</Link>
                            </div>
                            <div className='absolute bottom-3 right-3 w-[200px] h-[200px]'>
                                <img src={product?.images[0]} alt="" className='w-full h-full object-contain mix-blend-multiply' />
                            </div>
                        </div>
                    ))}

                    <div className='relative w-[270px] h-[270px] flex flex-col justify-between max-xl:hidden'>
                        {rightProducts && rightProducts.map((pro, i) => (
                            <div className='group flex items-center gap-5' key={i}>
                                <Link to={`/details/${pro?._id}`} className='w-[110px] h-[74px] bg-gray-100 shadow-md flex items-center justify-center overflow-hidden rounded-md p-2'>
                                    <img src={pro?.images[0]} alt="" className='w-full h-full object-contain group-hover:scale-105 transition-all duration-300 mix-blend-multiply' />
                                </Link>

                                <div>
                                    <h2 className='mb-1 text-sm'>{resetStringLength(pro?.title, 15)}</h2>
                                    <p>${pro?.newPrice.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrandingProducts