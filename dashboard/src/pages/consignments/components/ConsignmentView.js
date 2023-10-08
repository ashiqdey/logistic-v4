import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import PerfectScrollbar from 'react-perfect-scrollbar'

import { NoData, Spinner } from "components/xbl";
import TrackingHeader from "components/rows/TrackingHeader";
import TrackingBody from "components/rows/TrackingBody";
import TrackingModal from "modals/TrackingModal";
import useApi from "hooks/useApi";
import useToast from "hooks/useToast";

// import useFetchTracking from "./hooks/useFetchTracking";
import { trackingConfig } from "utils/tracking";

const {header} = trackingConfig;
const totalWidth = header.reduce((a, b) => a + b.width, 0) + 60;


export default function ConsignmenView() {
    const query = new URLSearchParams(window.location.search);
    const searchQuery = query.get('search') || "";
    const navigate = useNavigate();


    // to show toast
    const api = useApi();
    const dispatchToast = useToast();

    const [value, setValue] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const changeHandler = (e) => {
        setValue(e.target.value);
    }
    const onEnter = (e) => {
        if (e.key === 'Enter') {
            const searchValue = value.replace(/ /g, ',').replace(/,+/g, ',');;

            setValue("");
            navigate(`/dashboard/consignment?search=${searchValue}`);
        }
    };


    const searchApi = async (value) => {
        if (value === "") return;

        setData([])
        setLoading(true);

        try {
            console.log("fetching /tracking/tracking-search", { awb: value });
            const res = await api.get("/tracking/tracking-search", { awb: value })
            console.log("FETCHED tracking", res);

            // ------tracking data-------

            setData(res.data);
            setLoading(false);
            setSearched(true);
        }
        catch (error) {
            console.log("POST ERROR", error.response.data);
            dispatchToast(error.response.data);
            setLoading(false);
        }
    }


    useEffect(() => {
        searchApi(searchQuery)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery])



    return (
        <div className="tracking consignment-view">
            {
                !searched && <div className='flex-md jcsb'>
                    <div className="p50">
                        <h3>Search consignment</h3>
                        <div className="cgraya">Search, view and edit consignment details</div>
                    </div>
                    <div className='h20 md-down' />
                    <div className='w100 mw400 flex aic flat '>
                        <TextField
                            required
                            label="Search for AWB number"
                            placeholder="AE343782, BI3483623 etc"
                            fullWidth
                            onChange={changeHandler}
                            onKeyDown={onEnter}
                        />
                    </div>
                </div>
            }

            <PerfectScrollbar>
                {
                    loading && <div className='py2'><Spinner /></div>
                }
                {
                    !loading && searched && data.length === 0 && <div className='py2'><NoData className="tc py5" /></div>
                }

                {
                    data.length > 0 && <div style={{ width: totalWidth }}>
                        <TrackingHeader header={header} />
                        <TrackingBody data={data} header={header} />
                    </div>

                }

            </PerfectScrollbar>
            <TrackingModal />
        </div>
    )
}



