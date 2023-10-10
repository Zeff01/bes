import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: null,
        isAuthenticated: false,     
        authToken: null
    },
    reducers: {
        loginUser: (state, action) => {
            state.isLoggedIn = true;
            state.isAuthenticated = true;
            state.user = action.payload;
            console.log('login');
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
        },
    }
});

export const authActions = authSlice.actions;

export default authSlice;