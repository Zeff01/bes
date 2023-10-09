import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,     
        authToken: null,
        email: ''
    },
    reducers: {
        loginUser: (state, action) => {
            state.isLoggedIn = true;
            state.authToken = action.payload.authToken;
            state.email = action.payload.email;
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.authToken = null; 
            state.email = ''; 
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice;