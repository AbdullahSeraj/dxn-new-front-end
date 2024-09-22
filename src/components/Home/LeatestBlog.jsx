import LeatestBlogCard from "../cards/LeatestBlogCard"

const LeatestBlog = ({ products }) => {
    return (
        <div className="pt-10 pb-20 w-full px-20 max-lg:px-5">
            <h2 className="text-title_color text-center text-3xl font-bold my-7">Leatest Blog</h2>


            <div className="flex flex-wrap items-center justify-center gap-10">
                {products.map((product, i) => (
                    <LeatestBlogCard product={product} key={i} />
                ))}
            </div>
        </div>
    )
}

export default LeatestBlog