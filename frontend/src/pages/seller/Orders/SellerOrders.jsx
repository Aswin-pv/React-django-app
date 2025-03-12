import React,{useState,useEffect} from 'react';
import logo from '../../../logo.svg'
import { Link } from 'react-router-dom';
import Layout from '../../../layouts/Layout'
import SellerSidebar from '../../../components/SellerSideBar/SellerSidebar'

const SellerOrders = () => {

    const baseUrl = 'http://127.0.0.1:8000/api';
    const vendor_id = localStorage.getItem('vendor_id')
    const [orderItems, setorderItems] = useState([])

    useEffect(() => {
        fetchData(baseUrl + '/vendor/' + vendor_id + '/orderitems/')
    }, [])

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response)=> response.json())
        .then((data)=> {
            setorderItems(data.results)
        });
    }
    console.log(orderItems)

    const changeOrderstatus = (order_id,status) => {
        fetch(baseUrl + '/order-modify/' + order_id + '/',{
            method: 'PATCH',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({'order_status':status})
        })
        .then((response)=> response.json())
        .then((data)=> {
            fetchData(baseUrl + '/vendor/' + vendor_id + '/orderitems/')

        });
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
                                <th>Item</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                                
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    orderItems.map((item,index)=>{
                                        return <tr key={index}>
                                        <td>{index+1}</td>
                                        <td><Link><img src={item.product.image} className="img-thumbnail" width="80" alt="..."></img>{item.product.title}</Link></td>
                                        <td>Rs. {item.product.price}</td>
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
                                        
                                        <td>
                                        <div className="dropdown">
                                            <button className="btn btn-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Change Status
                                            </button>
                                            <ul className="dropdown-menu">
                                               
                                                    <li><a className="dropdown-item" onClick={()=>changeOrderstatus(item.order.id,'C')} href="#">Completed</a></li>
                                                    <li><a className="dropdown-item" onClick={()=>changeOrderstatus(item.order.id,'P')} href="#">Pending</a></li>
                                                    <li><a className="dropdown-item" onClick={()=>changeOrderstatus(item.order.id,'F')} href="#">Failed</a></li>
                                                    <li><a className="dropdown-item" onClick={()=>changeOrderstatus(item.order.id,'CA')} href="#">Cancelled</a></li>
                                              
                                            
                                            </ul>
                                        </div>
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

export default SellerOrders
