import ProductCardGrid from "../cards/ProductCardGrid"


const GridProducts = ({ products }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 flex-1'>
            {products?.map((product, i) => (
                <ProductCardGrid product={product} key={i} />
            ))}
        </div>
    )
}

export default GridProducts