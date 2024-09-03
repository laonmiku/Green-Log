import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import './RereplyReadPage.css';

const RereplyReadPage = (reply_key) => {
    const [rereply, setRereply] = useState({
        reply_key: reply_key,
        rereply_writer: sessionStorage.getItem('uid'),
        rereply_contents: '',
        rereply_lock: 'unlock',
        rereply_reaction: 'none',
        fmtdate: '',
        fmtudate: ''
    })


    const { rereply_key } = useParams();
    const uid = sessionStorage.getItem("uid");
    console.log(rereply_key)
    const callAPI = async () => {
        const res = await axios.get(`/rereply/read/${rereply_key}`)
        console.log(res.data);
        setRereply(res.data);
    }

    useEffect(() => {
        callAPI();
    }, [])

    const { rereply_writer, rereply_contents, fmtdate, fmtudate, user_img, user_nickname } = rereply;

    return (
        <Row key={rereply_key} className='justify-content-center mt-2'>
            <Col xs={7}>
                <div className="rereply-box">
                    <div className="rereply-header">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="user-info">
                                <img src={user_img || "http://via.placeholder.com/20x20"} width="50" className='user-img me-3' />
                                <div className="user-text">
                                    <div className="d-flex align-items-center">
                                        <span>{user_nickname} ({rereply_writer})</span>
                                    </div>
                                    <div className="rereply-date">
                                        <span>{fmtudate ? `${fmtudate}` : `${fmtdate}`} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='rereply-content my-3'>
                        <Row className='align-items-center my-2'>
                            <Col>
                                <div>{rereply_contents}</div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default RereplyReadPage