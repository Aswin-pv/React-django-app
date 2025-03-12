import { Link } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { CardHover, productCardButton, BadgeAnimation, DiscountBadge } from "../../motion/productCard";



const SingleProduct = (props) => {


    //context for checking the currency type
    const currency = useSelector((state) => state.currency)

    return (
        <div className={`col-sm-12 col-md-6 col-lg-4 mb-4 mb-4 d-flex justify-content-center`}>
            <Link to={`/product/${props.product.title}/${props.product.id}`} className="text-decoration-none">
                <motion.div whileHover={CardHover} className="product-card">
                    <div className="d-flex justify-content-between align-items-center">
                        {/* Show Badge if the product is New */}
                        <motion.span variants={BadgeAnimation} animate="visible" transition="transition" className="badge">NEW</motion.span>
                        {props.product.discount_percentage && (
                            // Show the discount percentage of product
                            <motion.span variants={DiscountBadge} animate="visible" className="badge2">
                                {parseFloat(props.product.discount_percentage)}% OFF
                            </motion.span>
                        )}
                    </div>

                    <img src={props.product.image} className="product-card-img-top" alt={props.product.title} />

                    <div className="product-card-body pt-4" title={props.product.title}>
                        <h5 className="product-card-title">
                            {props.product.title}
                        </h5>
                        {currency.currencyValue !== "usd" ? (
                            <>
                                {props.product.discount_percentage ? (
                                    <h5 className="product-card-price mt-4 mb-3">
                                        <strike className="text-white me-3">₹ {props.product.price}</strike> ₹ {props.product.discounted_price_inr}
                                    </h5>
                                ) : (
                                    <h5 className="product-card-price mt-4 mb-3">₹ {props.product.price}</h5>
                                )}
                            </>
                        ) : (
                            <>
                                {props.product.discount_percentage ? (
                                    <h5 className="product-card-price mt-4 mb-3">
                                        <strike className="text-white me-3">$ {props.product.usd_price}</strike> $ {props.product.discounted_price_usd}
                                    </h5>
                                ) : (
                                    <h5 className="product-card-price mt-4 mb-3">$ {props.product.usd_price}</h5>
                                )}
                            </>
                        )}
                    </div>
                    <div className="product-card-footer">
                        <motion.button
                            variants={productCardButton}
                            initial="hidden"
                            whileHover="visible"
                            title="Add to cart"
                            className="btn btn-outline-light btn-lg me-3"
                        >
                            ADD TO CART
                        </motion.button>
                        <motion.button
                            variants={productCardButton}
                            initial="hidden"
                            whileHover="visible"
                            title="Add to Wishlist"
                            className="btn btn-lg btn-outline-primary"
                        >
                            <i className="fa-solid fa-heart"></i>
                        </motion.button>
                    </div>
                </motion.div>
            </Link>
        </div>
    );
};

export default React.memo(SingleProduct);
