import React from "react";
import { Link } from "react-router-dom";
import {motion,MotionConfig} from 'framer-motion';
import { FooterLinks, FooterVariant } from "../../motion/Footer";

const Footer = () => {
    return (
        <>
            {/* Footer */}
            <footer>
                    <div className="container pt-5">
                        <div className="footer-top p-5">
                            <div className="row d-flex justify-content-between">
                                <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6">
                                    <div className="single-footer-caption mb-5">
                                        <div className="footer-title">
                                            <h4 className="mb-4">COMPANY</h4>
                                            <MotionConfig variants={FooterLinks} initial="hidden" whileInView="visible">
                                            <ul>
                                                <motion.li>
                                                  <Link className="link">About us</Link> 
                                                </motion.li>
                                                <motion.li>
                                                <Link className="link">Company</Link> 
                                                  
                                                </motion.li>
                                                <motion.li>
                                                <Link className="link">Blog</Link> 
                                              
                                                </motion.li>
                                                <motion.li>
                                                <Link className="link">Privacy policy</Link> 
                                                </motion.li>
                                            </ul>
                                            </MotionConfig>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                                    <div className="single-footer-caption mb-5">
                                        <div className="footer-title">
                                            <h4 className="mb-4">RESOURCES</h4>
                                            <MotionConfig variants={FooterLinks} initial="hidden" whileInView="visible">
                                            <ul>
                                                <motion.li>
                                                <Link className="link">Home Insurance</Link> 
                                                </motion.li>
                                                <motion.li>
                                                <Link className="link">Travel Insurance</Link> 
                                           
                                                </motion.li>
                                                <motion.li>
                                                <Link className="link"> Car Insurance</Link> 
                                             
                                                </motion.li>
                                                <motion.li>
                                                <Link className="link">Business Insurance</Link> 
                                            
                                                </motion.li>
                                                <motion.li>
                                                <Link className="link">Heal Insurance</Link> 
                                         
                                                </motion.li>
                                            </ul>
                                            </MotionConfig>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6">
                                    <motion.div variants={FooterVariant} initial="hidden" whileInView="visible" transition="transition" className="single-footer-caption mb-50">
                                        <div className="footer-logo">
                                            <Link className="text-decoration-none">
                                                <h2>Superkart</h2>
                                            </Link>
                                        </div>
                                        <div className="footer-title">
                                            <div className="footer-para">
                                                <p className="info1">
                                                Nutrition is the foundation, wellness is the goal.
                                                Eat to thrive, live to flourish.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="footer-social">
                                            <a href="#">
                                                <i className="fab fa-facebook-f"></i>
                                            </a>
                                            <a href="">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                            <a href="#">
                                                <i className="fas fa-globe"></i>
                                            </a>
                                            <a href="#">
                                                <i className="fab fa-instagram"></i>
                                            </a>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        <div className="footer-bottom">
                            <div className="row d-flex align-items-center">
                                <div className="col-lg-12">
                                    <div className="footer-copy-right text-center pb-5">
                                        <p>
                                            Copyright ©<script>document.write(new Date().getFullYear());</script>2024 All
                                            rights reserved | Superkart
                                            
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
           
            </footer>
            {/* Footer End */}
        </>
    );
};

export default Footer;
