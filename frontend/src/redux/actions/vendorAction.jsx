import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVendors = createAsyncThunk(
    'vendors/fetchvendors', (baseUrl) => {
        return axios.get(baseUrl, {
   
        }).then((response) => {
            return response.data;
        })
    }
) 
