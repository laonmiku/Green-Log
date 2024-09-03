import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import { BsChevronDown } from 'react-icons/bs';
import ReplyListPage from './ReplyListPage';
import axios from 'axios';
import { SlLock, SlLockOpen } from "react-icons/sl";
import { Pagination as MuiPagination } from '@mui/material';

const ReplyPage = ({ bbs_key, bbs_writer }) => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(3);
    const [key, setKey] = useState('reply_regdate desc');
    const [count, setCount] = useState(0);
    const [reply, setReply] = useState([]);
    const [showReply, setShowReply] = useState(true);
    const [replyCount, setReplyCount] = useState("");
    const [onCancel, setOnCancel] = useState(false);
    const [form, setForm] = useState({
        reply_bbs_key: bbs_key,
        reply_writer: sessionStorage.getItem('uid'),
        reply_contents: '',
        reply_lock: 'unlock',
        reply_reaction: 'none'
    });

    const onKey = (key) => {
        setKey(key);
        setPage(1);
    };

    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setOnCancel(true);
    };

    const toggleRep = () => {
        setShowReply(!showReply);
    };

    const Focus = () => {
        const uid = sessionStorage.getItem('uid');
        if (!uid) {
            window.location = "/user/login";
        } else {
            setOnCancel(true);
        }
    };

    const callCount = async () => {
        const res = await axios.get(`/reply/count/${bbs_key}`);
        setReplyCount(res.data);
    };

    const callList = async () => {
        const res = await axios.get(`/reply/plist/${bbs_key}?key=${key}&page=${page}&size=${size}`);
        if (res.data.total === 0) {
            setCount(0);
            setReply([]);
        } else {
            const data = res.data.documents.map(doc => ({
                ...doc,
                isEdit: false,
                text: doc.reply_contents,
                lock: doc.reply_lock,
                reaction: doc.reply_reaction
            }));
            setReply(data);
            setCount(res.data.total);
            const last = Math.ceil(res.data.total / size);
            if (page > last) setPage(page - 1);
        }
    };

    useEffect(() => {
        callCount();
        callList();
    }, [page, size, key]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const uid = sessionStorage.getItem('uid');
        if (!uid) {
            alert("로그인이 필요합니다.");
            return;
        }

        if (form.reply_contents === '') {
            alert("댓글 내용을 입력해주세요!");
            return;
        }

        if (!window.confirm("댓글을 등록하실래요?")) return;

        try {
            await axios.post('/reply/insert', form);
            alert('댓글 등록 완료');

            setForm({
                reply_bbs_key: bbs_key,
                reply_writer: uid,
                reply_contents: '',
                reply_lock: 'unlock',
                reply_reaction: 'none'
            });
            setOnCancel(false);
        } catch (error) {
            console.error('댓글 등록 에러:', error);
        }

        callList();
        callCount();
    };

    const onClickCancel = () => {
        setForm({ ...form, reply_contents: '' });
        setOnCancel(false);
    };

    const onClickLock = () => {
        const lockState = form.reply_lock === 'unlock' ? 'lock' : 'unlock';
        setForm({ ...form, reply_lock: lockState });
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Row className='justify-content-center mt-3'>
            <Col xs={10}>
                <Button type='button' variant="" onClick={() => setShowReply(!showReply)}>
                    댓글 {replyCount}
                </Button>
                <BsChevronDown />
                <hr />
                {showReply && (
                    <>
                        <Row className='justify-content-center mt-3'>
                            <Col xs={12}>
                                <div>
                                    <form onSubmit={onSubmit} onReset={onClickCancel}>
                                        <Form.Control
                                            name='reply_contents'
                                            value={form.reply_contents}
                                            as='textarea'
                                            rows={4}
                                            placeholder='내용을 입력해주세요.'
                                            onChange={onChangeForm}
                                            onFocus={Focus}
                                        />
                                        <InputGroup.Text>
                                            <Button
                                                onClick={onClickLock}
                                                variant=''
                                                type='button'
                                                style={{ color: form.reply_lock === 'lock' ? 'green' : 'inherit' }}>
                                                {form.reply_lock === 'lock' ? <SlLock /> : <SlLockOpen />} {form.reply_lock === 'lock' ? '비공개' : '공개'}
                                            </Button>
                                            <div className='text-end'>
                                                <Button variant='' type='submit'>등록</Button>
                                                <Button onClick={onClickCancel} variant='' type='reset' disabled={!onCancel}>취소</Button>
                                            </div>
                                        </InputGroup.Text>
                                    </form>
                                </div>
                                {/* <div className="mt-3 mb-3">
                                    <Button variant='' onClick={() => onKey('reply_regdate desc')}>최신순</Button>
                                    <Button variant='' onClick={() => onKey('reply_reaction desc')}>인기순</Button>
                                </div> */}
                            </Col>
                        </Row>
                        <ReplyListPage reply={reply} setReply={setReply} bbs_writer={bbs_writer} callCount={callCount} callList={callList} />
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
                    </>
                )}
            </Col>
        </Row>
    );
};

export default ReplyPage;
