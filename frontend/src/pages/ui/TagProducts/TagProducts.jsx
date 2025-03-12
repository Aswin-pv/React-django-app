import React from 'react'
import Layout from '../../../layouts/Layout'
import SingleProduct from '../../../components/SingleProduct/SingleProduct';
import { useState,useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';

const TagProducts = () => {

   // Baseurl
   const baseUrl = 'http://127.0.0.1:8000/api';

   const [products, setProducts] = useState([])
   const [totalResults, setTotalResults] = useState(0)
 
   //Inherit tag from parent route
   const {tag} = useParams();
   
   
 
   useEffect(() => {
      //fetch the filtered tags from backend
      fetchData(baseUrl + '/products/' + tag)
   },[])
   
   
   function fetchData(baseUrl){
     fetch(baseUrl)
     .then((response)=> response.json())
     .then((data)=> {
      //set the products in state
       setProducts(data.results)
       setTotalResults(data.count)
     });
   }
 
   function changeUrl(baseUrl){
       fetchData(baseUrl);
   }
 
   let links = [];
   for (let i = 1; i <= totalResults; i++) {
       links.push(<li className="page-item" key={i}><Link onClick={()=> changeUrl(baseUrl + `/products/${tag}/?page=${i}`)} to={`/products/${tag}/?page=${i}`} className="page-link">{i}</Link></li>)
   }
    
 
   return (
     <Layout>
       <section className='container mt-4'>
       <h3 className='mb-4'>All Products</h3>
       <div className="row mb-4">
        {/* map the products */}
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
     {/* show the pagination links */}
     {links}
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


export default TagProducts
