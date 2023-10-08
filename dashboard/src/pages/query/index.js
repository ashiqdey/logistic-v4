import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import Grid from '@mui/material/Grid';
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
import { setQueries } from "../../redux/queries";

// -----------------------------------------------

const tabs = ["Unresolved", "Resolved"];


export default function Tracking() {
    const navigate = useNavigate();
    const { editType } = useParams();
    const { fetchResponse } = useApi();
    const dispatch = useDispatch();

    const queries = useSelector(state => state.queries.value);

    const [activeTab, setActiveTab] = useState(0);
    const [edit, setEdit] = useState({});
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue)
    };

    const onClose = () => {
        setEdit({});
        navigate(PATH_DASHBOARD.general.queries);
    }

    const editHandler = (e) => {
        // only editor+ can mark as resolved
        setEdit(e);
        navigate(`${PATH_DASHBOARD.general.queries}/view`);
    }


    const fetchQuery = (fresh = false) => {
        setLoading(true);

        fetchResponse(urls.query.get, 'GET', { id: fresh ? null : queries.nextId })
            .then(res => {
                // save in cache
                dispatch(setQueries({
                    data: res.data,
                    nextId: res.next_id,
                }));
                setLoading(false);
            })
            .catch(err => {
                console.log("GET ERROR", err);
            })
    }



    useEffect(() => {
        if (!queries.fetched) {
            fetchQuery(true);
        }

        if (activeTab === 0) {
            setData(queries.data.filter(e => !e.resolved));
        }
        else {
            setData(queries.data.filter(e => e.resolved));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queries, activeTab]);



    return (
        <Page title="Dashboard">
            <Container maxWidth='xl'>
                <PageHeading
                    title="Queries"
                    subtitle="Complaints, feedbacks and queries"
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
                            data.map(e => <Grid
                                item
                                key={e.id}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                            >
                                <Paper
                                    sx={{ p: 2, '&:hover': { bgcolor: 'grey.100' } }}
                                    className="cp pr"
                                    onClick={() => editHandler(e)}
                                >
                                    <Stack>
                                        <Typography variant="subtitle3">Name</Typography>
                                        <Typography variant="h5">{e.name}</Typography>
                                    </Stack>
                                    <Stack sx={{ mt: 2 }}>
                                        <Typography variant="subtitle3">Message</Typography>
                                        <Typography variant="font6" style={{ height: "60px" }} className='text-truncate-3'>{e.message}</Typography>
                                    </Stack>

                                </Paper>
                            </Grid>)
                        }
                    </Grid>

                    {
                        !loading && queries.nextId !== 0 && <>
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
