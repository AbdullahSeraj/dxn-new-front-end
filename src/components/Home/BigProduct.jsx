import { useDispatch } from "react-redux"
import bg_product from "../../assets/Ellipse 63.png"
import { handleClickTrue } from "../../redux/slices/SnackbarSlice"
import { resetStringLength } from "../../utils/helper"
import { useAddCartMutation } from "../../redux/features/cartApiSlice"
import { useEffect, useState } from "react"
import Radio from "../coms/Radio"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

const BigProduct = ({ product }) => {
    const token = Cookies.get("accessToken")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [addCart, { isLoading: isLoadingAddCart, error: errorAddCart }] = useAddCartMutation()
    const [selctedColor, setSelctedColor] = useState(product?.colors[0] || "");

    useEffect(() => {
        setSelctedColor(product?.colors[0] || "")
    }, [product])

    const handleAddToCart = async () => {
        if (!token) {
            navigate("/signin")
            return;
        }
        try {
            const { data } = await addCart({
                quantity: 1,
                productId: product?._id,
                color: selctedColor
            })

            if (data?.productId) {
                dispatch(handleClickTrue({ message: "Added Product Successfully", condition: "success" }))
            } else {
                dispatch(handleClickTrue({ message: errorAddCart?.data?.message || "Something Error", condition: "error" }))
            }
        } catch (error) {
            dispatch(handleClickTrue({ message: error?.data?.message || "Something Error", condition: "error" }))
        }
    }

    return (
        <div className='bg-sub_text_color my-10 flex items-center gap-20 px-20 max-lg:px-5 max-lg:flex-col py-6'>
            <div className='relative'>
                <img src={bg_product} alt="" />
                <img src={product?.images[0]} alt="" className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-multiply object-contain w-[400px] h-[400px]' />
            </div>

            <div className='w-1/2 max-lg:w-full'>
                <h2 className='font-bold text-4xl text-text mb-5'>
                    {resetStringLength(product?.title, 80)}
                </h2>

                <p className="text-gray-400">{resetStringLength(product?.description, 300)}</p>

                {product?.colors?.length != 0 &&
                    <div className="flex items-center gap-5 my-3">
                        <p>Colors: </p>
                        <div className="flex items-center gap-1">
                            {product?.colors.map((color, i) => (
                                <Radio color={color} name="colors" key={i} value={color} checked={color == selctedColor} onChange={(e) => setSelctedColor(e.target.value)} />
                            ))}
                        </div>
                    </div>
                }

                {/* <div>
                    <div className='flex items-center gap-3 mb-2'>
                        <div className='bg-pink rounded-full w-2 h-2'></div>
                        <p className='text-gray-400'>All frames constructed with hardwood solids and laminates</p>
                    </div>

                    <div className='flex items-center gap-3 mb-2'>
                        <div className='bg-blue-600 rounded-full w-2 h-2'></div>
                        <p className='text-gray-400'>Reinforced with double wood dowels, glue, screw - nails corner
                            blocks and machine nails</p>
                    </div>

                    <div className='flex items-center gap-3 mb-2'>
                        <div className='bg-green-400 rounded-full w-2 h-2'></div>
                        <p className='text-gray-400'>Arms, backs and seats are structurally reinforced</p>
                    </div>
                </div> */}

                <div className='flex items-center gap-4 mt-6'>
                    <button className='pink-button' onClick={handleAddToCart}>{isLoadingAddCart ? "Loading..." : "Add To Cart"}</button>
                    <div className='text-xs text-text font-semibold'>
                        <p>Category: {product?.category}</p>
                        <div className="flex gap-4 text-lg">
                            <p className="text-pink">${product?.newPrice.toFixed(2)}</p>
                            <p className="line-through text-gray-400">${product?.oldPrice.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BigProduct