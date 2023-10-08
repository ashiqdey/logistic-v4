/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// @mui
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

//
import { Col, NoData } from '../../../components/xbl';
import { ApexChart } from '../../../components/charts/Line';
import Iconify from '../../../components/micro/Iconify';
import SvgIconStyle from '../../../components/micro/SvgIconStyle';
import { urls,statusObj, statusColor } from '../../../configs';
import { PATH_DASHBOARD } from '../../../routes/paths';


const data = [
  //   {
  //     tooltip: 'Consignments connected in last 7 days',
  //     subtitle: 'Connected (7 days)',
  //     key: 'connected7',
  //     color: 'primary',
  //     icon: 'ic:outline-double-arrow',
  //   },
  {
    tooltip: 'Consignments connected in stage',
    title: 'Consignments',
    subtitle: 'Connected',
    key: 'connected30',
    color: 'primary',
    icon: 'icon-park-outline:connection',
  },
  {
    tooltip: 'Consignments on transit',
    subtitle: 'On Transit',
    key: 'onTransit',
    color: 'info',
    icon: 'bxs:truck',
  },
  {
    tooltip: 'Consignments out for delivery',
    subtitle: 'Out for delivery',
    key: 'outForDelivery',
    color: 'warning',
    icon: 'ic:baseline-delivery-dining',
  },
  {
    tooltip: 'Consignments un-delivered',
    subtitle: 'Un delivered',
    key: 'unDelivered',
    color: 'warning',
    icon: 'fa-solid:truck-loading',
  },
  {
    tooltip: 'Delivered in last 30 days',
    subtitle: 'Delivered',
    key: 'delivered',
    color: 'success',
    icon: 'fluent:box-checkmark-24-filled',
  },
  {
    tooltip: 'Return to origin in last 30 days',
    subtitle: 'Return to origin',
    key: 'rto',
    color: 'error',
    icon: 'ic:baseline-assignment-return',
  },
];

export const Insightcards = () => {
  const { counts } = useSelector((state) => state.insight.value);

  return (
    <>
      <Card>
        <Grid container spacing={0}>
          {data.map((e, i) => (
            <Grid item xs={12} sm={6} md={4} key={e.key}>
              <Tooltip placement="top" arrow title={`${counts[e.key]} ${e.tooltip}`}>
                <Box
                  sx={{
                    p: 3,
                    borderBottom: {
                      xs: '1px dashed var(--grey-200)',
                      sm: i > 3 && 'none',
                      md: i > 2 && 'none',
                    },
                    borderRight: {
                      sm: i % 2 === 0 && '1px dashed var(--grey-200)',
                      md: i === 2 || i === 5 ? 'none' : '1px dashed var(--grey-200)',
                    },
                  }}
                >
                  <Stack direction="row" className="aic jcsb">
                    <Stack>
                      <Typography variant="h3">{counts[e.key]}</Typography>
                      <Typography variant="font6" color="grey.600">
                        {e.subtitle}
                      </Typography>
                    </Stack>
                    <Box
                      sx={{
                        bgcolor: `${e.color}.lighter`, 
                      color: `${e.color}.${e.key === 'unDelivered' ? 'dark':'main'}`,
                       height: 60, width: 60 }}
                      className="d-flex aic jcc br-1 p-1 d-c"
                    >
                      <Iconify icon={e.icon} height={32} width={32} />
                    </Box>
                  </Stack>
                </Box>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Card>
      <Typography variant="font6" color="grey.500" sx={{fontSize:'0.75em!important'}} >
        Above figures are based on last 30 days
      </Typography>
    </>
  );
};

const links = [
  {
    c: '#2a8461',
    dc: '#00ce7e',
    bg: '#0edf8e12',
    i: 'add',
    l: (
      <>
        Add <br />
        Consignments
      </>
    ),
    u: PATH_DASHBOARD.consignment.add,
  },
  // { c: "#00dbea", bg: "#00dceb1f", i: "upload", l: "Upload", u: "/dashboard/consignment/upload" },
  {
    c: '#0468ca',
    dc: '#1d97ff',
    bg: '#0ebbe71a',
    i: 'tracking',
    l: (
      <>
        View <br />
        Consignments
      </>
    ),
    u: PATH_DASHBOARD.tracking.root,
  },
  // { c: "#3dffa6", bg: "#3cffa61f", i: "truck", l: "On Transit", u: "/dashboard/tracking/transit" },
  {
    c: '#df9913',
    dc: '#ffb322',
    bg: '#fed60214',
    i: 'estimation',
    l: (
      <>
        Req. for
        <br />
        Estimations
      </>
    ),
    u: PATH_DASHBOARD.general.estimation,
  },
  {
    c: '#cc1b47',
    dc: '#f7416f',
    bg: '#ee0b6512',
    i: 'query',
    l: (
      <>
        View <br />
        Queries
      </>
    ),
    u: PATH_DASHBOARD.general.queries,
  },
];

export const Linkcards = () => {
  const theme = useTheme();

  return (
    <>
      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Quick links
      </Typography>
      <Grid container spacing={3}>
        {links.map((e, i) => (
          <Grid item key={i} xs={6} md={3}>
            <Link to={e.u} className="td-n">
              <Paper
                elevation={1}
                sx={{
                  p: 1.5,
                  bgcolor: e.bg,
                  color: theme.palette.mode === 'light' ? e.c : e.dc,
                  '&:hover': {
                    bgcolor: e.dc,
                    color: '#fff',
                  },
                }}
              >
                <Stack direction="row" className="aic">
                  <Box sx={{ height: 45, width: 45 }} className="d-flex aic jcc">
                    <SvgIconStyle src={`${urls.appBaseUrl}/assets/icons/${e.i}.svg`} sx={{ width: '30px', height: '30px' }} />
                  </Box>
                  <Typography variant="h6">{e.l}</Typography>
                </Stack>
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

// export const History30Days = () => {
//     const insight = useSelector(state => state.insight.value);

//     const [labels, setLabels] = useState([])
//     const [series, setSeries] = useState([])

//     useEffect(() => {
//         const tlabels = [];

//         if (insight.last30History) {
//             const series1 = [];

//             if (insight.last30History) {
//                 insight.last30History.forEach(e => {
//                     tlabels.push(`${e.dated}T00:00:00.000Z`);
//                     series1.push(e.counts);
//                 });

//                 setSeries([
//                     { name: "Last 30 days", data: series1 }
//                 ]);
//                 setLabels(tlabels);
//             }
//         }

//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [insight.last30History])

//     return (<Grid item xs={12} lg={8}>
//         <Paper elevation={1} sx={{ p: 2 }} >
//             <h4 className='pb1'>Last 30 days</h4>
//             {
//                 (series.length && series[0].data.length) ? <ApexChart
//                     series={series}
//                     labels={labels}
//                     type="category"
//                 /> : <NoData />
//             }
//         </Paper>
//     </Grid>
//     )
// }
