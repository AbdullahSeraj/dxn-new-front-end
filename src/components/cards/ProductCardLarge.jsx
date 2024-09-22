import CardIcon from "../../assets/Icons/CardIcon"
import HeartIcon from "../../assets/Icons/HeartIcon"
import NewProduct from "../../assets/NewProduct.png"
import SearchAddIcon from "../../assets/Icons/SearchAddIcon"
import { isNew, resetStringLength } from "../../utils/helper"
import { handleOpenViewDateils } from "../../redux/slices/ViewDetailsSlice"
import { useDispatch } from "react-redux"
import { useProductQuery } from "../../redux/features/productApiSlice"
import { Link, useNavigate } from "react-router-dom"
import { handleClickTrue } from "../../redux/slices/SnackbarSlice"
import { useAddCartMutation } from "../../redux/features/cartApiSlice"
import { useAddSavedMutation, useDeleteSavedMutation, useIsSavedQuery } from "../../redux/features/savedApiSlice"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import Cookies from "js-cookie"

const ProductCardLarge = ({ product }) => {
    const token = Cookies.get("accessToken")
    const navigate = useNavigate()
    const { data, isError, error } = useProductQuery(product?._id);
    const dispatch = useDispatch()
    const [addCart, { isLoading: isLoadingAddCart, isError: isErrorAddCart, error: errorAddCart }] = useAddCartMutation()
    const [addSaved, { isLoading: isLoadingAddSaved, error: errorAddSaved }] = useAddSavedMutation()
    const [deleteSaved, { isLoading: isLoadingDeleteSaved, error: errorDeleteSaved }] = useDeleteSavedMutation()
    const { data: isSave } = useIsSavedQuery(product?._id)

    const handleAddToCart = async () => {
        if (!token) {
            navigate("/signin")
            return;
        }
        try {
            const { data } = await addCart({
                quantity: 1,
                productId: product?._id,
                color: product?.colors[0]
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
        <div className="relative w-[360px] h-[300px] bg-transparent text-center overflow-hidden group">
            <div className="relative bg-bg_product h-[270px] pb-3 pt-10 px-3 flex items-center justify-center cursor-pointer overflow-hidden">
                <Link to={`/details/${product?._id}`} className="w-[178px] h-[178px]">
                    <img src={product?.images[0]} alt="" className="w-full h-full group-hover:scale-105 transition-all duration-300 mix-blend-multiply object-contain" />
                </Link>

                <div className="absolute bottom-3 -left-full flex flex-col items-center gap-2 group-hover:left-3 transition-all duration-300">
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
                    <button className="p-2 rounded-full bg-violet/5 hover:bg-violet/10" onClick={() => { dispatch(handleOpenViewDateils({ data, isError, error })) }}>
                        <SearchAddIcon className={"text-violet w-[17px] h-[17px]"} />
                    </button>
                </div>

                {isNew(product?.createdAt) &&
                    <div className="absolute top-6 left-6">
                        <img src={NewProduct} alt="" />
                        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white -rotate-12">New</p>
                    </div>
                }
            </div>

            <div className="flex justify-between pt-2 px-3">
                <p className="text-text mb-2 font-bold">{resetStringLength(product?.title, 20)}</p>
                <div className="flex items-center gap-3">
                    <p className="text-text font-semibold">${product?.newPrice}</p>
                    <p className="font-semibold line-through text-pink/80 text-sm">${product?.oldPrice}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCardLarge