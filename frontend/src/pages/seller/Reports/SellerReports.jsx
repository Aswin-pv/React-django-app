import React from 'react'
import Layout from '../../../layouts/Layout'
import SellerSidebar from '../../../components/SellerSideBar/SellerSidebar'
import { Link } from 'react-router-dom'

const SellerReports = () => {
  return (
    <Layout>
            <section className="container mt-5">
        <div className="row">
            <div className="col-md-3 col-12 mb-2">
                <SellerSidebar/>
            </div>
            <div className="col-md-9 col-12 mb-2">
                <div className="row">
                    <div className="col-md-4 mb-2">
                        <div className="card">
                            <div className="card-body text-center">
                                <h4>Daily Reports</h4>
                                <h4><Link to='/seller/daily-reports/'>View</Link></h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <div className="card">
                            <div className="card-body text-center">
                                <h4>Monthly Reports</h4>
                                <h4><Link to='/seller/monthly-reports/'>View</Link></h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <div className="card">
                            <div className="card-body text-center">
                                <h4>Yearly Reports</h4>
                                <h4><Link to='/seller/yearly-reports/'>View</Link></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </Layout>
  )
}

export default SellerReports
