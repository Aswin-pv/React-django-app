import React from "react";
import { Link } from "react-router-dom";


const BreadCrumb = () => {

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link className="text-decoration-none breadcrumb-link">Home</Link>
                
                    </li>
                    
                </ol>
            </nav>
        </div>
    );
};

export default BreadCrumb;
