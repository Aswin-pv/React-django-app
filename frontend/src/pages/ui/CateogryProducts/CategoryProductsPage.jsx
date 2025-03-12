import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Layout from "../../../layouts/Layout";
import SingleProduct from "../../../components/SingleProduct/SingleProduct";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../../redux/actions/productActions";
import { BASE_URL } from "../../../utils/apiURL";
import Pagination from "../../../components/Pagination/Pagination";
import SearchBar from "../../../components/SearchBar/SearchBar";
import useDebounce from "../../../hooks/use-debounce";
import { useState } from "react";

const CategoryProducts = () => {
    // Baseurl
    const dispatch = useDispatch();
    const { products, totalResults, isLoading, error } = useSelector((state) => state.productsData);
 

    let limit = 6;
    let totalLinks = Math.ceil(totalResults / limit);

    //Inherit slug and id from parent route
    const { category_slug, category_id } = useParams();

    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        dispatch(fetchProducts(BASE_URL + "/products/?category=" + category_id));
        setCurrentPage(0);
    }, [dispatch]);

    const handlePageChange = (data) => {
        window.scrollTo(0, 0);
        const selectedPage = data.selected;
        setCurrentPage(selectedPage); // Update the active page
        const currentPageNumber = selectedPage + 1; // Convert 0-indexed to 1-indexed
        dispatch(fetchProducts(BASE_URL + `/products/?category=${category_id}&page=${currentPageNumber}`));
    };

    return (
        <Layout>
            <section className="container">
                
                {/* If there is any product exists in this particular category then show it  */}
                {!isLoading && totalResults > 0 && (
                    <>
                        <div className="row mt-3 pt-5">
                            {/* Category product heading */}
                            <div className="col-12 mt-2 mb-3 d-flex justify-content-between">
                                <h1 className="fw-bolder">{category_slug}</h1>
                            </div>
                            {/* breadcrumb */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to="/">Category</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        {category_slug}
                                    </li>
                                </ol>
                            </nav>
                            {/* end of breadcrumb */}
                        </div>
                        {isLoading && (
                    <>
                        <div className="row mt-3 pt-5">
                            <div className="spinner-grow text-danger" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </>
                )}

                        <div className="row mb-4 p-4">
                            {products.map((product, key) => (
                                <SingleProduct product={product} key={key} />
                            ))}
                        </div>
                        {/* pagination */}
                        <Pagination totalLinks={totalLinks} handlePageChange={handlePageChange} currentPage={currentPage} />
                        {/* pagination end */}
                    </>
                )}
                {/* if this category products are empty */}
                {!isLoading && totalResults === 0 && (
                    <>
                        <div className="row mt-3 pt-5">
                            {/* searchbar */}
                            <div className="d-flex justify-content-end align-items-center">
                                <SearchBar />
                            </div>
                            {/* category heading */}
                            <div className="col-12 mt-2 mb-3 d-flex justify-content-between">
                                <h1 className="fw-bolder">{category_slug}</h1>
                            </div>
                            {/* breadcrumb */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to="/">Category</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        {category_slug}
                                    </li>
                                </ol>
                            </nav>
                            {/* end of breadcrumb */}
                        </div>
                        <div className="no-result d-flex flex-column justify-content-center align-items-center mb-5">
                            <img src={require("../../../assets/images/False.png")} alt="" height="500" />
                            <h2 className="mb-5">
                                <span className="text-primary">Sorry ! </span>No results found.
                            </h2>
                        </div>
                    </>
                )}
            </section>
        </Layout>
    );
};

export default CategoryProducts;
