import { useDispatch } from "react-redux"
import CardIcon from "../../assets/Icons/CardIcon"
import SearchAddIcon from "../../assets/Icons/SearchAddIcon"
import { resetStringLength } from "../../utils/helper"
import { useEffect, useState } from "react"
import { useAddCartMutation } from "../../redux/features/cartApiSlice"
import { useAddSavedMutation, useDeleteSavedMutation, useIsSavedQuery } from "../../redux/features/savedApiSlice"
import { handleClickTrue } from "../../redux/slices/SnackbarSlice"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import Radio from "../coms/Radio"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

const ProductCardGrid = ({ product }) => {
    const token = Cookies.get("accessToken")
    const navigate = useNavigate()
    const { data, isError, error } = useProductQuery(product?._id)
    const dispatch = useDispatch()

    const [addCart, { isLoading: isLoadingAddCart, isError: isErrorAddCart, error: errorAddCart }] = useAddCartMutation()
    const [selctedColor, setSelctedColor] = useState(product?.colors[0] || "");
    const [addSaved, { isLoading: isLoadingAddSaved, error: errorAddSaved }] = useAddSavedMutation()
    const [deleteSaved, { isLoading: isLoadingDeleteSaved, error: errorDeleteSaved }] = useDeleteSavedMutation()
    const { data: isSave } = useIsSavedQuery(product?._id)

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
        <div className="relative h-[360px] bg-transparent text-center overflow-hidden group">
            <div className="relative bg-bg_product h-[270px] rounded-md flex items-center justify-center cursor-pointer overflow-hidden">
                <div className="w-[270px] h-[280px] p-8">
                    <img src={product?.images[0]} alt="" className="w-full h-full mix-blend-multiply group-hover:scale-105 transition-all duration-300 object-contain" />
                </div>

                <div className="absolute bottom-3 -left-full flex flex-col items-center gap-2 group-hover:left-3 transition-all duration-300">
                    <button onClick={handleAddToCart} className="p-2 rounded-full bg-white hover:bg-gray-50 shadow-md border">
                        <CardIcon className={"text-violet w-[17px] h-[17px]"} />
                    </button>
                    {isSave?.isSaved ?
                        <button onClick={handleRemoveFromSaved} className="p-2 rounded-full hover:bg-text/10">
                            <FaHeart className={"text-text w-[17px] h-[17px]"} />
                        </button>
                        :
                        <button onClick={handleAddToSaved} className="p-2 rounded-full hover:bg-text/10">
                            <FaRegHeart className={"text-text w-[17px] h-[17px]"} />
                        </button>
                    }
                    <button className="p-2 rounded-full hover:bg-text/10" onClick={() => { dispatch(handleOpenViewDateils({ data, isError, error })) }}>
                        <SearchAddIcon className={"text-text w-[17px] h-[17px]"} />
                    </button>
                </div>
            </div>

            <div className=" pt-2 px-3">
                <p className="text-text mb-1 font-bold">{resetStringLength(product?.title, 20)}</p>
                <div className="flex items-center justify-center gap-1 mb-2">
                    {product?.colors.map((color, i) => (
                        <Radio color={color} name="colors" key={i} value={color} checked={color == selctedColor} onChange={(e) => setSelctedColor(e.target.value)} />
                    ))}
                </div>
                <div className="flex justify-center items-center gap-3">
                    <p className="text-text font-semibold">${product?.newPrice.toFixed(2)}</p>
                    <p className="font-semibold line-through text-pink/80 text-sm">${product?.oldPrice.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCardGrid