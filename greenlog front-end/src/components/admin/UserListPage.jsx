import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Button, Badge, InputGroup, Form, Card } from 'react-bootstrap'
import Sidebar from './Sidebar'
import axios from 'axios';
import { MdOutlineSettings } from "react-icons/md";
import '../../common/useful/Paging.css';
import Pagination from 'react-js-pagination'
import userlist from './userlist.png'
import CircularProgress from '@mui/material/CircularProgress';


const UserListPage = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [key, setKey] = useState("user_uid");
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(3);
    const [word, setWord] = useState("");
    const styleRed = "danger"
    const styleBlue = "primary"


    const callAPI = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`/user/admin/list?key=${key}&word=${word}&page=${page}&size=${size}`)
            console.log(res.data)
            setList(res.data.documents);
            setCount(res.data.total);

        } catch (error) {
            console.error('Error data diary:', error);
            alert("데이터를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }

    }
    useEffect(() => {
        callAPI()
    }, [page]);

    const onSubmit = (e) => {
        e.preventDefault();
        if(word===""){
            alert("검색어를 입력하세요");
            return;
        }
        callAPI();
    }

    if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>;
    return (
        <Row>
            <Col lg={2}>
                <Sidebar />
            </Col>
            <Col>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                    <img src={userlist} alt="car" style={{ width: '100%', maxWidth: '800px' }} />
                </div>
                <Row className='justify-content-center my-5'>
                    <Col lg={5}>
                        <form onSubmit={onSubmit}>
                            <InputGroup>
                                <Form.Select value={key} name="key" onChange={(e) => setKey(e.target.value)}>
                                    <option value="user_uid">아이디</option>
                                    <option value="user_uname">이름</option>
                                    <option value="user_nickname">닉네임</option>
                                    <option value="user_birth">생년월일</option>
                                </Form.Select>
                                <Form.Control placeholder='검색어' value={word} name="word" onChange={(e) => setWord(e.target.value)} />
                                <Button type='submit'>검색</Button>
                            </InputGroup>
                        </form>
                    </Col>
                </Row>
                {list.map(user => (
                    <Row className='justify-content-center'>
                        <Col xs={12} sm={11} md={10} lg={9} className='mb-3' key={user.user_key}>
                            <Card className='text-center' border={user.user_gender === "남자" ? styleBlue : styleRed}>
                                <Card.Body>
                                    <Row>
                                        <Col lg={5}>
                                            <a href={`/user/admin/read/${user.user_uid}`}><Card.Img variant="top" src={user.user_img || "/images/woman.jpg"} width="100%" /></a>
                                            <Card.Title className='mt-2'>{user.user_uname} 님의 정보</Card.Title>
                                        </Col>
                                        <Col lg={6}>
                                            <Card.Text>
                                                <div className='text-start'>
                                                    <br />
                                                    <p>아이디: {user.user_uid}</p>
                                                    <p>이름: {user.user_uname}</p>
                                                    <p>닉네임: {user.user_nickname}</p>
                                                    <p>생년월일: {user.fmtDdate}</p>
                                                    <p>성별: {user.user_gender}</p>
                                                    <p>전화번호: {user.user_phone}</p>
                                                    <p>이메일: {user.user_email}</p>
                                                    <p>주소: {user.user_address1 ? `${user.user_address1} (${user.user_address2})` : "-"}</p>
                                                    <p>등급: {user.user_auth}</p>
                                                </div>
                                            </Card.Text>
                                        </Col>
                                        <Col lg={1}>
                                            <a href={`/user/admin/update/${user.user_uid}`}>
                                                <MdOutlineSettings style={{ fontSize: "30px" }} />
                                            </a>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ))}
            </Col>
            <div>
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
        </Row>
    )
}

export default UserListPage