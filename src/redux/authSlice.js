import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,     
        authToken: null,
    },
    reducers: {
        loginUser: (state, action) => {
            state.isLoggedIn = true;
            state.authToken = action.payload.authToken;
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.authToken = null; 
        },
    }
});

export const authActions = authSlice.actions;
export default authSlice;