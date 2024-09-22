import { Link, useNavigate } from "react-router-dom"
import CheckboxInput from "../components/coms/CheckboxInput"
import CheckCircleIcon from "../assets/Icons/CheckCircleIcon"
import { useSelector } from "react-redux"
import { useGetCartQuery } from "../redux/features/cartApiSlice"
import { useProductQuery, useProductsQuery } from "../redux/features/productApiSlice"
import DemoCardItem from "../components/cards/DemoCardItem"
import { useState } from "react"

const Demo = () => {
    const navigate = useNavigate()
    const { total } = useSelector((state) => state.total)
    const { data: cart, isLoading, isError, error } = useGetCartQuery();
    const [addressInputs, setAddressInputs] = useState({ first_name: "", last_name: "", address: "", etc: "", city: "", country: "", code: "" })

    const handleSubmit = (e) => {
        e.preventDefault()

        navigate("/demo/paypal")
    }

    return (
        <div className="h-full pb-10">
            <div className='bg-bg_pink py-7'>
                <div className='w-[90%] mx-auto'>
                    <h2 className='text-text text-3xl font-bold'>Hekto Demo</h2>
                    <div><Link to={"/"}>Home</Link> . <Link to={"/cart"}>Shopping Cart</Link>  . <span className='text-pink'>Demo</span></div>
                </div>
            </div>

            <div className='pt-20 w-[90%] mx-auto'>
                <div className="flex gap-10 w-full max-lg:flex-col-reverse">
                    <div className="bg-[#F8F8FD] p-10 rounded-md flex-1">
                        <h3 className="text-text font-bold mb-7">Contact Information</h3>

                        <form action="" onSubmit={handleSubmit}>
                            <input type="text" className="input-demo mb-5" required placeholder="Email or mobile phone number" />
                            <div className="flex items-center gap-1 text-[9px] text-gray-400 py-6">
                                <CheckCircleIcon />
                                <span>Keep me up to date on news and excluive offers</span>
                            </div>

                            <h3 className="text-text font-bold mb-7 mt-10">Shipping address</h3>
                            <div className="flex gap-7 max-lg:flex-col max-lg:gap-0">
                                <input type="text" className="input-demo my-5" placeholder="First name" required value={addressInputs.first_name} onChange={(e) => setAddressInputs((prev) => { return { ...prev, first_name: e.target.value } })} />
                                <input type="text" className="input-demo my-5" placeholder="Last name" required value={addressInputs.last_name} onChange={(e) => setAddressInputs((prev) => { return { ...prev, last_name: e.target.value } })} />
                            </div>
                            <input type="text" className="input-demo my-5" placeholder="Address" required value={addressInputs.address} onChange={(e) => setAddressInputs((prev) => { return { ...prev, address: e.target.value } })} />
                            <input type="text" className="input-demo my-5" placeholder="Appaetnentment,suit,e.t.c (optinal)" value={addressInputs.etc} onChange={(e) => setAddressInputs((prev) => { return { ...prev, etc: e.target.value } })} />
                            <input type="text" className="input-demo my-5" placeholder="City" required value={addressInputs.city} onChange={(e) => setAddressInputs((prev) => { return { ...prev, city: e.target.value } })} />
                            <div className="flex gap-7 max-lg:flex-col max-lg:gap-0">
                                <input type="text" className="input-demo my-5" placeholder="Country" required value={addressInputs.country} onChange={(e) => setAddressInputs((prev) => { return { ...prev, country: e.target.value } })} />
                                <input type="text" className="input-demo my-5" placeholder="Postal Code" required value={addressInputs.code} onChange={(e) => setAddressInputs((prev) => { return { ...prev, code: e.target.value } })} />
                            </div>

                            <button className="pink-button mt-10">Continue Shipping</button>
                        </form>
                    </div>

                    <div>
                        <div className="w-[370px] max-lg:w-full grid gap-2 mb-10">
                            {cart && cart.map((item, i) => (
                                <DemoCardItem item={item} key={i} />
                            ))}
                        </div>

                        <div>
                            <div className="w-[370px] max-lg:w-full p-7 bg-gray-100 rounded-md">
                                <div className="flex justify-between items-center border-b py-3">
                                    <p className="font-semibold">Subtotals:</p>
                                    <p>${total.toFixed(2)}</p>
                                </div>
                                <div className={`flex justify-between items-center border-b py-3 pt-6 ${total > 300 ? "text-green-600" : null}`}>
                                    <p className="font-semibold">Shopping:</p>
                                    <p>{total > 300 ? "Free" : "$20.00"}</p>
                                </div>
                                <div className="flex justify-between items-center pb-3 pt-6">
                                    <p className="font-semibold">Totals:</p>
                                    <p>${total.toFixed(2) > 300 ? total.toFixed(2) : (total + 20).toFixed(2)}</p>
                                </div>
                                {/* <div className="flex items-center gap-1 text-[9px] text-gray-400 py-6">
                                    <CheckCircleIcon />
                                    <span>Shipping & taxes calculated at checkout</span>
                                </div>
                                <Link to={"/demo"} className="green-button w-full block text-center">Proceed To Checkout</Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Demo