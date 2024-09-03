import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Rating } from '@mui/material';
import axios from 'axios';
import { TbBrandSnapseed } from "react-icons/tb";
import { useParams } from 'react-router-dom';

const ReviewReadPage = ({ mall_key }) => {
    const [review, setReview] = useState({
        review_mall_key: mall_key,
        review_writer: sessionStorage.getItem('uid'),
        review_rating: 0,
        review_contents: '',
        fmtdate: '',
        fmtudate: '',
        user_img: '',
        user_nickname: '',
        user_uid: ''
    });

    const { review_key } = useParams();
    const uid = sessionStorage.getItem("uid");
    console.log(review_key)
    const callAPI = async () => {
        const res = await axios.get(`/review/read/${review_key}`);
        setReview(res.data);
    };

    useEffect(() => {
        callAPI();
    }, []);

    const { review_rating, review_contents, fmtdate, fmtudate, user_img, user_nickname, user_uid } = review;

    return (
        <div className="mt-3">
            <Row className='justify-content-center'>
                <Col xs={12} md={8} lg={6}>
                    <Card className="mb-3">
                        <Card.Header className="d-flex align-items-center">
                            <img
                                src={user_img || "http://via.placeholder.com/70x70"}
                                alt="User"
                                className="rounded-circle me-3"
                                style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                            />
                            <div>
                                <h5 className="mb-1">{user_nickname} ({user_uid})</h5>
                                <small className="text-muted">{fmtudate || fmtdate}</small>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Row className="mb-3">
                                <Col>
                                    <Rating
                                        name='point'
                                        value={review_rating}
                                        precision={1}
                                        max={10}
                                        size='large'
                                        icon={<TbBrandSnapseed style={{ color: "brown" }} />}
                                        emptyIcon={<TbBrandSnapseed />}
                                        readOnly
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className="mb-0">{review_contents}</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ReviewReadPage;
