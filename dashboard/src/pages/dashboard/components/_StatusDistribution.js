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
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
//
import { Col, NoData } from "../../../components/xbl";
import { ApexChart } from "../../../components/charts/Line";
import Iconify from "../../../components/micro/Iconify";
import SvgIconStyle from "../../../components/micro/SvgIconStyle";
import { statusObj, statusColor } from "../../../configs";
import { PATH_DASHBOARD } from "../../../routes/paths";


const StatusDistribution = () => {
    // const { status_color } = useSelector(state => state.maps.value);
    const insight = useSelector(state => state.insight.value);

    const [data, setData] = useState({
        series: [],
        labels: []
    })

    const [colors, setColors] = useState([])

    useEffect(() => {
        const temp = {
            series: [],
            labels: []
        };
        const tcolors = [];

        insight.distrubution30.forEach(e => {
            if (statusObj[e.status]) {
                temp.labels.push(statusObj[e.status])
                temp.series.push(e.counts);

                if (statusColor[e.status]) {
                    tcolors.push(statusColor[e.status])
                }
                else {
                    tcolors.push("#f00");
                }
            }

        })

        setData(temp);
        setColors(tcolors);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [insight.distrubution30])

    return (<Paper elevation={1} sx={{ p: 2 }} >
        <h4 className='pb1'>Last 7 days Status distribution</h4>
        {
            data?.series.length ? <ApexChart
                height={300}
                type="donut"
                data={data}
                colors={colors}
            /> : <NoData />
        }
    </Paper>)
}

export default StatusDistribution;
