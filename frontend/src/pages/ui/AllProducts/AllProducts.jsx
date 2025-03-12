import React from "react";
import Layout from "../../../layouts/Layout";
import { BASE_URL } from "../../../utils/apiURL";
import SingleProduct from "../../../components/SingleProduct/SingleProduct";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../../redux/actions/productActions";
import Pagination from "../../../components/Pagination/Pagination";
import { Link } from "react-router-dom";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Filter from "../../../components/Filter/Filter";
import { useState } from "react";

const AllProducts = () => {
    const dispatch = useDispatch();
    const { products, totalResults, isLoading, error } = useSelector((state) => state.productsData);
    const {category,price,sort} = useSelector((state)=> state.filter)

    let limit = 6;
    let totalLinks = Math.ceil(totalResults / limit);

    const [currentPage, setCurrentPage] = useState(0);
    
    useEffect(() => {
       
        //passing baseurl with products
        let query = `?page=${currentPage + 1}`;
        if (category) query += `&search=${category}`;
        if (price) query += `&price__lte=${price}`;
        if (sort) query += `&ordering=${sort}`;
        dispatch(fetchProducts(BASE_URL + `/products/`+ query));
    }, [dispatch,category,price,sort,currentPage]);

    const handlePageChange = (data) => {

        setCurrentPage(data.selected);
    };

    console.log(products);
    return (
        <Layout>
            <section className="container px-4">
                <div className="row mt-5 pt-5">
                    <div className="col-12 ps-4">
                        {totalResults > 0 && (
                            <>
                                <div className="col-12 mt-2 mb-3 d-flex justify-content-between">
                                    <h1 className="fw-bolder">All Products</h1>
                                </div>
                                {/* breadcrumb */}
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            All products
                                        </li>
                                    </ol>
                                </nav>
                                <div className="filter">
                                    <Filter/>
                                </div>
                                {/* end of breadcrumb */}
                                <div className="row mb-4 p-4">
                                    {products.map((product, key) => (
                                        <SingleProduct product={product} key={key} />
                                    ))}
                                </div>

                                {/* pagination */}
                                <Pagination totalLinks={totalLinks} handlePageChange={handlePageChange} currentPage={currentPage}/>
                                {/* pagination end */}
                            </>
                        )}
                        {totalResults === 0 && (
                            <>
                                
                                {/* category heading */}
                                <div className="col-12 mt-2 mb-3 d-flex justify-content-between">
                                    <h1 className="fw-bolder">All Products</h1>
                                </div>
                                {/* breadcrumb */}
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            All products
                                        </li>
                                    </ol>
                                </nav>
                                {/* end of breadcrumb */}
                                <div className="filter">
                                    <Filter/>
                                </div>
                                <div className="no-result d-flex flex-column justify-content-center align-items-center mb-5">
                                    <img src={require("../../../assets/images/False.png")} alt="" height="500" />
                                    <h2 className="mb-5">
                                        <span className="text-primary">Sorry ! </span>No results found.
                                    </h2>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default React.memo(AllProducts);
