import CardItem from "./CardItem"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div onClick={onClick} className={"z-50 absolute top-1/2 -translate-y-1/2 -right-[20px] rounded-full bg-red-600 text-white p-3 cursor-pointer"}><FaArrowRight className="text-xs" /></div>
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div onClick={onClick} className="z-50 absolute top-1/2 -translate-y-1/2 -left-[20px] rounded-full bg-red-600 text-white p-3 cursor-pointer"><FaArrowLeft className="text-xs" /></div>
    );
}

const Category = ({ title, products }) => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 3,
        speed: 700,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 860,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 630,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="py-20">
            <h2 className='text-3xl capitalize'>{title}</h2>

            <div className="relative">
                <div className="relative w-[90%] mx-auto">
                    <Slider {...settings} >
                        {products && products.map((product) => (
                            <CardItem className={"mx-2 my-2"} box={true} product={product} key={product._id} />
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Category