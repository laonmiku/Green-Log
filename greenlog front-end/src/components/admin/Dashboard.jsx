import React, { useContext, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Row, Col } from 'react-bootstrap';
import { Card } from 'primereact/card';
import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography, Chip, Stack, Box, Badge } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../user/UserContext';
import DiaryChart from './DiaryChart';
import MallChart from './MallChart';
import { RiAwardFill } from 'react-icons/ri';
import './AdminPage.css'
import dashboard from './dashboard.png'
import CircularProgress from '@mui/material/CircularProgress';


const Dashboard = () => {
    const [reportCount, setReportCount] = useState('');
    const [askCount, setAskCount] = useState('');
    const [qaCount, setQaCount] = useState('');
    const { userData } = useContext(UserContext);
    const [rank, setRank] = useState([]);
    const [loading, setLoading] = useState(false);

    const callAPI = async () => {
        setLoading(true)
        try{
            const res = await axios.get("/report/count");
            const res1 = await axios.get("/chat/listCount");
            const res2 = await axios.get("/qa/qaListCount");
            const res3 = await axios.get("/graph/rank");
            setAskCount(res1.data);
            setReportCount(res.data);
            setQaCount(res2.data);
            setRank(res3.data);
            console.log(res3.data);
        }catch (error) {
            console.error('Error data diary:', error);
            alert("데이터를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
        
    };

    useEffect(() => {
        callAPI();
    }, []);

    const tasks = [
        { count: reportCount, link: "/admin/question#notice", label: "신고접수", icon: "pi pi-exclamation-triangle" },
        { count: askCount, link: "/admin/question#1:1", label: "1:1 문의", icon: "pi pi-comments" },
        { count: qaCount, link: "/admin/question#qa", label: "Q&A 답변하기", icon: "pi pi-question-circle" }
    ];

    if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>;
    return (
        <div>
            <Row>
                <Col lg={2}>
                    <Sidebar />
                </Col>
                <Col>
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                        <img src={dashboard} alt="car" style={{ width: '100%', maxWidth: '800px' }} />
                    </div>
                    <div className='mb-3'><h4>오늘의 할일</h4></div>
                    <div className='today text-center mb-5'>
                        <div className="p-grid p-justify-center small-card-grid">
                            {tasks.map((task, index) => (
                                <div key={index} className="small-card-col">
                                    <Card className="card action-card small-card">
                                        <div className="p-d-flex p-flex-column p-ai-center">
                                            <Badge badgeContent={task.count} color="secondary">
                                                <i className={`${task.icon} p-mb-3`} style={{ fontSize: '2em' }}></i>
                                            </Badge>
                                            <Link to={task.link} className="task-link">
                                                <h3>{task.label}</h3>
                                            </Link>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='chart text-center mb-5'>
                        <Row>
                            <div className='mb-5'>Clover Diary Chart</div>
                            <Col><Card><DiaryChart /></Card></Col>
                        </Row>
                    </div>
                    <div>
                        <Row>
                            <Col lg={5}>
                                <Card className="mb-3" style={{ height: "570px", overflowY: "scroll" }}>
                                    <div className='mb-2'>씨드포인트 이번달 랭킹</div>
                                    {rank.map(r => (
                                        <div key={r.seed_uid}>
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Box>
                                                        <Typography variant="h6"><b>{r.ranked}</b></Typography>
                                                        <RiAwardFill style={{ fontSize: '25px' }} />
                                                    </Box>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        <Box>
                                                            <Row className='justify-content-center'>
                                                                <Col xs={10} md={9} lg={8}>
                                                                    <Typography variant="body1">{r.seed_uid}({r.user_nickname})님</Typography>
                                                                    <Stack direction="row" spacing={1}>
                                                                        {r.user_auth === '일반회원' ?
                                                                            <Chip label="일반회원" color="primary" size="small" /> :
                                                                            <Chip label="우수회원" color="success" size="small" />
                                                                        }
                                                                    </Stack>
                                                                </Col>
                                                                <Col xs={2} md={3} lg={4}>
                                                                    <Link to={`/user/admin/update/${r.seed_uid}`}>
                                                                        <Avatar alt={r.seed_uid} src={r.user_img} width="100%" />
                                                                    </Link>
                                                                </Col>
                                                            </Row>
                                                        </Box>}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                <br />
                                                                {r.seed_point}씨드
                                                            </Typography>
                                                            <hr />
                                                        </React.Fragment>

                                                    }
                                                />
                                            </ListItem>
                                        </div>
                                    ))}
                                </Card>
                            </Col>
                            <Col lg={7}>
                                <Card className="mb-3">
                                    <div>Mall Chart</div>
                                    <MallChart />
                                </Card>
                            </Col>
                        </Row>

                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;
