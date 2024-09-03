import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Col, Row } from 'react-bootstrap';

const DiaryChart = () => {
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);

  const callAPI = async () => {
    try {
      const res = await axios.get('/graph/diary');
      const months = Array.from(new Set(res.data.map(row => row.diary_regMonth))).sort();
      const categories = Array.from(new Set(res.data.map(row => row.diary_state)));
      
      const lineArray = [];
      const pieArray = categories.map(category => ({
        name: category,
        value: res.data
          .filter(row => row.diary_state === category)
          .reduce((acc, curr) => acc + curr.diary_count, 0)
      }));

      months.forEach(month => {
        const row = { month };
        categories.forEach(category => {
          const record = res.data.find(row => row.diary_regMonth === month && row.diary_state === category);
          row[category] = record ? record.diary_count : 0;
        });
        lineArray.push(row);
      });

      setLineData(lineArray);
      setPieData(pieArray);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    callAPI();
  }, []);

  const lineOptions = {
    legend: {},
    tooltip: {
      trigger: 'axis',
      showContent: true
    },
    xAxis: {
      type: 'category',
      data: lineData.map(item => item.month)
    },
    yAxis: {
      type: 'value'
    },
    series: Object.keys(lineData[0] || {}).filter(key => key !== 'month').map(category => ({
      name: category,
      type: 'line',
      smooth: true,
      data: lineData.map(item => item[category])
    }))
  };

  const pieOptions = {
    title: {
      text: '카테고리별 수량',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '수량',
        type: 'pie',
        radius: '50%',
        data: pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <Row>
      <Col>
      <ReactECharts option={lineOptions} style={{ height: '400px', width: '100%' }} />
      </Col>
      <Col>
      <ReactECharts option={pieOptions} style={{ height: '400px', width: '100%' }} />
      </Col>
    </Row>
  );
};

export default DiaryChart;
