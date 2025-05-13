import { Link } from "react-router-dom"
import FacebookIcon from "../../assets/Icons/FacebookIcon"
import InstegramIcon from "../../assets/Icons/InstegramIcon"
import TwitterIcon from "../../assets/Icons/TwitterIcon"

const Footer = () => {
    return (
        <div>
            <div className='grid grid-cols-1 mdgrid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-10 w-[90%] mx-auto'>
                <div className="pr-10">
                    <div className="mb-3">
                        <Link to={"/"} className="h-full text-2xl text-text font-bold">DXN New</Link>
                    </div>

                    <div className="mb-2">
                        <h3 className="text-sub_text_color2 text-sm font-semibold">Contact Info</h3>
                        <p className="text-sub_text_color2 text-xs">17 Princess Road, London, Greater London NW1 8JR, UK</p>
                    </div>
                    <div className="mb-2">
                        <h3 className="text-sub_text_color2 text-sm font-semibold">Contact Info</h3>
                        <p className="text-sub_text_color2 text-xs">17 Princess Road, London, Greater London NW1 8JR, UK</p>
                    </div>
                </div>

                <div className="text-sub_text_color2">
                    <h2 className="font-semibold mb-3 text-black text-xl">Categories</h2>
                    <p>Laptops & Computers</p>
                    <p>Cameras & Photography</p>
                    <p>Smart Phones & Tablets</p>
                    <p>Video Games & Consoles</p>
                    <p>Waterproof Headphones</p>
                </div>

                <div className="text-sub_text_color2">
                    <h2 className="font-semibold mb-3 text-black text-xl">Customer Care</h2>
                    <p>My Account</p>
                    <p>Discount</p>
                    <p>Returns</p>
                    <p>Orders History</p>
                    <p>Order Tracking</p>
                </div>

                <div className="text-sub_text_color2">
                    <h2 className="font-semibold mb-3 text-black text-xl">Pages</h2>
                    <p>Blog</p>
                    <p>Browse the Shop</p>
                    <p>Category</p>
                    <p>Pre-Built Pages</p>
                    <p>Visual Composer Elements</p>
                    <p>WooCommerce Pages</p>
                </div>
            </div>

            <div className="py-4 bg-[#E7E4F8]">
                <div className="w-[80%] mx-auto flex items-center justify-between">

                    {/* <p className="text-gray-400">©<a href="https://serajs-net.web.app" className="hover:text-pink" target="_blank">Serajs.Net</a> - All Rights Reserved</p> */}
                    <p className="text-gray-400">© Eiad Arja | All Rights Reserved</p>

                    <div className="flex items-center gap-2">
                        <FacebookIcon className="cursor-pointer" />
                        <InstegramIcon className="cursor-pointer" />
                        <TwitterIcon className="cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer