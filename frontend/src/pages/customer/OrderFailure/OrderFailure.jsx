import React from 'react';
import Layout from '../../../layouts/Layout';
import { Link } from 'react-router-dom';

const OrderFailure = () => {
  return (
    <Layout>
        <section className="container mt-4">
          <div className="row">
            <div className="col-md-8 offset-2">
            <div className="card">
              <div className="card-body text-center">
                <p><i className="fa-solid fa-circle-xmark fa-shake fa-3x text-danger"></i></p>
                <h3 className='text-danger'>Order Failed</h3>
                <h5 className='text-warning'>OOps, Try again</h5>
                <p>
                  <Link to="/" className='btn btn-primary me-2'><i className="fa-solid fa-arrow-right"></i> Go back to home</Link>
                  <Link to="/customer/dashboard" className='btn btn-primary'><i className="fa-solid fa-arrow-right"></i>Dashboard</Link>
                  </p>
              </div>
            </div>
            </div>
          </div>
            
           
        </section>
    </Layout>
  )
}

export default OrderFailure
