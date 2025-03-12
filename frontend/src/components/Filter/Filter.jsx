import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/actions/categoryActions";
import { BASE_URL } from "../../utils/apiURL";
import { fetchProducts } from "../../redux/actions/productActions";
import { addFilter } from "../../redux/reducers/FilterReducer";

const Filter = () => {

    const dispatch = useDispatch();

    const { categories, totalResults, isLoading, error } = useSelector((state) => state.categoryData);

   
    const {category,price,sort} = useSelector((state)=> state.filter)


    useEffect(() => {
    dispatch(fetchCategories(BASE_URL+"/categories/"))
    }, [dispatch])
    
    useEffect(() => {

        let query = `?page=1&`; // Always reset to page 1 when filters change
        if (category) query += `search=${category}&`;
        if (price) query += `price__lte=${price}&`; 
        if (sort) query += `ordering=${sort}&`;
    
        // Remove trailing "&" if exists
        query = query.endsWith("&") ? query.slice(0, -1) : query;
    
        // Fetch products with combined filters
        dispatch(fetchProducts(BASE_URL + "/products/" + query));
    
    }, [category,sort,price,dispatch])
    
    console.log("category=",category,"price=",price,"sort=",sort)
    

    return (
        <>
            {/* Category Filter */}
            <select
                className="form-select form-select-sm"
                aria-label="Category"
                value={category}
                onChange={(e)=>dispatch(addFilter({ key: "category", value: e.target.value }))}
            >
                <option value="" disabled hidden>
                    Category
                </option>
           
                {categories &&
                    categories.map((cat, index) => (
                        <option key={index} value={cat.title}>
                            {cat.title}
                        </option>
                    ))}
            </select>

            {/* Price Filter */}
            <select
                className="form-select form-select-sm"
                aria-label="Price"
                value={price}
                onChange={(e)=>dispatch(addFilter({ key: "price", value: e.target.value }))}
            >
                <option value="" disabled hidden>
                    Price
                </option>
          
                <option value="500">less than 500</option>
                <option value="1000">less than 1000</option>
                <option value="2000">less than 2000</option>
                <option value="10000">less than 10000</option>
            </select>

            {/* Sort Filter */}
            <select
                className="form-select form-select-sm"
                aria-label="Sort"
                value={sort}
                onChange={(e)=>dispatch(addFilter({ key: "sort", value: e.target.value }))}
            >
                <option value="" disabled hidden>
                    Sort
                </option>
            
                <option value="price">Price: Low To High</option>
                <option value="-price">Price: High To Low</option>
                <option value="title">Product Name</option>
                <option value="date_added">Whats New</option>
            </select>
        </>
    );
};

export default React.memo(Filter);
