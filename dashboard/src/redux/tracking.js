/* eslint-disable camelcase */
// import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fetched: false,
    data: [],
    nextId: 0,
    lastFetched: 0,
    statusAwb: null,
    editAwb: null,
    version: {
        "tracking_update": "0",
        "tracking_add": "0"
    },
    totalRows: {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        'all': 0,
    }
}


export const trackingSlice = createSlice({
    name: "tracking",
    initialState: { value: { ...initialState } },
    reducers: {
        setTracking: (state, action) => {
            const { data, nextId, totalRows, version } = action.payload;
            // const oldData = { ...state.value };

            state.value = {
                ...state.value,
                fetched: true,
                lastFetched: Date.now(),
                version,
                nextId,
                data: [...state.value.data, ...data],
                totalRows: processTotalRows(totalRows)
            };
        },



        unshiftTrackingData: (state, action) => {
            /*
            push data to front of exitsing array

            sample payload, should be array
            {
                consignments: [],
                version: '123',
            }
            */

            // sort consignments DESC
            const consignments = [...action.payload.consignments].sort((a, b) => b.id - a.id);


            // count totalRows
            const totalRows = { ...state.value.totalRows };

            consignments.forEach(e => {
                totalRows[e.status] += 1;
                totalRows.all += 1;
            });


            state.value = {
                ...state.value,
                lastFetched: Date.now(),
                version: {
                    ...state.value.version,
                    ...action.payload.version,
                },
                totalRows,
                data: [...consignments, ...state.value.data],
                // nextId: oldData.nextId,
                // totalRows: oldData.totalRows
            };
        },





        updateTracking: (state, action) => {
            const { data, awb } = action.payload;

            const oldData = [...state.value.data];

            // get index
            const index = oldData.findIndex(e => e.awb === awb);
            if (index < 0) {
                return;
            }

            oldData[index] = { ...oldData[index], ...data };

            state.value = {
                ...state.value,
                "data": oldData
            };
        },


        deleteTrackings: (state, action) => {
            const { awbs, totalRows } = action.payload;

            if (awbs.length === 0) {
                state.value = { ...state.value }
                return;
            }

            const data = [...state.value.data].filter(e => !awbs.includes(e.awb))

            state.value = {
                ...state.value,
                data,
                totalRows: processTotalRows(totalRows)
            };
        },


        // reset tracking data
        clearTrackingData: (state) => {
            state.value = { ...initialState };
        },



        // will open status panel 'statusAwb -> string'
        onStatusAwb: (state, action) => {
            state.value = {
                ...state.value,
                statusAwb: action.payload,
            };
        },

        // will open edit panel 'editAwb -> object'
        onEditAwb: (state, action) => {
            state.value = {
                ...state.value,
                editAwb: action.payload,
            };
        },

    },
});

export const {
    setTracking,
    updateTracking,
    deleteTrackings,
    clearTrackingData,
    unshiftTrackingData,
    onStatusAwb,
    onEditAwb,

} = trackingSlice.actions;

export default trackingSlice.reducer;


// will convert api response to object
const processTotalRows = (t) => {
    // totalRows
    const totalRows = { all: 0 };

    t.forEach(e => {
        const count = parseInt(e.count, 10);
        totalRows[e.status] = count
        totalRows.all += count;
    });

    return totalRows;
}