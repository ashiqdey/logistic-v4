import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//
import Page from '../../components/micro/Page';
import PageHeading from '../../components/micro/PageHeading';
import NoData from '../../components/micro/NoData';
import QuerySidebar from "./components/QuerySidebar";
// hooks
import useApi from "../../hooks/api/useApi";
//
import { PATH_DASHBOARD } from "../../routes/paths";
import { urls } from '../../configs';
import { setEstimation } from "../../redux/estimation";
import { fDate } from "../../utils/formatTime";

// -----------------------------------------------

const tabs = ["Unresolved", "Resolved"];


export default function Tracking() {
    const navigate = useNavigate();
    const { editType } = useParams();
    const { fetchResponse } = useApi();
    const dispatch = useDispatch();

    const estimations = useSelector(state => state.estimation.value);

    const [activeTab, setActiveTab] = useState(0);
    const [edit, setEdit] = useState({});
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue)
    };

    const onClose = () => {
        setEdit({});
        navigate(PATH_DASHBOARD.general.estimation);
    }

    const editHandler = (e) => {
        // only editor+ can mark as resolved
        setEdit(e);
        navigate(`${PATH_DASHBOARD.general.estimation}/view`);
    }


    const fetchQuery = (fresh = false) => {
        setLoading(true);

        fetchResponse(urls.estimation.get, 'GET', { id: fresh ? null : estimations.nextId })
            .then(res => {
                setLoading(false);

                // save in cache
                if (res.data && res.data.length > 0) {
                    dispatch(setEstimation({
                        data: res.data,
                        nextId: res.next_id,
                    }));
                }

            })
            .catch(err => {
                console.log("GET ERROR", err);
            })
    }



    useEffect(() => {
        if (!estimations.fetched) {
            fetchQuery(true);
        }

        if (activeTab === 0) {
            setData(estimations.data.filter(e => !e.resolved));
        }
        else {
            setData(estimations.data.filter(e => e.resolved));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [estimations, activeTab]);



    return (
        <Page title="Dashboard">
            <Container maxWidth='xl'>
                <PageHeading
                    title="Estimation requests"
                    subtitle="Manage all estimation requests"
                >
                    {
                        !loading && <Button
                            variant='text'
                            color='primary'
                            size='small'
                            onClick={() => fetchQuery(true)}>
                            Refresh
                        </Button>
                    }
                </PageHeading>


                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs value={activeTab} onChange={handleChange}>
                        {
                            tabs.map(tab => <Tab key={tab} label={tab} />)
                        }
                    </Tabs>
                </Box>

                {
                    data.length === 0 && <NoData />
                }

                {data.length > 0 && <>
                    <Grid container spacing={2}>
                        {
                            data.map(e => <Grid item key={e.id} xs={12} sm={6} md={4} lg={3} >
                                <Stack
                                    sx={{ p: 2, '&:hover': { bgcolor: 'grey.100' } }}
                                    className="cp pr"
                                    onClick={() => editHandler(e)}
                                    component={Paper}
                                    spacing={2}
                                >
                                    <Stack direction='row' className='jcsb'>
                                        <Stack>
                                            <Typography variant="subtitle3">Phone</Typography>
                                            <Typography variant="h5">{e.phone}</Typography>
                                        </Stack>

                                        <Stack>
                                            <Chip label={fDate(e.ts)} />
                                        </Stack>
                                    </Stack>
                                    <Stack>
                                        <Typography variant="subtitle3">Destimation</Typography>
                                        <Typography variant="font6" style={{ height: "45px" }} className='text-truncate-2'>{e.destination}</Typography>
                                    </Stack>

                                    <Stack direction='row' className='jcsb'>
                                        <Stack>
                                            <Typography variant="subtitle3">Weight</Typography>
                                            <Typography variant="h5">{e.weight}</Typography>
                                        </Stack>
                                        <Stack>
                                            <Typography variant="subtitle3">Width</Typography>
                                            <Typography variant="h5">{e.width}</Typography>
                                        </Stack>
                                        <Stack>
                                            <Typography variant="subtitle3">Height</Typography>
                                            <Typography variant="h5">{e.height}</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Grid>)
                        }
                    </Grid>

                    {
                        !loading && estimations.nextId !== 0 && <>
                            <Stack direction='row' className='jcc my-5'>
                                <Button
                                    onClick={() => fetchQuery(false)}
                                    variant="text"
                                    color="primary"
                                    sx={{ maxWidth: '180px' }}
                                >
                                    Load more
                                </Button>
                            </Stack>
                        </>
                    }
                </>}
            </Container>

            {

                editType === "view" && <QuerySidebar
                    values={edit}
                    onClose={onClose}
                />
            }
        </Page>
    )
}
