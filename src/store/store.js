import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './authSlice'
import { productSlice } from './productSlice'
import { cartSlice } from './cartSlice'
import { ticketSlice } from './ticketSlice'

export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        products: productSlice.reducer,
        cart: cartSlice.reducer,
        ticket: ticketSlice.reducer
    },
    //devTools:process.env.NODE_ENV !== 'production'
})