import React, { useEffect, useState } from 'react'
import { Row, Col, InputGroup, Form } from 'react-bootstrap';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import Sidebar from './Sidebar'
import axios from 'axios';
import Pagination from 'react-js-pagination';
import { TbBrandSnapseed } from "react-icons/tb";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import seedwallet from './seedwallet.png'
import CircularProgress from '@mui/material/CircularProgress';

const AdminSeedPage = () => {
    const [list, setList] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [key, setKey] = useState('id');
    const [word, setWord] = useState("");
    const [loading, setLoading] = useState(false);

    const callAPI = async () => {
        setLoading(true)
        try{
            const res = await axios.get(`/seed/list?key=${key}&word=${word}&page=${page}&size=${size}`)
            setList(res.data.doc);
            setCount(res.data.total);
            console.log(res.data)
        }catch (error) {
            console.error('Error data diary:', error);
            alert("데이터를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
       
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(word===""){
            alert("검색어를 입력하세요");
            return;
        }
        setPage(1);
        callAPI();
    }

    useEffect(() => {
        callAPI();
    }, [page]);

    if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>;
    return (
        <div>
            <Row className='justify-content-center mt-3'>
                <Row>
                    <Col md={3} lg={2}>
                        <Sidebar />
                    </Col>
                    <Col>
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '5px 0' }}>
                        <img src={seedwallet} alt="car" style={{ width: '100%', maxWidth: '800px' }} />
                    </div>
                        <Row className='justify-content-center'>
                            <Col lg={5}>
                            <form onSubmit={onSubmit}>
                                <InputGroup>
                                    <Form.Control name="word" value={word} onChange={(e) => setWord(e.target.value)} />
                                    <Button variant="contained" color='success' type="submit" size="sm">검색</Button>
                                </InputGroup>
                            </form>
                            </Col>
                        </Row>
                        <Row className='justify-content-center mt-5'>
                            <Col lg={8}>
                                {list.map(seed =>
                                    <Card
                                        sx={{
                                            maxWidth: '100%',
                                            borderRadius: '16px',
                                            boxShadow: 3,
                                            margin: '16px',
                                            overflow: 'visible',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <CardContent
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '100%',
                                                textAlign: 'center'
                                            }}
                                        >
                                            <Avatar
                                                src={seed.user_img || "http://via.placeholder.com/70x70"}
                                                sx={{ width: 70, height: 70, marginRight: 2 }}
                                            />
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    component="div"
                                                    sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                                                >
                                                    {seed.user_uname} ({seed.user_nickname})님의 씨앗지갑
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ fontSize: '0.875rem' }}
                                                >
                                                    현재 보유중인 씨앗은
                                                    <Typography
                                                        component="span"
                                                        sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'brown' }}
                                                    >
                                                        {seed.seed_point} <TbBrandSnapseed style={{ fontSize: '15px', color: 'brown', verticalAlign: 'middle' }} />
                                                    </Typography>
                                                    입니다
                                                </Typography>
                                                <Link to={`/user/wallet/${seed.seed_uid}`}> <Button variant="contained" color='success' size="sm">거래내역 {seed.seed_uid}</Button></Link>

                                            </Box>
                                        </CardContent>
                                    </Card>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </Row>
            {count > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={count}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(e) => setPage(e)}
                />
            }
        </div>
    )
}

export default AdminSeedPage