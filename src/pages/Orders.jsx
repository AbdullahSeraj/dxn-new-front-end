import OrderCard from "../components/cards/OrderCard"
import { useOrdersByUserIdQuery } from "../redux/features/orderApiSlice"

const Orders = () => {
    const { data: orders } = useOrdersByUserIdQuery()

    console.log("orders", orders)

    return (
        <div className="h-full pb-10">
            <div className='pt-20 w-[90%] mx-auto grid gap-3'>
                {orders && orders.map((order) => (
                    <OrderCard order={order} key={order._id} />
                ))}
            </div>
        </div>
    )
}

export default Orders