import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courier: [],
    status: {
        "CONNECTED": "1",
        "TRANSIT": "2",
        "OUT_FOR_DEL": "3",
        "UNDELIVERED": "4",
        "DELIVERED": "5",
        "RTO": "6"
    },
}


export const courierSlice = createSlice({
    name: "maps",
    initialState: { value: initialState },
    reducers: {
        setMaps: (state, action) => {
            const { key, data } = action.payload;

            const newVal = [...state.value[key], ...data]

            state.value = {
                ...state.value,
                [key]: newVal
            };
        },

        deleteMap: (state, action) => {
            const { key, id } = action.payload;

            const newVal = [...state.value[key]].filter(e => e.id !== id);

            state.value = {
                ...state.value,
                [key]: newVal
            };
        },

    },
});

export const { setMaps, deleteMap } = courierSlice.actions;

export default courierSlice.reducer;