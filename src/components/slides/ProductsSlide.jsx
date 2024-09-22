import { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useEffect } from "react";
import { useRef } from "react";
import ProductCard from "../cards/ProductCard";
import CircleCard from "../cards/CircleCard";

const ProductsSlide = ({ title, nameCard, products }) => {
    const [width, setWidth] = useState(0)
    const scroller = useRef(null)
    const scrollerContainer = useRef(null)
    const [clientWidth, setClientWidth] = useState(scroller?.current?.clientWidth || 0)
    const [clientWidthCon, setClientWidthCon] = useState(scroller?.current?.clientWidth || 0)

    useEffect(() => {
        setClientWidth(scroller?.current?.clientWidth || 0)
        setClientWidthCon(scrollerContainer?.current?.clientWidth || 0)
    }, [scroller && scrollerContainer])

    const handleClickArrowLeft = () => {
        scrollerContainer.current.scrollBy(-clientWidthCon, 0)
        setWidth(width - clientWidthCon > 0 ? width - clientWidthCon : 0);
    }

    const handleClickArrowRight = () => {
        scrollerContainer.current.scrollBy(clientWidthCon, 0)
        setWidth((width + clientWidthCon < clientWidth) ? (width + clientWidthCon) : clientWidth);
    }

    const handleClickDot = (id) => {
        scrollerContainer.current.scrollTo(clientWidthCon * id, 0);
        setWidth(clientWidthCon * id);
    }

    return (
        <div className="py-10 w-full px-20 max-lg:px-5">
            <h2 className="text-title_color text-center text-3xl font-bold my-7">{title}</h2>

            <div className="relative z-30">
                <div className="w-[800px] min-w-full max-w-full overflow-x-scroll mx-auto scroll-smooth none-scrollbar" ref={scrollerContainer}>
                    <div className="flex items-center justify-center gap-4 p-2 min-w-fit" ref={scroller}>
                        {products.map((product, i) => (
                            <div key={i}>
                                {nameCard == "ProductCard" ?
                                    <ProductCard product={product} />
                                    : nameCard == "CircleCard" ?
                                        <CircleCard product={product} />
                                        : null
                                }
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute top-1/2 -left-3 -translate-y-1/2 z-40" onClick={handleClickArrowLeft}>
                    <button className="rounded-full bg-pink/20 z-50 block cursor-pointer"><MdKeyboardArrowLeft className="text-pink text-3xl" /></button>
                </div>

                <div className="absolute top-1/2 -right-3 -translate-y-1/2 z-40" onClick={handleClickArrowRight}>
                    <button className="rounded-full bg-pink/20 z-50 block cursor-pointer"><MdKeyboardArrowRight className="text-pink text-3xl" /></button>
                </div>

                <div className="absolute -bottom-3 right-1/2 translate-x-1/2 z-40 max-md:hidden">
                    <div className="flex items-center gap-3">
                        {(clientWidth && clientWidthCon) && [...Array(Math.floor(clientWidth / clientWidthCon) + 1)].map((_, i) => (
                            <div className={`h-[5px] rounded-full transition-all duration-200 cursor-pointer ${Math.floor(width / clientWidthCon) == i ? 'w-6 bg-pink' : "w-5 bg-pink/40"}`} key={i} onClick={() => handleClickDot(i)}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsSlide