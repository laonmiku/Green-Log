import React, { useEffect, useRef, useState } from 'react'
import { Row, Col, InputGroup, Form } from 'react-bootstrap'
import ModalAddress from '../../common/useful/ModalAddress'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { TextField, Button, Grid, Container, Typography, FormControl, InputLabel, Box, Alert, Card } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';



const UserUpdatePage = () => {
    const uid = sessionStorage.getItem("uid")
    const [form, setForm] = useState({
        user_key: '', user_nickname: '', user_uname: '', user_phone: '', user_address1: '', user_address2: '',
        user_birth: '', user_email: '', user_gender: '', user_ment: ''
    });
    const [loading, setLoading] = useState(false);
    const [isCheck, setIsCheck] = useState(false);
    const [phoneCheck, setPhoneCheck] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user_uid } = useParams();
    const [file, setfile] = useState({
        name: '',
        byte: null
    })


    const refFile = useRef();


    const callAPI = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`/user/read/${user_uid}`);
            setForm(res.data);
            console.log(res.data)
            setfile({ name: res.data.user_img, byte: null });
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('데이터를 불러오는 데 실패했습니다.');
        } finally {
            setLoading(false);
        }

    }

    const { user_key, user_nickname, user_uname, user_phone, user_address1, user_address2,
        user_birth, user_email, user_gender, user_ment } = form;


    useEffect(() => {
        callAPI();
    }, [])


    //폼변경
    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    //전화번호 유효성 및 자동하이픈 입력
    const handlePress = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

        const regex = /^[0-9\b -]{0,13}$/; // 숫자, 백스페이스, 하이픈 포함한 정규식

        if (regex.test(e.target.value)) {
            setPhoneCheck(e.target.value);
            const formattedPhoneNumber = e.target.value
                .replace(/-/g, '') // 기존 하이픈 제거
                .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'); // 새로운 하이픈 삽입
            setForm({ ...form, [e.target.name]: formattedPhoneNumber }); // 상태 업데이트
        } else {
            alert("잘못된 입력값입니다.");
        }
    };


    //닉네임중복체크
    const checkNickname = async (user_nickname) => {
        if (user_nickname === "") {
            setIsCheck(false);
            return;
        }
        try {
            const res = await axios.get(`/user/chknickname/${user_nickname}`);
            if (res.data.user_nickname === user_nickname) {
                alert("현재 사용중인 닉네임입니다.");
                setIsCheck(false);
            } else {
                alert("사용 가능한 닉네임입니다");
                setIsCheck(true);
            }
        } catch (error) {
            console.error('Error checking nickname:', error);
        }
    };

    //주소모달 
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    //수정취소
    const onClickReset = () => {
        alert("취소하시겠습니까?");
        callAPI();
    }

    //수정하기
    const onClickUpdate = async () => {
        setLoading(true);
        try {
            if (!window.confirm("변경된 내용을 수정하시겠습니까?")) return;
            await axios.post("/user/update", form);
            window.location.href = `/user/read/${user_uid}`;
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('수정을 하는데 실패했습니다.');
        } finally {
            setLoading(false);
        }

    }


    //사진 업로드
    const onChangeFile = (e) => {
        setfile({
            name: URL.createObjectURL(e.target.files[0]),
            byte: e.target.files[0]
        })
    }

    const onClickImageSave = async () => {
        if (file.byte === null) return;
        if (!window.confirm("변경된 이미지를 저장하시겠습니까?")) return;
        //이미지 업로드
        setLoading(true);
        try{
            const formData = new FormData();
            formData.append("byte", file.byte);
            //console.log(formData);
            await axios.post(`/upload/img/${uid}`, formData);
            alert("이미지 변경완료!")
        }catch (error) {
            console.error('Error fetching data:', error);
            alert('이미지를 불러오는 데 실패했습니다.');
        } finally {
            setLoading(false);
        }
       
    }

    if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>;
    return (
        <div>
            <Row className='justify-content-center'>
                <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: "20px" }}>
                    <Grid container row spacing={2}>
                        <Grid item>
                            <img src={file.name || "http://via.placeholder.com/100x150"} style={{ width: '30rem', height: "30rem", cursor: 'pointer' }} onClick={() => refFile.current.click()} />
                            <input ref={refFile} type="file" onChange={onChangeFile} style={{ display: "none" }} />
                            <Button onClick={onClickImageSave} variant="outlined" className="w-100 mt-1 mb-5">이미지저장</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="회원번호"
                                value={user_key}
                                fullWidth
                                variant="outlined"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="성함"
                                name="user_uname"
                                value={user_uname}
                                onChange={onChangeForm}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="전화번호"
                                name="user_phone"
                                value={user_phone}
                                onChange={handlePress}
                                maxLength={13}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="주소"
                                name="user_address1"
                                value={user_address1}
                                onChange={onChangeForm}
                                onClick={openModal}
                                fullWidth
                                variant="outlined"
                            /><ModalAddress />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="상세주소"
                                name="user_address2"
                                value={user_address2}
                                onChange={onChangeForm}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid >
                        <Grid item xs={12}>
                            <TextField
                                label="생년월일"
                                name="user_birth"
                                value={user_birth}
                                onChange={onChangeForm}
                                type="date"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="성별"
                                name="user_gender"
                                value={user_gender === '남자' ? "남자" : "여자"}
                                variant="outlined"
                                disabled
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Row>
                                <Col xs={9}>
                                    <TextField
                                        label="아이디"
                                        name="user_uid"
                                        value={user_uid}
                                        variant="outlined"
                                        disabled
                                        fullWidth
                                    />
                                </Col>
                                <Col>
                                    <Link to={`/user/updatePass/${user_uid}`}><Button>비밀번호변경</Button></Link>
                                </Col>
                            </Row>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="이메일"
                                name="user_email"
                                value={user_email}
                                onChange={onChangeForm}
                                type="email"
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Row>
                                <Col xs={9}>
                                    <TextField
                                        label="닉네임"
                                        name="user_nickname"
                                        value={user_nickname}
                                        onChange={onChangeForm}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Col>
                                <Col>
                                    <Button onClick={() => checkNickname(user_nickname)}>중복확인</Button>
                                </Col>
                            </Row>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="한줄소개"
                                name="user_ment"
                                value={user_ment}
                                onChange={onChangeForm}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>

                    </Grid>
                </Container>
            </Row>

            <div className='text-center mt-5'>
                <Button className='me-4 px-5' variant="outlined" onClick={onClickUpdate}>수정하기</Button>
                <Button className='me-4 px-5' variant="outlined" onClick={onClickReset}>취소하기</Button>
                <Link to={`/user/read/${user_uid}`}><Button variant="outlined" className='px-5'>마이페이지로 돌아가기</Button></Link>
            </div>
            <ModalAddress
                show={isModalOpen}
                handleClose={closeModal}
                setform={setForm}
                form={form}
            />
        </div>
    )
}

export default UserUpdatePage