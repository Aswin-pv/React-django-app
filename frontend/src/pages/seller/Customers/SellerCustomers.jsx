import React,{useState, useEffect} from 'react'
import Layout from '../../../layouts/Layout'
import SellerSidebar from '../../../components/SellerSideBar/SellerSidebar'
import { Link } from 'react-router-dom';


const SellerCustomers = () => {

    const baseUrl = 'http://127.0.0.1:8000/api';

    const vendor_id = localStorage.getItem('vendor_id');
    const [CustomerList, setCustomerList] = useState([])

    useEffect(() => {
        fetchData(baseUrl + '/vendor/' + vendor_id + '/customers/')
    }, [])

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response)=> response.json())
        .then((data)=> {
            setCustomerList(data.results)
        });
    }

    console.log(CustomerList)

    const showConfirm = (customer_id) => {
        let isConfirmed = window.confirm("Are you sure to delete this product");
        if (isConfirmed){
            fetch(baseUrl + '/delete-customer-order/' + customer_id,{
                method:'DELETE',
            })
        .then((response)=>{
            if (response.bool == true){
                fetchData(baseUrl + '/seller/customer/'+customer_id+'/orderitems/')
            }
        })
    
        }
    }

  return (
    <Layout>
            <section className="container mt-5">
        <div className="row">
            <div className="col-md-3 col-12 mb-2">
                <SellerSidebar/>
            </div>
            <div className="col-md-9 col-12 mb-2">
            <div className="row">
                   
                   <div className="table-responsive">
                        <table className='table table-border'>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Action</th>
                                
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    CustomerList.map((item,index)=>{
                                        return <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.user.username}</td>
                                        <td>{item.user.email}</td>
                                        <td>{item.customer.mobile}</td>
                                        <td>
                                        <Link to={`/seller/customer/${item.customer.id}/orderitems/`} className='btn btn-info btn-sm me-2'>Orders</Link>
                                        <button onClick={()=>showConfirm(item.customer.id)} className='btn btn-danger btn-sm'>Remove from List</button>
                                        </td>
                                    </tr>
                                    })
                                }
                        
                        
                    </tbody>
                            
                        </table>
                   </div>
                    
                </div>
            </div>
        </div>
    </section>
    </Layout>
  )
}

export default SellerCustomers
