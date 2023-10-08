import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
//
import NoData from '../../../components/micro/NoData';
import BaseOptionChart from '../../../components/chart/BaseOptionChart';

// ----------------------------------------------------------------------

// const CHART_HEIGHT = 372;
// const LEGEND_HEIGHT = 120;

const ChartWrapperStyle = styled('div')(() => ({
  // height: CHART_HEIGHT,
  // marginTop: theme.spacing(5),
  // '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  // '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
  //   overflow: 'visible',
  // },
  // '& .apexcharts-legend': {
  // height: LEGEND_HEIGHT,
  // alignContent: 'center',
  // position: 'relative !important',
  // borderTop: `solid 1px ${theme.palette.divider}`,
  // top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  // },
  '& .apexcharts-legend-series': {
    width: '33.33%',
    padding: '10px 10px 0 0!important'
  }
}));

// ----------------------------------------------------------------------

export default function AnalyticsCurrentVisits() {
  const theme = useTheme();

  const { counts } = useSelector(state => state.insight.value);

  const [chartData, setChartData] = useState([]);

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.warning.dark,
      theme.palette.success.main,
      theme.palette.error.main,
    ],
    labels: ['Connected', 'On transit', 'On Delivery','Un delivered', 'Delivered', 'RTO'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: {
      itemMargin: { horizontal: 0, vertical: 0 },
    },
    tooltip: {
      enabled: false,
    },
  });


  useEffect(() => {
    const dataKeys = [
      'connected30',
      'onTransit',
      'outForDelivery',
      'unDelivered',
      'delivered',
      'rto'
    ];

    const deliveredData = [];

    dataKeys.forEach(key => {
      // connected
      if (counts[key]) {
        deliveredData.push(parseInt(counts[key], 10));
      }
      else {
        deliveredData.push(0);
      }
    });

    setChartData(deliveredData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counts])


  return (
    <Card sx={{ p: 2, height: '100%' }}>
      <Typography variant='h5'>Last 30 days</Typography>
      <Typography variant='subtitle2'>Status distribution</Typography>

      <ChartWrapperStyle dir="ltr">
        {
          chartData.reduce((a, b) => a + b, 0) === 0 ? <NoData /> : <ReactApexChart
            type="donut"
            series={chartData}
            options={chartOptions}
            height={290}
          />
        }
      </ChartWrapperStyle>
    </Card>
  );
}
