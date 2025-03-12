import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import { motion } from "framer-motion";
import { CardHover } from "../../motion/productCard";

const SingleVendor = (props) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
            <Link to={`/category/${props.vendor.user.first_name}/${props.vendor.id}`} className="text-decoration-none">
                <motion.div whileHover={CardHover} className="basic-card" style={{ width: "18.5rem" }}>
                    <img src={logo} className="basic-card-img-top" alt="..."></img>
                    <div className="basic-card-body pt-4" title={props.vendor.user.first_name}>
                        <h3 className="basic-card-title">
                            {props.vendor.user.first_name.substring(0, 20)}
                            {props.vendor.user.first_name.length > 20 ? "..." : ""}
                        </h3>
                    </div>
                </motion.div>
            </Link>
        </div>
    );
};

export default React.memo(SingleVendor);
