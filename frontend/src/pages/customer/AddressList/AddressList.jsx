import React,{useState,useEffect} from 'react'
import Layout from '../../../layouts/Layout'
import Sidebar from '../../../components/CustomerSidebar/Sidebar'
import { Link } from 'react-router-dom'
import axios from 'axios'


const AddressList = () => {
    const baseUrl = 'http://127.0.0.1:8000/api';
    let customer_id = localStorage.getItem('customer_id')

    const [addressList, setaddressList] = useState([])
    

    useEffect(() => {
        fetchData(baseUrl + '/customer/' + customer_id + '/address-list/')
    }, [])
    
    //Fetching data from Api
    function fetchData(baseurl){
        fetch(baseurl)
        .then((response)=> response.json())
        .then((data)=> {
            setaddressList(data.results)
        });
    }

    const defaultAddressHandler = (address_id) => {
        
        const formData = {
            'address_id':address_id
        }
      
    
        axios.post(baseUrl + '/mark-default-address/' + address_id +'/', formData)
        .then(function (response) {
            console.log(response.data.address)
            setaddressList(response.data.address)
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
                <Sidebar/>
            </div>
            <div className="col-md-9 col-12 mb-2">
                <div className="row">
                    <div className="col-12">
                    <Link to="/customer/add-address" className='btn btn-outline-success mb-4 float-end'><i className="fa fa-plus-circle"></i> Add Address</Link>
                    </div>
                </div>
                
                <div className="row">
                    {
                        addressList.map((address, index) => {
                            return <div className="col-4 mb-2" key={index}>
                            <div className="card bg-warning">
                                <div className="card-body text-muted mb-2">
                                <h6>
                                    {
                                        !address.default_address && <span role='button' onClick={()=>defaultAddressHandler(address.id)}><i className="far fa-circle-check text-success"></i><br/></span>
                                    }
                                    {
                                        address.default_address && <span role='button'><i className="fa fa-circle-check text-success"></i><br/></span>
                                    }
                                    <Link to={`/customer/update-address/${address.id}`}>{address.address}</Link>
                            
                    
                                </h6>
                                </div>
                            </div>
                        </div>
                        })
                    }
                    

                    {/* <div className="col-4 mb-2">
                        <div className="card">
                            <div className="card-body text-muted mb-2">
                                <span className='badge bg-dark'>Make Default</span>
                                <h6>St.new Kerala</h6>
                            </div>
                        </div>
                    </div> */}
                    
                </div>
            </div>
        </div>
    </section>
    </Layout>
  )
}

export default AddressList
