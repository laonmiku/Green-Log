import React, { useEffect, useState } from 'react'
import { Row, Col, InputGroup, Form, Button } from 'react-bootstrap'
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { BsTrash } from "react-icons/bs";
import DiarySlickSlider from './DiarySlickSlider';
import { styled, CardContent, Card, Chip } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';



const DiaryReadPage = () => {
    const [loading, setLoading] = useState(false);
    const [diary, setDiary] = useState({
        diary_contents: "",
        diary_title: "",
        diary_regDate: "",
        diary_state: "",
        diary_uDate: ""
    });
    const { diary_key } = useParams();
    const uid = sessionStorage.getItem("uid");

    //일기데이터불러오기
    const callAPI = async () => {
        setLoading(true);
        try{
            const res = await axios.get(`/diary/read/${diary_key}?user_uid=${uid}`)
            console.log(res.data);
            setDiary(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('데이터를 불러오는 데 실패했습니다.');
        } finally {
            setLoading(false);
        }
        
    }

    const { diary_contents, diary_title, fmtDdate, fmtUdate, ucnt, fcnt, diary_state, diary_writer } = diary;

    useEffect(() => {
        callAPI();
    }, []);

    //좋아요누르기
    const LikePress = async (diary_key) => {
        setLoading(true)
        try {
            await axios.post(`/diary/like`, { user_uid: sessionStorage.getItem("uid"), diary_key });
            if (ucnt === 1) {
                alert("이미 좋아요를 누른 일기입니다.")
            } else {
                alert("좋아요를 눌렀습니다!");
                callAPI();
            }
        } catch (error) {
            console.error('Error liking diary:', error);
            alert("이미 좋아요를 누른 일기입니다.");
        } finally {
            setLoading(false);
        }

    }

    //좋아요취소
    const LikeCancel = async (diary_key) => {
        if (diary_key === "") {
            setLoading(true);
        } else {
            try {
                await axios.post(`/diary/cancel`, { user_uid: sessionStorage.getItem("uid"), diary_key });
                if (ucnt === 0) {
                    alert("좋아요를 이미 취소한 상태입니다.");
                } else {
                    alert("좋아요가 취소되었습니다");
                    callAPI();
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error canceling like:', error);
                alert("좋아요를 이미 취소한 상태입니다.");
            } finally {
                setLoading(false);
            }

        }
    }

    //일기삭제
    const onClickDelete = async (diary_key) => {
        if (!window.confirm("선택하신 일기를 삭제하시겠습니까?")) return;
        setLoading(true)
        try{
            await axios.post(`/diary/delete/${diary_key}`);
            alert("일기삭제완료")
            window.location.href = `/user/read/${uid}`;
        } catch (error) {
            console.error('Error deleting diaries:', error);
            alert('일기 삭제에 실패했습니다.');
        }finally{
            setLoading(false);
        }
       
    }


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

    if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>;
    return (
        <div>
            <Row className='justify-content-center my-5'>
                <Col lg={6}>
                    <Card>
                        <CardContent>
                            <Row>
                                <Col className='mb-2' lg={8} style={{ whiteSpace: "pre-line" }}>
                                    <h3>{diary_title}</h3>
                                </Col>
                                <Col lg={4}>
                                    {uid === diary_writer &&
                                        <div className='text-end'>
                                            <Link to={`/diary/update/${diary_key}`}><IoSettingsOutline style={{ fontSize: "35px" }} className='me-3' /></Link>
                                            <BsTrash style={{ fontSize: "35px", cursor: "pointer" }} onClick={() => onClickDelete(diary_key)} />
                                        </div>}
                                </Col>
                                <hr />
                                <div className='text-center mb-3'>
                                    <DiarySlickSlider diary={diary} setDiary={setDiary} />
                                </div>
                                <hr />
                                <Col>
                                    <Row>
                                        <Col>
                                            <Chip
                                                label={diary_state}
                                                style={{ backgroundColor: chipColors[diary_state] || "#6B5B95", color: "#fff" }}
                                            />
                                        </Col>
                                        <Col>
                                            <div className='text-end' style={{ cursor: "pointer" }}>
                                                {ucnt === 0 ? <FaRegThumbsUp style={{ fontSize: "20px" }} onClick={() => LikePress(diary_key)} /> :
                                                    <FaThumbsUp style={{ fontSize: "20px" }} onClick={() => LikeCancel(diary_key)} />}
                                                {fcnt}
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className='mb-3, mt-3' style={{ whiteSpace: "pre-wrap" }}>
                                        <span>{diary_contents}</span>
                                    </div>
                                    <hr />
                                </Col>
                                <span>등록일: {fmtDdate}</span>
                                {fmtDdate===fmtUdate ? "" : <span>수정일: {fmtUdate}</span>}
                            </Row>
                        </CardContent>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default DiaryReadPage