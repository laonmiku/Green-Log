import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { Rating } from '@mui/material';
import axios from 'axios';
import { TbBrandSnapseed } from "react-icons/tb";
import './ReviewInsertPage.css';
import Button from '@mui/material/Button';

const InsertPage = ({ mall_key, mall_seller, mall_tstate }) => {
    const uid = sessionStorage.getItem('uid');

    const [form, setForm] = useState({
        review_mall_key: mall_key,
        review_writer: sessionStorage.getItem('uid'),
        review_rating: 0,
        review_contents: '',
    });

    const { review_rating, review_contents } = form;
    const [onCancel, setOnCancel] = useState(false);

    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setOnCancel(true);
    };

    const onClickCancel = () => {
        setForm({ ...form, review_rating: 0, review_contents: '' });
        setOnCancel(false);
    };

    const Focus = () => {
        const uid = sessionStorage.getItem('uid');
        if (!uid) {
            window.location = "/user/login";
        } else {
            setOnCancel(true);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const uid = sessionStorage.getItem('uid');
        if (uid === mall_seller) {
            alert("자신의 게시글에는 리뷰를 남길 수 없습니다.");
            return;
        }
        if (!uid) {
            alert("로그인이 필요합니다.");
            return;
        }

        if (review_contents === '' && review_rating === 0) {
            alert("리뷰나 포인트를 작성해주세요.");
            return;
        }
        if (!window.confirm("리뷰를 등록하실래요?")) return;
        try {
            await axios.post('/review/insert', form);
            alert('리뷰가 등록되었습니다.');
            setForm({
                review_mall_key: mall_key,
                review_writer: sessionStorage.getItem('uid'),
                review_rating: 0,
                review_contents: ''
            });
            window.location.href = `/mall/read/${mall_key}`
            setOnCancel(false);
        } catch (error) {
            alert('이미 리뷰를 등록하셨습니다.');
            setForm({
                review_mall_key: mall_key,
                review_writer: sessionStorage.getItem('uid'),
                review_rating: 0,
                review_contents: ''
            });
            setOnCancel(false);
        }
    };

    return (
        <div className="insert-page-container">
            <Row className="justify-content-center mt-3">
                <Col xs={12} md={8} lg={6}>
                    <div className="insert-form">
                        <form onSubmit={onSubmit} onReset={onClickCancel}>
                            <div className="form-content">
                                <div className="form-image">
                                    <img src="/images/pimang.jpg" alt="Review" className="review-image" />
                                </div>
                                <div className="form-fields">
                                    {mall_tstate === 0 ? (
                                        <>
                                            <div className="rating-container">
                                                <div className="rating-label">입찰하기</div>
                                                <Rating
                                                    name='review_rating'
                                                    value={review_rating}
                                                    precision={1}
                                                    max={10}
                                                    size='small'
                                                    onChange={(e, newValue) => setForm({ ...form, review_rating: newValue })}
                                                    onFocus={Focus}
                                                    icon={<TbBrandSnapseed style={{ color: "brown", fontSize: '2rem' }} />}
                                                    emptyIcon={<TbBrandSnapseed style={{ fontSize: '2rem' }} />}
                                                />
                                            </div>
                                            <Form.Control
                                                name='review_contents'
                                                value={review_contents}
                                                as='textarea'
                                                rows={2}
                                                placeholder='내용을 입력해주세요.'
                                                onChange={onChangeForm}
                                                onFocus={Focus}
                                                className="form-control-textarea"
                                            />
                                        </>
                                    ) : (
                                        <div className="rating-container">
                                            <div className="rating-label">문의하기</div>
                                            <Form.Control
                                                name='review_contents'
                                                value={review_contents}
                                                as='textarea'
                                                rows={4}
                                                placeholder='내용을 입력해주세요.'
                                                onChange={onChangeForm}
                                                onFocus={Focus}
                                                className="form-control-textarea"
                                            />
                                        </div>
                                    )}
                                    <div className="text-end">
                                        <Button type='submit' variant="contained" color='success' className='me-2'>등록</Button>
                                        <Button type='reset' variant="contained" color='success' onClick={onClickCancel} disabled={!onCancel}>취소</Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Col >
            </Row >
        </div >
    );
};

export default InsertPage;
