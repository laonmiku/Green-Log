import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Col } from 'react-bootstrap';
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa'; // FaRegThumbsUp 제거
import Slider from 'react-slick';
import ReportInsert from '../report/ReportInsert';
import { styled, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, Chip } from '@mui/material';
import { Favorite, MoreVert as MoreVertIcon } from '@mui/icons-material'; // 수정
import { Divider } from 'antd';

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

const StyledCard = styled(Card)(({ theme }) => ({
    width: '25rem',
    height: '27rem',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: theme.shadows[10],
    },
}));

const FollowingDiaryList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [size, setSize] = useState(10);
    const [page, setPage] = useState(1);

    let root = "diary"
    let sliderRef = useRef(null);
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        cssEase: "linear"
    }

    let user_uid = sessionStorage.getItem("uid")

    const callAPI = async () => {
        if (!user_uid) {
            user_uid = "ghost"
            const res2 = await axios.get(`/user/AdminDiaryList/${user_uid}?page=${page}&size=${size}`)
            setList(res2.data)
        } else {
            const res = await axios.get(`/user/followingDiaryList/${user_uid}?page=${page}&size=${size}`)
            if (res.data.length === 0 || res.data === null) {
                const res1 = await axios.get(`/user/AdminDiaryList/${user_uid}?page=${page}&size=${size}`)
                setList(res1.data)
            } else {
                setList(res.data)
            }
        }
        //console.log(res.data)
    }
    useEffect(() => { callAPI() }, [])


    const LikePress = async (diary_key) => {
        await axios.post(`/diary/like`, { user_uid: sessionStorage.getItem("uid"), diary_key });
        if (list.ucnt === 1) {
            alert("이미 좋아요를 누른 일기입니다.")
        } else {
            alert("좋아요를 눌렀습니다!");
            callAPI();
            setLoading(false);
        }

    }

    const LikeCancel = async (diary_key) => {
        if (diary_key === "") {
            setLoading(true);
        } else {
            await axios.post(`/diary/cancel`, { user_uid: sessionStorage.getItem("uid"), diary_key });
            if (list.ucnt === 0) {
                alert("좋아요를 이미 취소한 상태입니다.")
            } else {
                alert("좋아요가 취소되었습니다");
                callAPI();
                setLoading(false);
            }
        }
    }
    return (
        <div className="slider-container">
            <Divider orientation="center">
                <Typography variant="h5" component="div" align="center" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                    {user_uid ?
                        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                            내 친구의
                            <img
                                src="/images/green.png"
                                alt="icon"
                                style={{ height: '2.5rem', objectFit: 'contain', margin: '0 10px', verticalAlign: 'middle' }}
                            />
                        </span>
                        :
                        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                            오늘의 추천
                            <img
                                src="/images/green.png"
                                alt="icon"
                                style={{ height: '2rem', objectFit: 'contain', margin: '0 10px', verticalAlign: 'middle' }}
                            />
                        </span>
                    }
                </Typography>
            </Divider>
            <Slider ref={sliderRef} {...settings}>
                {list.map(d => (
                    <div key={d.diary_key}>
                        <Col lg={12}>
                            <StyledCard className='mt-2'>
                                <CardHeader
                                    avatar={
                                        <Avatar src={d.user_img} aria-label="recipe" sx={{ width: 40, height: 40 }} />
                                    }
                                    action={
                                        <IconButton aria-label="settings" sx={{ marginLeft: 'auto' }}>
                                            <MoreVertIcon />
                                        </IconButton>
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
                                        <IconButton aria-label="report" sx={{ fontSize: 18 }}>
                                            <ReportInsert uid={user_uid} origin={d.diary_key} writer={d.diary_writer} root={root} />
                                        </IconButton>
                                    </div>
                                </CardActions>
                                <CardContent sx={{ paddingBottom: 1, paddingTop: 0 }}>
                                    <Typography variant="h6" sx={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: 1 }}>
                                        {d.diary_title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ overflow: "hidden" }}>
                                        <div className='ellipsis'>{d.diary_contents}</div>
                                    </Typography>
                                </CardContent>
                            </StyledCard>
                        </Col>
                    </div>
                ))}
            </Slider>
        </div>

    )
}

export default FollowingDiaryList