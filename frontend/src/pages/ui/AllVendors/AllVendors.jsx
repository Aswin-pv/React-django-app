import React, { useEffect } from "react";
import useDebounce from "../../../hooks/use-debounce";
import { BASE_URL } from "../../../utils/apiURL";
import Layout from "../../../layouts/Layout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { fetchVendors } from "../../../redux/actions/vendorAction";
import { useDispatch } from "react-redux";
import Pagination from "../../../components/Pagination/Pagination";
import SingleVendor from "../../../components/SingleVendor/SingleVendor";

const AllVendors = () => {
    const dispatch = useDispatch();

    const { vendors } = useSelector((state) => state.vendorData);
    const searchText = useSelector((state) => state.search.searchText);
    const totalResults = useSelector((state) => state.vendorData.totalResults);

    let limit = 6;
    let totalLinks = Math.ceil(totalResults / limit);

    //for creating half seconds delay, so it did'nt send request for each key press
    const debounce = useDebounce(searchText, 500);

    //Runs only on the first render
    useEffect(() => {
        //fetch categories filtered using search-input
        dispatch(fetchVendors(`${BASE_URL}/vendors/?search=${searchText}`));
    }, [debounce]);

    // call the dispatch to fetch categories
    function handlePageChange(data) {
        let current_page = data.selected + 1;
        dispatch(fetchVendors(BASE_URL + `/vendors/?page=${current_page}`));
    }

    return (
        <Layout>
            <section className="container">
                {/* if there is category exists */}
                {totalResults > 0 && (
                    <>
                        <div className="row mt-3 pt-5">
                            {/* searchbar */}
                            <div className="d-flex justify-content-end align-items-center">
                                <SearchBar />
                            </div>
                            {/* category heading */}
                            <div className="col-12 mt-2 mb-3 d-flex justify-content-between">
                                <h1 className="fw-bolder">All Vendors</h1>
                            </div>
                            {/* breadcrumb */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        vendors
                                    </li>
                                </ol>
                            </nav>
                            {/* end of breadcrumb */}
                        </div>

                        <div className="row mb-4 p-4">
                            {vendors.map((vendors, key) => (
                                <SingleVendor key={key} vendor={vendors} />
                            ))}
                        </div>

                        {/* pagination */}
                        <Pagination totalLinks={totalLinks} handlePageChange={handlePageChange} />
                        {/* pagination end */}
                    </>
                )}
                {/* if the categories are empty */}
                {totalResults === 0 && (
                    <>
                        <div className="row mt-3 pt-5">
                            {/* searchbar */}
                            <div className="d-flex justify-content-end align-items-center">
                                <SearchBar />
                            </div>
                            {/* category heading */}
                            <div className="col-12 mt-2 mb-3 d-flex justify-content-between">
                                <h1 className="fw-bolder">All Vendors</h1>
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

export default AllVendors;
