import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setHeaders, url } from "./api";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  status: null,
  updatestatus: null,
};

export const ordersFetch = createAsyncThunk("orders/ordersFetch", async () => {
  try {
    const response = await axios.get(`${url}/orders`, setHeaders());
    return response?.data;
  } catch (err) {
    console.log(err);
  }
});

export const ordersUpdate = createAsyncThunk(
  "orders/orderUpdate",
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
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    [ordersFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [ordersFetch.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.status = "success";
    },
    [ordersFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [ordersUpdate.pending]: (state, action) => {
      state.updatestatus = "pending";
    },
    [ordersUpdate.fulfilled]: (state, action) => {
      const updatedProduct = state.list.map((order) =>
        order._id === action.payload._id ? action.payload : order
      );
      state.list = updatedProduct;
      state.updateStatus = "success";
      toast.info("Order Updated");
    },
    [ordersUpdate.rejected]: (state, action) => {
      state.updatestatus = "rejected";
    },
  },
});
