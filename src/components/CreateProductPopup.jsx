import { useRef, useState } from 'react'
import { useCreateProductMutation } from '../redux/features/productApiSlice'
import { IoClose, IoCloudUploadOutline } from 'react-icons/io5'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../../firebase'
import { Box, Chip, MenuItem, Select } from '@mui/material'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { useCategoriesQuery } from '../redux/features/categoryApiSlice'
import { handleClickTrue } from '../redux/slices/SnackbarSlice'
import { useDispatch } from 'react-redux'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const sizes = [
    'S',
    'M',
    'L',
    'XL',
    'XXL',
];

const colors = [
    'Red',
    'Blue',
    'Black',
    'Yellow',
    'Pink',
    'White',
];


const CreateProductPopup = ({ handleShowCreateProduct }) => {
    const dispatch = useDispatch()
    const [productInputs, setProductInputs] = useState({ title: "", description: "", group: "", images: [], newPrice: 0, oldPrice: 0, rating: 0, sizes: [], colors: [], category: "", tags: [] })
    const [tag, setTag] = useState("");
    const [createProduct, { isLoading: isLoadingCreateProduct, error, isError }] = useCreateProductMutation()
    const uploadImg = useRef(null)
    const [files, setFiles] = useState([])
    const [imageUploadError, setImageUploadError] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const { data: categories } = useCategoriesQuery()

    const handleRemoveImg = (id) => {
        let newImages = productInputs.images.filter((_, i) => i !== id)
        setProductInputs({ ...productInputs, images: newImages })
    }

    const handleUploadImages = () => {
        if (files.length > 0 && (files.length + productInputs.images.length) <= 10) {
            setIsUploading(true)
            setImageUploadError("")
            const promises = []

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]))
            }
            Promise.all(promises).then((urls) => {
                setProductInputs({ ...productInputs, images: productInputs.images.concat(urls) })
                setFiles([])
                setImageUploadError("")
                setIsUploading(false)
            }).catch((err) => {
                setImageUploadError("Image upload failed (2 mb max per image)")
                setFiles([])
                setIsUploading(false)
            })
        } else {
            setImageUploadError("You can only upload 10 images per listing")
            setFiles([])
            setIsUploading(false)
        }
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                }
            )
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await createProduct(productInputs)

            if (data) {
                handleShowCreateProduct()
                dispatch(handleClickTrue({ message: "Created New Product Successfully", condition: "success" }))
            }
        } catch (error) {
            dispatch(handleClickTrue({ message: error?.data?.message || "Something Error", condition: "error" }))
        }
    }

    const handleAddTag = () => {
        let newTags = [...productInputs.tags, tag]
        setProductInputs((prev) => { return { ...prev, tags: newTags } })
        setTag("")
    }

    const handleDeleteTag = (id) => {
        let newTags = productInputs.tags.filter((_, i) => i != id);
        setProductInputs((prev) => { return { ...prev, tags: newTags } })
    }

    return (
        <div className='fixed top-0 left-0 bottom-0 right-0 z-[300]'>
            <div className='fixed top-0 left-0 bottom-0 right-0 bg-gray-500/70' onClick={handleShowCreateProduct}></div>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-md:w-[calc(100vw-50px)] min-h-[200px] max-h-[530px] overflow-y-auto bg-white rounded-lg'>

                <div className='sticky top-0 right-0 flex justify-end z-50'>
                    <div className='bg-white absolute top-0 left-0 w-full min-h-[50px] flex justify-between items-center py-5 px-5'>
                        <div className=''>
                            <h2 className='text-text font-bold text-xl'>Create Product</h2>
                        </div>

                        <button className='bg-red-600/20 hover:bg-red-600/30 rounded-full p-1 w-fit z-[400]' onClick={handleShowCreateProduct}>
                            <IoClose size={20} className='text-red-600' />
                        </button>
                    </div>
                </div>

                <div className="px-7 pb-7 pt-[70px]">
                    <form onSubmit={handleSubmit}>
                        {/* <div className="flex gap-10"> */}
                        <fieldset className='flex flex-col my-3 w-full'>
                            <label htmlFor="title" className='text-sm font-bold text-slate-600'>Title</label>
                            <input type="text" name="title" id="title" placeholder='title' className='input' value={productInputs.title} onChange={(e) => setProductInputs((prev) => { return { ...prev, title: e.target.value } })} />
                            {/* {errors.usernameError ? <div className='text-red-600 mt-1 text-xs'>{errors.usernameError}</div> : null} */}
                        </fieldset>

                        <fieldset className='flex flex-col my-3 w-full'>
                            <label htmlFor="description" className='text-sm font-bold text-slate-600'>Description</label>
                            <textarea type="text" rows={5} name="description" id="description" placeholder='description' className='input resize-none' value={productInputs.description} onChange={(e) => setProductInputs((prev) => { return { ...prev, description: e.target.value } })} />
                            {/* {errors.usernameError ? <div className='text-red-600 mt-1 text-xs'>{errors.usernameError}</div> : null} */}
                        </fieldset>
                        {/* </div> */}

                        {/* <div className="flex gap-10"> */}
                        <fieldset className='flex flex-col my-3 w-full'>
                            <label htmlFor="oldPrice" className='text-sm font-bold text-slate-600'>Old Price</label>
                            <input type="number" name="oldPrice" id="oldPrice" placeholder='oldPrice' className='input' value={productInputs.oldPrice} onChange={(e) => setProductInputs((prev) => { return { ...prev, oldPrice: e.target.value } })} />
                            {/* {errors.usernameError ? <div className='text-red-600 mt-1 text-xs'>{errors.usernameError}</div> : null} */}
                        </fieldset>

                        <fieldset className='flex flex-col my-3 w-full'>
                            <label htmlFor="newPrice" className='text-sm font-bold text-slate-600'>New Price</label>
                            <input type="number" name="newPrice" id="newPrice" placeholder='newPrice' className='input' value={productInputs.newPrice} onChange={(e) => setProductInputs((prev) => { return { ...prev, newPrice: e.target.value } })} />
                            {/* {errors.usernameError ? <div className='text-red-600 mt-1 text-xs'>{errors.usernameError}</div> : null} */}
                        </fieldset>
                        {/* </div> */}

                        {/* <div className="flex gap-10"> */}
                        <fieldset className='flex flex-col my-3 w-full'>
                            <label htmlFor="rating" className='text-sm font-bold text-slate-600'>Rating</label>
                            <input type="number" name="rating" id="rating" placeholder='rating' minLength={0} maxLength={5} className='input' value={productInputs.rating} onChange={(e) => setProductInputs((prev) => { return { ...prev, rating: e.target.value } })} />
                            {/* {errors.usernameError ? <div className='text-red-600 mt-1 text-xs'>{errors.usernameError}</div> : null} */}
                        </fieldset>

                        <fieldset className='flex flex-col my-3 w-full'>
                            <label htmlFor="group" className='text-sm font-bold text-slate-600'>Group Name</label>
                            <select name="group" id="group" className='input' onChange={(e) => setProductInputs((prev) => { return { ...prev, group: e.target.value } })}>
                                <option value="">Select...</option>
                                <option value="main">Main Products</option>
                                <option value="featured">Featured Products</option>
                                <option value="leatest">Leatest Products</option>
                                <option value="unique">Unique Product</option>
                                <option value="trending">Trending Products</option>
                                <option value="discount">Discount Items</option>
                                <option value="top">Top Products</option>
                                <option value="leatestBlog">Leatest Blog</option>
                            </select>
                            {/* {errors.usernameError ? <div className='text-red-600 mt-1 text-xs'>{errors.usernameError}</div> : null} */}
                        </fieldset>
                        {/* </div> */}

                        {/* <div className="flex gap-10"> */}
                        <fieldset className='flex flex-col my-3 w-full'>
                            <label htmlFor="sizes" className='text-sm font-bold text-slate-600'>Sizes</label>
                            <Select
                                className='input'
                                sx={{ py: 1, ".MuiSelect-select": { py: 0 }, ".MuiOutlinedInput-notchedOutline": { border: "none" } }}
                                labelId="sizes"
                                id="sizes"
                                multiple
                                value={productInputs.sizes}
                                onChange={(e) => setProductInputs((prev) => { return { ...prev, sizes: e.target.value } })}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} size="small" />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {sizes.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </fieldset>

                        <fieldset className='flex flex-col my-3 w-full'>
                            <label htmlFor="colors" className='text-sm font-bold text-slate-600'>Colors</label>
                            <Select
                                className='input'
                                sx={{ py: 1, ".MuiSelect-select": { py: 0 }, ".MuiOutlinedInput-notchedOutline": { border: "none" } }}
                                labelId="colors"
                                id="colors"
                                multiple
                                value={productInputs.colors}
                                onChange={(e) => setProductInputs((prev) => { return { ...prev, colors: e.target.value } })}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} size="small" sx={{ color: `${value}`, fontWeight: "bold" }} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {colors.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </fieldset>
                        {/* </div> */}

                        {/* <div className='flex gap-10'> */}
                        <fieldset className='flex flex-col my-3 w-full'>
                            <label htmlFor="tags" className='text-sm font-bold text-slate-600'>Tags</label>
                            <div className='flex gap-5 items-center'>
                                <input type="text" name="tags" id="tags" placeholder='Tags Product' className='input flex-1' value={tag} onChange={(e) => setTag(e.target.value)} />
                                <button type="button" className='pink-button h-[38px]' onClick={handleAddTag}>Add</button>
                            </div>
                        </fieldset>

                        <div className='flex gap-1 mb-3'>
                            {productInputs?.tags.map((t, i) => (
                                <div key={i} onClick={() => handleDeleteTag(i)} className='border border-pink bg-pink/10 rounded-full px-3 py-1 text-xs hover:opacity-30 cursor-pointer'>{t}</div>
                            ))}
                        </div>

                        <fieldset className='flex flex-col my-3 w-full'>
                            <label htmlFor="category" className='text-sm font-bold text-slate-600'>Category</label>
                            <select name="category" id="category" className='input' onChange={(e) => setProductInputs((prev) => { return { ...prev, category: e.target.value } })}>
                                <option value="">Select...</option>
                                {categories && categories.map((cat) => (
                                    <option value={cat?.name} key={cat?._id}>{cat?.title}</option>
                                ))}
                            </select>
                        </fieldset>
                        {/* </div> */}

                        <fieldset>
                            <input type="file" name="images" hidden multiple id="images" accept='image/*' ref={uploadImg} onChange={(e) => setFiles(e.target.files)} />
                            <label htmlFor="images" className='text-sm font-bold text-slate-600'>Images</label>
                            <div className="h-[160px] input flex items-center justify-center cursor-pointer" onClick={() => uploadImg.current.click()}>
                                <div className="flex flex-col items-center">
                                    <IoCloudUploadOutline size={"100px"} className="text-gray-400" />
                                    <h3 className="text-center text-gray-400 font-bold">Click To Upload Images</h3>
                                </div>
                            </div>
                            {files.length > 0 &&
                                <button type="button" className="py-2 w-full mt-2 text-white bg-blue-500 rounded-md px-5 font-semibold z-50 disabled:cursor-not-allowed disabled:bg-blue-200" onClick={handleUploadImages} disabled={isUploading}>{isUploading ? "Loading..." : `Upload ${files.length} images`}</button>
                            }
                            {imageUploadError &&
                                <div className="text-red-600 text-center text-xs mt-2">{imageUploadError}</div>
                            }
                        </fieldset>

                        <div className='overflow-auto w-full'>
                            <div className='w-full max-w-full min-w-fit'>
                                <div className="flex gap-5 mt-3">
                                    {productInputs?.images.map((img, i) => (
                                        <div key={i} className="relative w-[80px] h-[80px] bg-gray-100 rounded-md overflow-hidden shadow-md border group">
                                            <img src={img} alt="img" className="w-full h-full" />
                                            <div className="z-30 group-hover:block hidden">
                                                <div className="absolute top-1 right-1 bg-red-100 rounded-full cursor-pointer z-40" onClick={() => handleRemoveImg(i)}>
                                                    <IoMdCloseCircleOutline size={"20px"} color="red" />
                                                </div>
                                                <div className="absolute top-0 left-0 bottom-0 right-0 bg-gray-600/10"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {isError &&
                            <div className='text-red-600 text-center text-xs'>{error?.data?.message}
                            </div>
                        }

                        <fieldset>
                            <button className="bg-blue-600 text-white w-full py-2 px-5 font-semibold rounded-md shadow-md mt-4 hover:bg-blue-500 disabled:bg-blue-200 disabled:cursor-not-allowed" disabled={isLoadingCreateProduct}>{isLoadingCreateProduct ? "Loading..." : "Create Product"}</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateProductPopup