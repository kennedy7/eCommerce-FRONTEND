import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/products" }),
    endpoints: (build) => ({
        getAllProducts: build.query({
            query: () => "products"
        })
    })
})
export const {useGetAllProductsQuery} = productsApi