import React from "react";
import HeroBanner from "../components/HeroBanner";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "./Footer";

const Home = ({allProducts}) => {
    console.log("HOME", allProducts)
    return (
        <>
            
            <HeroBanner />
            <FeaturedProducts allProducts = {allProducts}/>
            <Footer/>
        </>


    )
}
export default Home;