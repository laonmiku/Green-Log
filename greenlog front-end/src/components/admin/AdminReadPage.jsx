import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Badge, InputGroup, Form, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { MdOutlineSettings } from "react-icons/md";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const AdminReadPage = () => {
    const {user_uid} =useParams();
    const [form, setForm]=useState("");
    const [loading, setLoading] = useState(false);
    const styleRed = "danger"
    const styleBlue = "primary"

    const callAPI=async()=>{
        setLoading(true)
        try{
            const res = await axios.get(`/user/read/${user_uid}`);
            setForm(res.data);
            console.log(res.data);
        }catch (error) {
            console.error('Error data diary:', error);
            alert("데이터를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
       
    }

    useEffect(()=>{
        callAPI();
    },[]);


if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>;
  return (
    <div>
        <h1 className='text-center my-5'>{form.user_uid}({form.user_uname})님 회원정보</h1>
        <Row className='justify-content-center'>
                        <Col xs={12} sm={11} md={10} lg={9}  className='mb-3'>
                            <Card className='text-center' border={form.user_gender === "남자" ? styleBlue : styleRed}>
                                <Card.Body>
                                    <Row>
                                        <Col lg={5}>
                                            <Card.Img variant="top" src={form.user_img ||"/images/woman.jpg"} width="100%" />
                                            <Card.Title className='mt-2'>{form.user_uname} 님의 정보</Card.Title>
                                        </Col>
                                        <Col lg={6}>
                                            <Card.Text>
                                                <div className='text-start'>
                                                    <br />
                                                    <p>아이디: {form.user_uid}</p>
                                                    <p>이름: {form.user_uname}</p>
                                                    <p>닉네임: {form.user_nickname}</p>
                                                    <p>생년월일: {form.user_birth}</p>
                                                    <p>성별: {form.user_gender}</p>
                                                    <p>전화번호: {form.user_phone}</p>
                                                    <p>이메일: {form.user_email}</p>
                                                    <p>주소: {form.user_address1 ? `${form.user_address1} (${form.user_address2})` : "-"} </p>
                                                    <p>등급: {form.user_auth}</p>
                                                </div>
                                            </Card.Text>
                                        </Col>
                                        <Col lg={1}>
                                            <a href={`/user/admin/update/${form.user_uid}`}>
                                                <MdOutlineSettings style={{ fontSize: "30px" }} />
                                            </a>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
    </div>
  )
}

export default AdminReadPage