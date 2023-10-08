import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: "false"
}


export const modalSlice = createSlice({
    name: "modal",
    initialState: { value: initialState },
    reducers: {
        showModal: (state, action) => {
            state.value = { ...action.payload };
        },
        closeModal: (state) => {
            state.value = { show: false };
        },
    },
});

export const { showModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;