import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ACCOUNTS_URL } from '../../../utils/apiURL';


const Logout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [errorMsg, setErrorMsg] = useState('');
    
    useEffect(() => {
        handleLogout(ACCOUNTS_URL + '/customer/logout/')
    }, [])

    const handleLogout = async (url) => {
        try{
            const response = await axios.post(url,{},{withCredentials:true});
            console.log(response)

            if (response && response.status === 205){
        
                localStorage.clear()
    
                navigate('/customer/login')
            }
        } catch(error){
            console.log("from seller dashboard",error)
        }
    }
}

export default Logout
