import React from "react";

const About = () => {
    return (
        <>
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="banner-img">
                    <img src={require("../../assets/images/about2.png")} alt="" />
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="about-caption ps-3">
                    <div className="section-title">
                        <span>Customer Feedback</span>
                        <h2>Our Customer's Opinion</h2>
                    </div>

                    <div className="">
                        <div
                            id="carouselExampleIndicators"
                            className="carousel slide my-4 bg-black text-white p-5"
                            data-bs-ride="carousel"
                            data-bs-interval="3000"
                        >
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <figure className="text-center">
                                        <blockquote className="blockquote">
                                            <p>A well-known quote, contained in a blockquote element.</p>
                                        </blockquote>
                                        <figcaption className="blockquote-footer">
                                            <i className="fa fa-star text-warning"></i>
                                            <i className="fa fa-star text-warning"></i>
                                            <i className="fa fa-star text-warning"></i>
                                            <cite title="Source Title">Customer name</cite>
                                        </figcaption>
                                    </figure>
                                </div>
                                <div className="carousel-item">
                                    <figure className="text-center">
                                        <blockquote className="blockquote">
                                            <p>A well-known quote, contained in a blockquote element.</p>
                                        </blockquote>
                                        <figcaption className="blockquote-footer">
                                            <i className="fa fa-star text-warning"></i>
                                            <i className="fa fa-star text-warning"></i>
                                            <i className="fa fa-star text-warning"></i>
                                            <i className="fa fa-star text-warning"></i>
                                            <cite title="Source Title">Customer name</cite>
                                        </figcaption>
                                    </figure>
                                </div>
                                <div className="carousel-item">
                                    <figure className="text-center">
                                        <blockquote className="blockquote">
                                            <p>A well-known quote, contained in a blockquote element.</p>
                                        </blockquote>
                                        <figcaption className="blockquote-footer">
                                            <i className="fa fa-star text-warning"></i>
                                            <i className="fa fa-star text-warning"></i>
                                            <i className="fa fa-star text-warning"></i>
                                            <i className="fa fa-star text-warning"></i>
                                            <i className="fa fa-star text-warning"></i>
                                            <cite title="Source Title">Customer name</cite>
                                        </figcaption>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(About);
