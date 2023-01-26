import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setHeaders, url } from "./api";
import axios from "axios";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
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
    // const navigate = useNavigate();
    try {
      const response = await axios.post(
        `${url}/products`,
        values,
        setHeaders()
      );
      //   navigate("/cart");
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
  extraReducers: {
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
      toast.success("Product Created");
    },
    [productCreate.rejected]: (state, action) => {
      state.CreateStatus = "rejected";
    },
  },
});

export default productsSlice.reducer;
