import Layout from "../../../layouts/Layout";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL, PRODUCTS_URL } from "../../../utils/apiURL";
import { useDispatch, useSelector } from "react-redux";
import ReviewPopup from "../../../components/ReviewPopup/ReviewPopup";
import { changeModal } from "../../../redux/reducers/popupReducer";
import { CUSTOMER_URL } from "../../../utils/apiURL";
import axiosInstance from "../../../setup/auth/AxiosInstance";
import SingleProduct from "../../../components/SingleProduct/SingleProduct";
import { fetchProducts } from "../../../redux/actions/productActions";
//Swiper react component import

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

const ProductDetail = () => {
    const dispatch = useDispatch();

    // Baseurl
    const baseUrl = "http://127.0.0.1:8000/api/";

    //get current product from store
    const { currentProduct, isLoading, error } = useSelector((state) => state.productsData);
    const { cartItems, cart_count } = useSelector((state) => state.cart);

    //get relatedproduct of this particular product
    const [relatedProduct, setRelatedProduct] = useState([]);

    const [productImages, setProductImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const [productTags, setProductTags] = useState([]);

    const [productInWishlist, setProductInWishlist] = useState(false);

    const [cartButtonClickStatus, setCartButtonClickStatus] = useState(false);

    const user = useSelector((state) => state.user.role);

    const currency = useSelector((state) => state.currency);

    const showModal = useSelector((state) => state.popup.showModal);

    const [errorMsg, setErrorMsg] = useState("");

    //Inherit slug and id from parent route
    const { product_slug, product_id } = useParams();

    useEffect(() => {
        dispatch(fetchProducts(PRODUCTS_URL + "/product/" + product_id));

        // fetchRelatedData(PRODUCTS_URL + "/related-products/" + product_id);

        // checkProductInCart(product_id);

        // checkProductInWishlist(product_id);
    }, [dispatch, product_id]);

    console.log(currentProduct);
    console.log(selectedImage);
    console.log(productTags);
    console.log(productImages);

    useEffect(() => {
        // Set local states when product data is updated
        if (currentProduct) {
            const images = currentProduct.product_images || []; // Fallback to empty array
            setProductImages(images);
            setSelectedImage(images.length > 0 ? images[0] : null); // Set first image or null
            setProductTags(currentProduct.tag_list);
        }
    }, [currentProduct]);

    // function for fetching related currentProduct of particular product
    const fetchRelatedData = async (baseUrl) => {
        try {
            const response = await axios.get(baseUrl);
            setRelatedProduct(response.data.results);
        } catch (error) {
            setRelatedProduct([]);
        }
    };

    const cartAddButtonHandler = () => {
        alert("cliked add cart")
    }
    const cartRemoveButtonHandler = () => {
        alert('cliked remove')
    }
    const saveInWishlist = () => {
        alert('clicked save in wishlist')
    }

    return (
        <Layout>
            <section className="container">
                {currentProduct && (
                    <>
                        <div className="row mt-5 pt-5">
                            {/* breadcrumb */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to="/">Category</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        {currentProduct.title}
                                    </li>
                                </ol>
                            </nav>
                            {/* end of breadcrumb */}
                        </div>
                        <div className="row my-3 py-3">
                            {/* product image slider */}
                            <div className="col-4">
                                <div className="ecommerce-gallery">
                                    <div className="row py-3">
                                        <div className="col-12 mb-1">
                                            <div className="bg-secondary">
                                                {selectedImage?.image ? (
                                                    <>sdafsdf</>
                                                ) : (
                                                    <p>No images available</p>
                                                )}
                                            </div>
                                        </div>
                                        {productImages.map((images, index) => (
                                            <div className="col-3 mt-4" key={index}>
                                                <img
                                                    style={{
                                                        border:
                                                            selectedImage?.image === images.image ? "2px solid red" : "",
                                                    }}
                                                    src={images.image}
                                                    alt={`Gallery ${index + 1}`}
                                                    className="active w-100 p-2"
                                                    onClick={() => setSelectedImage(images)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* end of product image slider */}
                            {/* product details section */}
                            <div className="col-8 pt-5">
                                <h3 className="mb-1">{currentProduct.title}</h3>
                                <span className="pe-2">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </span>
                                <span>5</span>
                                <p className="text-warning mt-3">{currentProduct.detail}</p>
                                {currency.currencyValue !== "usd" ? (
                                    <>
                                        {currentProduct.discount_percentage ? (
                                            <>
                                                <h5 className="product-card-price mt-4 mb-3">
                                                    <strike className="text-white me-3">₹ {currentProduct.price}</strike> ₹{" "}
                                                    {currentProduct.discounted_price_inr}
                                                </h5>
                                                <span className="text-primary">
                                                    - {currentProduct.discount_percentage} %
                                                </span>
                                            </>
                                        ) : (
                                            <h5 className="product-card-price mt-4 mb-3">₹ {currentProduct.price}</h5>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {currentProduct.discount_percentage ? (
                                            <>
                                                <h5 className="product-card-price mt-4 mb-3">
                                                    <strike className="text-white me-3">
                                                        $ {currentProduct.usd_price}
                                                    </strike>{" "}
                                                    $ {currentProduct.discounted_price_usd}
                                                </h5>
                                                <span className="text-primary">
                                                    - {currentProduct.discount_percentage} %
                                                </span>
                                            </>
                                        ) : (
                                            <h5 className="product-card-price mt-4 mb-3">$ {currentProduct.usd_price}</h5>
                                        )}
                                    </>
                                )}
                                <p className="mt-3">
                                    {/* if the cartButton status is false which means the product is not added to cart*/}
                                    {!cartButtonClickStatus && (
                                        <button
                                            title="Add to cart"
                                            type="button"
                                            onClick={cartAddButtonHandler}
                                            className="btn btn-outline-primary"
                                        >
                                            <i className="fa-solid fa-cart-arrow-down"></i> Add to Cart
                                        </button>
                                    )}
                                    {/* if the cartButton status is true which means the currentProduct is already present in cart */}
                                    {cartButtonClickStatus && (
                                        <button
                                            title="remove from cart"
                                            type="button"
                                            onClick={cartRemoveButtonHandler}
                                            className="btn btn-outline-primary"
                                        >
                                            <i className="fa-solid fa-cart-arrow-down"></i> Remove from Cart
                                        </button>
                                    )}

                                    <button title="Buy now" className="btn btn-outline-light ms-2">
                                        <i className="fa-solid fa-cart-arrow-down"></i> Buy Now
                                    </button>
                                    {user === "customer" && !productInWishlist && (
                                        <button
                                            title="Add to Wishlist"
                                            onClick={saveInWishlist}
                                            className="btn btn btn-sm ms-1"
                                        >
                                            <i className="fa-solid fa-heart"></i> Wishlist
                                        </button>
                                    )}
                                    {/* {(user === "" || productInWishlist) && (
                                <button title="Add to Wishlist" className="btn btn-danger btn-sm ms-1 disabled">
                                    <i className="fa-solid fa-heart"></i> Wishlist
                                </button>
                            )} */}
                                </p>
                            </div>

                            {/* end of product detail */}
                        </div>
                        {/* About the product */}
                        <div className="row">
                            <h5 className="mb-3">About this item</h5>
                            <dl className="ms-3">
                                <dl>
                                    <b>brand</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; item
                                </dl>
                                <dl>
                                    <b>weight</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; item
                                </dl>
                                <dl>
                                    <b>dosage</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; item
                                </dl>
                            </dl>
                        </div>
                        {/* End of about product */}
                    </>
                )}
                {currentProduct === null && (
                    <div className="row mt-5 pt-5">
                        <div className="spinner-grow text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default React.memo(ProductDetail);
