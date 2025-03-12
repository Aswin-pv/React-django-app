import React, { useState, useEffect } from 'react';
import Layout from '../../../layouts/Layout';
import SellerSidebar from '../../../components/SellerSideBar/SellerSidebar';
import axios from 'axios';
import { VENDORS_URL } from '../../../utils/apiURL';



const SellerDashboard = () => {
   
    
    const [vendorData, setVendorData] = useState({
        'total_products': 0,
        'total_orders': 0,
        'total_customers': 0,
    });

    useEffect(() => {
            fetchData(VENDORS_URL + '/vendor/' + 'dashboard/');
    }, []);


    const fetchData = async (url) => {
        
        try{
            const response = await axios.get(url,{withCredentials:true});

            if (response && response.status === 200){

                setVendorData(response.data)
            }
        } catch(error){
            console.log("from seller dashboard",error)
        }
    }
    

    return (
        <Layout>
            <section className="container mt-5">
                <div className="row">
                    <div className="col-md-3 col-12 mb-2">
                        <SellerSidebar />
                    </div>
                    <div className="col-md-9 col-12 mb-2">
                        <div className="row">
                            <div className="col-md-4 mb-2">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <h4>Total Orders</h4>
                                        <h4><a href="">{vendorData.total_orders}</a></h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <h4>Total Customers</h4>
                                        <h4><a href="">{vendorData.total_customers}</a></h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <h4>Total Products</h4>
                                        <h4><a href="">{vendorData.total_products}</a></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default SellerDashboard;