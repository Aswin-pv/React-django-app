import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "../../../layouts/Layout";
import SingleProduct from "../../../components/SingleProduct/SingleProduct";
import MainBanner from "../../../components/MainBanner/MainBanner";
import Marquee from "../../../components/Marquee/Marquee";
import SingleCategory from "../../../components/SingleCategory/SingleCategory";
import SingleVendor from "../../../components/SingleVendor/SingleVendor";
import DiscountBanner from "../../../components/DiscountBanner/DiscountBanner";
import Features from "../../../components/Features/Features";
import { BASE_URL } from "../../../utils/apiURL";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendors } from "../../../redux/actions/vendorAction";
import { fetchProducts } from "../../../redux/actions/productActions";
import { fetchCategories } from "../../../redux/actions/categoryActions";
import { motion } from "framer-motion";
import { ViewAllVariant } from "../../../motion/home";

//Swiper react component import
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import About from "../../../components/About/About";

//import usewindowSize custom hook

const Home = () => {
    const dispatch = useDispatch();

    const categories = useSelector((state) => state.categoryData.categories);
    const vendors = useSelector((state) => state.vendorData.vendors);
    const products = useSelector((state) => state.productsData.products);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchCategories(BASE_URL + "/categories"));
        dispatch(fetchProducts(BASE_URL + `/products/`));
        dispatch(fetchVendors(BASE_URL + "/vendors"));
    }, [dispatch]);

    const renderCount = useRef(0);
    renderCount.current += 1;
    console.log(renderCount);
    return (
        <Layout>
            <MainBanner />
            <main className="mt-0 mt-sm-5 py-5 bg-black">
                <div className="container p-5">
                    {/* Latest products */}
                    <h2 className="imp-headers mb-3 pt-5">LATEST PRODUCTS</h2>

                    <div className="d-flex justify-content-end">
                        <span className="swipe-hint">swipe to see more &gt;&gt;&gt;</span>
                    </div>

                    <div className="row">
                        <Swiper
                            modules={[Navigation, Pagination, A11y]}
                            breakpoints={{
                                // when window width is >= 768px
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 10,
                                },
                                // when window width is >= 992px
                                992: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                },
                                // when window width is >= 1400px
                                1400: {
                                    slidesPerView: 4,
                                    spaceBetween: 10,
                                },
                            }}
                        >
                            {products.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <SingleProduct product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* End latest product */}
                        <div className="d-flex justify-content-center my-4">
                            <Link to="/products" className="text-decoration-none text-white">
                                <motion.h6 variants={ViewAllVariant} whileHover="hover">
                                    see all products
                                </motion.h6>
                            </Link>
                        </div>
                    </div>

                    <Marquee />

                    {/* Popular Categories */}
                    <h3 className="imp-headers mb-3 pt-5">Popular Categories</h3>
                    <div className="row p-4">
                        {categories.map((category) => (
                            <SingleCategory key={category.id} category={category} />
                        ))}
                        <div className="d-flex justify-content-center my-4">
                            <Link to="/categories" className="text-decoration-none text-white">
                                <motion.h6 variants={ViewAllVariant} whileHover="hover">
                                    see all categories
                                </motion.h6>
                            </Link>
                        </div>
                    </div>
                    {/* End Popular Categories */}

                    {/* Popular Products */}
                    <h3 className="imp-headers mb-3 pt-5">Popular Products</h3>
                    <div className="d-flex justify-content-end">
                        <span className="swipe-hint">swipe to see more &gt;&gt;&gt;</span>
                    </div>
                    <div className="row">
                        <Swiper
                            modules={[Navigation, Pagination, A11y]}
                            breakpoints={{
                                // when window width is >= 768px
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 10,
                                },
                                // when window width is >= 992px
                                992: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                },
                                // when window width is >= 1400px
                                1400: {
                                    slidesPerView: 4,
                                    spaceBetween: 10,
                                },
                            }}
                        >
                            {products.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <SingleProduct product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        {/* End Popular Products */}
                    </div>

                    {/* Discount banner1 */}
                    <section className="banner-section my-5">
                        <div className="container">
                            <div className="row">
                                <DiscountBanner />
                            </div>
                        </div>
                    </section>
                    {/* end discount banner */}

                    {/* Popular Seller */}
                    <h3 className="imp-headers mb-3 pt-5">Popular Seller</h3>
                    <div className="row p-4">
                        {vendors.map((vendor) => (
                            <SingleVendor key={vendor.id} vendor={vendor} />
                        ))}
                        <div className="d-flex justify-content-center my-4">
                            <Link to="/sellers" className="text-decoration-none text-white">
                                <motion.h6 variants={ViewAllVariant} whileHover="hover">
                                    see all products
                                </motion.h6>
                            </Link>
                        </div>
                    </div>
                    {/* End Popular Seller */}

                    {/* About section */}
                    <section className="row mb-5 p-4 py-5 d-flex align-items-center about-section">
                        <About />
                    </section>

                    {/* End about section */}
                    <Features />
                    {/* feature banner */}
                </div>
            </main>
        </Layout>
    );
};

export default React.memo(Home);
