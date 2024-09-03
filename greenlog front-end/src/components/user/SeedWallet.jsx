import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Table } from 'react-bootstrap'
import TradeListPage from '../trade/TradeListPage'
import axios from 'axios'
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { TbBrandSnapseed } from 'react-icons/tb';
import { useParams } from 'react-router-dom';

const SeedWallet = () => {
    const { uid } = useParams();
    const [form, setForm] = useState({
        seed_point: '',
        seed_uid: '',
        user_img: '',
        user_nickname: '',
        user_uid: '',
        user_uname: '',
        seed_number: ''
    })
    const { seed_number, seed_point, seed_uid, user_img, user_nickname, user_uid, user_uname } = form;
    const callAPI = async () => {
        const res = await axios.get(`/seed/read/${uid}`)
        //console.log(res.data);
        setForm(res.data);
    }
    useEffect(() => { callAPI() }, [])
    
      
    return (
        <div>
            <Row className='justify-content-center mt-5'>
                <Col xs={10}>
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
                                src={user_img || "http://via.placeholder.com/70x70"}
                                sx={{ width: 70, height: 70, marginRight: 2 }}
                            />
                            <Box>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                                >
                                    {user_uname} ({user_nickname})님의 씨앗지갑
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
                                        {seed_point} <TbBrandSnapseed style={{ fontSize: '15px', color: 'brown', verticalAlign: 'middle' }} />
                                    </Typography>
                                    입니다
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    <TradeListPage seed_number={seed_number} />
                </Col>
            </Row>
        </div >
    )
}

export default SeedWallet