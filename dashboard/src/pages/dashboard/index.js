import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// @mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
// import TextField from '@mui/material/TextField';

// import Logo from "../../components/logo";
// import { Col } from "../../components/xbl";

// import useSearch from "../../hooks/useSearch";
// import useWindowSize from "../../hooks/useWindowSize";
import useFetchInsight from "../../hooks/useFetchInsight";
// components
import Page from '../../components/micro/Page';
import PageHeading from '../../components/micro/PageHeading';


import {
    Insightcards,
    Linkcards,
} from "./components";
import History30Days from "./components/History30Days"
import StatusDistribution from "./components/_StatusDistribution"
import StatusDistribution2 from "./components/StatusDistribution2"




export default function Dashboard() {

    /*
    const screen = useWindowSize();
    */

    const insight = useSelector(state => state.insight.value);
    const { fetchInsight } = useFetchInsight();

    useEffect(() => {
        if (!insight.fetched) {
            fetchInsight();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Page title="Dashboard">
            <Container maxWidth='xl'>
                <PageHeading title='Dashboard' />

                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Insightcards />
                        <Linkcards />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StatusDistribution2 />
                        {/* <StatusDistribution /> */}
                    </Grid>
                    <Grid item xs={12}>
                        <History30Days />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}



