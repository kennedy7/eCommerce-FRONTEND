import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setHeaders, url } from "./api";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  status: null,
  deleteStatus: null,
};

export const usersFetch = createAsyncThunk("users/usersFetch", async () => {
  try {
    const response = await axios.get(`${url}/users`, setHeaders());
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const userDelete = createAsyncThunk("users/userDelete", async (id) => {
  try {
    const response = await axios.delete(`${url}/users/${id}`, setHeaders());
    return response?.data;
  } catch (error) {
    console.log(error.response.data);
    toast.error(error.response?.data);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [usersFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [usersFetch.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.status = "success";
    },
    [usersFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [userDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [userDelete.fulfilled]: (state, action) => {
      const newlist = state.list.filter(
        (user) => user._id !== action.payload._id
      );
      state.list = newlist;
      state.deleteStatus = "success";
    },
    [userDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
      toast.error("User Deleted");
    },
  },
});

export default usersSlice.reducer;
