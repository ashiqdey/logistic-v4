import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    upload: [],
}


export const errorSlice = createSlice({
    name: "error",
    initialState: { value: initialState },
    reducers: {
        setErrorData: (state, action) => {
            const {key} = action.payload;
            const values = action.payload.values.map(v => ({ ts: Date.now(), v }));

            state.value = {
                ...state.values,
                [key]: [
                    ...values,
                    ...state.value[key]
                ]
            };
        },
    },
});

export const { setErrorData } = errorSlice.actions;

export default errorSlice.reducer;