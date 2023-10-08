import { useDispatch } from "react-redux";
// import { useSnackbar } from 'notistack';
//
import { setInsight } from "../redux/insight";
import useApi from "./api/useApi";




const useFetchInsight = () => {
    // const { enqueueSnackbar } = useSnackbar();

    const { fetchResponse } = useApi();
    const dispatch = useDispatch();

    const fetchInsight = async () => {
        try {
            const payload = {
                "counts": 1,
                "history30": 1,
                "distrubution30": 1
            };

            const res = await fetchResponse("/insights/index", 'GET', payload)

            const temp = {
                counts: {
                    ...getCount(res.counts.all || []),
                    connected7: res.counts.connected7,
                    connected30: res.counts.connected30,
                },
                "history30": res.history30 || [],
                // "previousHistory30": res.previousHistory30,
                "distrubution30": res.distrubution30 || [],
            }

            // ------last 30 days chart------
            // if (temp.last30History) {
            //     // temp.last30History = transformData(temp.last30History, "dated", "counts");
            //     temp.last30History = temp.last30History;
            // }

            // ------previous 30 days chart (30 days before last 30 days)------
            if (temp.previousHistory30) {
                temp.previousHistory30 = transformData(temp.previousHistory30, "dated", "counts");
            }

            // ------last 7 days status distrubution chart------
            if (temp.distrubution30) {
                temp.distrubution30 = transformData(temp.distrubution30, "status", "counts");
            }

            // save in cache
            dispatch(setInsight(temp));
        }
        catch (error) {
            console.log("POST ERROR", error.response.data);
        }
    }

    return { fetchInsight };
}


function getCount(arr) {
    const counts = {
        // "connected": 0,
        "onTransit": 0,
        "outForDelivery": 0,
        "unDelivered": 0,
        "delivered": 0,
        "rto": 0,
    };

    const countMaps = {
        '1': 'connected',
        '2': 'onTransit',
        '3': 'outForDelivery',
        '4': 'unDelivered',
        '5': 'delivered',
        '6': 'rto',
    }

    // convert
    arr.forEach(e => {
        const key = countMaps[e.status];
        if (key) {
            counts[key] = e.counts;
        }
    });

    return counts;
}


function transformData(arr, key1, key2) {
    return arr.map(e => ({
        [key1]: e[key1],
        [key2]: parseInt(e[key2], 10)
    }))
}


export default useFetchInsight;