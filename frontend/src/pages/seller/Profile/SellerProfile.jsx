import React, { useState, useEffect, useRef } from "react";
import Layout from "../../../layouts/Layout";
import SellerSidebar from "../../../components/SellerSideBar/SellerSidebar";
import axios from "axios";

const SellerProfile = () => {
    const baseUrl = "http://127.0.0.1:8000/api";
    const mediaUrl = "http://127.0.0.1:8000/media/customer_images/";

    const [profileData, setProfileData] = useState({
        user_id: "",
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        mobile: "",
        address: "",
        p_image: "",
    });

    const fileInputRef = useRef(null);
    let vendor_id = localStorage.getItem("vendor_id");

    useEffect(() => {
        //fetching product
        fetchData(baseUrl + "/vendor/" + vendor_id);
    }, []);

    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setProfileData({
                    user_id: data.user.id,
                    first_name: data.user.first_name,
                    last_name: data.user.last_name,
                    username: data.user.username,
                    email: data.user.email,
                    mobile: data.mobile,
                    address: data.address,
                    p_image: data.profile_img,
                });
            });
    }

    const inputHandler = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.files[0],
        });
    };

    const submitHandler = () => {
        const formData = new FormData();
        formData.append("user", profileData.user_id);
        formData.append("mobile", profileData.mobile);
        formData.append("address", profileData.address);
        formData.append("profile_img", profileData.p_image);

        // Logging FormData contents
        formData.forEach((value, key) => {
            console.log(key, value);
        });

        axios
            .put(baseUrl + "/vendor/" + vendor_id + "/", formData, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then(function (response) {
                // handle success
                console.log("Response data:", response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });

        const formUserData = new FormData();
        formUserData.append("first_name", profileData.first_name);
        formUserData.append("last_name", profileData.last_name);
        formUserData.append("username", profileData.username);
        formUserData.append("email", profileData.email);
        formUserData.append("address", profileData.address);

        axios
            .put(baseUrl + "/user/" + profileData.user_id + "/", formUserData)
            .then(function (response) {
                // handle success
                console.log("Response data:", response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    };

    console.log(profileData);

    return (
        <Layout>
            <section className="container mt-5">
                <div className="row">
                    <div className="col-md-3 col-12 mb-2">
                        <SellerSidebar />
                    </div>
                    <div className="col-md-9 col-12 mb-2">
                        <div className="card">
                            <h4 className="card-header">Update Profile</h4>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="firstName" className="form-label">
                                            First name
                                        </label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            onChange={inputHandler}
                                            value={profileData.first_name}
                                            className="form-control"
                                            id="firstName"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lastName" className="form-label">
                                            Last name
                                        </label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            onChange={inputHandler}
                                            value={profileData.last_name}
                                            className="form-control"
                                            id="lastName"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            onChange={inputHandler}
                                            value={profileData.username}
                                            className="form-control"
                                            id="username"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            E-mail
                                        </label>
                                        <input
                                            type="email"
                                            onChange={inputHandler}
                                            name="email"
                                            value={profileData.email}
                                            className="form-control"
                                            id="email"
                                        />
                                        <div id="emailHelp" className="form-text">
                                            We'll never share your email with anyone else.
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="mobile" className="form-label">
                                            Mobile
                                        </label>
                                        <input
                                            type="number"
                                            name="mobile"
                                            onChange={inputHandler}
                                            value={profileData.mobile}
                                            className="form-control"
                                            id="mobile"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">
                                            Address
                                        </label>
                                        <textarea
                                            type="text"
                                            name="address"
                                            onChange={inputHandler}
                                            value={profileData.address}
                                            className="form-control"
                                            id="address"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="profileImg" className="form-label">
                                            Profile Image
                                        </label>
                                        <input
                                            type="file"
                                            name="p_image"
                                            onChange={handleFileChange}
                                            className="form-control"
                                            id="profileImg"
                                            accept="image/*"
                                        />
                                        <p>
                                            <img src={profileData.p_image} width="100" className="mt-2" alt="" />
                                        </p>
                                    </div>

                                    <button type="button" onClick={submitHandler} className="btn btn-primary">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default SellerProfile;
