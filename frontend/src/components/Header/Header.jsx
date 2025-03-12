import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, MotionConfig } from "framer-motion";
import { LogoVariant, transition, NavLinksVariant, NavBgVariant } from "../../motion/Header.js";
import Currency from "../Currency/Currency.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";

const Header = () => {
    //handle the state of header styles
    const [headerClass, setHeaderClass] = useState(false);

    const user = useSelector((state) => state.user.role);

    //get the current route
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            const handleScroll = () => {
                //get the currentscroll position
                const currentScrollPosition = window.scrollY;

                if (currentScrollPosition >= 150) {
                    setHeaderClass(true);
                } else {
                    setHeaderClass(false);
                }
            };
            window.addEventListener("scroll", handleScroll);
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        } else {
            setHeaderClass(true);
        }
    }, [location.pathname]);

    return (
        
        <>
        <nav className="navbar navbar-expand-lg fixed-top py-4 main-header">
            {/* only show header when scoll position greater than 150 */}
            <motion.div
                className={`navbar-background ${headerClass ? "main-header-bg" : ""}`}
                variants={NavBgVariant}
                initial="hidden"
                animate={headerClass ? "visible" : "hidden"}
                transition={{ duration: 0.5, type: "spring" }}
            />
            <div className="container">
                {/* Brand logo */}
                <motion.div variants={LogoVariant} initial="hidden" animate="visible" transition={transition}>
                    <Link className="navbar-brand text-light fw-bold fs-2 ms-sm-3 ms-3" to="/">
                        SUPERKART
                    </Link>
                </motion.div>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{ color: "red" }}
                >
                    <i className="fa-solid fa-list toggler-icon"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <MotionConfig whileHover={NavLinksVariant}>
                            <motion.li className="nav-item">
                                <Link className="nav-link text-light fw-bold" to="/">
                                    {" "}
                                    HOME
                                </Link>
                            </motion.li>
                            <motion.li className="nav-item">
                                <Link className="nav-link text-light active fw-bold" to="/categories">
                                    {" "}
                                    CATEGORY
                                </Link>
                            </motion.li>
                            {user === "customer" && (
                                <>
                                    <motion.li className="nav-item">
                                        <Link className="nav-link text-light active fw-bold" to="/checkout">
                                            <i className="fa-solid fa-heart fa-lg"></i>
                                        </Link>
                                    </motion.li>
                                    <motion.li className="nav-item">
                                        <Link className="nav-link text-light active fw-bold" to="/cart">
                                            <i className="fa-solid fa-cart-shopping"></i>
                                        </Link>
                                    </motion.li>
                                </>
                            )}

                            {user === "vendor" && (
                                <motion.li className="nav-item">
                                    <Link className="nav-link text-light active fw-bold" to="/checkout">
                                        <i className="fa-solid fa-cart-shopping"></i> NEW ORDERS
                                    </Link>
                                </motion.li>
                            )}
                            {user === "" && (
                                <>
                                    <motion.li className="nav-item">
                                        <Link className="nav-link text-light active fw-bold" to="/customer/login/">
                                            sign in
                                        </Link>
                                    </motion.li>
                                    <motion.li className="nav-item">
                                        <Link className="nav-link text-light active fw-bold" to="/customer/login/">
                                            sign Up
                                        </Link>
                                    </motion.li>
                                </>
                            )}
                        </MotionConfig>

                        {/* if the current user is a customer */}
                        {user === "customer" && (
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link text-light fw-bold dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fa-regular fa-user"></i> MY ACCOUNT
                                </Link>
                                <ul className="dropdown-menu py-4 mt-4 ms-3">
                                    <>
                                        <li>
                                            <Link className="dropdown-item fw-bold" to="/customer/dashboard">
                                                DASHBOARD
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item fw-bold" to="/customer/logout">
                                                LOGOUT
                                            </Link>
                                        </li>
                                    </>
                                </ul>
                            </li>
                        )}
                        {/* if the current user is a seller */}
                        {user === "vendor" && (
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link text-light fw-bold dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fa-regular fa-user"></i> SELLER PANNEL
                                </Link>
                                <ul className="dropdown-menu py-4 mt-4 ms-3">
                                    <>
                                        <li>
                                            <Link className="dropdown-item fw-bold" to="/seller/dashboard">
                                                DASHBOARD
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item fw-bold" to="/seller/logout">
                                                LOGOUT
                                            </Link>
                                        </li>
                                    </>
                                </ul>
                            </li>
                        )}
                        <Currency />
                    </ul>
                </div>
            </div>
            
        </nav>
        <div className="searchbar-container">
                <SearchBar/>
        </div>
        
           
            
       
        </>
    );
};

export default Header;
