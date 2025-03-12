import ReactPaginate from 'react-paginate';
import React from 'react';


const Pagination = ({ totalLinks,handlePageChange,currentPage  }) => {
    
    return (
        <ReactPaginate 
                previousLabel={'<<'}
                nextLabel={'>>'}
                breakLabel={'...'}
                pageCount={totalLinks}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName={'pagination justify-content-end'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakLinkClassName={'page-link'}
                breakClassName={'page-item'}
                activeClassName={'active'}
                forcePage={currentPage}/>
    );
};

export default React.memo(Pagination);
