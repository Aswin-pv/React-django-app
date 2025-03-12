import React,{useState,useEffect} from 'react'
import Layout from '../../../layouts/Layout'
import SellerSidebar from '../../../components/SellerSideBar/SellerSidebar'
import { Link } from 'react-router-dom'


const MonthlyReports = () => {

    const baseUrl = 'http://127.0.0.1:8000/api';
    const vendor_id = localStorage.getItem("vendor_id")
    const [Dates, setDates] = useState([]);
    const [Data, setData] = useState([])

    useEffect(() => {
        fetchReports(baseUrl + '/vendor/' + vendor_id + '/')
    }, [])
    

    function fetchReports(baseUrl){
        fetch(baseUrl)
        .then((response)=> response.json())
        .then((data)=> {  
            console.log(data.show_monthly_order_chart)
            setDates(data.show_monthly_order_chart.dates)
            setData(data.show_monthly_order_chart.data)
        });
  }

 

  return (
    <Layout>
            <section className="container mt-5">
        <div className="row">
            <div className="col-md-3 col-12 mb-2">
                <SellerSidebar/>
            </div>
            <div className="col-md-9 col-12 mb-2">
                <h4 className=''>Monthly Reports</h4>
                <div className="row">
                   
                    
                </div>
            </div>
        </div>
    </section>
    </Layout>
  )
}

export default MonthlyReports;