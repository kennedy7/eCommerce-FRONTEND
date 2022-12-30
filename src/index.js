import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {configureStore} from "@reduxjs/toolkit";
import { Provider } from 'react-redux';

import productsReducer, { productsFetch } from './features/productsSlice';
import { productsApi } from './features/productsApi';

const store = configureStore ({
  reducer: {
    products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    middleware: (getDefaultMiddleware)=>{
      getDefaultMiddleware().concat(productsApi.middleware),
    }
  }
})
store.dispatch(productsFetch())
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >

    </Provider>
    <App />
  </React.StrictMode>
);

