import { createSlice } from '@reduxjs/toolkit'


export const productSlice = createSlice({
    name: 'products',
    initialState: {
        product: null,
        products: [],
        pagination: null,
        /* pagination:{
            hasNextPage: false, 
            hasPrevPage: false,
            limit: null, 
            nextPage: null,
            page: null, 
            pagingCounter: null, 
            prevPage: null, 
            totalDocs: null, 
            totalPages: null
        } */
    },
    reducers: {
        onProduct: (state, { payload }) => {
            state.product = payload
        },
        onProducts: (state, { payload }) => {
            state.products = payload
        },
        onPagination: (state, { payload }) => {
            state.pagination = payload
        },
        onResetProduct: (state) => {
            state.pagination = null,
                state.products = null,
                state.product = null
        }
    }
})

export const { onProduct, onProducts, onPagination, onResetProduct } = productSlice.actions