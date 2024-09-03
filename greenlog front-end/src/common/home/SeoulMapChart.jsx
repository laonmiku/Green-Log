import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import axios from 'axios';

const SeoulMapChart = () => {
    const [geoJSON, setGeoJSON] = useState(null);
    const [airQualityData, setAirQualityData] = useState([]);
    const [error, setError] = useState(null); // 오류 상태를 나타내는 상태 변수 추가

    const callAPI = async (date) => {
        try {
            const res = await axios.get('/api/air');
            const data = res.data.response.body.items.map(item => ({
                region: item.stationName,
                value: parseFloat(item.khaiValue)
            }));
            setAirQualityData(data);
        } catch (error) {
            console.error('API 호출 오류:', error);
            setError(error); // 오류 발생 시 상태 변수 업데이트
        }
    }

    useEffect(() => {
        const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD 형식의 문자열
        callAPI(currentDate);
    }, []);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/southkorea/seoul-maps/master/kostat/2013/json/seoul_municipalities_geo.json')
            .then((response) => response.json())
            .then((data) => {
                echarts.registerMap('Seoul', data);
                setGeoJSON(data);
            })
            .catch((error) => {
                console.error('Error fetching GeoJSON:', error);
                setError(error); // 오류 발생 시 상태 변수 업데이트
            });
    }, []);

    const seriesData = geoJSON?.features.map(feature => {
        const regionName = feature.properties.name.replace(' ', '');
        const airQuality = airQualityData.find(item => item.region === regionName);
        return {
            name: regionName,
            value: airQuality ? airQuality.value : 0 // 해당 지역의 대기정보 값을 설정
        };
    });

    const option = {

        title: {
            text: 'Seoul Air Quality Map', // 제목 설정
            left: 'center', // 제목을 가운데 정렬
            top: 50, // 위에서부터 20px 아래로 설정
            textStyle: {
                fontSize: 20, // 제목 글자 크기
                fontWeight: 'bold' // 제목 글자 두께
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}'
        },
        visualMap: {
            min: 0,
            max: 100, // 대기정보 값의 최대값에 맞게 설정
            left: 'left',
            top: 'bottom',
            text: ['High', 'Low'],
            itemWidth: 20, // 너비 조절
            itemHeight: 80, // 높이 조절
            calculable: true,
            inRange: {
                color: ['#50a3ba', '#eac736', '#d94e5d']
            }
        },
        series: [
            {
                type: 'map',
                map: 'Seoul',
                roam: true,
                label: {
                    show: true,
                    formatter: '{b}'
                },
                itemStyle: {
                    normal: {
                        areaColor: '#c9e6ff',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#ff9933'
                    }
                },
                data: seriesData
            }
        ]
    };

    if (error) {
        return <div>오류가 발생했습니다: {error.message}</div>;
    }

    return (
        geoJSON ?
            <div>
                <ReactECharts option={option} style={{ height: '30rem', width: '100%' }} />
            </div>
            : <div>Loading...</div>
    );
}

export default SeoulMapChart;