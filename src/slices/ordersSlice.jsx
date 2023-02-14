import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setHeaders, url } from "./api";
import { toast } from "react-toastify";
import order from "../../../backend/models/order";

const initialState = {
  list: [],
  status: null,
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
      state.status = "success";
      action.orders = action.payload;
    },
  },
});
