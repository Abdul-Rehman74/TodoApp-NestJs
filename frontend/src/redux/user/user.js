import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.token = action.payload.jwt;
        },
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setUser , logoutUser } = userSlice.actions;
export default userSlice.reducer;