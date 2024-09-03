import React from 'react'
import Slider from "react-slick";

const ProjectSlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };

    const sliderImageStyle = {
        display: 'flex',
        justifyContent: 'center',
    };

    const imageStyle = {
        width: '15rem',
        height: '15rem',
        borderRadius: '50%',
    };

    const textStyle = {
        marginTop: '0.5rem',
       fontWeight: 'bold'
    };
    return (
        <div className="slider-container mt-5">
            <Slider {...settings}>
                <div className="text-center">
                    <div style={sliderImageStyle}>
                        <img style={imageStyle} src='/images/plastic.jpg' alt="Plastic" />
                    </div>
                    <div style={textStyle}>ZERO PLASTIC</div>
                </div>
                <div className="text-center">
                    <div style={sliderImageStyle}>
                        <img style={imageStyle} src='/images/ecocar.jpg' alt="Eco Car" />
                    </div>
                    <div style={textStyle}><span>ECO DRIVING</span></div>
                </div>
                <div className="text-center">
                    <div style={sliderImageStyle}>
                        <img style={imageStyle} src='/images/recycling.jpg' alt="Recycling" />
                    </div>
                    <div style={textStyle}><span>RECYCLING</span></div>
                </div>
                <div className="text-center">
                    <div style={sliderImageStyle}>
                        <img style={imageStyle} src='/images/upcycling.jpg' alt="Upcycling" />
                    </div>
                    <div style={textStyle}><span>UPCYCLING</span></div>
                </div>
            </Slider>
        </div>
    )
}

export default ProjectSlider