import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { styled, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Chip } from '@mui/material';
import ReportInsert from '../report/ReportInsert';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useInView } from 'react-intersection-observer';

const StyledCard = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: '25rem',
    height: 'auto',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: theme.shadows[10],
    },
}));

const StyledCol = styled(Col)(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));

const DiaryListPage = ({ user_uid }) => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [checked, setChecked] = useState(0);
    const [size, setSize] = useState(2);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [more, setMore] = useState(true);

    const uid = sessionStorage.getItem("uid");
    const diary_writer = user_uid;

    //다이어리 전체 데이터 
    const callAPI = async (page) => {
        setLoading(true);
        try {
            const res = await axios.get(`/diary/list.json/${diary_writer}?user_uid=${uid}&page=${page}&size=${size}`);
            const data = res.data.documents.map(diary => diary && { ...diary, checked: false });
            setList(prevList => [...prevList, ...data]);
            setCount(res.data.total);
            if (data.length === 0 || data.length < size) {
                setMore(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('데이터를 불러오는 데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        callAPI(page);
    }, [page]);

    //무한스크롤 
    const [ref, inView] = useInView({
        threshold: 0.5
    });

    useEffect(() => {
        if (inView && more && !loading) {
            setPage(prevPage => prevPage + 1);
        }
    }, [inView, more, loading]);

    useEffect(() => {
        let cnt = list.filter(diary => diary.checked).length;
        setChecked(cnt);
    }, [list]);

    const onChangeAll = (e) => {
        const data = list.map(diary => diary && { ...diary, checked: e.target.checked });
        setList(data);
    };

    const onChangeSingle = (e, diary_key) => {
        const isChecked = e.target.checked;
        const data = list.map(diary => diary.diary_key === diary_key ? { ...diary, checked: isChecked } : diary);
        setList(data);
    };

    //일기삭제
    const onClickDelete = async () => {
        if (!window.confirm("선택하신 일기를 삭제하시겠습니까?")) return;
        setLoading(true);
        try {
            const deletePromises = list.filter(diary => diary.checked).map(diary =>
                axios.post(`/diary/delete/${diary.diary_key}`)
            );
            await Promise.all(deletePromises);
            alert(`${deletePromises.length}개 일기가 삭제되었습니다`);
            window.location.href = `/user/read/${uid}`;
            setPage(1);
        } catch (error) {
            console.error('Error deleting diaries:', error);
            alert('일기 삭제에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    //좋아요누르기
    const LikePress = async (diary_key) => {
        setLoading(true);
        try {
            await axios.post(`/diary/like`, { user_uid: sessionStorage.getItem("uid"), diary_key });
            alert("좋아요를 눌렀습니다!");
            callAPI(1); // 첫 페이지부터 다시 불러오기
        } catch (error) {
            console.error('Error liking diary:', error);
            alert("이미 좋아요를 누른 일기입니다.");
        } finally {
            setLoading(false);
        }
    };

    //좋아요취소
    const LikeCancel = async (diary_key) => {
        setLoading(true);
        try {
            await axios.post(`/diary/cancel`, { user_uid: sessionStorage.getItem("uid"), diary_key });
            alert("좋아요가 취소되었습니다");
            callAPI(1); // 첫 페이지부터 다시 불러오기
        } catch (error) {
            console.error('Error canceling like:', error);
            alert("좋아요를 이미 취소한 상태입니다.");
        } finally {
            setLoading(false);
        }
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

    const DiaryRead = (diary_key, uid) => {
        window.location.href = `/diary/read/${diary_key}?user_uid=${uid}`;
    };

    if (loading && page === 1) return <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>;

    return (
        <div>
            <Row className="mb-4">
                {(count !== 0 && sessionStorage.getItem("uid") === user_uid) &&
                    <>
                        <div>
                            <input type="checkbox" onChange={onChangeAll} checked={list.length === checked} className='me-2' /> 전체선택
                        </div>
                        <div className='text-end mb-2'>
                            <Button variant="contained" color="error" onClick={onClickDelete}>선택삭제</Button>
                        </div>
                    </>
                }
            </Row>

            <Row>
                {list.map(d =>
                    <StyledCol lg={4} key={d.diary_key}>
                        <StyledCard style={{ cursor: 'pointer' }}>
                            <CardHeader
                                avatar={
                                    <Avatar src={d.user_img} aria-label="recipe" sx={{ width: 40, height: 40 }} />
                                }
                                action={
                                    sessionStorage.getItem("uid") === user_uid && (
                                        <input
                                            type="checkbox"
                                            onChange={(e) => onChangeSingle(e, d.diary_key)}
                                            checked={d.checked}
                                            className='me-2'
                                        />
                                    )
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
                                onClick={() => DiaryRead(d.diary_key, uid)}
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
                                        <ReportInsert uid={uid} origin={d.diary_key} writer={d.diary_writer} root="diary" />
                                    </IconButton>
                                </div>
                            </CardActions>
                            <CardContent sx={{ paddingBottom: 1, paddingTop: 0 }}>
                                <Typography variant="h6" className='ellipsis'
                                    sx={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: 1 }}>
                                    {d.diary_title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ overflow: "hidden" }}>
                                    <div className='ellipsis'>{d.diary_contents}</div>
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    </StyledCol>
                )}
            </Row>

            {loading && <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>}
            <div ref={ref} />
        </div>
    );
};

export default DiaryListPage;
