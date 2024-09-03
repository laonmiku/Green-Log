import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import './DiarySlickSlider.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const DiarySlickSlider = ({ diary, setDiary }) => {
    console.log(diary);
    const { diary_key } = useParams();
    const [loading, setLoading] = useState(false);


    //현재저장된 사진 가져오기
    const [photo, setPhoto] = useState([]);

    const callAttach = async () => {
        setLoading(true)
        try{
            const res2 = await axios.get(`/diary/attach/${diary_key}`);
            console.log(res2.data);
            setPhoto(res2.data);
        } catch (error) {
            console.error('Error deleting diaries:', error);
            alert('사진 데이터 불러오는데 실패했습니다.');
        }finally{
            setLoading(false);
        }
        
    }

    useEffect(() => {
        callAttach();
    }, []);

    const settings = {
        dots: false,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false
    };

    if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>;
    return (
        <Slider {...settings}>
            {photo.length > 0 ? (
                photo.map((p) => (
                    <img
                        src={p.diaryPhoto_filename}
                        key={p.diaryPhoto_key}
                        className="slider-image"
                        alt="Diary"
                        width={"100%"}
                    />
                ))
            ) : (
                <img
                    src="http://via.placeholder.com/100x100" 
                    className="slider-image"
                    alt="Placeholder"
                />
            )}
        </Slider>
    )
}

export default DiarySlickSlider