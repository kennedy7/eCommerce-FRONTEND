import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    status: null
}
const productsSlice = createSlice({
    name: "products",
    reducers:{}

})

export default productsSlice.reducer