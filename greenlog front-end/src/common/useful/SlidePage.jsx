import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";

const SlidePage = () => {
    const [thumb, setThumb] = useState([]);
    const items = [
       '/images/sorry.png',  
        '/images/sorry.png',
        '/images/sorry.png',
        '/images/sorry.png'
    ];

    const callAPI= async ()=>{
       // const res= await axios.get('/goods/list/attach/all')
        //setThumb(res.data);
        
    }

    useEffect(()=>{
        
    },[])

    console.log(thumb);

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        waitForAnimate: false
      };

    return (
            <Slider {...settings}>
            {/* {thumb.map(img=>
                <img src={img.filename} key={img.aid} className="slider-image"/>
            )} */}
                
                 {items.map((index)=>
                <img key={index} className="slider-image" />
            )} 
            </Slider>
    );
}

export default SlidePage