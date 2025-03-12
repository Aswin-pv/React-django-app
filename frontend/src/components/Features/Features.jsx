import React from "react";

const Features = () => {
    return (
        <section className="feature-banner-section my-5">
            <div className="d-flex justify-content-center align-items-center bg-dark p-4">
                <div className="row vw-100">
                    <div className="col-md-4 item p-3 text-center">
                        <div className="img-container mb-3">
                            <img src={require("../../assets/logos/security.png")} alt="safeandsecure.svg" />
                        </div>
                        <span className="">100% Safe & Secure Payments</span>
                    </div>
                    <div className="col-md-4 item p-3 text-center">
                        <div className="img-container mb-3">
                            <img src={require("../../assets/logos/delivery.png")} alt="freeshiping.svg" />
                        </div>
                        <span className="">Free Shipping</span>
                    </div>
                    <div className="col-md-4 item p-3 text-center">
                        <div className="img-container mb-3">
                            <img src={require("../../assets/logos/original.png")} alt="authen.svg" />
                        </div>
                        <span className="">Authenticity Guaranteed</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
