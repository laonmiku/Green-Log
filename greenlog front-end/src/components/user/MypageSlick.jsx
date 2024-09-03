import axios from "axios";
import React, { Component, useEffect, useId, useState } from "react";
import { styled, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Chip } from '@mui/material';
import Slider from "react-slick";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import '../user/MypageSlider.css';
import { Row, Col, Button } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';

const MypageSlick = ({ user_img, user_uid }) => {
    const diary_writer = user_uid;
    const uid = sessionStorage.getItem("uid");
    const [diary, setDiary] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log(diary_writer)
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 3
    };

    const settings2 = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const chipColors = {
        "개인컵/텀블러": "#FF6F61", // Coral
        "리필스테이션/개인용기": "#6B5B95", // Slate Blue
        "리사이클링 제작": "#88B04B", // Olive Green
        "전자영수증": "#F7CAC9", // Light Pink
        "친환경 제품구매": "#92A8D1", // Light Blue
        "재활용품 배출": "#F0B27A", // Light Orange
        "전기차 대여": "#E5E8E8", // Light Gray
        "봉사활동/개인 환경활동": "#D5AAFF", // Light Purple
    };

    //일기내용 조회(슬라이더로 목록 만들기)
    const callAPI2 = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`/diary/DiaryTopList/${diary_writer}?uid=${uid}`);

            if (res.data) {
                setDiary(res.data)
                console.log(diary.length)
            }
        } catch (error) {
            console.error('Error data diary:', error);
            alert("데이터를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        callAPI2();
    }, [])

    //좋아요누르기
    const LikePress = async (diary_key) => {
        setLoading(true);
        try {
            await axios.post(`/diary/like`, { user_uid: sessionStorage.getItem("uid"), diary_key });
            alert("좋아요를 눌렀습니다!");
            callAPI2();
        } catch (error) {
            console.error('Error liking diary:', error);
            alert("이미 좋아요를 누른 일기입니다.");
        } finally {
            setLoading(false);
        }
    };

    //좋아요취소
    const LikeCancel = async (diary_key) => {
        setLoading(true)
        try {
            await axios.post(`/diary/cancel`, { user_uid: sessionStorage.getItem("uid"), diary_key });
            alert("좋아요가 취소되었습니다");

            callAPI2();
        } catch (error) {
            console.error('Error canceling like:', error);
            alert("좋아요를 이미 취소한 상태입니다.");
        } finally {
            setLoading(false);
        }
    };

    const StyledCard = styled(Card)(({ theme }) => ({
        width: '100%',
        maxWidth: '25rem',
        height: 'auto',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: theme.shadows[10],

        },

    })
    );

    const StyledCol = styled(Col)(({ theme }) => ({
        marginBottom: theme.spacing(3),
    }));

    const DiaryRead = (diary_key, user_uid) => {
        window.location.href = `/diary/read/${diary_key}?user_uid=${user_uid}`;
    }

    if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>;
    return (
        <div className="slider-container">
            <Slider
                style={{ cursor: 'pointer' }}
                {...(diary.length <= 2   ? {...settings2} : {...settings})}>
                {diary && diary.map(d =>
                    <StyledCol lg={3} key={d.diary_key}>
                        <StyledCard>
                            <CardHeader
                                avatar={
                                    <Avatar src={user_img} aria-label="recipe" sx={{ width: 40, height: 40 }} />
                                }

                                title={<Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                                    <a href={`/user/read/${d.diary_writer}`} style={{ textDecoration: 'none', color: 'inherit' }}>{d.diary_writer}</a>
                                </Typography>}
                                subheader={d.fmtUdate ? `${d.fmtDdate}` : `${d.fmtUdate}[수정됨]`}
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                src={d.diary_thumbnail || "http://via.placeholder.com/100x100"}
                                alt={d.diary_title}
                                onClick={() => DiaryRead(d.diary_key, user_uid)}
                            />
                            <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Chip
                                    label={d.diary_state}
                                    style={{ backgroundColor: chipColors[d.diary_state] || "#6B5B95", color: "#fff" }}
                                />
                                <div>
                                    <IconButton
                                        aria-label={d.ucnt === 0 ? "like" : "unlike"}
                                        onClick={() => d.ucnt === 0 ? LikePress(d.diary_key) : LikeCancel(d.diary_key)}
                                        sx={{ fontSize: 18 }}
                                    >
                                        {d.ucnt === 0 ? <FaRegThumbsUp /> : <FaThumbsUp />}
                                    </IconButton>
                                </div>
                            </CardActions>
                            <CardContent sx={{ paddingBottom: 1, paddingTop: 0 }}>
                                <Typography variant="h6" sx={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: 1 }}>
                                    <div className="ellipsis">{d.diary_title}</div>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ overflow: "hidden" }}>
                                    <div className='ellipsis'>{d.diary_contents}</div>
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    </StyledCol>
                )}
            </Slider>
        </div>
    )

}

export default MypageSlick