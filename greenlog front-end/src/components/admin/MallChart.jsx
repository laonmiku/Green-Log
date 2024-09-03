import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react';

const MallChart = () => {
    const [data, setData] = useState([]);

    const callAPI = async () => {
        try {
            const res = await axios.get('/graph/mall');
            console.log(res.data);
            const formattedData = res.data.map(row => ({
                name: row.date, // assuming each row has a date field
                value: [row.mall_key_count, row.auction_key_count, row.review_key_count]
            }));
            setData(formattedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        callAPI();
    }, []);

    const options = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['상품등록수', '경매완료수', '경매입찰수']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: data.map(item => item.name)
        },
        series: [
            {
                name: '상품등록수',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: data.map(item => item.value[0])
            },
            {
                name: '경매완료수',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: data.map(item => item.value[1])
            },
            {
                name: '경매입찰수',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: data.map(item => item.value[2])
            }
        ]
    };

    return (
        <ReactECharts option={options} style={{ height: '30rem', width: '100%' }} />
    )
}

export default MallChart;
