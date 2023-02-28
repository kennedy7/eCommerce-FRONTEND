import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setHeaders, url } from "./api";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
const initialState = {
  items: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
  updateStatus: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [sort, setSort] = useState({ sort: "rating", order: "desc" });
    try {
      const response = await axios.get(
        `${url}/products?page=${page}&sort=${sort.sort},${
          sort.order
        }&category=${filterCategory.toString()}&search=${search}`,
        // `${url}/products`,
        setHeaders()
      );
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

export const productUpdate = createAsyncThunk(
  "products/productUpdate",
  async (values) => {
    // const navigate = useNavigate();
    try {
      const response = await axios.patch(
        `${url}/products/${values.product._id}`,
        values,
        setHeaders()
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);
export const productDelete = createAsyncThunk(
  "products/productDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/products/${id}`,
        setHeaders()
      );
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
      state.createStatus = "pending";
    },
    [productCreate.fulfilled]: (state, action) => {
      state.createStatus = "success";
      state.items.push(action.payload);
      toast.success("Product Created");
    },
    [productCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },
    [productDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [productDelete.fulfilled]: (state, action) => {
      const newList = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      state.items = newList;
      state.deleteStatus = "success";
      toast.error("Product Deleted");
    },
    [productDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
    [productUpdate.pending]: (state, action) => {
      state.updateStatus = "pending";
    },
    [productUpdate.fulfilled]: (state, action) => {
      const updatedProduct = state.items.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
      state.items = updatedProduct;
      state.updateStatus = "success";
      toast.info("Product Updated");
    },
    [productUpdate.rejected]: (state, action) => {
      state.updateStatus = "rejected";
    },
  },
});

export default productsSlice.reducer;
