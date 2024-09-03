import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts';


const PieChart = () => {

    const [data ,setData]= useState();
    const callAPI= async ()=>{
       const res= await axios.get('/graph/showBrand')
       console.log(res.data)
       let array=[];
       array.push(['브랜드','수량'])
       res.data.forEach(row=>array.push([`${row.brand}`, parseFloat(row.count)]))
       setData(array);
    }

    useEffect(()=>{
    },[])

    // const data = [
    //     ["Year", "Sales", "Expenses", "Profit"],
    //     ["2014", 1000, 400, 200],
    //     ["2015", 1170, 460, 250],
    //     ["2016", 660, 1120, 300],
    //     ["2017", 1030, 540, 350],
    // ];

    const options = {
        chart: {
            title: "브랜드별 상품수량",
            subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
    };
    return (
        <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
        />
    )
}

export default PieChart
