import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

import { NoData, Col, Spinner } from "components/xbl";
import { TabPanel, MuiTabs } from "components/mui";

import { setQueries } from "redux/queries";
import useApi from "hooks/useApi";
import useToast from "hooks/useToast";
import useAccount from "hooks/useAccount";

// import {
// } from "./components";

import QueriesSidebar from "./components/QueriesSidebar";


export default function Dashboard() {
    const navigate = useNavigate();
    const param = useParams();
    const api = useApi();
    const dispatch = useDispatch();

    const dispatchToast = useToast();
    const user = useAccount();


    const queries = useSelector(state => state.queries.value);

    const [tab, setTab] = useState(0);
    const [edit, setEdit] = useState({});
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (tab === 0) {
            setData(queries.data)
        }
        else if (tab === 1) {
            const temp = queries.data.filter(e => !e.resolved);
            setData(temp);
        }
        else {
            const temp = queries.data.filter(e => e.resolved);
            setData(temp);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queries, tab]);



    const fetchQuery = async (id = null,) => {
        try {
            setLoading(true);

            const res = await api.get("/query/index", { id });

            // save in cache
            dispatch(setQueries(res));
            setLoading(false);
        }
        catch (error) {
            console.log("GET ERROR", error.response.data);
            dispatchToast(error.response.data);
        }
    }


    // fetch insights
    useEffect(() => {
        if (!queries.fetched) {
            fetchQuery();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onClose = () => {
        setEdit({});
        navigate("/dashboard/customer-query");
    }

    const editHandler = (e) => {
        // only super admin can add account
        setEdit(e);
        navigate("/dashboard/customer-query/view");
    }


    const onUpdate = async (id, resolved = "1") => {
        try {


            const res = await api.post("/query/resolved", { id, resolved })

            onClose();

            // upodate data locally
            dispatch(setQueries({ data: [...res.data] }));
        }
        catch (error) {
            console.log("POST ERROR", error.response.data);
            dispatchToast(error.response.data);
        }
    }


    return (
        <div className="sidebar-400" sidebar={(param?.type === "view" && edit?.id) ? "1" : "0"}>

            <div className="p1 main w100 full-width">
                <div className="pb2 flex aic jcsb ">
                    <div>
                        <h3>Customer queries</h3>
                        <div className="cgraya">Manage all customer queries</div>
                    </div>
                    {
                        !loading && <div className="mbtn theme-t8" onClick={() => fetchQuery()}>Refresh</div>
                    }
                </div>

                <MuiTabs
                    tabs={["All", "Unresolved", "Resolved"]}
                    value={tab}
                    setValue={(t) => setTab(t)}
                />

                {
                    queries.fetched && data.length === 0 && <div className='py2'><NoData className="tc py5" /></div>
                }

                <TabPanel value={tab} index={0}>
                    <QueryView data={data} editHandler={editHandler} />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <QueryView data={data} editHandler={editHandler} />
                </TabPanel>

                <TabPanel value={tab} index={2}>
                    <QueryView data={data} editHandler={editHandler} />
                </TabPanel>

                {
                    (!queries.fetched || loading) && <div className='ic py3'>
                        <Spinner />
                    </div>
                }

                <div className='flex jcc mt2'>
                    {
                        !loading && queries.nextId !== 0 && <Button
                            onClick={() => fetchQuery(queries.nextId)}
                            variant="contained"
                            color="primary"
                        >
                            Load more
                        </Button>
                    }
                </div>
            </div>


            <QueriesSidebar
                values={edit}
                onClose={onClose}
                onUpdate={onUpdate}
                access={user?.access || 1}
            />
        </div>
    )
}



function QueryView({ data, editHandler }) {
    return (<div className='flex fww'>
        {
            data.map(e => <Col
                key={e.id}
                md="50" lg="33" xl="25"
                className="p50 mt1"
                card="card aic jcsb hover-dark p1 cp pr"
                onClick={() => editHandler(e)}
            >
                <div className="flex jcsb aic">
                    <div>
                        <div className="f07 cgraya ttu bold">Name</div>
                        <div className="bold">{e.name}</div>
                    </div>
                    {
                        e.resolved && <div className="cgreen ix-tick" />
                    }
                </div>
                <div className='mt1'>
                    <div className="f07 cgraya ttu bold">Message</div>
                    <div className="f08 lc3" style={{ height: "60px" }} dangerouslySetInnerHTML={{ __html: e.message }} />
                </div>
            </Col>)
        }
    </div>)
}