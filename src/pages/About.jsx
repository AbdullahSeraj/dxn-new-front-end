import React from 'react'
import { Link } from 'react-router-dom'
import about_img from "../assets/about_img.png"
import WhatOffer from '../components/Home/WhatOffer'

const About = () => {
    return (
        <div className="h-full pb-10">
            <div className='bg-bg_pink py-7'>
                <div className='w-[90%] mx-auto'>
                    <h2 className='text-text text-3xl font-bold'>About Us</h2>
                    <div><Link to={"/"}>Home</Link> . <span className='text-pink'>About Us</span></div>
                </div>
            </div>

            <div className='w-[90%] mx-auto py-20 flex items-center gap-10 max-xl:flex-col'>
                <div className='w-1/2 flex justify-center max-xl:w-full'>
                    <div className='relative w-[450px]'>
                        <div className='absolute -bottom-3 -left-3 w-full h-full rounded-md bg-[#2B3CAB]'></div>
                        <img src={about_img} alt="" className='w-full relative z-10' />
                    </div>
                </div>

                <div className='w-1/'>
                    <h2 className='text-text font-bold text-2xl max-w-[400px]'>
                        Know About Our E-commerce Business, History
                    </h2>
                    <p className='text-gray-400 mb-10 text-sm leading-7'>
                        DXN New is committed to providing electronics, cosmetics, natural products,
                        and more. With a focus on quality and customer satisfaction, we strive to exceed
                        customer expectations. Our team of experts is committed to providing fast customer
                        communication and customer satisfaction that makes a positive difference in your life.
                        Whether you’re looking for products, we have the solutions you need. Discover the difference
                        Hekto can make today.
                    </p>
                    <Link to={`/contact`} className='pink-button'>Contact Us</Link>
                </div>
            </div>

            <WhatOffer />
        </div>
    )
}

export default About