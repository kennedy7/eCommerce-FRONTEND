import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "./api";
import axios from "axios";
import { toast } from "react-toastify";
const initialState = {
  items: [],
  status: null,
  CreateStatus: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const response = await axios.get(`${url}/products`);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productCreate = createAsyncThunk(
  "products/productCreate",
  async (values) => {
    try {
      const response = await axios.post(`${url}/products`, values);
      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extractReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [productCreate.pending]: (state, action) => {
      state.CreateStatus = "pending";
    },
    [productCreate.fulfilled]: (state, action) => {
      state.CreateStatus = "success";
      state.items.push(action.payload);
    },
    [productCreate.rejected]: (state, action) => {
      state.CreateStatus = "rejected";
    },
  },
});

export default productsSlice.reducer;
