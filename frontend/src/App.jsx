import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './scss/style.scss';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import {RouterProvider} from 'react-router-dom';
import { useState } from 'react';
import router from './setup/routes-manager/Routes';



//check if there is any product is currently exists in cart and parse into js object.
const checkCart = localStorage.getItem('cartData');
const cartJson = JSON.parse(checkCart)


function App() {
  
  return  (
  
          <RouterProvider router={router} />
  ) 
}

export default App;
