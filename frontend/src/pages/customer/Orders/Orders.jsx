import React ,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import Layout from '../../../layouts/Layout'
import Sidebar from '../../../components/CustomerSidebar/Sidebar'

const Orders = () => {

    // Baseurl
    const baseApiUrl = 'http://127.0.0.1:8000/api';
    const baseUrl = 'http://127.0.0.1:8000';
    const customerId = localStorage.getItem('customer_id')
    const [orderItem, setOrderItems] = useState([]);

    //Runs only on the first render
    useEffect(() => {
        //passing baseurl with products
        fetchData(baseApiUrl + '/customer/' + customerId + '/orderitems')
    },[])

    //Fetching data from Api
    function fetchData(baseUrl){
        fetch(baseUrl)
        .then((response)=> response.json())
        .then((data)=> {
            setOrderItems(data.results)
        });
  }

  console.log(orderItem)

  return (
    <Layout>
            <section className="container mt-5">
        <div className="row">
            <div className="col-md-3 col-12 mb-2">
                <Sidebar/>
            </div>
            <div className="col-md-9 col-12 mb-2">
                <div className="row">
                   
                   <div className="table-responsive">
                        <table className='table table-border'>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                                
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    orderItem.map((item, index)=>{
                                        return <tr key={index}>
                                            <td>{index}</td>
                                            <td><Link to={`/product/${item.product.slug}/${item.product.id}`}>
                                                <img src={`${baseUrl}/${item.product.image}`} className="img-thumbnail" width="80" alt="..."></img>{item.product.title}</Link></td>
                                            <td>Rs.{item.product.price}</td>
                                            <td><span className='text-success'>
                                            {
                                                item.order.order_status == 'C' &&  <td><span className='text-success'><i className="fa-solid fa-circle-check fa-flip"></i>Completed</span></td>
                                            }
                                            {
                                                item.order.order_status == 'P' && <td><span className='text-warning'><i className="fa-solid fa-spinner fa-spin-pulse"></i> Pending</span></td>
                                            }
                                            {
                                                item.order.order_status == 'F' && <td><span className='text-danger'><i className="fa-solid fa-circle-exclamation fa-shake"></i> Failed</span></td>
                                            }
                                            {
                                                item.order.order_status == 'CA' && <td><span className='text-danger'><i className="fa-solid fa-circle-xmark fa-shake"></i> Cancelled</span></td>
                                            }
                                            </span></td>
                                            <td>
                                                
                                                <a href='' className='btn btn-primary'>Add Review</a>  
                                                
                                                
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

export default Orders
