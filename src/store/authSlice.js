import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        _id: null,
        firstName: null,
        lastName: null,
        email: null,
        age: null,
        role: null,
        cart_id: null,
        status: 'checking', // checking, authenticate, unauthenticated
        isAdmin: false,
    },
    reducers: {
        onLogin: (state, { payload }) => {
            state.status = 'authenticated'
            state._id = payload._id
            state.firstName = payload.firstName
            state.lastName = payload.lastName
            state.email = payload.email
            state.role = payload.role
            state.cart_id = payload.cart_id
            state.age = payload.age
            state.isAdmin = payload.role === 'admin' ? true : false
        },
        onLogout: (state) => {
            state.status = 'unauthenticated'
            state._id = null
            state.firstName = null
            state.lastName = null
            state.email = null
            state.age = null
            state.role = null
            state.cart_id = null
            state.isAdmin = false
        },
        onCheckLogin: (state) => {
            state.status = 'checking'
            state._id = null
            state.firstName = null
            state.lastName = null
            state.email = null
            state.age = null
            state.role = null
            state.cart_id = null
        },
    },
})

export const {onLogin, onLogout, onCheckLogin } = authSlice.actions