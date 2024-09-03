import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import './ReplyReadPage.css'; // CSS 파일을 임포트합니다

const ReplyReadPage = () => {
    const [reply, setReply] = useState({
        reply_bbs_key: '',
        reply_writer: '',
        reply_contents: '',
        reply_lock: 'unlock',
        reply_reaction: 'none',
        fmtdate: '',
        fmtudate: '',
        user_img: '',
        user_nickname: ''
    });
    const { reply_key } = useParams();
    const uid = sessionStorage.getItem("uid");

    const callAPI = async () => {
        const res = await axios.get(`/reply/read/${reply_key}`);
        setReply(res.data);
    }

    useEffect(() => {
        callAPI();
    }, []);

    const { reply_writer, reply_contents, fmtdate, fmtudate, user_img, user_nickname } = reply;

    return (
        <Row key={reply_key} className='justify-content-center mt-2'>
            <Col xs={7}>
                <div className="reply-box">
                    <div className="reply-header">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="user-info">
                                <img src={user_img || "http://via.placeholder.com/20x20"} width="50" className='user-img me-3' />
                                <div className="user-text">
                                    <div className="d-flex align-items-center">
                                        <span>{user_nickname} ({reply_writer})</span>
                                    </div>
                                    <div className="reply-date">
                                        <span>{fmtudate ? `${fmtudate}` : `${fmtdate}`} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='reply-content my-3'>
                        <Row className='align-items-center my-2'>
                            <Col>
                                <div>{reply_contents}</div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default ReplyReadPage;
