import React from 'react'
import Slider from "react-slick";
import O3Chart from './O3Chart';
import SeoulMapChart from './SeoulMapChart';

const MainSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
    <Slider {...settings}>
        <div>
        <SeoulMapChart/>
        </div>
        <div>
          <O3Chart/>
        </div>
      </Slider>
  )
}

export default MainSlider