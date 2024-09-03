import React, { useEffect, useState } from 'react'
import { CardContent, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Col, Row, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';
import Slider from "react-slick";


const SellerInfo = ({ mall_seller }) => {
    const { mall_key } = useParams();
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(6);
    const [key, setKey] = useState('mall_seller');
    const [word, setWord] = useState(mall_seller);
    const [form, setForm] = useState({});
    const [orderBy, setOrderBy] = useState('desc');
    

    
    const callAPI = async () => {
        setLoading(true);

        const res = await axios.get(`/mall/read/${mall_key}`);
        //console.log("****************************", res.data);
        setForm(res.data); //기본정보

        const res2 = await axios.get(`/mall/list?key=${key}&word=${word}&page=${page}&size=${size}&orderBy=${orderBy}`)
        //console.log("ListPage : "+ JSON.stringify(res.data));
        setList(res2.data.documents);//슬라이드할 유저가 올린 테이블리스트

        setLoading(false);
    }

    
    useEffect(() => {
        callAPI();
    }, [page])

    const sellerList = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };
    const photoST = {
        width: "100px",
        height: "100px"
    }

    if (loading) return <h1 className='text-center'>로딩중...</h1>
    return (
        <>
            <Card variant="outlined" className='mt-5'>
                <CardContent className='report_parent'>
                    <Row >
                        <Col className="d-flex justify-content-center align-items-center" xs={4} md={4} lg={4} >
                            <Avatar alt="User Profile" src="/path/to/profile-image.jpg" sx={{ width: 100, height: 100, marginBottom: 2 }} />
                        </Col>
                        <Col>
                            <Typography variant="h5" component="div" gutterBottom>
                                {form.mall_seller} ({form.user_nickname})
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                내린온도?
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {form.user_address1}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                뭐넣지,,
                            </Typography>
                        </Col>
                    </Row>
                </CardContent>
            </Card>
            <div className='report_child '>신고신고고고</div>
            <div className='mt-5'>
                <Row>
                    <div>
                        <Slider {...sellerList}>
                            {list &&
                                list.map(list => (
                                    <div className='mx-5'>
                                        <Card className="mx-3">
                                            <Card.Body>
                                                <Card.Title><img style={photoST} src={list.mall_photo ? list.mall_photo : "http://via.placeholder.com/100x100"} /></Card.Title>
                                                <Card.Text className='ellipsis'>
                                                    <Link to={`/mall/read/${list.mall_key}`}>[{list.mall_key}]{list.mall_title}</Link>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                        </Slider>
                    </div>
                </Row>
            </div>

        </>
    )
}

export default SellerInfo