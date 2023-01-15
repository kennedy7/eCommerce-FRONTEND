import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "./api";
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${url}` }),
  endpoints: (build) => ({
    getAllProducts: build.query({
      query: () => "products",
    }),
    CreateProduct: build.mutation({
      // query(body){
      //     return{
      //         url: "products",
      //         method: "POST",
      //         body
      //     }
      // }
      // }
    }),
  }),
});
export const { useGetAllProductsQuery } = productsApi;
