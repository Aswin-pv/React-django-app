import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../setup/auth/AxiosInstance";

export const fetchCart = createAsyncThunk("cart/fetchCart", (baseUrl) => {
    return axiosInstance.get(baseUrl, {
    }).then((response) => {
        return response.data;
    });
});