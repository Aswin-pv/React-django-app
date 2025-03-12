import React, { useState, useEffect } from "react";
import Layout from "../../../layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../../redux/actions/cartActions";
import { BASE_URL } from "../../../utils/apiURL";
import { Link } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.cartItems) || [];
    console.log(cartItems);
    // State to manage quantity and price
    const [quantity, setQuantity] = useState(1);
    const price = 44.0;

    // Handlers to increase/decrease quantity
    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => setQuantity(Math.max(1, quantity - 1));

    useEffect(() => {
        dispatch(fetchCart(`${BASE_URL}/customers/cart/`));
    }, []);

    const currency = useSelector((state) => state.currency);

    return (
        <Layout>
            <section className="h-100 h-custom" style={{ backgroundColor: "#d2c9ff" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12">
                            <div className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                                <div className=" p-0">
                                    <div className="row g-0">
                                        <div className="col-lg-8">
                                            <div className="p-5">
                                                <div className="d-flex justify-content-between align-items-center mb-5">
                                                    <h1 className="fw-bold mb-0">Shopping Cart</h1>
                                                    <h6 className="mb-0 text-muted">3 items</h6>
                                                </div>
                                                <hr className="my-4" />
                                                
                                                {cartItems.length >= 1 &&
                                                    cartItems.map((item, index) => (
                                                        
                                                        <React.Fragment key={index}>
                                                            {/* First Item */}
                                                            <div className="row mb-4 d-flex justify-content-between align-items-center">
                                                                <div className="col-md-2 col-lg-2 col-xl-2">
                                                                    <img
                                                                        src={item.product.image}
                                                                        className="img-fluid rounded-3"
                                                                        alt="Cotton T-shirt"
                                                                    />
                                                                </div>
                                                                <div className="col-md-3 col-lg-3 col-xl-3">
                                                                    <h6 className="text-muted">{item.product.title}</h6>
                                                                    <h6 className="mb-0">{item.product.title}</h6>
                                                                </div>
                                                                <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                                    <button className="btn btn-link px-2">
                                                                        <i className="fas fa-minus"></i>
                                                                    </button>
                                                                    <input
                                                                        type="number"
                                                                        className="form-control form-control-sm"
                                                                        value="1"
                                                                        readOnly
                                                                    />
                                                                    <button className="btn btn-link px-2">
                                                                        <i className="fas fa-plus"></i>
                                                                    </button>
                                                                </div>
                                                                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                                    <h6 className="mb-0">€ {item.product.price}</h6>
                                                                </div>
                                                                <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                                    <a href="#!" className="text-muted">
                                                                        <i className="fas fa-times"></i>
                                                                    </a>
                                                                </div>
                                                            </div>

                                                            <hr className="my-4" />
                                                        </React.Fragment>
                                                    ))}

                                                <div className="pt-5">
                                                    <h6 className="mb-0">
                                                        <a href="#!" className="text-body">
                                                            <i className="fas fa-long-arrow-alt-left me-2"></i>Back to shop
                                                        </a>
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Summary Section */}
                                        <div className="col-lg-4 bg-secondary">
                                            <div className="p-5">
                                                <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                                                <hr className="my-4" />

                                                <div className="d-flex justify-content-between mb-4">
                                                    <h5 className="text-uppercase">items 3</h5>
                                                    <h5>€ 132.00</h5>
                                                </div>

                                                <h5 className="text-uppercase mb-3">Shipping</h5>

                                                <div className="mb-4 pb-2">
                                                    <select data-mdb-select-init>
                                                        <option value="1">Standard-Delivery- €5.00</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                        <option value="4">Four</option>
                                                    </select>
                                                </div>

                                                <h5 className="text-uppercase mb-3">Give code</h5>

                                                <div className="mb-5">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <input
                                                            type="text"
                                                            id="form3Examplea2"
                                                            className="form-control form-control-lg"
                                                        />
                                                        <label className="form-label" for="form3Examplea2">
                                                            Enter your code
                                                        </label>
                                                    </div>
                                                </div>

                                                <hr className="my-4" />

                                                <div className="d-flex justify-content-between mb-5">
                                                    <h5 className="text-uppercase">Total price</h5>
                                                    <h5>€ 137.00</h5>
                                                </div>

                                                {/* Additional summary items */}

                                                <button type="button" className="btn btn-dark btn-block btn-lg">
                                                    Proceed to payment
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Cart;
