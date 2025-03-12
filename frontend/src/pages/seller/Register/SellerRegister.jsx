import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ACCOUNTS_URL } from "../../../utils/apiURL";
import PopUpAlerts from "../../../components/PopUpAlerts/PopUpAlerts";
import { changeModal } from "../../../redux/reducers/popupReducer";
import { useDispatch, useSelector } from "react-redux";

const SellerRegister = () => {

    const dispatch = useDispatch();
    const showModal = useSelector((state) => state.popup.showModal);
    const [formError, setFormError] = useState({});
    const [errorMessage, setErrorMessage] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");

    const [registerFormData, setRegisterFormData] = useState({
        first_name: "",
        last_name: "",
        mobile: "",
        email: "",
        address: "",
        password: "",
        password2: "",
    });

    const inputHandler = (event) => {
        setRegisterFormData({
            ...registerFormData,
            [event.target.name]: event.target.value,
        });
    };

    //submit form data
    const submitHandler = () => {
        axios
            .post(ACCOUNTS_URL + "/vendor/register/", registerFormData)
            .then(function (response) {
                //if there is any error occurs runs if else
                if (response.data.success === false) {
                    //set success and error message
                    setErrorMessage(response.data.msg);
                    setSuccessMessage("");
                } else {
                    setRegisterFormData({
                        first_name: "",
                        last_name: "",
                        mobile: "",
                        address: "",
                        email: "",
                        password: "",
                        password2: "",
                    });

                    //Set the success and error message
                    setErrorMessage("");
                    setSuccessMessage(response.data.msg);

                    //success popup alert
                    dispatch(changeModal());
                }
            })
            .catch(function (error) {
                // handle error
                if (error.response && error.response.data) {
                    setFormError(error.response.data); // Set field-specific error messages
                } else {
                    setErrorMessage("An unexpected error occurred.");
                }
            });
    };

    //Only enable when button when the fields are filled
    const buttonEnable =
        registerFormData.password != "" &&
        registerFormData.first_name != "" &&
        registerFormData.mobile != "" &&
        registerFormData.address != "";

    return (
        <section id="sign-up" className="sign-up">
            <div className="container mb-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-7 d-flex align-items-center">
                        <div className="form-card">
                            <div className="form-card-body">
                                <h4 className="form-card-title">SIGN UP FORM</h4>
                                <p className="form-card-description"> Seller Sign up</p>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="firstName" className="form-label">
                                            First name
                                        </label>
                                        <input
                                            type="text"
                                            onChange={inputHandler}
                                            value={registerFormData.first_name}
                                            name="first_name"
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
                                            onChange={inputHandler}
                                            value={registerFormData.last_name}
                                            name="last_name"
                                            className="form-control"
                                            id="lastName"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            E-mail
                                        </label>
                                        <input
                                            type="email"
                                            onChange={inputHandler}
                                            value={registerFormData.email}
                                            name="email"
                                            className={`form-control ${formError.email ? "is-invalid" : ""}`}
                                            id="email"
                                        />
                                        <div id="emailHelp" className="form-text text-white">
                                            We'll never share your email with anyone else.
                                        </div>

                                        {formError.email && (
                                            <div className="invalid-feedback">
                                                <p>{formError.email[0]}</p> {/* Display the email error */}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="mobile" className="form-label">
                                            Mobile
                                        </label>
                                        <input
                                            type="number"
                                            onChange={inputHandler}
                                            value={registerFormData.mobile}
                                            name="mobile"
                                            className="form-control"
                                            id="mobile"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">
                                            Address
                                        </label>
                                        <textarea
                                            onChange={inputHandler}
                                            value={registerFormData.address}
                                            name="address"
                                            className="form-control"
                                            id="address"
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="pwd" className="form-label">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            onChange={inputHandler}
                                            value={registerFormData.password}
                                            name="password"
                                            className={`form-control ${formError.password ? "is-invalid" : ""}`}
                                            id="pwd"
                                        />
                                        {formError.password && (
                                            <div className="invalid-feedback mt-2">
                                                <p>{formError.password[0]}</p> {/* Render the first password error */}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="pwd2" className="form-label">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            onChange={inputHandler}
                                            value={registerFormData.password2}
                                            name="password2"
                                            className={`form-control ${formError.password2 ? "is-invalid" : ""}`}
                                            id="pwd2"
                                        />
                                        {formError.password2 && (
                                            <div className="invalid-feedback mt-2">
                                                <p>{formError.password2[0]}</p> {/* Render the first password error */}
                                            </div>
                                        )}
                                    </div>
                                   
                                    {buttonEnable && (
                                        <button
                                            type="button"
                                            onClick={submitHandler}
                                            className="btn btn-primary btn-inverse-info"
                                        >
                                            Submit
                                        </button>
                                    )}
                                    {!buttonEnable && (
                                        <button
                                            type="button"
                                            onClick={submitHandler}
                                            className="btn btn-primary btn-inverse-info disabled"
                                        >
                                            Submit
                                        </button>
                                    )}

                                    <div className="form-changer mt-4 d-flex justify-content-end">
                                        <span className="">
                                            Already a User ?{" "}
                                            <Link to={"/seller/login"} className="text-decoration-none">
                                                Sign In
                                            </Link>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-5 d-flex align-items-center">
                        <div>
                            <img src={require("../../../assets/images/register.png")} alt="" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
            {/* if the form is Successfully submitted then show a popUp */}
            {showModal && <PopUpAlerts message={successMessage} buttonValue={"Login Now"} link={"/seller/login"} />}
        </section>
    );
};

export default SellerRegister;
