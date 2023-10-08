/* eslint-disable camelcase */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    "fetched": false,
    "data": [],
    "nextId": 999999999999,
}


export const estimationSlice = createSlice({
    name: "estimation",
    initialState: { value: initialState },
    reducers: {
        setEstimation: (state, action) => {
            const { data, nextId } = action.payload;

            let newNextId = { ...state.value.nextId };
            const newData = [...state.value.data];

            // update nextId only if its smaller then previous
            if (nextId !== null && newNextId > nextId) {
                newNextId = nextId;
            }


            data.forEach(d => {
                // check if this id exists in data
                const index = newData.findIndex(f => f.id === d.id);

                // if exists in old data
                if (index > -1) {
                    // replace with new data
                    newData[index] = d;
                }
                else {
                    newData.push(d);
                }
            })

            // sort descending
            newData.sort((a, b) => b.id - a.id)

            state.value = {
                "fetched": true,
                "data": newData,
                "nextId": newNextId,
            };
        },


        updateEstimation: (state, action) => {
            const data = action.payload;

            const newData = [...state.value.data];

            // check if this id exists in data
            const index = newData.findIndex(f => f.id === data.id);

            // if exists in old data
            if (index > -1) {
                // replace with new data
                newData[index] = data;
            }


            state.value = {
                ...state.value,
                "data": newData,
            };
        },

    },
});

export const {
    setEstimation,
    updateEstimation
} = estimationSlice.actions;

export default estimationSlice.reducer;