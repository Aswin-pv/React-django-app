import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk("categories/fetchCategories", (baseUrl) => {
    return axios.get(baseUrl, {
    }).then((response) => {
        return response.data;
    });
});
