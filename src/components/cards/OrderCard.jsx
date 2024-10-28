import OrderProductCard from './OrderProductCard'

const OrderCard = ({ order }) => {
    return (
        <div className='w-full border rounded-md shadow-md p-4 grid gap-3'>
            <div>
                <p className='text-text text-xs'>Created At: {order?.createdAt}</p>
                <p className='text-text text-xs'>User Id: {order?.userId}</p>
            </div>

            {order?.products && order?.products.map((product, i) => (
                <OrderProductCard key={i} id={product?.productId} currentProduct={product} />
            ))}
        </div>
    )
}

export default OrderCard