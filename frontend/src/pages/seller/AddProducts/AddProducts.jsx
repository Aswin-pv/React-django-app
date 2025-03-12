import React,{useState,useEffect} from 'react';
import Layout from '../../../layouts/Layout';
import SellerSidebar from '../../../components/SellerSideBar/SellerSidebar';
import axiosInstance from '../../../setup/auth/AxiosInstance';
import { useDispatch,useSelector } from 'react-redux';
import { BASE_URL } from '../../../utils/apiURL';
import { fetchCategories } from '../../../redux/actions/categoryActions';

const AddProducts = () => {

    const dispatch = useDispatch();
    //Get all the categories from store
    const categories = useSelector((state) => state.categoryData.categories)

    const [productData, setproductData] = useState({
        "category":"",
        "vendor":"",
        "title":"",
        "slug":"",
        "price":"",
        "usd_price":"",
        "detail":"",
        "tags":"",
        "image":"",
    })

    const [productImages, setproductImages] = useState([])

    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [imageUploadError, setimageUploadError] = useState('')
    const [imageUploadSuccess, setimageUploadSuccess] = useState('second')

    
    useEffect(() => {
        //Fetch the categories for form selection
        dispatch(fetchCategories(BASE_URL + '/categories'))
    },[])

    

    const inputHandler = (event) => {
        setproductData({
            ...productData,
            [event.target.name]:event.target.value
        })
    }

    //Adding the featured image
    const fileHandler = (event) => {
        setproductData({
            ...productData,
            [event.target.name]:event.target.files[0]
        })
    }

    //Adding multiple product images
    const multipleFileHandler = (event) => {
        let files = event.target.files;
        if (files.length > 0){
            setproductImages(files)
        }
    }
    console.log("P image",productImages)

    const submitHandler = async (e) => {
        e.preventDefault();
        
        try{
            const productFormData = new FormData();
            productFormData.append('category', productData.category);
            productFormData.append('vendor', productData.vendor);  // assuming you want to pass vendor data
            productFormData.append('title', productData.title);
            productFormData.append('slug', productData.slug);
            productFormData.append('price', productData.price);
            productFormData.append('usd_price', productData.usd_price);
            productFormData.append('detail', productData.detail);
            productFormData.append('tags', productData.tags);
            productFormData.append('image', productData.image);


            // Append multiple product images
            for (let i = 0; i < productImages.length; i++) {
                productFormData.append('product_images', productImages[i]);
            }

            const response = await axiosInstance.post('/products/', productFormData, {
           
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
    
            console.log(response);
            if (response.status === 201) {
                setSuccessMsg("Product added successfully!");
                setproductData({
                    "category": "",
                    "vendor": "",
                    "title": "",
                    "slug": "",
                    "price": "",
                    "usd_price": "",
                    "detail": "",
                    "tags": "",
                    "image": "",
                });
                setproductImages([]);
            }
        }catch(error){
            console.log(error)
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
            <div className='form'>
                    <h4 className='card-header'>Add Products</h4>
                    <div className="card-body">
                    {successMsg && <p className='text-success'>{successMsg}</p>}
                    {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                    <form>
                            <div className="mb-3">
                                
                                <label htmlFor="category" className="form-label">Category</label>
                                <select name="category" onChange={inputHandler} id="category" className="form-control">
                                    <option value="0">Select category</option>)
                                    {
                                        categories.map((category,index)=>
                                        <option key={index} value={category.id}>{category.title}</option>)
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" name='title' value={productData.title} onChange={inputHandler} className="form-control" id="title" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Slug</label>
                                <input type="text" name='slug' value={productData.slug} onChange={inputHandler} className="form-control" id="slug" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="number" name='price' value={productData.price} onChange={inputHandler} className="form-control" id="price" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="usd_price" className="form-label">USD Price ($)</label>
                                <input type="number" name='usd_price' value={productData.usd_price} onChange={inputHandler} className="form-control" id="usd_price" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="detail" className="form-label">Description</label>
                                <textarea className='form-control' name="detail" value={productData.detail} onChange={inputHandler} id="detail" cols="30" rows="10"></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tags" className="form-label">Tags</label>
                                <textarea className='form-control' name="tags" value={productData.tags} onChange={inputHandler} id="tags" cols="30" rows="10"></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Featured Image</label>
                                <input type="file" name='image' onChange={fileHandler} className="form-control" id="ProductImg" accept="image/*" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="product_images" className="form-label">Product Images</label>
                                <input type="file" name='product_images' multiple onChange={multipleFileHandler} className="form-control" id="product_images" accept="image/*" />
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

export default AddProducts
