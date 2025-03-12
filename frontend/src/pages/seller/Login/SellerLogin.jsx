import React, { useState } from "react";
import axios from "axios";
import { ACCOUNTS_URL } from "../../../utils/apiURL";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { currentUser } from "../../../redux/reducers/userReducer";

const SellerLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
    });

    const [errorMsg, setErrorMsg] = useState("");

    const inputHandler = (event) => {
        setLoginFormData({
            ...loginFormData,
            [event.target.name]: event.target.value,
        });
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(ACCOUNTS_URL + "/vendor/login/", loginFormData, { withCredentials: true });

            //save the Jwt tokens in local Storage and navigate to dashboard page
            if (response && response.status === 200) {
                //change the vendor status
                const role = response.data.role
                dispatch(currentUser(role))
                navigate("/seller/dashboard");
            } else {
                setErrorMsg("Something went wrong !! Please try again");
            }
        } catch (error) {
            // Handle errors such as invalid credentials or server errors
            if (error.response && error.response.status === 401) {
                setErrorMsg("Invalid Credentials!");
            } else {
                setErrorMsg("An error occurred! Please try again.");
            }
        }
    };

    return (
        <section className="container mt-4">
            <div className="row">
                <div className="col-md-8 col-12 offset-2">
                    <div className="card">
                        <h4 className="card-header">Login</h4>
                        <div className="card-body">
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                            <form onSubmit={submitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        onChange={inputHandler}
                                        value={loginFormData.email}
                                        className="form-control"
                                        id="email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="pwd" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={inputHandler}
                                        value={loginFormData.password}
                                        className="form-control"
                                        id="pwd"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SellerLogin;
