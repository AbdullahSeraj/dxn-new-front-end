import { useDispatch, useSelector } from 'react-redux'
import { handleCloseViewDateils } from '../../redux/slices/ViewDetailsSlice'
import { useEffect, useState } from 'react'
import { resetStringLength, Stars } from '../../utils/helper'
import { useNavigate } from 'react-router-dom'
import { IoClose } from 'react-icons/io5'
import { FaHeart, FaMinus, FaPlus, FaRegHeart } from 'react-icons/fa'
import { useAddSavedMutation, useDeleteSavedMutation, useIsSavedQuery } from '../../redux/features/savedApiSlice'
import { handleClickTrue } from '../../redux/slices/SnackbarSlice'
import { useAddCartMutation } from '../../redux/features/cartApiSlice'
import Radio from '../coms/Radio'
import Cookies from "js-cookie"

import { MdFacebook } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";

const ViewDetails = () => {
    const token = Cookies.get("accessToken")
    const { isOpen, data: product, isLoading } = useSelector((state) => state.dateils)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [mainImg, setMainImg] = useState("");

    const [number, setNumber] = useState(1)
    const [selctedColor, setSelctedColor] = useState("");
    const [addCart, { isLoading: isLoadingAddCart, isError, error }] = useAddCartMutation()
    const { data: isSave } = useIsSavedQuery(product?._id)
    const [addSaved, { isLoading: isLoadingAddSaved, error: errorAddSaved }] = useAddSavedMutation()
    const [deleteSaved, { isLoading: isLoadingDeleteSaved, error: errorDeleteSaved }] = useDeleteSavedMutation()

    const handleChangeMainImg = (id) => {
        setMainImg(product?.images[id])
    }

    const handleGoToDetails = (id) => {
        dispatch(handleCloseViewDateils());
        navigate(`/details/${id}`)
    }

    useEffect(() => {
        if (isOpen && product?.images[0]) {
            setMainImg(product?.images[0])
            setSelctedColor(product?.colors[0])
        }
    }, [product])

    const handleAddToCart = async () => {
        if (!token) {
            dispatch(handleCloseViewDateils())
            navigate("/signin")
            return;
        }
        try {
            const { data } = await addCart({
                quantity: number,
                productId: product?._id,
                color: selctedColor == "" ? null : selctedColor
            })

            if (data?.productId) {
                dispatch(handleClickTrue({ message: "Added Product Successfully", condition: "success" }))
            } else {
                dispatch(handleClickTrue({ message: error?.data?.message || "Something Error", condition: "error" }))
            }
        } catch (error) {
            dispatch(handleClickTrue({ message: error?.data?.message || "Something Error", condition: "error" }))
        }
    }

    const handlePlusNumber = () => {
        setNumber(number + 1)
    }

    const handleMinusNumber = async () => {
        setNumber(number > 1 ? number - 1 : 1)
    }

    const handleAddToSaved = async () => {
        if (!token) {
            dispatch(handleCloseViewDateils())
            navigate("/signin")
            return;
        }
        const { data } = await addSaved({
            productId: product?._id
        })

        if (data?.productId) {
            dispatch(handleClickTrue({ message: "Saved Successfully", condition: "success" }))
        } else {
            dispatch(handleClickTrue({ message: errorAddSaved?.data?.message || "Something Error", condition: "error" }))
        }
    }

    const handleRemoveFromSaved = async () => {
        if (!token) {
            dispatch(handleCloseViewDateils())
            navigate("/signin")
            return;
        }
        const { data } = await deleteSaved(product?._id)

        if (data?.productId) {
            dispatch(handleClickTrue({ message: "Removed From Favorifes Successfully", condition: "success" }))
        } else {
            dispatch(handleClickTrue({ message: errorAddSaved?.data?.message || "Something Error", condition: "error" }))
        }
    }

    if (isOpen) {
        return (
            <div className='fixed top-0 left-0 right-0 bottom-0' style={{ zIndex: "10000" }}>
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-gray-950/40' onClick={() => dispatch(handleCloseViewDateils())}></div>

                <div className="absolute top-1/2 left-1/2 w-[1000px] max-md:w-[calc(100vw-50px)] max-lg:w-fit max-lg:flex-col -translate-x-1/2 -translate-y-1/2 h-[520px] max-lg:h-[calc(100vh-100px)] border bg-white shadow-lg p-5 max-sm:px-0 rounded-lg flex items-center gap-5">
                    <div className='flex flex-col gap-5 max-lg:flex-row-reverse'>
                        <div className="w-[480px] h-[300px] max-lg:w-[400px] max-lg:h-[300px] max-sm:w-[200px] max-sm:h-[200px] rounded-md overflow-hidden">
                            <img src={mainImg} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                        </div>

                        <div className="flex gap-3 h-full max-lg:flex-col max-sm:hidden">
                            {product?.images?.length > 3 ?
                                <>
                                    {product?.images?.slice(0, 2).map((img, i) => (
                                        <button className="w-[150px] h-[150px] max-lg:w-[100px] max-lg:h-[100px] rounded-md overflow-hidden bg-gray-100 p-1" key={i}>
                                            <img src={img} alt="" onClick={() => handleChangeMainImg(i)} className="w-full h-full object-contain hover:scale-105 transition duration-300 mix-blend-multiply" />
                                        </button>
                                    ))}

                                    <button onClick={() => handleGoToDetails(product?._id)} className="w-[150px] h-[150px] max-lg:w-[100px] max-lg:h-[100px] rounded-md overflow-hidden bg-gray-100 p-1 text-5xl text-text">+{product?.images.length - 2}</button>
                                </>
                                : <>
                                    {product?.images?.map((img, i) => (
                                        <button className="w-[150px] h-[150px] max-lg:w-[100px] max-lg:h-[100px] rounded-md overflow-hidden bg-gray-100 p-1" key={i}>
                                            <img src={img} alt="" onClick={() => handleChangeMainImg(i)} className="w-full h-full object-contain hover:scale-105 transition duration-300 mix-blend-multiply" />
                                        </button>
                                    ))}
                                </>
                            }
                        </div>
                    </div>

                    <div className="ml-5 overflow-y-auto h-full py-5">
                        <h2 className="text-2xl font-bold text-text">{resetStringLength(product?.title, 80)}</h2>
                        <div className="flex items-center gap-2 mb-2">
                            <Stars number={product?.rating} />
                            <span>(22)</span>
                        </div>

                        <div className="flex gap-5 items-center mb-3">
                            <p className="text-text font-semibold">${product?.newPrice?.toFixed(2)}</p>
                            <p className="text-pink line-through">${product?.oldPrice?.toFixed(2)}</p>
                        </div>
                        {product?.colors.length != 0 &&
                            <div className="flex items-center gap-5 mb-3">
                                <p>Colors: </p>
                                <div className="flex items-center gap-1">
                                    {product?.colors.map((color, i) => (
                                        <Radio color={color} name="colors" key={i} value={color} checked={color == selctedColor} onChange={(e) => setSelctedColor(e.target.value)} />
                                    ))}
                                </div>
                            </div>
                        }

                        <p className="text-gray-400 mb-4 text-sm" style={{ wordWrap: "break-word" }}>{product?.description}</p>

                        <div className="flex items-center gap-5 mb-4 max-sm:flex-col">
                            <button className="pink-button" onClick={handleAddToCart}>{isLoadingAddCart ? "Loading..." : "Add To Cart"}</button>
                            <div className="flex items-center gap-4 px-2 py-1 border-2 border-text/50 rounded-lg w-fit remove-arrow">
                                <button onClick={handleMinusNumber}><FaMinus className="text-xs" /></button>
                                <input type="number" value={number} className="w-[30px] text-center" onChange={(e) => setNumber(e.target.value)} />
                                <button onClick={handlePlusNumber}><FaPlus className="text-xs" /></button>
                            </div>
                            {isSave?.isSaved ?
                                <button onClick={handleRemoveFromSaved}>
                                    <FaHeart className={"w-[25px] h-[25px] text-red-600"} />
                                </button>
                                :
                                <button onClick={handleAddToSaved}>
                                    <FaRegHeart className={"w-[25px] h-[25px] text-red-600"} />
                                </button>
                            }
                        </div>

                        <div className="flex items-center gap-5 mb-3">
                            <p>Category:</p>
                            <div className="flex items-center gap-2">
                                <div className="border border-pink bg-pink/10 rounded-full text-pink text-xs w-fit px-3 py-1">{product?.category}</div>
                            </div>
                        </div>

                        {product?.tags.legnth != 0 &&
                            <div className="flex items-center gap-5 mb-3">
                                <p>Tags:</p>
                                <div className="flex items-center gap-2">
                                    {product?.tags.map((tag, i) => (
                                        <div key={i} className="border border-green-600 bg-green-600/10 rounded-full text-green-600 text-xs w-fit px-3 py-1">{tag}</div>
                                    ))}
                                </div>
                            </div>
                        }

                        <div className="flex items-center gap-3">
                            <p>Share:</p>
                            <div className="flex items-center gap-2">
                                <a href={`whatsapp://send?text=${window.location.origin}/details/${product?._id}`} data-action="share/whatsapp/share">
                                    <IoLogoWhatsapp className='text-xl text-text' />
                                </a>
                                <a href={`https://www.facebook.com/share.php?u=${window.location.origin}/details/${product?._id}`} target="_blank">
                                    <MdFacebook className='text-xl text-text' />
                                </a>
                                <a href={`https://www.instagram.com/?url=${window.location.origin}/details/${product?._id}`} target="_blank" rel="noopener">
                                    <RiInstagramFill className='text-xl text-text' />
                                </a>
                            </div>
                        </div>
                    </div>

                    <button onClick={() => dispatch(handleCloseViewDateils())} className='absolute top-3 right-3 bg-red-600/20 rounded-full p-1'>
                        <IoClose className='text-red-600 text-xl' />
                    </button>
                </div>
            </div>
        )
    }
}

export default ViewDetails