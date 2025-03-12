import React, { useState, useEffect } from "react";
import Layout from "../../../layouts/Layout";
import Sidebar from "../../../components/CustomerSidebar/Sidebar";
import { Link } from "react-router-dom";
import { CUSTOMER_URL } from "../../../utils/apiURL";
import axios from "axios";
import axiosInstance from "../../../setup/auth/AxiosInstance";

const Dashboard = () => {
    const [countList, setCountList] = useState({
        total_order: 0,
        total_address: 0,
        total_wishlist: 0,
    });

    

    useEffect(() => {
        fetchData(CUSTOMER_URL + "/customer/dashboard/");
    }, []);

    const fetchData = async (url) => {
        try {
            const response = await axios.get(url, { withCredentials: true });

            if (response && response.status === 200) {
                setCountList({
                    total_order: response.data.total_order,
                    total_address: response.data.total_address,
                    total_wishlist: response.data.total_wishlist,
                });
            }
        } catch (error) {
            console.log("from seller dashboard", error);
        }
    };


    return (
        <Layout>
            <section className="container mt-5">
                <div className="row">
                    <div className="col-md-3 col-12 mb-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-9 col-12 mb-2">
                        <div className="row">
                            <div className="col-md-4 mb-2">
                                <Link to="/customer/orders" className="text-decoration-none">
                                    <div className="card">
                                        <div className="card-body text-center">
                                            <h4>Total Orders</h4>
                                            <h4>{countList.total_order}</h4>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-4 mb-2">
                                <Link to="/customer/addresses" className="text-decoration-none">
                                    <div className="card">
                                        <div className="card-body text-center">
                                            <h4>My Address</h4>
                                            <h4>{countList.total_address}</h4>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-4 mb-2">
                                <Link to="/customer/wishlist" className="text-decoration-none">
                                    <div className="card">
                                        <div className="card-body text-center">
                                            <h4>My Wishlist</h4>
                                            <h4>{countList.total_wishlist}</h4>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Dashboard;
