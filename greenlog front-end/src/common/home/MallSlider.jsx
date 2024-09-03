import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Typography, Divider } from 'antd';
const { Meta } = Card;
const { Title } = Typography;

const MallSlider = () => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(8);
    const [count, setCount] = useState(0);
    const [orderBy, setOrderBy] = useState('desc');
    const [key, setKey] = useState('mall_title');
    const [word, setWord] = useState('');
    const callAPI = async () => {
        const res = await axios.get(`/mall/list?key=${key}&word=${word}&page=${page}&size=${size}&orderBy=${orderBy}`);
        setList(res.data.documents);
        setCount(res.data.total);
    }
    const { Meta } = Card;
    useEffect(() => { callAPI(); }, [])
    return (
        <div className='mt-5'>
            <Divider orientation="center">
                <Title level={3} style={{ textAlign: 'center' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                        새로 올라온 피망
                        <img
                            src="/images/pmang1.png" // 텍스트 사이에 들어갈 이미지 URL
                            alt="icon"
                            style={{ height: '3rem', objectFit: 'contain', margin: '0 10px', verticalAlign: 'middle' }}
                        />
                    </span>
                </Title>
            </Divider>
            <Row gutter={16} justify="center">
                {list.map(card => (
                    <Col
                        key={card.mall_key}
                        xs={24}
                        sm={12}
                        md={8}
                        lg={6}
                        style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}
                    >
                        <Card
                            hoverable
                            style={{ width: '17rem', height: '15rem', margin: '0.5rem', display: 'flex', flexDirection: 'column' }}
                            cover={
                                <a href={`/mall/read/${card.mall_key}`} style={{ display: 'block', height: '10rem', overflow: 'hidden' }}>
                                    <img
                                        alt="mall"
                                        src={card.mall_photo ? card.mall_photo : "http://via.placeholder.com/100x100"}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </a>
                            }
                        >
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', textAlign: 'center' }}>
                                <Meta
                                    title={`[${card.mall_key}] ${card.mall_title}`}
                                    style={{ fontSize: '0.75rem', margin: 0 }}
                                />
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default MallSlider