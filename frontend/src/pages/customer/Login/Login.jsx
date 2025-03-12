import React from 'react'
import { useState} from 'react'
import axios from 'axios';
import { ACCOUNTS_URL } from '../../../utils/apiURL';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentUser } from '../../../redux/reducers/userReducer';
import { useSelector } from 'react-redux';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state)=>state.user.role)

    //state to store username and password
    const [loginFormData, setLoginFormData] = useState({
        email:"",
        password:"",
    });

    console.log("current user",user)

    const [errorMsg, setErrorMsg] = useState("");

    // Works when any changes occur in form field
    const inputHandler = (event) => {
        // set the password and username state
        setLoginFormData({
            ...loginFormData,
            [event.target.name]:event.target.value
        })
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(ACCOUNTS_URL + "/customer/login/", loginFormData, { withCredentials: true });

            //save the Jwt tokens in local Storage and navigate to dashboard page
            if (response && response.status === 200) {
                const role = response.data.role
                dispatch(currentUser(role))
                navigate("/customer/dashboard/");
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

    
    
    
    // show submit button only if both fields in form is filled
    const buttonEnable = (loginFormData.email != '') && (loginFormData.password != '');

  return (
    <section className="container mt-4">
            <div className="row">
                <div className="col-md-8 col-12 offset-2">
                <div className='card'>
                    <h4 className='card-header'>Login</h4>
                    <div className="card-body">
        
                    <form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="text" name="email" onChange={inputHandler} value={loginFormData.email} className="form-control" id="email" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pwd" className="form-label">Password</label>
                                <input type="password" name="password" onChange={inputHandler} value={loginFormData.password} className="form-control" id="pwd" />
                            </div>
                            
                            <button type="button" disabled={!buttonEnable} onClick={submitHandler} className="btn btn-primary">Submit</button>
                            
                            </form>
                    </div>
                </div>
                </div>
            </div>
           
        </section>
  )
}

export default Login
