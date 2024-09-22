import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ContactUs_img from "../assets/ContactUs_img.png"
import emailjs from '@emailjs/browser';
import { useGetProfileQuery } from '../redux/features/userApiSlice';
import { handleClickTrue } from '../redux/slices/SnackbarSlice';
import { useDispatch } from 'react-redux';

const ContactUs = () => {
    const dispatch = useDispatch()
    const form = useRef();
    const { data: profile } = useGetProfileQuery()
    const [sendInputs, setSendInputs] = useState({ username: profile?.username || "", email: profile?.email || "" })

    useEffect(() => {
        setSendInputs({ username: profile?.username || "", email: profile?.email || "" })
    }, [profile])

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_h5z4afn', 'template_iny52eg', form.current, {
                publicKey: 'y9XE8V038X-BJ3zlR',
            })
            .then(
                () => {
                    dispatch(handleClickTrue({ message: "Sent Successfully", condition: "success" }))
                },
                (error) => {
                    dispatch(handleClickTrue({ message: error.text || "Something Error", condition: "error" }))
                },
            );
    };

    return (
        <div className="h-full pb-10">
            <div className='bg-bg_pink py-7'>
                <div className='w-[90%] mx-auto'>
                    <h2 className='text-text text-3xl font-bold'>Contact Us</h2>
                    <div><Link to={"/"}>Home</Link> . <span className='text-pink'>Contact Us</span></div>
                </div>
            </div>

            <div className='pt-20 w-[90%] mx-auto'>
                <div className='flex justify-between gap-20 max-lg:flex-col'>
                    <div className='w-1/2 max-lg:w-full'>
                        <h2 className='text-text font-bold text-2xl mb-3'>Information About us</h2>
                        <p className='text-gray-400 mb-10 text-sm'>
                            Hekto is committed to providing electronics, cosmetics, natural products,
                            and more. With a focus on quality and customer satisfaction, we strive to exceed
                            customer expectations. Our team of experts is committed to providing fast customer
                            communication and customer satisfaction that makes a positive difference in your life.
                            Whether you’re looking for products, we have the solutions you need. Discover the difference
                            Hekto can make today.
                        </p>
                    </div>

                    <div>
                        <h2 className='text-text font-bold text-2xl mb-3'>Contact Way</h2>
                        <div className='flex items-center justify-between gap-4 max-w-[500px]'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex gap-2 items-center'>
                                    <div className='rounded-full bg-violet w-[45px] h-[45px]'></div>
                                    <div className='text-xs text-gray-400'>
                                        <p>Tel: +90 501 336 25 11</p>
                                        <p>E-Mail: serajs.net@gmail.com</p>
                                    </div>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <div className='rounded-full bg-pink w-[45px] h-[45px]'></div>
                                    <div className='text-xs text-gray-400'>
                                        <p>Support Forum</p>
                                        <p>For over 24hr</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <div className='flex gap-2 items-center'>
                                    <div className='rounded-full bg-oran w-[45px] h-[45px]'></div>
                                    <div className='text-xs text-gray-400'>
                                        <p>20 Margaret st, London</p>
                                        <p>Great britain, 3NM98-LK</p>
                                    </div>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <div className='rounded-full bg-green-400 w-[45px] h-[45px]'></div>
                                    <div className='text-xs text-gray-400'>
                                        <p>Free standard shipping</p>
                                        <p>on all orders.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-between items-center gap-20 my-20 max-md:flex-col-reverse'>
                    <div className='w-[550px] max-md:w-full'>
                        <h2 className='text-text font-bold text-2xl'>Get In Touch</h2>
                        <p className='text-gray-400 text-sm'>
                            Have questions or need more information? We're here to help! Contact us today.
                            Our friendly team is ready to assist you with your inquiries.
                        </p>

                        <form ref={form} onSubmit={handleSubmit} className='grid gap-7 mt-7'>
                            <div className='flex gap-3'>
                                <input type="text" name='username' required placeholder='Your Name*' value={sendInputs.username} onChange={(e) => setSendInputs((prev) => { return { ...prev, username: e.target.value } })} className='border-2 py-2 px-3 rounded-md w-full' />
                                <input type="text" name='email' required placeholder='Your E-mail*' value={sendInputs.email} onChange={(e) => setSendInputs((prev) => { return { ...prev, email: e.target.value } })} className='border-2 py-2 px-3 rounded-md w-full' />
                            </div>
                            <input type="text" name='subject' required placeholder='Subject*' className='border-2 py-2 px-3 rounded-md w-full' />
                            <textarea placeholder='Type Your Message*' required name="message" id="" rows={"6"} className='border-2 py-2 px-3 rounded-md w-full' style={{ resize: "none" }}></textarea>
                            <button className='pink-button'>Send Mail</button>
                        </form>
                    </div>
                    <div className='w-[500px] max-md:w-full'>
                        <img src={ContactUs_img} alt="ContactUs_img" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs