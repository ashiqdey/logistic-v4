import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fetched: false,
    counts: {
        "connected": 0,
        "connected7": 0,
        "connected30": 0,
        "onTransit": 0,
        "unDelivered": 0,
        "delivered": 0,
        "rto": 0,
    },
    "history30": [],
    // "previousHistory30": [],
    "distrubution30": []
}


export const insightSlice = createSlice({
    name: "insight",
    initialState: { value: initialState },
    reducers: {
        setInsight: (state, action) => {
            const { counts, history30, distrubution30 } = action.payload;

            state.value = {
                ...state.value,
                fetched: true,
                counts,
                history30,
                distrubution30
            };
        },

    },
});

export const { setInsight } = insightSlice.actions;

export default insightSlice.reducer;