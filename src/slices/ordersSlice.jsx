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

export const orderUpdate = createAsyncThunk(
  "orders/orderUpdate",
  async (values, { getState }) => {
    const state = getState();
    let currentOrder = state.orders.list.filter(
      (order) => order._id === values.id
    );
    const newOrder = {
      ...currentOrder[0],
      deliveryStatus: values.deliveryStatus,
    };
    try {
      const response = await axios.patch(
        `${url}/orders/${values.id}`,
        newOrder,
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
    [orderUpdate.pending]: (state, action) => {
      state.updatestatus = "pending";
    },
    [orderUpdate.fulfilled]: (state, action) => {
      const updatedOrder = state.list.map((order) =>
        order._id === action.payload._id ? action.payload : order
      );
      state.list = updatedOrder;
      state.updateStatus = "success";
      toast.info("Order Updated");
    },
    [orderUpdate.rejected]: (state, action) => {
      state.updatestatus = "rejected";
    },
  },
});
export default ordersSlice.reducer;
