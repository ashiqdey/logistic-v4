import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
//
import NoData from '../../../components/micro/NoData';
import BaseOptionChart from '../../../components/chart/BaseOptionChart';
import { fDate2 } from "../../../utils/formatTime";

// ----------------------------------------------------------------------

// const CHART_DATA = [
//   {
//     name: 'Team A',
//     type: 'column',
//     data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
//   },
//   {
//     name: 'Team B',
//     type: 'area',
//     data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
//   },
//   {
//     name: 'Team C',
//     type: 'line',
//     data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
//   },
// ];
const DAYS = 15;

export default function AnalyticsWebsiteVisits() {
  const theme = useTheme();
  const { history30 } = useSelector(state => state.insight.value);

  const [total, setTotal] = useState(0);
  const [chartData, setChartData] = useState([]);
  // const [onTransit, setOnTransit] = useState([]);
  const [labels, setLabels] = useState([]);
  // const [showOnTransit, setShowOnTransit] = useState(false);


  useEffect(() => {
    if (history30) {

      // get time of 30 days ago
      const d = new Date();
      d.setDate(d.getDate() - DAYS);

      let time30daysAgo = d.getTime();

      const connectedData = {};
      // const ontransitData = {};
      const deliveredData = {};

      for (let i = 0; i < DAYS; i += 1) {

        // fDate2 yyyy-MM-dd 2022-08-01
        const todayDate = fDate2(time30daysAgo);

        // init
        connectedData[todayDate] = 0;
        // ontransitData[todayDate] = 0;
        deliveredData[todayDate] = 0;

        history30.forEach(e => {

          // if (todayDate === fDate2(e.ts_created) || todayDate === fDate2(e.ts_updated)) {
          //   console.log({
          //     todayDate,
          //     ts_created: fDate2(e.ts_created),
          //     ts_updated: fDate2(e.ts_updated),
          //   });
          // }


          // connected
          if (todayDate === fDate2(e.ts_created)) {
            connectedData[todayDate] += 1;
          }
          if (todayDate === fDate2(e.ts_updated)) {
            // if (e.status === '2') {
            //   ontransitData[todayDate] += 1;
            // }
            if (e.status === '5') {
              deliveredData[todayDate] += 1;
            }
          }
        });

        // increament by 1 day
        time30daysAgo += 86400000;
      }

      const connectedArr = Object.values(connectedData);
      const deliveredArr = Object.values(deliveredData);

      if (connectedArr.length > 0 || deliveredArr.length > 0) {
        setChartData([
          {
            name: 'Connected',
            type: 'column',
            data: connectedArr,
          },
          {
            name: 'Delivered',
            type: 'area',
            data: deliveredArr,
          },
          // {
          //   name: 'On Transit',
          //   type: 'column',
          //   data: Object.values(ontransitData),
          // }
        ]);

        // setOnTransit(Object.values(ontransitData));
        setLabels(Object.keys(connectedData));
        setTotal(connectedArr.reduce((a, b) => a + b, 0));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history30])



  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.warning.main,
    ],

    stroke: { width: [0, 2, 0] },
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [],
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
    },
  });

  // const onTypeToggle = (e) => {
  //   const show = e.target.checked;

  //   setShowOnTransit(show);
  //   if (chartData.length > 0) {
  //     setChartData(prev => {
  //       if (show) {
  //         return [
  //           ...prev,
  //           {
  //             name: 'On Transit',
  //             type: 'column',
  //             data: onTransit,
  //           }
  //         ];
  //       }
  //       return [...prev].slice(0, 2)
  //     })
  //   }
  // }

  return (
    <Card sx={{ p: 2, pb: 0 }} >
      <Typography variant='h5'>Last {DAYS} days history</Typography>
      <Typography variant='subtitle2'>{total} consignments connected</Typography>
      {/* <FormControlLabel
        value="line"
        control={<Switch color="primary" value='area' checked={showOnTransit} />}
        label="On transit"
        labelPlacement="start"
        onChange={onTypeToggle}
      /> */}

      {
        chartData.length === 0 && labels.length === 0 ? <NoData /> : <ReactApexChart
          type="line"
          series={chartData}
          options={{ ...chartOptions, labels }}
          height={364}
        />
      }
    </Card>
  );
}
