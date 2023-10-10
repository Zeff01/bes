import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: [],
    },
    reducers: {
        setData: (state, action) => {
            state.userData = action.payload;
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;