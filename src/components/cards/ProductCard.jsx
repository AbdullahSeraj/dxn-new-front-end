import { useDispatch } from "react-redux"
import CardIcon from "../../assets/Icons/CardIcon"
import SearchAddIcon from "../../assets/Icons/SearchAddIcon"
import { handleOpenViewDateils } from "../../redux/slices/ViewDetailsSlice"
import { resetStringLength } from "../../utils/helper"
import { Link, useNavigate } from "react-router-dom"
import { handleClickTrue } from "../../redux/slices/SnackbarSlice"
import { useAddCartMutation } from "../../redux/features/cartApiSlice"
import { useState } from "react"
import { useAddSavedMutation, useDeleteSavedMutation, useIsSavedQuery } from "../../redux/features/savedApiSlice"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import Cookies from "js-cookie"

const ProductCard = ({ product }) => {
    const token = Cookies.get("accessToken")
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [addCart, { isLoading: isLoadingAddCart, isError: isErrorAddCart, error: errorAddCart }] = useAddCartMutation()
    const [selctedColor, setSelctedColor] = useState(product?.colors[0] || "");
    const [addSaved, { isLoading: isLoadingAddSaved, error: errorAddSaved }] = useAddSavedMutation()
    const [deleteSaved, { isLoading: isLoadingDeleteSaved, error: errorDeleteSaved }] = useDeleteSavedMutation()
    const { data: isSave } = useIsSavedQuery(product?._id)

    const handleSelectdColor = (color) => {
        setSelctedColor(color)
    }

    const handleAddToCart = async () => {
        if (!token) {
            navigate("/signin")
            return;
        }
        try {
            const { data } = await addCart({
                quantity: 1,
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

    const handleAddToSaved = async () => {
        if (!token) {
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

    return (
        <div className="relative w-[270px] h-[370px] border rounded-md bg-white text-center overflow-hidden group hover:bg-section_hover transition-all duration-300 shadow-md hover:shadow-lg">
            <div className="relative bg-bg_card pb-3 pt-10 px-3 flex items-center justify-center cursor-pointer overflow-hidden">
                <Link to={`details/${product?._id}`} className="w-[178px] h-[178px]">
                    <img src={product?.images[0]} alt="" className="w-full h-full group-hover:scale-105 transition-all duration-300 mix-blend-multiply object-contain" />
                </Link>

                <div className="absolute -bottom-full left-1/2 -translate-x-1/2 group-hover:bottom-2 transition-all duration-300">
                    <Link to={`details/${product?._id}`} className="bg-green-500 text-white py-2 px-5 text-xs rounded-md">View Details</Link>
                </div>
            </div>

            <div className="p-3 flex items-center justify-center">
                <div className="h-full">
                    <h3 className="font-bold text-xl text-pink mb-2 group-hover:text-white">{resetStringLength(product?.title, 15)}</h3>
                    <div className="flex justify-center gap-2 mb-2">
                        {product?.colors && product?.colors.map((color, i) => (
                            <button onClick={() => handleSelectdColor(color)} className={`w-5 h-[6px] rounded-full ${selctedColor == color ? `border-2 ${color == "Black" ? "border-gray-300" : "border-black"}` : null}`} style={{ backgroundColor: color == "White" ? "#ddd" : color }} key={i}></button>
                        ))}
                    </div>
                    <p className="text-text mb-2 group-hover:text-white">Code - {product?.code}</p>
                    <p className="text-text font-semibold group-hover:text-white">${product?.newPrice}</p>
                </div>
            </div>


            <div className="absolute -top-full left-2 flex items-center gap-2 group-hover:top-2 transition-all duration-300">
                <button onClick={handleAddToCart} className="p-2 rounded-full bg-violet/5 hover:bg-violet/10">
                    <CardIcon className={"text-violet w-[17px] h-[17px]"} />
                </button>
                {isSave?.isSaved ?
                    <button onClick={handleRemoveFromSaved} className="p-2 rounded-full bg-violet/5 hover:bg-violet/10">
                        <FaHeart className={"text-violet w-[17px] h-[17px]"} />
                    </button>
                    :
                    <button onClick={handleAddToSaved} className="p-2 rounded-full bg-violet/5 hover:bg-violet/10">
                        <FaRegHeart className={"text-violet w-[17px] h-[17px]"} />
                    </button>
                }
                <button className="p-2 rounded-full bg-violet/5 hover:bg-violet/10" onClick={() => { dispatch(handleOpenViewDateils({ data: product })) }}>
                    <SearchAddIcon className={"text-violet w-[17px] h-[17px]"} />
                </button>
            </div>
        </div>
    )
}

export default ProductCard