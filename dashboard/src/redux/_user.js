import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "NA",
    email: "",
    dp: "",
    token: null,
    access: "1"
}


export const userSlice = createSlice({
    name: "user",
    initialState: { value: initialState },
    reducers: {
        setUserDetails: (state, action) => {
            state.value = {
                ...state.value,
                ...action.payload
            };
        },
        clearUserData: (state) => {
            state.value = initialState;
        },

    },
});

export const { setUserDetails, clearUserData } = userSlice.actions;

export default userSlice.reducer;