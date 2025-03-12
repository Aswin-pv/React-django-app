import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ACCOUNTS_URL } from '../../../utils/apiURL';


const SellerLogout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [errorMsg, setErrorMsg] = useState('');
    
    useEffect(() => {
        handleLogout(ACCOUNTS_URL + '/vendor/logout/')
    }, [])

    const handleLogout = async (url) => {
        try{
            const response = await axios.post(url,{},{withCredentials:true});
            console.log(response)

            if (response && response.status === 205){
              
                localStorage.clear()
             
                navigate('/seller/login')
            }
        } catch(error){
            console.log("from seller dashboard",error)
        }
    }
    
  return (
    <div>
      
    </div>
  )
}

export default SellerLogout
