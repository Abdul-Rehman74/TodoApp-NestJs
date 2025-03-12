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
            console.log('Payload :' ,action.payload )
            state.user = action.payload.user;
            state.token = action.payload.access_token;
        },
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setUser , logoutUser } = userSlice.actions;
export default userSlice.reducer;