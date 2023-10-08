import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
//
import Page from '../../components/micro/Page';
import PageHeading from '../../components/micro/PageHeading';
import AccountStatus from "../../components/micro/AccountStatus";
import CustomAvatar from '../../components/micro/Avatar';
import AccountsSidebar from "./components/AccountsSidebar";
// hooks
import useApi from "../../hooks/api/useApi";
import useAuth from "../../hooks/useAuth";
import { PATH_DASHBOARD } from "../../routes/paths";
import createAvatar from '../../utils/createAvatar';
import { urls } from '../../configs';

// -----------------------------------------------

export default function Tracking() {

    const navigate = useNavigate();
    const { editType } = useParams();
    const { fetchResponse } = useApi();
    const { user } = useAuth();

    const [superadmin, setSuperadmin] = useState(false)
    const [data, setData] = useState([])
    const [accessMap, setAccessMap] = useState([]);
    const [edit, setEdit] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user?.access === 9) {
            setSuperadmin(true);
        }
    }, [user]);



    const fetchData = () => {
        setLoading(true);

        fetchResponse(urls.account.get)
            .then(res => {
                console.log("FETCHED account", res);

                // modify data
                const values = res.data.map(e => formatAcount(e, res.access_map))

                // set data locally
                setData(values);
                setAccessMap(res.access_map);

                // set loading flag
                setLoading(false);
            })
            .catch(err => {
                console.log("POST ERROR", err);
                // dispatchToast(error.response.data);
                setLoading(false);
            })
    }


    const formatAcount = (e, accessMapt = null) => {
        if (!e.name) {
            e.name = "";
        }
        if (!e.dp) {
            e.dp = "";
        }

        // update access
        if (accessMapt) {
            e.access_label = accessMapt[e.access];
        }
        else {
            // const ac = accessMap.find(a => a.value === e.access);
            e.access_label = accessMap[e.access] || "NA";
        }

        return e;
    }


    const onUpdate = (obj, deleted = false) => {
        setData(prev => {
            const temp = [...prev];

            // for deleted, remove
            if (deleted) {
                return temp.filter(e => e.id !== obj.id)
            }

            const index = temp.findIndex(e => e.id === obj.id);

            if (index < 0) {
                // for new insert
                return [...prev, formatAcount(obj)];
            }

            // for old, update
            temp[index] = formatAcount(obj);

            return temp;
        })

        setEdit({});
        navigate(PATH_DASHBOARD.general.accounts);
    }


    const editHandler = (e) => {
        // only super admin can add account
        if (superadmin) {
            setEdit(e);
            navigate(`${PATH_DASHBOARD.general.accounts}/edit`);
        }
    }


    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return (
        <Page title="Dashboard">
            <Container maxWidth='xl'>
                <PageHeading
                    title={`Accounts ${editType || ''}`}
                    subtitle="Manage all accounts"
                />

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
                                <Stack direction='row' className='aic jcsb'>
                                    <Stack direction='row' className='aic' spacing={1.5}>
                                        <CustomAvatar
                                            src={e.dp}
                                            // src="https://lh3.googleusercontent.com/a-/AOh14GgLqI-fTNEBswdFbWGisnlFuSWNtv7qzA6D5vtFbA=s96-c"
                                            alt={e.name || ''}
                                            color={e.dp && e.dp !== '' ? 'default' : createAvatar(e.name).color}
                                        >
                                            {createAvatar(e.name).name}
                                        </CustomAvatar>

                                        <Stack>
                                            <Typography variant="subtitle3">Name</Typography>
                                            <Typography variant="h5">{e.name}</Typography>
                                        </Stack>
                                    </Stack>
                                    <AccountStatus status={e.status} />
                                </Stack>
                                <Stack sx={{ mt: 2 }}>
                                    <Typography variant="subtitle3">Email</Typography>
                                    <Typography variant="font5">{e.email}</Typography>
                                </Stack>

                                <Stack direction='row' className="aic jcsb mt1">
                                    <Stack>
                                        <Typography variant="subtitle3">Access</Typography>
                                        <Typography variant="font5">{e.access_label}</Typography>
                                    </Stack>
                                    <Stack>
                                        <Typography variant="subtitle3">Google</Typography>
                                        <Typography variant="font5">{e.google ? "Yes" : "No"}</Typography>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </Grid>)
                    }
                </Grid>


                <Box sx={{ my: 4, textAlign: 'right' }}>
                    {
                        superadmin && <LoadingButton
                            variant="contained"
                            color="primary"
                            loading={loading}
                            onClick={() => {
                                setEdit({});
                                navigate(`${PATH_DASHBOARD.general.accounts}/add`);
                            }}
                            sx={{ py: 1 }}
                        >
                            Add new account
                        </LoadingButton>
                    }
                </Box>

            </Container>

            {
                (editType === "edit" || editType === "add") && <AccountsSidebar
                    type={editType}
                    data={edit}
                    onClose={() => {
                        setEdit({});
                        navigate(PATH_DASHBOARD.general.accounts);
                    }}
                    onUpdate={onUpdate}
                    accessMap={accessMap}
                />
            }
        </Page>
    )
}
