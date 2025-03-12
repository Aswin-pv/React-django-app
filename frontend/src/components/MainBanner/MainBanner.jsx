import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BannerContentVariant, BannerContentTransition, BannerBtnVariant, BannerBtnTransition } from "../../motion/home";
import { useSelector } from "react-redux";

const MainBanner = () => {
    const user = useSelector((state) => state.user);

    return (
        <section className="main-banner">
            <div className="container position-relative min-vh-100 d-flex align-items-center bannerSection">
                <div className="bg-holder"></div>
                <div className="row">
                    <div className="col-md-8 col-lg-6 text-md-start text-center banner-text">
                        <motion.h1
                            className="display-5 display-sm-4 text-uppercase text-light fw-bold lh-base"
                            variants={BannerContentVariant}
                            initial="hidden"
                            animate="visible"
                            transition={BannerContentTransition}
                        >
                            Transform Your Body, Your Ultimate Fitness Destination
                        </motion.h1>
                        <div className="pt-4 banner-buttons">
                            {/* If there is user then show these button */}
                            {user.role && (
                                <>
                                    <Link to="/categories">
                                        <motion.button
                                            variants={BannerBtnVariant}
                                            initial="hidden"
                                            whileInView="visible"
                                            transition={BannerBtnTransition}
                                            className="btn btn-outline-light mb-3 mb-sm-0 btn-lg  me-3"
                                            href="#"
                                        >
                                            ORDER NOW
                                        </motion.button>
                                    </Link>
                                    <Link to="/">
                                        <motion.button
                                            variants={BannerBtnVariant}
                                            initial="hidden"
                                            whileInView="visible"
                                            transition={BannerBtnTransition}
                                            className="btn btn-lg btn-outline-primary mb-3 mb-sm-0 btn-lg"
                                            href="#"
                                        >
                                            REQUEST VIRTUAL
                                        </motion.button>
                                    </Link>
                                </>
                            )}
                            {
                                !user.role && (
                                    <>
                                    <Link to="/categories">
                                        <motion.button
                                            variants={BannerBtnVariant}
                                            initial="hidden"
                                            whileInView="visible"
                                            transition={BannerBtnTransition}
                                            className="btn btn-outline-light mb-3 mb-sm-0 btn-lg  me-3"
                                            href="#"
                                        >
                                            SIGN IN
                                        </motion.button>
                                    </Link>
                                    <Link to="/">
                                        <motion.button
                                            variants={BannerBtnVariant}
                                            initial="hidden"
                                            whileInView="visible"
                                            transition={BannerBtnTransition}
                                            className="btn btn-lg btn-outline-primary mb-3 mb-sm-0 btn-lg"
                                            href="#"
                                        >
                                            REGISTER
                                        </motion.button>
                                    </Link>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(MainBanner);
