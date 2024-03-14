import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './authSlice'
import { productSlice } from './productSlice'

export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        products: productSlice.reducer
    },
    //devTools:process.env.NODE_ENV !== 'production'
})