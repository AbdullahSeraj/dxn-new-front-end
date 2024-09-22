import { Link, useNavigate, useParams } from "react-router-dom"
import FacebookIcon from "../assets/Icons/FacebookIcon"
import HeartIcon from "../assets/Icons/HeartIcon"
import { useProductQuery } from "../redux/features/productApiSlice"
import { resetStringLength, Stars } from "../utils/helper"
import { useEffect, useState } from "react"
import Slider from "react-slick"
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import { MdFacebook, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoClose, IoLogoWhatsapp } from "react-icons/io5"
import { useAddCartMutation } from "../redux/features/cartApiSlice"
import Radio from "../components/coms/Radio"
import { handleClickTrue } from "../redux/slices/SnackbarSlice"
import { useDispatch } from "react-redux"
import { FaMinus, FaPlus } from "react-icons/fa6"
import { useAddSavedMutation, useIsSavedQuery, useDeleteSavedMutation } from "../redux/features/savedApiSlice"
import { RiInstagramFill } from "react-icons/ri"
import Cookies from "js-cookie"

const ProductDetails = () => {
    const token = Cookies.get("accessToken")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    const { data: product } = useProductQuery(String(id) || "");
    const [addCart, { isLoading, isError, error }] = useAddCartMutation()
    const [mainImg, setMainImg] = useState(product?.images[0] || "");
    const [selctedColor, setSelctedColor] = useState(product?.colors[0] || "");
    const [number, setNumber] = useState(1)
    const [showImages, setShowImages] = useState(false)
    const handleShowImages = () => {
        setShowImages(!showImages)
    }

    const { data: isSave } = useIsSavedQuery(id)
    const [addSaved, { isLoading: isLoadingAddSaved, error: errorAddSaved }] = useAddSavedMutation()
    const [deleteSaved, { isLoading: isLoadingDeleteSaved, error: errorDeleteSaved }] = useDeleteSavedMutation()

    useEffect(() => {
        setMainImg(product?.images[0] || "")
        setSelctedColor(product?.colors[0] || "")
    }, [product])

    const handleChangeMainImg = (id) => {
        setMainImg(product?.images[id])
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    function SampleNextArrow(props) {
        const { onClick } = props;
        return (
            <button onClick={onClick} className="bg-pink/20 border border-pink absolute top-1/2 right-5 -translate-y-1/2 rounded-full z-50">
                <MdOutlineKeyboardArrowRight className="text-3xl text-pink" />
            </button>
        );
    }

    function SamplePrevArrow(props) {
        const { onClick } = props;
        return (
            <button onClick={onClick} className="bg-pink/20 border border-pink absolute top-1/2 left-5 -translate-y-1/2 rounded-full z-50">
                <MdOutlineKeyboardArrowLeft className="text-3xl text-pink" />
            </button>
        );
    }

    const handleAddToCart = async () => {
        if (!token) {
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
            navigate("/signin")
            return;
        }
        const { data } = await addSaved({
            productId: id
        })

        if (data?.productId) {
            dispatch(handleClickTrue({ message: "Saved Successfully", condition: "success" }))
        } else {
            dispatch(handleClickTrue({ message: errorAddSaved?.data?.message || "Something Error", condition: "error" }))
        }
    }

    const handleRemoveFromSaved = async () => {
        if (!token) {
            navigate("/signin")
            return;
        }
        const { data } = await deleteSaved(id)

        if (data?.productId) {
            dispatch(handleClickTrue({ message: "Removed From Favorifes Successfully", condition: "success" }))
        } else {
            dispatch(handleClickTrue({ message: errorAddSaved?.data?.message || "Something Error", condition: "error" }))
        }
    }

    return (
        <div>
            <div className='bg-bg_pink py-7'>
                <div className='w-[90%] mx-auto'>
                    <h2 className='text-text text-3xl font-bold'>Product Details</h2>
                    <div><Link to={"/"} className="hover:underline">Home</Link> . <Link to={"/products/grid"} className="hover:underline">Products</Link> . <span className='text-pink'>Product Details</span></div>
                </div>
            </div>

            <div className="py-10 w-[90%] mx-auto">
                <div className="min-h-[500px] border shadow-lg p-5 rounded-md flex items-center gap-8 max-lg:flex-col">
                    <div className="flex items-center gap-8 max-xl:flex-col-reverse">
                        <div className="flex items-start flex-col gap-5 min-h-full max-xl:flex-row">
                            {product?.images.length > 3 ?
                                <>
                                    {product?.images.slice(0, 2).map((img, i) => (
                                        <button className="w-[140px] h-[140px] max-md:w-[100px] max-md:h-[100px] rounded-md overflow-hidden bg-gray-100 p-1" key={i}>
                                            <img src={img} alt="" onClick={() => handleChangeMainImg(i)} className="w-full h-full object-contain hover:scale-105 transition duration-300 mix-blend-multiply" />
                                        </button>
                                    ))}

                                    <button onClick={handleShowImages} className="w-[140px] h-[140px] max-md:w-[100px] max-md:h-[100px] rounded-md overflow-hidden bg-gray-100 p-1 text-5xl text-text">+{product?.images.length - 2}</button>
                                </>
                                : <>
                                    {product?.images.map((img, i) => (
                                        <button className="w-[140px] h-[140px] max-md:w-[100px] max-md:h-[100px] rounded-md overflow-hidden bg-gray-100 p-1" key={i}>
                                            <img src={img} alt="" onClick={() => handleChangeMainImg(i)} className="w-full h-full object-contain hover:scale-105 transition duration-300 mix-blend-multiply" />
                                        </button>
                                    ))}
                                </>
                            }
                        </div>

                        <div className="w-[450px] max-xl:w-[300px] h-full rounded-md overflow-hidden">
                            <img src={mainImg} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                    </div>

                    <div className="ml-5">
                        <h2 className="text-3xl font-bold text-text">{resetStringLength(product?.title, 80)}</h2>
                        <div className="flex items-center gap-2 mb-2">
                            <Stars number={product?.rating} />
                            <span>(22)</span>
                        </div>

                        <div className="flex gap-5 items-center mb-3">
                            <p className="text-text font-semibold">${product?.newPrice.toFixed(2)}</p>
                            <p className="text-pink line-through">${product?.oldPrice.toFixed(2)}</p>
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

                        <p className="text-gray-400 mb-4" style={{ wordWrap: "break-word" }}>{product?.description}</p>

                        <div className="flex items-center gap-5 mb-4">
                            <button className="pink-button" onClick={handleAddToCart} disabled={isLoading}>{isLoading ? "Loading..." : "Add To Cart"}</button>
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
                </div>
            </div>

            {showImages &&
                <div className="fixed top-0 left-0 right-0 bottom-0" style={{ zIndex: 10000 }}>
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-950/30" onClick={handleShowImages}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] max-lg:w-full h-[500px] bg-white rounded-lg">
                        <div className="mx-20 flex items-center justify-center">
                            <div className="w-[700px] h-[500px]">
                                <Slider {...settings}>
                                    {product?.images.map((img, i) => (
                                        <div className="w-[500px] h-[500px] p-20" key={i}>
                                            <img src={img} alt="" className="object-contain mix-blend-multiply w-full h-full" />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                        <button onClick={handleShowImages} className='absolute top-3 right-3 bg-red-600/20 rounded-full p-1'>
                            <IoClose className='text-red-600 text-xl' />
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductDetails