import React from "react";
import { Link } from "react-router-dom";
import { CardHover } from "../../motion/productCard";
import {motion} from "framer-motion";


const SingleCategory = (props) => {

    return (
        <div className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
            <Link to={`/category/${props.category.title}/${props.category.id}`} className="text-decoration-none">
                <motion.div whileHover={CardHover} className="basic-card" style={{ width: "18.5rem" }}>
                    <img src={props.category.category_img} className="basic-card-img-top" alt="..."></img>
                    <div className="basic-card-body pt-4" title={props.category.title}>
                        <h3 className="basic-card-title">
                            {props.category.title.substring(0, 20)}
                            {props.category.title.length > 20 ? "..." : ""}
                        </h3>
                    </div>
                </motion.div>
            </Link>
        </div>
    );
};

export default React.memo(SingleCategory);
