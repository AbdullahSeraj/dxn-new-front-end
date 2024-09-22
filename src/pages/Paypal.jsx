import { useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import DemoCardItem from "../components/cards/DemoCardItem";
import { useGetCartQuery } from "../redux/features/cartApiSlice";

function Paypal() {
    const { data: cart, isLoading, isError, error } = useGetCartQuery();
    const { total } = useSelector((state) => state.total)

    const initialOptions = {
        "client-id": "ARQVVjgcDp82KIvLeqcSjOozwshaeVpSFSEzYKVQMnLrk5GZg_aijNhc6kceO8uFNnWXE8jtS73WJBmo",
        currency: "USD",
        intent: "capture"
    };

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    currency_code: "USD",
                    value: total > 300 ? total : total + 20
                }
            }]
        })
    }

    const onApprove = (data, actions) => {
        return actions.order.captures().then(function (details) {
            alert("name ", details.payer.name.given_name)
        })
    }

    return (
        <>
            <div className="flex flex-col gap-10 items-center pt-10">
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
                            <p>{total > 300 ? "Free" : "$20"}</p>
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

            <div className="w-[500px] mx-auto py-20">
                <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons
                        style={{
                            layout: 'horizontal'
                        }}
                        createOrder={(data, actions) => createOrder(data, actions)}
                        onApprove={(data, actions) => onApprove(data, actions)}
                    />
                </PayPalScriptProvider>
            </div>
        </>
    );
}

export default Paypal; 