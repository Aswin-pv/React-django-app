import React from 'react';
import Layout from '../../../layouts/Layout';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SingleProduct from '../../../components/SingleProduct/SingleProduct';



const SellerProductList = () => {

    // Baseurl
    const baseUrl = 'http://127.0.0.1:8000/api';

    const [products, setProducts] = useState([])

    //Inherit slug and id from parent route 

    const {seller_slug,seller_id} = useParams();

    useEffect(() => {
        fetchData(baseUrl + '/products/?vendor='+ seller_id)
    },[])
    
    function fetchData(baseUrl){
        fetch(baseUrl)
        .then((response)=> response.json())
        .then((data)=> {
          setProducts(data.results)
        });
      }
  return (
    <Layout>
      <section className='container mt-5'>
      <h3 className='mb-4 pt-5'> Products</h3>
      <div className="row mb-4 p-4">
      {
       products.map((product,key)=>(
          <SingleProduct product={product} key={key}/>
        ))
        } 
        </div>
      {/* pagination */}

      <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>

    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>

      </section>
       
    </Layout>
  )
}

export default SellerProductList
