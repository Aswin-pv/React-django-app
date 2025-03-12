import React,{useState} from 'react';
import Layout from '../../../layouts/Layout';
import axios from 'axios';
import SellerSidebar from '../../../components/SellerSideBar/SellerSidebar';


const SellerChangePassword = () => {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const vendor_id = localStorage.getItem('vendor_id')
    const [passwordData, setpasswordData] = useState({
        'password':'',
        'c_password':'',
    })

    const [conformError, setconformError] = useState(false)

    const inputHandler = (event) => {
        setpasswordData({
            ...passwordData,
            [event.target.name]:event.target.value
        })
    }

    const submitHandler = () => {
        if (passwordData.password == passwordData.c_password){
            alert('match done')
        }else{
            setconformError(true)
        }
        const formData = new FormData();
        formData.append('password', passwordData.password);
    
        axios.post(baseUrl + '/vendor-change-password/' + vendor_id, formData)
        .then(function (response) {
            
            // handle success
            console.log("Response data:", response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
        }

  return (
    <Layout>
            <section className="container mt-5">
        <div className="row">
            <div className="col-md-3 col-12 mb-2">
                <SellerSidebar/>
            </div>
            <div className="col-md-9 col-12 mb-2">
            <div className='card'>
                    <h4 className='card-header'>Change Password</h4>
                    <div className="card-body">
                        {
                            conformError && <p className='text-danger'>Password does not match</p>
                        }
                    <form>
                           
                            <div className="mb-3">
                                <label htmlFor="pwd1" className="form-label">New Password</label>
                                <input type="password" name='password' onChange={inputHandler} value={passwordData.password} className="form-control" id="pwd1" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pwd2" className="form-label">Confirm Password</label>
                                <input type="password" name='c_password' onChange={inputHandler} value={passwordData.c_password} className="form-control" id="pwd2" />
                            </div>
                            
                            <button type="button" onClick={submitHandler} className="btn btn-primary">Submit</button>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </Layout>
  )
}

export default SellerChangePassword
