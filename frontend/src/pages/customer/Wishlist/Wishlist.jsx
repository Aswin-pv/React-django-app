import React,{useState,useEffect,useContext} from 'react';
import logo from '../../../logo.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from '../../../layouts/Layout'
import Sidebar from '../../../components/CustomerSidebar/Sidebar'
import { CurrencyContext } from '../../../setup/app-context-manager/Context';

const Wishlist = () => {

    // Baseurl
    const baseApiUrl = 'http://127.0.0.1:8000/api';
    const baseUrl = 'http://127.0.0.1:8000';
    const customerId = localStorage.getItem('customer_id')
    const [wishListItem, setWishListItems] = useState([]);
    const {currency} = useContext(CurrencyContext)
    
    console.log("wishlist")
    //Runs only on the first render
    useEffect(() => {
        //passing baseurl with products
        fetchData(baseApiUrl + '/customer/' + customerId + '/wish-list-items')
    },[])

    //Fetching data from Api
    function fetchData(baseUrl){
        fetch(baseUrl)
        .then((response)=> response.json())
        .then((data)=> {
            console.log(data)
            setWishListItems(data.results)
        });
    }



    //remove items from wishlist
    const removeFromWishlist = (wishlist_id) => {

        const formData = {
          "wishlist_id": wishlist_id,
        };
        console.log(formData)
        // submit the data
        axios.post(baseApiUrl + '/remove-wishlist-item/', formData)
        .then(function (response) {
            if (response.data.bool == true){
              document.getElementById('row'+wishlist_id).remove();
            }
      
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          
          });
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
           
           <div className="table-responsive">
                <table className='table table-border'>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Status</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                        {
                            wishListItem.map((item,index) => {
                                return <tr key={index} id={`row${item.id}`}>
                                <td>{index + 1}</td>
                                <td><Link><img src={logo} className="img-thumbnail" width="80" alt="..."></img>{item.product.title}</Link></td>
                                {
                                currency != 'usd' && <td className='card-title'>Price: ₹ {item.product.price}</td>
                                }
                                {
                                currency == 'usd' && <td className='card-title'>Price: $ {item.product.usd_price}</td>
                                }
                                <td><button className='btn btn-danger' onClick={()=>removeFromWishlist(item.id)}>Remove</button></td>
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

export default Wishlist
