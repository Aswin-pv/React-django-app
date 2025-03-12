import React from 'react';
import Layout from '../../../layouts/Layout'
import Sidebar from '../../../components/CustomerSidebar/Sidebar'

const ChangePassword = () => {
  return (
    <Layout>
            <section className="container mt-5">
        <div className="row">
            <div className="col-md-3 col-12 mb-2">
                <Sidebar/>
            </div>
            <div className="col-md-9 col-12 mb-2">
            <div className='card'>
                    <h4 className='card-header'>Change Password</h4>
                    <div className="card-body">
                    <form>
                           
                            <div className="mb-3">
                                <label for="pwd1" className="form-label">New Password</label>
                                <input type="password" className="form-control" id="pwd1" />
                            </div>
                            <div className="mb-3">
                                <label for="pwd2" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="pwd2" />
                            </div>
                            
                            <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </Layout>
  )
}

export default ChangePassword
