import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import SearchBar from '../components/SearchBar/SearchBar';

const Layout = ({children}) => {
  return (
    <div>
      <Header/>
        <div className='layout'>{children}</div>
      <Footer/>
    </div>
  )
}

export default Layout
