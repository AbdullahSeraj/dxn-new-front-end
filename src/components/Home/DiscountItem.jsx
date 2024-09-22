import { useNavigate } from 'react-router-dom'
import { resetStringLength } from '../../utils/helper'
import Slider from 'react-slick'

const DiscountItem = ({ products }) => {
    const navigate = useNavigate()

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: dots => (
            <div style={{ paddingBottom: "50px" }}>{dots}</div>
        ),
        nextArrow: <></>,
        prevArrow: <></>,
    };

    return (
        <div className="discount py-10 w-[80%] mx-auto">
            <h2 className="text-title_color text-center text-3xl font-bold mt-7 mb-3">Discount Item</h2>

            {/* <div className='flex gap-3 items-center justify-center mb-7'>
                <button className='text-pink border-b border-pink'>Wood Chair</button>
                <button className='text-text'>Plastic Chair</button>
                <button className='text-text'>Sofa Colletion</button>
            </div> */}

            <div>
                <Slider {...settings}>
                    {products && products.map((product, i) => (
                        <div key={i}>
                            <div className='flex justify-center items-center gap-10 max-lg:flex-col-reverse' >
                                <div className='w-1/2 max-lg:w-full'>
                                    <h2 className='text-2xl font-bold text-text mb-2'>{((product?.oldPrice - product?.newPrice) / product?.oldPrice * 100).toFixed(0)}% Discount Of this Product</h2>
                                    <p className='text-pink mb-2 font-semibold text-xl'>{resetStringLength(product?.title, 45)}</p>
                                    <p className='text-gray-400 mb-5 break-words'>{resetStringLength(product?.description,)}</p>
                                    {/* <div className='flex items-center gap-7 text-sm'>
                                        <div className='grid gap-2'>
                                            <div className='flex items-center gap-1'>
                                                <CheckIcon />
                                                <p className='text-gray-400'>Category: {product?.category}</p>
                                            </div>
                                            <div className='flex items-center gap-1'>
                                                <CheckIcon />
                                                <p className='text-gray-400'>Material expose like metals</p>
                                            </div>
                                        </div>
                                        <div className='grid gap-2'>
                                            <div className='flex items-center gap-1'>
                                                <CheckIcon />
                                                <p className='text-gray-400'>Simple neutral colours.</p>
                                            </div>
                                            <div className='flex items-center gap-1'>
                                                <CheckIcon />
                                                <p className='text-gray-400'>Clear lines and geomatric figures</p>
                                            </div>
                                        </div>
                                    </div> */}
                                    <button onClick={() => navigate(`/details/${product?._id}`)} className='pink-button'>Show Details</button>
                                </div>

                                <div className='relative'>
                                    <div className='flex items-end justify-center'>
                                        <div className=' w-[380px] h-[380px] rounded-full'></div>
                                    </div>
                                    <button onClick={() => navigate(`/details/${product?._id}`)} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px]'>
                                        <img src={product?.images[0]} alt="" className='w-full h-full mix-blend-multiply object-contain' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

        </div>
    )
}

export default DiscountItem