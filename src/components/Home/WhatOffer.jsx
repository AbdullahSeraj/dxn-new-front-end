import React from 'react'
import FreeDelivery from '../../assets/Icons/FreeDelivery'
import CashbackIcon from '../../assets/Icons/CashbackIcon'
import PremiumIcon from '../../assets/Icons/PremiumIcon'
import HoursIcon from '../../assets/Icons/HoursIcon'

const WhatOffer = () => {
    return (
        <div className="py-10 w-full px-20 max-lg:px-5">
            <h2 className="text-title_color text-center text-3xl font-bold my-7">What Our Offer!</h2>

            <div className='flex justify-center flex-wrap gap-6'>
                <div className='w-[270px] h-[320px] p-4 shadow-lg border rounded-md flex items-center justify-center hover:shadow-xl'>
                    <div className='flex flex-col items-center gap-4 text-center'>
                        <FreeDelivery />
                        <p className='text-text font-bold text-xl'>Free Shopping</p>
                        <p className='text-text/80'>Enjoy now free shipping on purchases over $300 and don't miss the opportunity</p>
                    </div>
                </div>
                <div className='w-[270px] h-[320px] p-4 shadow-lg border rounded-md flex items-center justify-center hover:shadow-xl'>
                    <div className='flex flex-col items-center gap-4 text-center'>
                        <CashbackIcon />
                        <p className='text-text font-bold text-xl'>Competitive prices</p>
                        <p className='text-text/80'>We have fantastic prices. Shop now and don't miss the opportunity.</p>
                    </div>
                </div>
                <div className='w-[270px] h-[320px] p-4 shadow-lg border rounded-md flex items-center justify-center hover:shadow-xl'>
                    <div className='flex flex-col items-center gap-4 text-center'>
                        <PremiumIcon />
                        <p className='text-text font-bold text-xl'>Trusted Products</p>
                        <p className='text-text/80'>Our products are as shown in the pictures and reliable.</p>
                    </div>
                </div>
                <div className='w-[270px] h-[320px] p-4 shadow-lg border rounded-md flex items-center justify-center hover:shadow-xl'>
                    <div className='flex flex-col items-center gap-4 text-center'>
                        <HoursIcon />
                        <p className='text-text font-bold text-xl'>24/7 Support</p>
                        <p className='text-text/80'>We have specialized technical support that is easy to communicate and fast for all problems.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhatOffer