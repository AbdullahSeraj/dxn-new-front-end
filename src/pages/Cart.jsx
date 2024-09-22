import { Link } from "react-router-dom"
import CheckCircleIcon from "../assets/Icons/CheckCircleIcon";
import { useClearCartMutation, useGetCartQuery } from "../redux/features/cartApiSlice";
import TableCart from "../components/cart/TableCart";
import { useEffect } from "react";
import { useProductsQuery } from "../redux/features/productApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateTotalPrice } from "../redux/slices/TotalSlice";
import { handleClickTrue } from "../redux/slices/SnackbarSlice";

const Cart = () => {
    const { total } = useSelector((state) => state.total)
    const dispatch = useDispatch()
    const { data: cart, isLoading, isError, error } = useGetCartQuery();
    const [clearCart, { isLoading: clearCartIsLoading }] = useClearCartMutation()
    const { data: products } = useProductsQuery()

    useEffect(() => {
        let total = 0;
        if (cart && products) {
            cart.map((c) => {
                products.map((pro) => {
                    if (c.productId === pro._id) {
                        total += (pro.newPrice * c.quantity)
                        dispatch(updateTotalPrice(total))
                    }
                })
            })
        }
    }, [cart])

    const handleClearCart = async () => {
        const { data } = await clearCart()

        if (data?.deletedCount) {
            dispatch(handleClickTrue({ message: "Cleared Cart Successfully", condition: "success" }))
        } else {
            dispatch(handleClickTrue({ message: error?.data?.message || "Something Error", condition: "error" }))
        }
    }

    return (
        <div className="h-full">
            <div className='bg-bg_pink py-7'>
                <div className='w-[90%] mx-auto'>
                    <h2 className='text-text text-3xl font-bold'>Shop Left Sidebar</h2>
                    <div><Link to={"/"}>Home</Link> . <span className='text-pink'>Shopping Cart</span></div>
                </div>
            </div>

            {cart && cart?.length != 0 && !isLoading && !isError &&
                <div className="w-[90%] mx-auto flex items-start gap-10 py-10 max-xl:flex-col max-xl:items-center">
                    <div className="w-full overflow-x-auto">
                        <div className="w-full max-w-full min-w-[700px]">
                            <TableCart cart={cart} />
                            <div className='flex justify-end my-5'>
                                <button className='pink-button' onClick={handleClearCart} disabled={clearCartIsLoading}>{clearCartIsLoading ? "Loading..." : "Clear Cart"}</button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-text text-2xl pb-8 text-center">Cart Totals</h3>

                        <div className="w-[370px] p-7 bg-gray-100 rounded-md">
                            <div className="flex justify-between items-center border-b py-3">
                                <p className="font-semibold">Subtotals:</p>
                                <p>${total.toFixed(2)}</p>
                            </div>
                            <div className={`flex justify-between items-center border-b py-3 pt-6 ${total > 300 ? "text-green-600" : null}`}>
                                <p className="font-semibold">Shopping:</p>
                                <p>{total > 300 ? "Free" : "$20.00"}</p>
                            </div>
                            <div className="flex justify-between items-center border-b pb-3 pt-6">
                                <p className="font-semibold">Totals:</p>
                                <p>${total.toFixed(2) > 300 ? total.toFixed(2) : (total + 20).toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-1 text-[9px] text-gray-400 py-6">
                                <CheckCircleIcon />
                                <span>Shipping & taxes calculated at checkout</span>
                            </div>
                            <Link to={"/demo"} className="green-button w-full block text-center">Proceed To Checkout</Link>
                        </div>
                    </div>
                </div>
            }

            {cart?.length == 0 &&
                <div className="text-center py-10">
                    <p className="font-bold text-4xl py-5 text-text">Cart is empty</p>
                    <Link to={"/products"} className="pink-button">Go To Shopping</Link>
                </div>
            }

            {isLoading &&
                <div>Loading...</div>
            }
        </div>
    )
}

export default Cart