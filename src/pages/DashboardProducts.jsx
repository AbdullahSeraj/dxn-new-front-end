import { LuUpload } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import CardItem from "../components/CardItem";
import { useProductsQuery } from "../redux/features/productApiSlice";
import LoadingComponent from "../components/loading/LoadingComponent";
import { useEffect, useState } from "react";
import EditProductPopup from "../components/EditProductPopup";
import DeleteProductPopup from "../components/DeleteProductPopup";
import CreateProductPopup from "../components/CreateProductPopup";
import ErrorComponent from "../components/error/ErrorComponent";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinFill } from "react-icons/ri";
import ColumnProductsDashboard from "../components/dashboard/ColumnProductsDashboard";
import { Box } from "@mui/material";

const DashboardProducts = () => {
    const { data, isLoading, isError, error } = useProductsQuery()
    const [products, setProducts] = useState(data || [])
    const [productId, setProductId] = useState("")
    const [search, setSearch] = useState("")

    useEffect(() => {
        setProducts(data)
    }, [data])

    useEffect(() => {
        if (search === "" || search === null) {
            setProducts(data)
        } else {
            const searchedProduct = products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase()))
            setProducts(searchedProduct)
        }
    }, [search])

    const [showEditProduct, setShowEditProduct] = useState(false)
    const handleShowEditProduct = () => {
        setShowEditProduct(!showEditProduct)
    }
    const handleOpenEditProduct = (id) => {
        setProductId(id)
        setShowEditProduct(true)
    }

    const [showDeleteProduct, setShowDeleteProduct] = useState(false)
    const handleShowDeleteProduct = () => {
        setShowDeleteProduct(!showDeleteProduct)
    }
    const handleOpenDeleteProduct = (id) => {
        setProductId(id)
        setShowDeleteProduct(true)
    }

    const [showCreateProduct, setShowCreateProduct] = useState(false)
    const handleShowCreateProduct = () => {
        setShowCreateProduct(!showCreateProduct)
    }

    return (
        <div className='w-full'>
            <div className='flex justify-between items-center gap-3 max-lg:flex-col max-sm:text-center'>
                <div>
                    <h2 className='font-bold text-2xl'>Products</h2>
                    <p className='text-xs'>Dashboard Products</p>
                </div>

                <div className='flex gap-5 max-sm:flex-col max-sm:gap-3'>
                    <button className='bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-semibold flex items-center gap-2 max-sm:px-20' onClick={handleShowCreateProduct}>
                        <LuUpload size={'17px'} />
                        Upload New Product
                    </button>
                    <div className="shadow-md flex items-center gap-2 py-2 px-4 rounded-md bg-gray-50 border">
                        <IoSearchSharp size={15} />
                        <input type="text" placeholder='Search...' className="outline-none bg-transparent text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
            </div>

            {isLoading &&
                <LoadingComponent width={"200px"} />
            }

            {isError &&
                <ErrorComponent message={error?.data?.message} />
            }

            {!isLoading && !isError &&
                <div className="w-full overflow-auto mt-3 p-2 h-[calc(100vh-205px)] max-lg:h-[calc(100vh-261px)] max-sm:h-[calc(100vh-300px)]">
                    <div className="max-w-full max-lg:min-w-[800px] max-xl:min-w-[500px]">
                        <table className='w-full shadow-md rounded-md overflow-hidden outline outline-gray-200 text-xs'>
                            <thead>
                                <tr>
                                    <th className='border py-2'>Main Image</th>
                                    <th className='border py-2 text-start pl-4'>Title</th>
                                    <th className='border py-2'>Current Price</th>
                                    <th className='border py-2'>Old Price</th>
                                    <th className='border py-2'>Rating</th>
                                    <th className='border py-2'>Group</th>
                                    <th className='border py-2'>Created By</th>
                                    <th className='border py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.map((product, i) => (
                                    <ColumnProductsDashboard key={i} product={product} handleOpenEditProduct={handleOpenEditProduct} handleOpenDeleteProduct={handleOpenDeleteProduct} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            }

            {showEditProduct && <EditProductPopup id={productId} handleShowEditProduct={handleShowEditProduct} />}
            {showDeleteProduct && <DeleteProductPopup id={productId} handleShowDeleteProduct={handleShowDeleteProduct} />}
            {showCreateProduct && <CreateProductPopup handleShowCreateProduct={handleShowCreateProduct} />}
        </div>
    )
}

export default DashboardProducts