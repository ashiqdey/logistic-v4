
import React from 'react';
import Chart from "react-apexcharts";

const deafultColors = ["#00DBEA", "#3F6CFF", "#FEEF90", "#FF8DA4", "#FF9A57"];



export const ApexChart = ({ type = "line", ...rest }) => {

    if (type === "area") {
        return <AreaChart {...rest} />;
    }

    if (type === "donut") {
        return <DonutChart {...rest} />;
    }

    return <LineChart {...rest} />;
}







export const LineChart = ({ series, labels, type = "", full = true, gradient = false, height = 300 }) => {
    if (gradient === true || (Array.isArray(gradient) && gradient.length === 0)) {
        gradient = deafultColors
    }
    else if (gradient.length === 1) {
        gradient[1] = deafultColors[1];
    }


    const fakeData = {
        type: 'datetime',
        labels: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],
        series: [{
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109]
        }]
    }


    const options = {
        grid: { show: false },
        dataLabels: {
            enabled: false
        },
        legend: { show: false },
        stroke: {
            curve: 'smooth',
            lineCap: 'round',
            width: 2,
            colors: deafultColors,
        },
        fill: gradient.length > 1 ? {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                colorStops: [
                    {
                        offset: 0,
                        color: gradient[0],
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: gradient[1],
                        opacity: 1
                    },
                ]
            }
        } : {},
        colors: deafultColors,
        chart: {
            id: "basic-bar",
            type: "line",
            foreColor: 'var(--graya)',
            toolbar: {
                show: false
            }
        },
        xaxis: {
            tickAmount: 2,
            tickPlacement: 'on',
            axisTicks: {
                show: full,
                borderType: 'solid',
                color: 'var(--grey-400)',
            },
            axisBorder: {
                show: full,
                color: 'var(--grey-400)',
            },
            labels: {
                show: full,
            },
            type: type || fakeData.type,
            categories: labels || fakeData.labels
        },
        yaxis: {
            show: false
        },
    }



    return <>
        <Chart
            options={options}
            series={series || fakeData.series}
            type="line"
            height={height}
            width="100%"
        />
    </>;
}











// Line gradient
export const AreaChart = ({ series, labels, color = deafultColors[0], full = true, height = 300 }) => {
    if (typeof color === "string") {
        color = [color];
    }
    else if (Array.isArray(color) && color.length === 0) {
        color = deafultColors;
    }


    const fakeSeries = [{
        name: 'fake Series',
        data: [4, 20, 40, 25, 35, 60, 30, 40, 80]
    }]

    const fakeLabels = [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
        "2018-09-19T07:30:00.000Z",
        "2018-09-19T08:30:00.000Z"
    ];



    const options = {
        stroke: {
            curve: 'smooth',
            lineCap: 'round',
            width: 2,
            colors: color,
        },
        grid: { show: false },
        dataLabels: {
            enabled: false
        },
        fill: color.length < 1 ? {} : {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                colorStops: [
                    {
                        offset: 0,
                        color: color[0],
                        opacity: 0.4
                    },
                    {
                        offset: 100,
                        color: color[0],
                        opacity: 0
                    },
                ]
            }
        },
        chart: {
            id: "basic-bar",
            type: "area",
            foreColor: 'var(--graya)',
            toolbar: {
                show: false
            }
        },
        xaxis: {
            tickAmount: 1,

            axisTicks: {
                show: full,
                borderType: 'solid',
                color: 'var(--grey-400)',
            },
            axisBorder: {
                show: full,
                color: 'var(--grey-400)',
            },
            labels: {
                show: full,
            },
            type: 'datetime',
            categories: labels || fakeLabels
        },
        yaxis: {
            show: false
        }
    }

    return <Chart
        options={options}
        series={series || fakeSeries}
        type="area"
        height={height}
    />;
}






export const DonutChart = ({ data, height = 200, colors }) => {

    // this is how data obj should be
    const fakeData = {
        series: [44, 55, 13, 33],
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
    };


    const options = {
        labels: data.labels || fakeData.labels,

        chart: {
            id: "donut-chart",
            type: "donut",
            foreColor: 'var(--gray8)',
        },
        colors: colors || deafultColors,
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 4,
            colors: ['var(--grey-0)']
        },
        legend: {
            show: true,
            position: "bottom",
            fontSize: "14px",
            horizontalAlign: 'top',
            markers: {
                width: 15,
                height: 15,
                radius: 4,
            },
            itemMargin: {
                horizontal: 0,
                vertical: 10,
            },
        },
    };



    return <Chart
        options={options}
        series={data.series || fakeData.series}
        type="donut"
        height={height}
    />;
}

