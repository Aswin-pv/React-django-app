import React,{useState,useEffect} from 'react'
import { Form, useParams } from 'react-router-dom'
import Layout from '../../../layouts/Layout'
import SellerSidebar from '../../../components/SellerSideBar/SellerSidebar'
import axios from 'axios'

const UpdateProduct = () => {

    const baseUrl = 'http://127.0.0.1:8000/api';
    const {product_id} = useParams();
    const [isFeaturedImageSelected, setIsFeaturedImageSelected] = useState(false)
    const [isMultipleImageSelected, setisMultipleImageSelected] = useState(false)
    const vendor_id = localStorage.getItem("vendor_id")
    const [categoryData, setcategoryData] = useState([])
    const [productData, setproductData] = useState({
        "category":"",
        "vendor":vendor_id,
        "title":"",
        "slug":"",
        "price":"",
        "usd_price":"",
        "detail":"",
        "tags":"",
        "image":"",
        "product_images":"",
    })

    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const [productImages, setproductImages] = useState([])
 

    //Runs only on the first render
    useEffect(() => {
        //passing baseurl with products
        fetchData(baseUrl + '/categories/')
        fetchProductData(baseUrl + '/product/' + product_id)
        
    },[])

    //Fetching data from Api
    function fetchData(baseUrl){
        fetch(baseUrl)
        .then((response)=> response.json())
        .then((data)=> {  
            setcategoryData(data.results)
        });
  }


    //Fetching productdata from Api
    function fetchProductData(baseUrl){
        fetch(baseUrl)
        .then((response)=> response.json())
        .then((data)=> {  
            console.log("data",data)
            setproductData({
                "category":data.category,
                "vendor":vendor_id,
                "title":data.title,
                "slug":data.slug,
                "price":data.price,
                "usd_price":data.usd_price,
                "detail":data.detail,
                "tags":data.tags,
                "image":data.image,
                "product_images":data.product_images,
            })
        });
  }

    const inputHandler = (event) => {
        setproductData({
            ...productData,
            [event.target.name]:event.target.value
        })
    }
    const fileHandler = (event) => {
        setproductData({
            ...productData,
            [event.target.name]:event.target.files[0]
        })

        if (event.target.name == 'image'){
            setIsFeaturedImageSelected(true)
        }
    }
    const multipleFileHandler = (event) => {
        let files = event.target.files;
        if (files.length>0){
            setisMultipleImageSelected(true)
            setproductImages(files)
        }
    }
    console.log(productData)

    const submitHandler = () => {
        const formData = new FormData();
        formData.append('category',productData.category)
        formData.append('vendor',productData.vendor)
        formData.append('title',productData.title)
        formData.append('slug',productData.slug)
        formData.append('price',productData.price)
        formData.append('detail',productData.detail)
        formData.append('usd_price',productData.usd_price)
        formData.append('tags',productData.tags)
        if (isFeaturedImageSelected){
            formData.append('image',productData.image)
        }
       
      
        axios.patch(baseUrl + '/product/' + product_id + '/', formData,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(function (response) {
            if (response.status == 200){
            
                setErrorMsg('');
                setSuccessMsg("Product Added successfully!!");
                
                if (isMultipleImageSelected){

                    for(let i=0;i<productImages.length;i++){

                    const ImageFormData = new FormData();
                    ImageFormData.append('product', response.data.id)
                    ImageFormData.append('image', productImages[i])

                   
                    //Upload images
                    axios.post(baseUrl + '/product-images/?from_update=1', ImageFormData)
                        .then(function (response) {
                            console.log("asdf",response.data)
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        })
                        //End upload images
                }
                }
                
                
            }else{
                setErrorMsg('');
                setSuccessMsg(response.statusText);
            }
            // handle success
            console.log("Response data:", response.data);
            console.log(successMsg)
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
    }


    const deleteImage = (image_id) => {
        console.log(image_id)
        axios.delete(baseUrl + '/product-images/'+ image_id)
                        .then(function (response) {
                            window.location.reload();
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        })
    }

    console.log(productData)
    console.log("end",productData.product_images)
  return (
    <Layout>
            <section className="container mt-5">
        <div className="row">
            <div className="col-md-3 col-12 mb-2">
                <SellerSidebar/>
            </div>
            <div className="col-md-9 col-12 mb-2">
            <div className='card'>
                    <h4 className='card-header'>Update Product</h4>
                    <div className="card-body">
                    {successMsg && <p className='text-success'>{successMsg}</p>}
                    {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                    <form>
                            <div className="mb-3">
                                
                                <label htmlFor="category" className="form-label">Category</label>
                                <select name="category" onChange={inputHandler} id="category" className="form-control">
                                    <option value="0">Select category</option>)
                                    {
                                        categoryData.map((category,index)=>
                                        <option selected={category.id==productData.category} key={index} value={category.id}>{category.title}</option>)
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
                                <label htmlFor="image" className="form-label">Featured Image</label><br></br>
                                <img src={productData.image} width="100" className='img rounded border my-2' alt="" />
                                <input type="file" name='image' onChange={fileHandler} className="form-control" id="ProductImg" accept="image/*" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="product_images" className="form-label">Product Images</label><br></br>
                                {
                                  productData.product_images && productData.product_images.map((img,index)=>{

                                    return <span key={index} onClick={()=>deleteImage(img.id)} className='image-box d-inline me-3'>
                                        <i className="fa-solid fa-trash text-danger" role='button'></i>
                                         <img src={img.image} width="100" className='img rounded border my-2 me-2' alt="" ></img>
                                    </span>
                                   
                                   })
                                }
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

export default UpdateProduct