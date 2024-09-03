import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

const O3Chart = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const oneWeekAgo = new Date(yesterday);
    oneWeekAgo.setDate(yesterday.getDate() - 6);

    const formattedYesterday = yesterday.toISOString().slice(0, 10).replace(/-/g, '');
    const formattedOneWeekAgo = oneWeekAgo.toISOString().slice(0, 10).replace(/-/g, '');

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const callAPI = async () => {
        setIsLoading(true);
        setHasError(false);
        try {
            const res = await axios.get('/api/o3', {
                params: {
                    inqBginDt: formattedOneWeekAgo,
                    inqEndDt: formattedYesterday,
                    msrstnName: '강남구'
                }
            });
            let array = [];
            array.push(['Date', 'O3', 'SO2', 'CO', 'NO2']);
            res.data.response.body.items.forEach(row => {
                const date = new Date(row.msurDt);
                const fmtDate = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                array.push([
                    fmtDate, 
                    parseFloat(row.o3Value), 
                    parseFloat(row.so2Value), 
                    parseFloat(row.coValue), 
                    parseFloat(row.no2Value)
                ]);
            });
            setData(array);
        } catch (error) {
            console.error('Error fetching data:', error);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const options = {
        title: '지난 일주일간의 금천구 대기변화',
        titleTextStyle: {
            fontSize: 18,
            bold: true,
            textAlign: 'center',
        },
        chartArea: {
            width: '80%',
            height: '70%',
            top: '100',
        },
        series: {
            1: { curveType: 'function' },
        },
    };

    useEffect(() => {
        callAPI();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
    }

    if (hasError) {
        return <img src="images/sorry.png" alt="Sorry" style={{width:"25rem"}} />; // 오류 발생 시 대체 이미지 표시
    }

    return (
        <Chart
            chartType="LineChart"
            width="100%"
            height="25rem"
            data={data}
            options={options}
        />
    );
}

export default O3Chart;
