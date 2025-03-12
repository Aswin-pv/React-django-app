import React,{useState} from 'react'
import Layout from '../../../layouts/Layout';
import axios from 'axios';
import Sidebar from '../../../components/CustomerSidebar/Sidebar';

const AddAddress = () => {
    
    let customer_id = localStorage.getItem('customer_id')
    const baseUrl = 'http://127.0.0.1:8000/api';

    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [addressFormData, setadressFormData] = useState({
        'address':'',
        'customer':customer_id,
      
    })

    const inputHandler = (e) => {
        setadressFormData({
            ...addressFormData,
            [e.target.name]:e.target.value
        })
    }
    console.log(addressFormData)

    const submitHandler = () => {

        const formData = new FormData();
        formData.append('address', addressFormData.address);
        formData.append('customer', addressFormData.customer);
       
        // Logging FormData contents
        formData.forEach((value, key) => {
            console.log(key, value);
        });
    
        axios.post(baseUrl + '/address/', formData)
        .then(function (response) {
            if (response.status != 201){
                setErrorMsg("Data not saved")
                setSuccessMsg('')
            }else{
                setSuccessMsg("Data saved")
                setErrorMsg('')
                setadressFormData({
                    'address':'',
                    'customer':'',
                })
            }
            // handle success
            console.log("Response data:", response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })


    }

    const disableBtn = (addressFormData.address == '')
  return (
    <Layout>
            <section className="container mt-5">
        <div className="row">
            <div className="col-md-3 col-12 mb-2">
                <Sidebar/>
            </div>
            <div className="col-md-9 col-12 mb-2">
            <div className='card'>
                    <h4 className='card-header'>Add Address</h4>
                    <div className="card-body">
                    <form>
                        {
                            errorMsg && <p className='alert alert-danger'>{errorMsg}</p>
                        }
                        {
                            successMsg && <p className='alert alert-success'>{successMsg}</p>
                        }
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <textarea className='form-control' name="address" onChange={inputHandler} value={addressFormData.address} cols="30" rows="10" id="address"></textarea>

                            </div>
                            
                            <button type="button" disabled={disableBtn} onClick={submitHandler} className="btn btn-primary">Submit</button>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </Layout>
  )
}

export default AddAddress
