import React from "react";
import { BASE_URL } from "../../../utils/apiURL";
import { useEffect } from "react";
import Layout from "../../../layouts/Layout";
import SingleCategory from "../../../components/SingleCategory/SingleCategory";
import SearchBar from "../../../components/SearchBar/SearchBar";
import useDebounce from "../../../hooks/use-debounce";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux/actions/categoryActions";
import Pagination from "../../../components/Pagination/Pagination";
import { Link } from "react-router-dom";
import { useState } from "react";

const CategoryPage = () => {
    const dispatch = useDispatch();

    //fetch all categories
    const { categories, totalResults, isLoading, error } = useSelector((state) => state.categoryData);
    const searchText = useSelector((state) => state.search.searchText);

    let limit = 6;
    let totalLinks = Math.ceil(totalResults / limit);

    //for creating half seconds delay, so it did'nt send request for each key press
    const debounce = useDebounce(searchText, 1000);

    const [currentPage, setCurrentPage] = useState(0);

    //Runs only on the first render
    useEffect(() => {
        window.scrollTo(0, 0);
        //fetch categories filtered using search-input
        dispatch(fetchCategories(`${BASE_URL}/categories/?search=${searchText}`));
        setCurrentPage(0);
    }, [debounce]);

    // call the dispatch to fetch categories
    function handlePageChange(data) {
        window.scrollTo(0, 0);
        const selectedPage = data.selected;
        setCurrentPage(selectedPage); // Update the active page
        const currentPageNumber = selectedPage + 1; // Convert 0-indexed to 1-indexed
        dispatch(fetchCategories(BASE_URL + `/categories/?page=${currentPageNumber}`));
    }

    return (
        <Layout>
            <section className="container">
            {isLoading && (
                <div className="loading-spinner">
                    <div className="spinner-grow text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                    
                )}
                
                {/* if there is category exists */}
                {!isLoading && totalResults > 0 && (
                    <>
                        <div className="row mt-3 pt-5">
                          
                            {/* category heading */}
                            <div className="col-12 mt-2 mb-3 d-flex justify-content-between">
                                <h1 className="fw-bolder">All Categories</h1>
                            </div>
                            {/* breadcrumb */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Category
                                    </li>
                                </ol>
                            </nav>
                            {/* end of breadcrumb */}

                        </div>
                        
                       

                        <div className="row mb-4 p-4">
                            {categories.map((category, key) => (
                                <SingleCategory key={key} category={category} />
                            ))}
                        </div>

                        {/* pagination */}
                        <Pagination totalLinks={totalLinks} handlePageChange={handlePageChange} currentPage={currentPage} />
                        {/* pagination end */}
                    </>
                )}

                {/* if the categories are empty */}
                {!isLoading && totalResults === 0 && (
                    <>
                        <div className="row mt-3 pt-5">
                            {/* searchbar */}
                            <div className="d-flex justify-content-end align-items-center">
                                <SearchBar />
                            </div>
                            {/* category heading */}
                            <div className="col-12 mt-2 mb-3 d-flex justify-content-between">
                                <h1 className="fw-bolder">All Categories</h1>
                            </div>
                            {/* breadcrumb */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Category
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

export default React.memo(CategoryPage);
