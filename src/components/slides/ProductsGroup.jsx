import { NavLink } from 'react-router-dom'
import ProductCardLarge from '../cards/ProductCardLarge'

const ProductsGroup = ({ products }) => {
    return (
        <div className="py-10 w-full px-20 max-lg:px-5">
            <h2 className="text-title_color text-center text-3xl font-bold my-7">Leatest Products</h2>

            {/* <div className='flex justify-center items-center gap-4 mb-5'>
                <NavLink to={"new"} className={({ isActive }) => isActive ? "text-pink underline font-semibold" : "text-text font-semibold"}>New Arrival</NavLink>
                <NavLink to={"best"} className={({ isActive }) => isActive ? "text-pink underline font-semibold" : "text-text font-semibold"}>Best Seller</NavLink>
                <NavLink to={"featured"} className={({ isActive }) => isActive ? "text-pink underline font-semibold" : "text-text font-semibold"}>Featured</NavLink>
                <NavLink to={"special"} className={({ isActive }) => isActive ? "text-pink underline font-semibold" : "text-text font-semibold"}>Special Offer</NavLink>
            </div> */}

            <div className='flex flex-wrap justify-center gap-6'>
                {products.map((product, i) => (
                    <ProductCardLarge product={product} key={i} />
                ))}
            </div>
        </div>
    )
}

export default ProductsGroup