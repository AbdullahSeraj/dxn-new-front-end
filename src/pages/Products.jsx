import ClarityGridIcon from '../assets/Icons/ClarityGridIcon'
import SolidListIcon from '../assets/Icons/SolidListIcon'
import { MdSearch } from "react-icons/md";
import CheckboxInput from '../components/coms/CheckboxInput';
import StarIcon from '../assets/Icons/StarIcon';
import RadioInput from '../components/coms/RadioInput';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ListProducts from '../components/products/ListProducts';
import GridProducts from '../components/products/GridProducts';
import { useProductsQuery } from '../redux/features/productApiSlice';
import { Stars } from '../utils/helper';
import { useCategoriesQuery } from '../redux/features/categoryApiSlice';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { MdExpandMore } from "react-icons/md";

const Products = () => {
    const { data, isLoading, isError } = useProductsQuery()
    const [products, setProducts] = useState(data ? data : []);
    const { data: categories } = useCategoriesQuery()
    const [isList, setIsList] = useState(true);
    const [filters, setFilters] = useState({ group: {}, rating: {}, category: {}, price: {}, color: {} })
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (search === "" || search === null) {
            setProducts(data)
        } else {
            const searchedProduct = products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase()))
            setProducts(searchedProduct)
        }
    }, [search])

    useEffect(() => {
        setProducts(data ? data : [])
    }, [data])

    useEffect(() => {
        let newProducts = data;
        let groups = Object.entries(filters.group).filter((g) => g[1]).map((g) => g[0])
        let rating = Object.entries(filters.rating).filter((g) => g[1]).map((g) => g[0])
        let categories = Object.entries(filters.category).filter((g) => g[1]).map((g) => g[0])
        let prices = Object.entries(filters.price).filter((g) => g[1]).map((g) => g[0])
        let colors = Object.entries(filters.color).filter((g) => g[1]).map((g) => g[0])

        if (groups.length || rating.length || categories.length || prices.length || colors.length) {
            if (groups.length) {
                newProducts = newProducts.filter((p) => groups.includes(p.group));
            }

            if (rating.length) {
                newProducts = newProducts.filter((p) => rating.includes(String(Math.round(p.rating))));
            }

            if (categories.length) {
                newProducts = newProducts.filter((p) => categories.includes(p.category));
            }

            if (prices.length) {
                newProducts = newProducts.filter((p) => {
                    let isTrue = false
                    prices.map((r) => {
                        if (r < p.newPrice && p.newPrice < (Number(r) + 100)) {
                            isTrue = true
                        }
                        if (r == 350) {
                            if (p.newPrice > 350) {
                                isTrue = true
                            }
                        }
                    })
                    return isTrue
                });
            }

            if (colors.length) {
                newProducts = newProducts.filter((p) => {
                    let isTrue = false
                    p.colors.map((c) => {
                        if (colors.includes(c.toLowerCase())) {
                            isTrue = true;
                        }
                    })
                    return isTrue
                });
            }

            setProducts(newProducts);
        } else {
            setProducts(data)
        }
    }, [filters]);

    const handleResetFilters = () => {
        setFilters({ group: {}, rating: { 4: false }, category: {}, price: {}, color: {} })
    }

    return (
        <div>
            <div className='bg-bg_pink py-7'>
                <div className='w-[90%] mx-auto'>
                    <h2 className='text-text text-3xl font-bold'>Shop Left Sidebar</h2>
                    <div><Link to={"/"}>Home</Link> . <Link to={"/products/grid"}>Products</Link> . <span className='text-pink'>Shop Grid Default</span></div>
                </div>
            </div>

            <div className='flex justify-between items-center w-[90%] mx-auto my-10 max-lg:flex-col gap-4'>
                <div>
                    <h3 className='font-bold text-xl text-text'>Ecommerce Acceories & Fashion item</h3>
                    <p className='text-gray-400'>About 9,620 results (0.62 seconds)</p>
                </div>

                <div className='flex items-center gap-5'>
                    <div className='flex items-center gap-4'>
                        <p>View:</p>
                        <div className='flex items-center gap-2'>
                            <button onClick={() => setIsList(true)} className={`cursor-pointer p-2 rounded-full ${isList ? "bg-grey_text/15" : "hover:bg-grey_text/5"}`} >
                                <ClarityGridIcon className="text-grey_text" />
                            </button>
                            <button onClick={() => setIsList(false)} className={`cursor-pointer p-2 rounded-full ${!isList ? "bg-grey_text/15" : "hover:bg-grey_text/5"}`}>
                                <SolidListIcon className="text-grey_text" />
                            </button>
                        </div>
                    </div>

                    <div className='border shadow-md rounded-md py-1 px-3 flex items-center gap-1'>
                        <input type="text" className='outline-none' placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} />
                        <div className='hover:bg-grey_text/10 cursor-pointer p-1 rounded-full'>
                            <MdSearch className="text-grey_text" />
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-[90%] mx-auto flex justify-between gap-10 pb-10 max-lg:flex-col'>
                <div className='min-w-[170px] max-lg:hidden'>
                    <div className='grid gap-7 max-lg:flex max-lg:flex-wrap max-lg:gap-10'>
                        <div>
                            <h3 className='text-text font-bold text-lg border-b-2 border-text w-fit mb-5'>Categories</h3>

                            <div className='grid gap-3'>
                                {categories && categories.map((cat, i) => (
                                    <CheckboxInput title={cat?.title} key={i} color={"#FF3EB2"} value={cat?.name} onChange={(e) => setFilters((prev) => { return { ...prev, category: { ...filters.category, [cat?.name]: e.target.checked } } })} />
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className='text-text font-bold text-lg border-b-2 border-text w-fit mb-5'>Rating Item</h3>

                            <div className='grid gap-3'>
                                <CheckboxInput title={<div className='flex items-center gap-1'>
                                    <Stars number={5} />
                                    <span className='text-[10px]'>(214)</span>
                                </div>} color={"#FFCC2E"} name={"rating"} value="5" onChange={(e) => setFilters((prev) => { return { ...prev, rating: { ...filters.rating, 5: e.target.checked } } })} />
                                <CheckboxInput title={<div className='flex items-center gap-1'>
                                    <Stars number={4} />
                                    <span className='text-[10px]'>(214)</span>
                                </div>} color={"#FFCC2E"} value="4" onChange={(e) => setFilters((prev) => { return { ...prev, rating: { ...filters.rating, 4: e.target.checked } } })} />
                                <CheckboxInput title={<div className='flex items-center gap-1'>
                                    <Stars number={3} />
                                    <span className='text-[10px]'>(214)</span>
                                </div>} color={"#FFCC2E"} value="3" onChange={(e) => setFilters((prev) => { return { ...prev, rating: { ...filters.rating, 3: e.target.checked } } })} />
                                <CheckboxInput title={<div className='flex items-center gap-1'>
                                    <Stars number={2} />
                                    <span className='text-[10px]'>(214)</span>
                                </div>} color={"#FFCC2E"} value="2" onChange={(e) => setFilters((prev) => { return { ...prev, rating: { ...filters.rating, 2: e.target.checked } } })} />
                                <CheckboxInput title={<div className='flex items-center gap-1'>
                                    <Stars number={1} />
                                    <span className='text-[10px]'>(214)</span>
                                </div>} color={"#FFCC2E"} value="1" onChange={(e) => setFilters((prev) => { return { ...prev, rating: { ...filters.rating, 1: e.target.checked } } })} />
                            </div>
                        </div>

                        <div>
                            <h3 className='text-text font-bold text-lg border-b-2 border-text w-fit mb-5'>Price Filter</h3>

                            <div className='grid gap-3'>
                                <CheckboxInput title="$0.00 - $150.00" color={"#FF3EB2"} value={"0"} onChange={(e) => setFilters((prev) => { return { ...prev, price: { ...filters.price, 0: e.target.checked } } })} />
                                <CheckboxInput title="$150.00 - $250.00" color={"#FF3EB2"} value={"150"} onChange={(e) => setFilters((prev) => { return { ...prev, price: { ...filters.price, 150: e.target.checked } } })} />
                                <CheckboxInput title="$250.00 - $350.00" color={"#FF3EB2"} value={"250"} onChange={(e) => setFilters((prev) => { return { ...prev, price: { ...filters.price, 250: e.target.checked } } })} />
                                <CheckboxInput title="$350.00 +" color={"#FF3EB2"} value={"350"} onChange={(e) => setFilters((prev) => { return { ...prev, price: { ...filters.price, 350: e.target.checked } } })} />
                            </div>
                        </div>

                        <div>
                            <h3 className='text-text font-bold text-lg border-b-2 border-text w-fit mb-5'>Product Group</h3>

                            <div className='grid gap-3'>
                                <CheckboxInput title="Main Products" color={"#603EFF"} name={"group"} value="main" onChange={(e) => setFilters((prev) => { return { ...prev, group: { ...filters.group, main: e.target.checked } } })} />
                                <CheckboxInput title="Featured Products" color={"#603EFF"} name={"group"} value="featured" onChange={(e) => setFilters((prev) => { return { ...prev, group: { ...filters.group, featured: e.target.checked } } })} />
                                <CheckboxInput title="Leatest Products" color={"#603EFF"} name={"group"} value={"leatest"} onChange={(e) => setFilters((prev) => { return { ...prev, group: { ...filters.group, leatest: e.target.checked } } })} />
                                <CheckboxInput title="Unique Product" color={"#603EFF"} name={"group"} value={"unique"} onChange={(e) => setFilters((prev) => { return { ...prev, group: { ...filters.group, unique: e.target.checked } } })} />
                                <CheckboxInput title="Trending Products" color={"#603EFF"} name={"group"} value={"trending"} onChange={(e) => setFilters((prev) => { return { ...prev, group: { ...filters.group, trending: e.target.checked } } })} />
                                <CheckboxInput title="Discount Item" color={"#603EFF"} name={"group"} value={"discount"} onChange={(e) => setFilters((prev) => { return { ...prev, group: { ...filters.group, discount: e.target.checked } } })} />
                                <CheckboxInput title="Top Categories" color={"#603EFF"} name={"group"} value={"top"} onChange={(e) => setFilters((prev) => { return { ...prev, group: { ...filters.group, top: e.target.checked } } })} />
                                <CheckboxInput title="Leatest Blog" color={"#603EFF"} name={"group"} value={"leatestBlog"} onChange={(e) => setFilters((prev) => { return { ...prev, group: { ...filters.group, leatestBlog: e.target.checked } } })} />
                            </div>
                        </div>

                        <div>
                            <h3 className='text-text font-bold text-lg border-b-2 border-text w-fit mb-5'>Filter By Color</h3>

                            <div className='grid grid-cols-2 gap-2'>
                                <RadioInput color={"black"} title={"Black"} name="colors" value={"black"} onChange={(e) => setFilters((prev) => { return { ...prev, color: { ...filters.color, black: e.target.checked } } })} />
                                <RadioInput color={"blue"} title={"Blue"} name="colors" value={"blue"} onChange={(e) => setFilters((prev) => { return { ...prev, color: { ...filters.color, blue: e.target.checked } } })} />
                                <RadioInput color={"white"} title={"White"} name="colors" value={"white"} onChange={(e) => setFilters((prev) => { return { ...prev, color: { ...filters.color, white: e.target.checked } } })} />
                                <RadioInput color={"orange"} title={"Orange"} name="colors" value={"orange"} onChange={(e) => setFilters((prev) => { return { ...prev, color: { ...filters.color, orange: e.target.checked } } })} />
                                <RadioInput color={"violet"} title={"Violet"} name="colors" value={"violet"} onChange={(e) => setFilters((prev) => { return { ...prev, color: { ...filters.color, violet: e.target.checked } } })} />
                                <RadioInput color={"pink"} title={"Pink"} name="colors" value={"pink"} onChange={(e) => setFilters((prev) => { return { ...prev, color: { ...filters.color, pink: e.target.checked } } })} />
                                <RadioInput color={"#00aaff"} title={"Sky"} name="colors" value={"sky"} onChange={(e) => setFilters((prev) => { return { ...prev, color: { ...filters.color, sky: e.target.checked } } })} />
                                <RadioInput color={"green"} title={"Green"} name="colors" value={"green"} onChange={(e) => setFilters((prev) => { return { ...prev, color: { ...filters.color, green: e.target.checked } } })} />
                            </div>
                        </div>

                        <button className='pink-button mt-10 w-full' type='button' onClick={handleResetFilters}>Reset Filters</button>
                    </div>
                </div>

                <div className='lg:hidden'>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<MdExpandMore />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{ boxShadow: "none" }}
                        >
                            Filters
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className='min-w-[170px]'>
                                <div className='grid gap-7 max-lg:flex max-lg:flex-wrap max-lg:gap-10'>
                                    <div>
                                        <h3 className='text-text font-bold text-lg border-b-2 border-text w-fit mb-5'>Categories</h3>

                                        <div className='grid gap-3'>
                                            {categories && categories.map((cat, i) => (
                                                <CheckboxInput title={cat?.title} key={i} color={"#FF3EB2"} value={cat?.name} onChange={(e) => setFilters((prev) => { return { ...prev, category: { ...filters.category, [cat?.name]: e.target.checked } } })} />
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className='text-text font-bold text-lg border-b-2 border-text w-fit mb-5'>Rating Item</h3>

                                        <div className='grid gap-3'>
                                            <CheckboxInput title={<div className='flex items-center gap-1'>
                                                <Stars number={5} />
                                                <span className='text-[10px]'>(214)</span>
                                            </div>} color={"#FFCC2E"} name={"rating"} value="5" onChange={(e) => setFilters((prev) => { return { ...prev, rating: { ...filters.rating, 5: e.target.checked } } })} />
                                            <CheckboxInput title={<div className='flex items-center gap-1'>
                                                <Stars number={4} />
                                                <span className='text-[10px]'>(214)</span>
                                            </div>} color={"#FFCC2E"} value="4" onChange={(e) => setFilters((prev) => { return { ...prev, rating: { ...filters.rating, 4: e.target.checked } } })} />
                                            <CheckboxInput title={<div className='flex items-center gap-1'>
                                                <Stars number={3} />
                                                <span className='text-[10px]'>(214)</span>
                                            </div>} color={"#FFCC2E"} value="3" onChange={(e) => setFilters((prev) => { return { ...prev, rating: { ...filters.rating, 3: e.target.checked } } })} />
                                            <CheckboxInput title={<div className='flex items-center gap-1'>
                                                <Stars number={2} />
                                                <span className='text-[10px]'>(214)</span>
                                            </div>} color={"#FFCC2E"} value="2" onChange={(e) => setFilters((prev) => { return { ...prev, rating: { ...filters.rating, 2: e.target.checked } } })} />
                                            <CheckboxInput title={<div className='flex items-center gap-1'>
                                                <Stars number={1} />
                                                <span className='text-[10px]'>(214)</span>
                                            </div>} color={"#FFCC2E"} value="1" onChange={(e) => setFilters((prev) => { return { ...prev, rating: { ...filters.rating, 1: e.target.checked } } })} />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className='text-text font-bold text-lg border-b-2 border-text w-fit mb-5'>Price Filter</h3>

                                        <div className='grid gap-3'>
                                            <CheckboxInput title="$0.00 - $150.00" color={"#FF3EB2"} value={"0"} onChange={(e) => setFilters((prev) => { return { ...prev, price: { ...filters.price, 0: e.target.checked } } })} />
                                            <CheckboxInput title="$150.00 - $250.00" color={"#FF3EB2"} value={"150"} onChange={(e) => setFilters((prev) => { return { ...prev, price: { ...filters.price, 150: e.target.checked } } })} />
                                            <CheckboxInput title="$250.00 - $350.00" color={"#FF3EB2"} value={"250"} onChange={(e) => setFilters((prev) => { return { ...prev, price: { ...filters.price, 250: e.target.checked } } })} />
                                            <CheckboxInput title="$350.00 +" color={"#FF3EB2"} value={"350"} onChange={(e) => setFilters((prev) => { return { ...prev, price: { ...filters.price, 350: e.target.checked } } })} />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className='text-text font-bold text-lg border-b-2 border-text w-fit mb-5'>Product Group</h3>

                                        <div className='grid gap-3'>
                                            <CheckboxInput title="Main Products" color={"#603EFF"} name={"group"} value="main" onChange={(e) => setFilters((prev) => { return { ...prev, group: { ...filters.group, main: e.target.checked } } })} />
                                            <CheckboxInput title="Featured Products" color={"#603EFF"} name={"group"} value="featured" onChange={(e) => setFilters((prev) => { return { ...prev, group: { ...filters.group, featured: e.target.checked } } })} />
                                            <CheckboxInput title="Leatest Products" color={"#603EFF"} name={"group"} value={"leatest"} onChange={(e) => setFilters((prev) => { return { ...prev, group: { ...filters.group, leatest: e.target.checked } } })} />
                                            <CheckboxInput title="Unique Product" color={"#603EFF"} name={"group"} value={"unique"} onChange={(e) => setFilters((prev) => { return { ...prev, group: { ...filters.group, unique: e.target.checked } } })} />
                                            <CheckboxInput title="Trending Products" color={"#603EFF"} name={"group"} value={"trending"} onChange={(e) => setFilters((prev) => { return { ...prev, group: { ...filters.group, trending: e.target.checked } } })} />
                                            <CheckboxInput title="Discount Item" color={"#603EFF"} name={"group"} value={"discount"} onChange={(e) => setFilters((prev) => { return { ...prev, group: { ...filters.group, discount: e.target.checked } } })} />
                                            <CheckboxInput title="Top Categories" color={"#603EFF"} name={"group"} value={"top"} onChange={(e) => setFilters((prev) => { return { ...prev, group: { ...filters.group, top: e.target.checked } } })} />
                                            <CheckboxInput title="Leatest Blog" color={"#603EFF"} name={"group"} value={"leatestBlog"} onChange={(e) => setFilters((prev) => { return { ...prev, group: { ...filters.group, leatestBlog: e.target.checked } } })} />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className='text-text font-bold text-lg border-b-2 border-text w-fit mb-5'>Filter By Color</h3>

                                        <div className='grid grid-cols-2 gap-2'>
                                            <RadioInput color={"black"} title={"Black"} name="colors" value={"black"} onChange={(e) => setFilters((prev) => { return { ...prev, color: { ...filters.color, black: e.target.checked } } })} />
                                            <RadioInput color={"blue"} title={"Blue"} name="colors" value={"blue"} onChange={(e) => setFilters((prev) => { return { ...prev, color: { ...filters.color, blue: e.target.checked } } })} />
                                            <RadioInput color={"white"} title={"White"} name="colors" value={"white"} onChange={(e) => setFilters((prev) => { return { ...prev, color: { ...filters.color, white: e.target.checked } } })} />
                                            <RadioInput color={"orange"} title={"Orange"} name="colors" value={"orange"} onChange={(e) => setFilters((prev) => { return { ...prev, color: { ...filters.color, orange: e.target.checked } } })} />
                                            <RadioInput color={"violet"} title={"Violet"} name="colors" value={"violet"} onChange={(e) => setFilters((prev) => { return { ...prev, color: { ...filters.color, violet: e.target.checked } } })} />
                                            <RadioInput color={"pink"} title={"Pink"} name="colors" value={"pink"} onChange={(e) => setFilters((prev) => { return { ...prev, color: { ...filters.color, pink: e.target.checked } } })} />
                                            <RadioInput color={"#00aaff"} title={"Sky"} name="colors" value={"sky"} onChange={(e) => setFilters((prev) => { return { ...prev, color: { ...filters.color, sky: e.target.checked } } })} />
                                            <RadioInput color={"green"} title={"Green"} name="colors" value={"green"} onChange={(e) => setFilters((prev) => { return { ...prev, color: { ...filters.color, green: e.target.checked } } })} />
                                        </div>
                                    </div>

                                    <button className='pink-button mt-10 w-full' type='button' onClick={handleResetFilters}>Reset Filters</button>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>

                {isList && !isLoading && !isError ?
                    <ListProducts products={products} />
                    :
                    <GridProducts products={products} />
                }
            </div>
        </div>
    )
}

export default Products