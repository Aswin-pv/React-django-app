import { createBrowserRouter } from 'react-router-dom';

//Ui 
import Home from '../../pages/ui/Home/Home';
import CategoryPage from '../../pages/ui/Category/CategoryPage';
import ErrorPage from '../../pages/ui/ErrorPage/ErrorPage';
import CategoryProducts from '../../pages/ui/CateogryProducts/CategoryProductsPage';
import AllProducts from '../../pages/ui/AllProducts/AllProducts';
import ProductDetail from '../../pages/ui/ProductDetail/ProductDetail';
import Cart from '../../pages/ui/Cart/Cart';
import TagProducts from '../../pages/ui/TagProducts/TagProducts';

//Customer pannel
import Register from '../../pages/customer/Register/Register';
import Login from '../../pages/customer/Login/Login';
import Logout from '../../pages/customer/Logout/Logout';
import Dashboard from '../../pages/customer/Dashboard/Dashboard';
import Orders from '../../pages/customer/Orders/Orders';
import OrderSucces from '../../pages/customer/OrderSuccess/OrderSucces';
import OrderFailure from '../../pages/customer/OrderFailure/OrderFailure';
import Wishlist from '../../pages/customer/Wishlist/Wishlist';
import Profile from '../../pages/customer/Profile/Profile';
import ChangePassword from '../../pages/customer/ChangePassword/ChangePassword';
import AddressList from '../../pages/customer/AddressList/AddressList';
import AddAddress from '../../pages/customer/AddAddress/AddAddress';

//Seller pannel
import SellerDashboard from '../../pages/seller/Dashboard/SellerDashboard';
import SellerLogin from '../../pages/seller/Login/SellerLogin';
import SellerRegister from '../../pages/seller/Register/SellerRegister';
import SellerProducts from '../../pages/seller/Products/SellerProducts';
import AddProducts from '../../pages/seller/AddProducts/AddProducts';
import SellerOrders from '../../pages/seller/Orders/SellerOrders';
import SellerCustomers from '../../pages/seller/Customers/SellerCustomers';
import SellerReports from '../../pages/seller/Reports/SellerReports';
import SellerProfile from '../../pages/seller/Profile/SellerProfile';
import SellerChangePassword from '../../pages/seller/ChangePassword/SellerChangePassword';
import ConfirmOrder from '../../pages/customer/ConfirmOrder.jsx/ConfirmOrder';
import UpdateAddress from '../../pages/customer/UpdateAddress/UpdateAddress';
import SellerLogout from '../../pages/seller/SellerLogout/SellerLogout';
import UpdateProduct from '../../pages/seller/UpdateProduct/UpdateProduct';
import CustomerOrders from '../../pages/seller/CustomerOrders/CustomerOrders';
import DailyReports from '../../pages/seller/DailyReports/DailyReports';
import MonthlyReports from '../../pages/seller/MonthlyReports/MonthlyReports';
import YearlyReports from '../../pages/seller/YearlyReports/YearlyReports';
import SellerProductList from '../../pages/seller/SellerProductlist/SellerProductList';
import AllVendors from '../../pages/ui/AllVendors/AllVendors';
import SearchResult from '../../components/SearchResult/SearchResult';



const router = createBrowserRouter([
    {
    path:'/',
    element:<Home/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/categories',
    element:<CategoryPage/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/sellers',
    element:<AllVendors/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/category/:category_slug/:category_id',
    element:<CategoryProducts/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/products',
    element:<AllProducts/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/products/:tag',
    element:<TagProducts/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/product/:product_slug/:product_id',
    element:<ProductDetail/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/cart',
    element:<Cart/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/order/success',
    element:<OrderSucces/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/order/failed',
    element:<OrderFailure/>,
    errorElement:<ErrorPage/>
    },
    {
      path:'/search-results',
      element:<SearchResult/>,
      errorElement:<ErrorPage/>,
    },
  
    //Customer routes
  
    {
    path:'/customer/register',
    element:<Register/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/customer/login',
    element:<Login/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/customer/logout',
    element:<Logout/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/customer/dashboard',
    element:<Dashboard/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/customer/orders',
    element:<Orders/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/customer/wishlist',
    element:<Wishlist/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/customer/profile',
    element:<Profile/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/customer/change-password',
    element:<ChangePassword/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/customer/addresses',
    element:<AddressList/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/customer/add-address',
    element:<AddAddress/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/customer/update-address/:address_id',
    element:<UpdateAddress/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/confirm-order',
    element:<ConfirmOrder/>,
    errorElement:<ErrorPage/>
    },
  
    // Seller routes
    
    {
    path:'/seller/register',
    element:<SellerRegister/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/seller/login',
    element:<SellerLogin/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/seller/logout',
    element:<SellerLogout/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/seller/dashboard',
    element:<SellerDashboard/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/seller/products',
    element:<SellerProducts/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/seller/:seller_slug/:seller_id',
    element:<SellerProductList/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/seller/add-products/',
    element:<AddProducts/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/seller/update-products/:product_id',
    element:<UpdateProduct/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/seller/orders',
    element:<SellerOrders/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/seller/customers',
    element:<SellerCustomers/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/seller/reports',
    element:<SellerReports/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/seller/profile',
    element:<SellerProfile/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/seller/change-password',
    element:<SellerChangePassword/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'seller/customer/:customer_id/orderitems',
    element:<CustomerOrders/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'seller/daily-reports/',
    element:<DailyReports/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/seller/monthly-reports/',
    element:<MonthlyReports/>,
    errorElement:<ErrorPage/>
    },
    {
    path:'/seller/yearly-reports/',
    element:<YearlyReports/>,
    errorElement:<ErrorPage/>
    },
    
  ]);

export default router;
