import React, { useEffect, useState } from 'react';
import { Row, Col, Dropdown, Card } from 'react-bootstrap';
import ReportInsert from '../report/ReportInsert';
import axios from 'axios';
import { Rating } from '@mui/material';
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbBrandSnapseed } from "react-icons/tb";
import { Pagination as MuiPagination } from '@mui/material';
import { Link } from 'react-router-dom';
import './ReviewPage.css';

const ReviewListPage = ({ mall_key, mall_seller, seller_number, mall_tstate }) => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(3);
    const [count, setCount] = useState(0);
    const uid = sessionStorage.getItem('uid');
    const root = "review";

    const callAPI = async () => {
        const res = await axios.get(`/review/plist/${mall_key}?page=${page}&size=${size}`);
        const data = res.data.documents.map(doc => ({ ...doc, isEdit: false, text: doc.review_contents, num: doc.review_rating }));
        setList(data);
        setCount(res.data.total);
    };

    useEffect(() => {
        callAPI();
    }, [page, size]);

    const onDelete = async (review_key) => {
        if (!window.confirm(`${review_key}번 리뷰 삭제하실래요?`)) return;
        await axios.post(`/review/delete/${review_key}`);
        alert('리뷰 삭제 완료!');
        callAPI();
        window.location.href = `/mall/read/${mall_key}`
    };

    const onUpdate = (review_key) => {
        const data = list.map(review => (review.review_key === review_key) ? { ...review, isEdit: true } : review);
        setList(data);
    };

    const onSave = async (review) => {
        if (review.isEdit && (review.num !== review.review_rating || review.text !== review.review_contents)) {
            if (!window.confirm("리뷰를 수정하시겠습니까?")) return;
            await axios.post(`/review/update`, { review_key: review.review_key, review_contents: review.text, review_rating: review.num });
            alert("리뷰 수정 완료!");
            callAPI();
        } else {
            callAPI();
        }
    };

    const onCancel = (review) => {
        if (review.num !== review.review_rating || review.text !== review.review_contents) {
            if (!window.confirm(`${review.review_key}번 리뷰 수정을 취소하시겠습니까?`)) return;
        }
        const data = list.map(item => item.review_key === review.review_key ? { ...item, isEdit: false } : item);
        setList(data);
        callAPI();
    };

    const changeContents = (review_key, newContents) => {
        const data = list.map(review => (review.review_key === review_key) ? { ...review, text: newContents } : review);
        setList(data);
    };

    const changeRating = (review_key, newRating) => {
        const data = list.map(review => {
            if (review.review_key === review_key && review.isEdit) {
                return { ...review, num: newRating };
            }
            return review;
        });
        setList(data);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const onClickBuy = async (review_writer, review_rating, mall_seller) => {
        // alert(review_writer+"....................."+review_rating+"....................."+mall_seller+"............................."+review_rating)
        if (window.confirm(`[${review_writer}]님을 선택하시겠습니까?`)){
        await axios.post('/auction/insert', {
                auction_mall_key: mall_key,
                auction_seller: mall_seller,
                auction_buyer: review_writer,
                auction_amount: review_rating
            });
        const res2 = await axios.get(`/seed/read/${review_writer}`);
        if (res2.data) {
            await axios.post('/trade/insert', {
                trade_to: seller_number,
                trade_from: res2.data.seed_number,
                amount: review_rating,
                seed_number: seller_number,
                trade_state: 1,
                trade_info: "경매"
            })
        }
          //마감
        await axios.post(`/mall/updateEndDate/${mall_key}`)
        alert("낙찰완료! 해당 글은 마감됩니다.");
        window.location.href = `/mall/list.json`;
        }
    };

    return (
        <div className="review-page-container">
            <Row className='justify-content-center'>
                <Col xs={10}>
                    {list.map(review => (
                        <Card key={review.review_key} className="review-card">
                            <div className="review-card-header">
                                <Link to={`/user/read/${review.review_writer}`}>
                                    <img src={review.user_img || "http://via.placeholder.com/70x70"} alt="User" />
                                </Link>
                                <div className="user-info">
                                    <div className="d-flex align-items-center">
                                        <Link to={`/user/read/${review.review_writer}`}>
                                            {review.user_nickname} ({review.user_uid})
                                        </Link>
                                        <Dropdown className="text-end dropdown-container">
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                                <BsThreeDotsVertical />
                                            </Dropdown.Toggle>
                                            {uid === review.review_writer ? (
                                                !review.isEdit ? (
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => onUpdate(review.review_key)} eventKey="update">수정하기</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => onDelete(review.review_key)} eventKey="delete">삭제하기</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                ) : (
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => onSave(review)} eventKey="save">등록</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => onCancel(review)} eventKey="cancel">취소</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                )
                                            ) : (
                                                uid === mall_seller ? (
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => onClickBuy(review.review_writer, review.review_rating, mall_seller)} eventKey="buy">낙찰하기</Dropdown.Item>
                                                        <Dropdown.Item eventKey="warning">
                                                            <ReportInsert uid={uid} writer={review.review_writer} root={root} origin={review.review_key} />
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                ) : (
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item eventKey="warning">
                                                            <ReportInsert uid={uid} writer={review.review_writer} root={root} origin={review.review_key} />
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                )
                                            )}
                                        </Dropdown>
                                    </div>
                                    <div>
                                        <span>{review.fmtudate || review.fmtdate}</span>
                                    </div>
                                </div>


                            </div>
                            <div className="review-card-body">
                                {mall_tstate === 0 ? (
                                    <div className="review-rating">
                                        <Rating
                                            name='point'
                                            value={review.num || review.review_rating}
                                            precision={1}
                                            max={10}
                                            size='large'
                                            onChange={(e, newValue) => changeRating(review.review_key, newValue)}
                                            icon={<TbBrandSnapseed style={{ color: "brown" }} />}
                                            emptyIcon={<TbBrandSnapseed />}
                                            readOnly={!review.isEdit}
                                        />
                                    </div>
                                ) : null}
                                {review.isEdit ? (
                                    <textarea
                                        name='contents'
                                        value={review.text}
                                        onChange={(e) => changeContents(review.review_key, e.target.value)}
                                        className="edit-textarea"
                                    />
                                ) : (
                                    <div className="review-content">{review.review_contents}</div>
                                )}
                            </div>
                        </Card>
                    ))}
                    <hr />
                    {count > size && (
                        <Row className="pagination-container">
                            <Col xs={12} md={10}>
                                <MuiPagination
                                    count={Math.ceil(count / size)}
                                    page={page}
                                    onChange={handlePageChange}
                                    color="standard"
                                    variant="outlined"
                                    shape="rounded"
                                />
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default ReviewListPage;
