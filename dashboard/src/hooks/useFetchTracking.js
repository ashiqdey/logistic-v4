import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
//
import { setTracking } from "../redux/tracking";
import useApi from "./api/useApi";
import { urls, config } from "../configs";


const useFetchTracking = ({ trackingType, status }) => {
    const { fetchResponse } = useApi();
    const dispatch = useDispatch();

    // all tracking data from redux
    const tracking = useSelector(state => state.tracking.value);
    // loading state
    const [loading, setLoading] = useState(false);
    // hold data for current page
    const [data, setData] = useState([]);
    // current page number
    const [page, setPage] = useState(0);
    // const [pageSize, setPageSize] = useState(5);
    const pageSize = config.ROW_SIZE;


    // cut and return the required part form the array
    // check if data exists in cache
    // else fetch
    const sliceData = (arr, curPage, shouldFetch = true) => {
        /*
            [1,2,3,4,5,6,7,8,9,10,11]
            page size = 3
            page 0,1,2,3,
            output = [1,2,3] [4,5,6], [7,8,9], [10,11]
        */

        const from = curPage * pageSize;
        const till = from + pageSize;

        //  if data doesnt exists, then allow fetching
        if (arr.length < till) {
            if (shouldFetch) {
                fetchTracking();
            }

            // return whatever is found
            // return [];
        }
        return arr.slice(from, till);
    }

    const filterType = (arr) => {

        // if status is 'all' return entire row
        if (status === 'all') {
            return arr
        }

        return arr.filter(e => e.status === status);
    }


    // will be called when status changes
    // when page changes
    const dataForCurrentStatus = (curPage = 0) => {
        // get new data for current state
        // if data doesnt exist then return
        if (tracking.data.length === 0) return;

        // reset page to 0 or new page
        setPage(curPage);

        // re filter and show new data
        // filter for current state
        const filteredData = filterType([...tracking.data]);

        // cut as per page number
        // fetch if not data found
        const pageData = sliceData(filteredData, curPage);

        setData(pageData);

        // if count of rows < page size, fetch next
        if (pageData.length < pageSize) {
            fetchTracking();
        }
    }


    // will be called after fetching data
    const dataAfterFetching = () => {
        // if data doesnt exist then return
        if (tracking.data.length === 0) return;

        // re filter and show new data
        // filter for current state
        const filteredData = filterType([...tracking.data]);

        // cut as per page number
        // dont fetch if data not found
        const pageData = sliceData(filteredData, page, false);

        setData(pageData);
    }



    // will be called on page change
    const pageChanged = (newPage) => {
        /*
        if (newPage === undefined || newPage < 0) return;

        // get filtered data
        const filtered = filterType([...tracking.data]);
        // slice and get required data rows
        const pageData = sliceData(filtered, newPage);

        setPage(newPage);
        setData(pageData);
        */

        // pass new page
        dataForCurrentStatus(newPage);
    }


    // will be called when tracking type changes
    useEffect(() => {
        // trackingType changed,
        // set data for current status
        dataForCurrentStatus();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trackingType])


    // will be called when data in redux state changes
    useEffect(() => {
        // tracking type changed, set data
        dataAfterFetching();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tracking])



    // to show toast
    // const dispatchToast = useToast();

    // not found in cache
    const fetchTracking = async (fresh = false) => {
        // data is already loading 
        if (loading) return;
        // data fetched and next id =0 , so dont fetch
        if (!fresh && tracking.fetched && tracking.nextId === 0) return;


        try {
            if (setLoading) {
                setLoading(true)
            }

            let payload = null;
            // not fresh and next id exists
            if (!fresh && tracking.nextId) {
                payload = { id: tracking.nextId };
            }



            const res = await fetchResponse(urls.tracking.get, 'GET', payload)
            if (res.error) return;


            // save in cache (redux)
            dispatch(setTracking({
                data: res.data,
                nextId: res.nextId,
                version: res.version,
                totalRows: res.total_rows,
            }));

            // set loading flag
            if (setLoading) {
                setLoading(false)
            }
        }
        catch (error) {
            console.error("66 usefetchtracking hook", error);
            // dispatchToast(error.response.data);
            if (setLoading) {
                setLoading(false)
            }
        }
    }


    useEffect(() => {
        // if data is not fetched
        // fetch from page 0
        if (!tracking.fetched) {
            fetchTracking(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return {
        data,
        setData,
        loading,
        totalRows: tracking?.totalRows || {},
        page,
        pageSize,
        pageChanged,
    };
}


export default useFetchTracking;