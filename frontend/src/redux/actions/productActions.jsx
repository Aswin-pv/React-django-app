import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchproducts", (baseUrl) => {
    return axios.get(baseUrl).then((response) => {
        return response.data;
    });
});
