import React, { useContext,useEffect, useState } from 'react';
import Layout from '../../../layouts/Layout';
import { UserContext } from '../../../setup/app-context-manager/Context';
import axios from 'axios';
import { CartContext,CurrencyContext } from '../../../setup/app-context-manager/Context';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const ConfirmOrder = () => {

    // Baseurl
    const baseUrl = 'http://127.0.0.1:8000/api/';
    const {cartData, setCartData} = useContext(CartContext);
    const [orderId, setOrderId] = useState('');
    const [orderAmount, setOrderAmount] = useState(0);
    const [orderStatus, setOrderStatus] = useState(false)
    const [PayMethod, setPayMethod] = useState('');
    const userContext = useContext(UserContext)
    const {currency} = useContext(CurrencyContext)

    console.log("confirmorder")

    
    useEffect(() => {
       
        if (userContext === null){
            window.location.href = "/customer/login";
          } else { 
            //Only add to cart if there is items in the cart(block multiple order confirmation when page refresh)
            if (cartData.length > 0){
              addOrderInTable();
            }
                
        }
    }, [userContext]);
    
    const addOrderInTable = () => {
       
        const customerId = localStorage.getItem('customer_id');

        let previousCart = localStorage.getItem('cartData')
        let cartJson = JSON.parse(previousCart)

        let totalAmount = 0;
        let totalUsdAmount = 0;
       cartJson.map((cart,index)=>{
         totalAmount += parseFloat(cart.product.price)
         totalUsdAmount += parseFloat(cart.product.usd_price)
       });
        
        const formData = {
          "customer": customerId,
          "total_amount": totalAmount,
          "total_usd_amount": totalUsdAmount,
        };
    

        //submit the data
        axios.post(baseUrl + 'orders/', formData)
        .then(function (response) {
          
            let orderId = response.data.id
            setOrderId(orderId)

            if (currency == 'usd'){
              setOrderAmount(response.data.total_usd_amount)
            }else{
              setOrderAmount(response.data.total_amount)
            }

            
            localStorage.setItem('order_id',orderId)
            //call another function to send orderitems to database
            orderItems(orderId)
          
      
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          
          });
    }

    const orderItems = (order_id) => {

      let previousCart = localStorage.getItem('cartData')
      let cartJson = JSON.parse(previousCart)
      
      if (cartJson !=  null){
        
        const promises = cartJson.map((cart,index)=>{
          let formData = {
            'order': order_id,
            'product': cart.product.id,
            'qty': 1,
            'price': cart.product.price,
            'usd_price':cart.product.usd_price,
          };

          
         
          //Submit the data
          return axios.post(baseUrl + 'orderitem/', formData)
          .then(function (response) {
            //Remove the item from local storage
            console.log("successfull")
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          
          });

        });

        // Wait for all promises to complete
        Promise.all(promises).then(() => {
          // Clear the cart after processing all items
          cartJson = [];
          localStorage.setItem('cartData', JSON.stringify(cartJson));
          setCartData(cartJson);
          console.log('Cart cleared', cartJson);
      });
      }

      
    }

    const changePaymentMethod = (payMethod) =>{
      console.log("paymethod running")
      setPayMethod(payMethod)
    }

    const PayNowButton = () =>{
      if (PayMethod !=''){
        changePaymentMethod(PayMethod)
      }else{
        alert("Select a payment method")
      }
      
    }

    const updateOrderStatus = () => {
    
        let order_id = localStorage.getItem('order_id')
        // submit the data
        axios.post(baseUrl + 'update-order-status/' + order_id + '/')
        .then(function (response) {
            localStorage.removeItem('order_id')
            window.location.href = '/order/success'
      
          })
          .catch(function (error) {
            // handle error
            window.location.href = '/order/failed'
          
          });
    }

    console.log("paymethod",PayMethod)
  return (
    <Layout>
        <div  className='container'>
          <div className="row mt-4">
            <div className="col-4 offset-4">
            <div className="card p-3">
              <h3><i className='fa fa-check-circle text-success'></i> Your order has been confirmed</h3>
              
              </div>
              <div className="card p-3 mt-4">
                <form action="">
                  {
                    currency != 'usd' && 
                    <>
                    <div className="form-group">
                    <label htmlFor="">
                      <input type="radio" onChange={()=>changePaymentMethod('stripe')} name='payMethod' />
                      Stripe
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">
                      <input type="radio" onChange={()=>changePaymentMethod('razorpay')} name='payMethod' />
                      Razorpay
                    </label>
                  </div>
                    </>
                  }
                  {
                    currency == 'usd' &&
                    <div className="form-group">
                    <label htmlFor="">
                      <input type="radio" onChange={()=>changePaymentMethod('paypal')} name='payMethod' />
                      Paypal
                    </label>
                  </div>
                  }

                  
                  
                  <button type='button' onClick={PayNowButton} className='btn btn-success btn-sm'>Next</button>
                </form> 
                { PayMethod == 'paypal' &&
                  <PayPalScriptProvider options={{ clientId: "AWJ5VzKuueiHwtvaVtYQcYzNkpSlKjWqIyRDc0LO1UcJu9W1a6AwwZ00FyqCmwwFBV8wOO2y_vq0NM36" }}>
                  <PayPalButtons className='mt-3' style={{ layout: "horizontal" }} 
                          createOrder={(data,actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    currency_code: 'USD',
                                    value: orderAmount,
                                  },
                                },
                              ],
                            });
                          }}
                          onApprove={(data,actions) => {
                            return actions.order.capture().then((details) => {
                             
                              alert(`Transaction completed`)
                              setOrderStatus(true);
                              updateOrderStatus();
                            })
                          }}
                  
                  />

                  </PayPalScriptProvider>
                }
              </div>
            </div>
          </div>
    </div>
    </Layout>
    
  )
}

export default ConfirmOrder;
