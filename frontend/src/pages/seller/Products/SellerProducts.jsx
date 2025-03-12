import {useEffect,useState} from 'react'
import Layout from '../../../layouts/Layout'
import SellerSidebar from '../../../components/SellerSideBar/SellerSidebar'
import { Link } from 'react-router-dom';
import { VENDORS_URL } from '../../../utils/apiURL';
import axios from 'axios';
import { fetchProducts } from '../../../redux/actions/productActions';
import { useSelector,useDispatch } from 'react-redux';

const SellerProducts = () => {


    const [productData, setproductData] = useState([])



    const currency = useSelector((state) => state.currency);
    

    useEffect(() => {
        fetchProducts(VENDORS_URL + '/vendor-products/')
    }, [])

    const fetchProducts = async (url) =>{

        try{
            const response = await axios.get(url);

            if (response){
                console.log(response)
                
            }

        }catch(error){
            console.log(error)
        }
    }
    

    const showConfirm = (product_id) => {
        let isConfirmed = window.confirm("Are you sure to delete this product");
        if (isConfirmed){
            fetch(VENDORS_URL + '/product/' + product_id,{
                method:'DELETE',
            })
        .then((response)=>{
            if (response.status == 204){
                fetchProducts(VENDORS_URL + '/products/')
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
                    <div className="col-12">
                    <Link to="/seller/add-products" className='btn btn-outline-success mb-4 float-end'><i className="fa fa-plus-circle"></i> Add Product</Link>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-border">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            
                            {
                                productData.map((product,index)=>{
                                    return <tr key={index}>
                                    <td>{index+1}</td>
                                    <td><Link to={`/seller/update-products/${product.id}`}>{product.title}</Link></td>
                                    {
                                    currency != 'usd' && <td>Price: ₹ {product.price}</td>
                                    }
                                    {
                                    currency == 'usd' && <td>Price: $ {product.usd_price}</td>
                                    }
                                    {
                                        product.published_status && <td><i className="fa-solid fa-circle-check fa-shake text-success"></i></td>
                                    }
                                    {
                                        !product.published_status && <td><i className="fa-solid fa-circle-xmark text-danger"></i></td>
                                    }
                                    
                                    <td>
                        
                                        <Link className='btn btn-warning btn-sm me-2' to={`/seller/update-products/${product.id}`}>Edit</Link>
                                        <Link className='btn btn-danger btn-sm me-2' onClick={()=>showConfirm(product.id)}>Delete</Link>
                                        
                                    </td>
                                </tr>
                                })
                            }
                        </tbody>
                        
                    </table>
                </div>
            </div>
        </div>
    </section>
    </Layout>
  )
}

export default SellerProducts
