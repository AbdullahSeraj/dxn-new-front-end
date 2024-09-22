import BigProduct from "../components/Home/BigProduct";
import DiscountItem from "../components/Home/DiscountItem";
import Hero from "../components/Home/Hero";
import RectangleContainer from "../components/Home/RectangleContainer";
import TrandingProducts from "../components/Home/TrandingProducts";
import WhatOffer from "../components/Home/WhatOffer";
import ProductsGroup from "../components/slides/ProductsGroup";
import ProductsSlide from "../components/slides/ProductsSlide";
import { useProductsQuery } from "../redux/features/productApiSlice";
import CartImg from "../assets/Carts.png"

import LeatestBlog from "../components/Home/LeatestBlog";
import { useEffect, useState } from "react";
import { filterArray } from "../utils/helper";
import LoadingPage from "../components/loading/LoadingPage";
import ErrorPage from "../components/error/ErrorPage";
import { useSettingsQuery } from "../redux/features/settingsApiSlice";

const Home = () => {
    const { data, isLoading, error, isError } = useProductsQuery();
    const [products, setProducts] = useState(data || []);

    const { data: settings } = useSettingsQuery();
    const [shuffle, setShuffle] = useState((settings ?? {})[0]?.shuffle || false)

    useEffect(() => {
        setShuffle((settings ?? {})[0]?.shuffle || false)
    }, [settings])

    useEffect(() => {
        setProducts(data || []);
    }, [data])

    if (isLoading) {
        return (
            <LoadingPage />
        )
    }

    if (isError) {
        return (
            <ErrorPage error={error} />
        )
    }

    if (!isLoading && !isError && products) {
        return (
            <div className="bg-white">
                <Hero products={filterArray(products, 3, shuffle, "featured")} />
                <ProductsSlide title="Featured Products" nameCard={"ProductCard"} products={filterArray(products, 15, shuffle, "featured")} />
                <ProductsGroup products={filterArray(products, 6, shuffle)} />
                <WhatOffer />
                <BigProduct product={filterArray(products, 1, shuffle)[0]} />
                <TrandingProducts products={filterArray(products, 4, shuffle)} leftProducts={filterArray(products, 2, shuffle)} rightProducts={filterArray(products, 3, shuffle)} />
                <DiscountItem products={filterArray(products, 3, shuffle)} />
                <ProductsSlide title="Top Products" nameCard={"CircleCard"} products={filterArray(products, 15, shuffle)} />
                <RectangleContainer />
                <div className="flex justify-center py-10">
                    <img src={CartImg} alt="" />
                </div>
                <LeatestBlog products={filterArray(products, 3, shuffle)} />
            </div>
        )
    }
}

export default Home