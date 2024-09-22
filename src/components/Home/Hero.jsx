import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import hero_vv from "../../assets/hero_vv.png"
import hero_shadow from "../../assets/hero_shadow.png"
import hero_discound from "../../assets/hero_discound.png"

import { resetStringLength } from "../../utils/helper";
import { Link, useNavigate } from "react-router-dom";

const Hero = ({ products }) => {
    const navigate = useNavigate()

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: dots => (
            <div style={{ paddingBottom: "50px" }}>{dots}</div>
        ),
        nextArrow: <></>,
        prevArrow: <></>,
    };

    return (
        <div className="hero">
            <Slider {...settings}>
                {products && products.map((product, i) => (
                    <div className="bg-indigo-600/5" key={i}>
                        <div className="relative flex items-center justify-end gap-20 overflow-hidden max-lg:flex-col-reverse max-lg:gap-5 w-[90%] mx-auto py-10">
                            <img src={hero_vv} alt="" className="absolute top-0 left-0 max-2xl:!hidden" />
                            <div className="w-[40%] max-2xl:w-[50%] max-lg:w-full z-10">
                                <p className="text-sm font-semibold text-accent">Best Products For Your Castle....</p>
                                <h1 className="font-bold text-4xl max-lg:text-2xl my-2 leading-snug">{resetStringLength(product?.title, 70)}</h1>
                                <p className="text-sub_text_color2 mt-3 leading-7">{resetStringLength(product?.description, 200)}</p>
                                <Link to={`/details/${product?._id}`} className="pink-button mt-6 block w-fit">View Details Now</Link>
                            </div>

                            <div className="">
                                <div className="relative w-[500px] h-[500px] max-md:w-[500px] max-sm:w-full py-5">
                                    <img src={hero_shadow} alt="" className="-z-10 w-full h-full object-contain" />
                                    <img src={product?.images[0]} onClick={() => navigate(`/details/${product?._id}`)} alt="" className="cursor-pointer z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] mix-blend-multiply object-contain" />
                                    <div className="absolute top-6 right-0 z-10">
                                        <img src={hero_discound} alt="" className="w-[100px]" />
                                        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white text-2xl text-center">{((product?.oldPrice - product?.newPrice) / product?.oldPrice * 100).toFixed(0)}% off</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default Hero