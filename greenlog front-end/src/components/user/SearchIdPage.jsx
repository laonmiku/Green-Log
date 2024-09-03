import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SearchIdPage = () => {
    const [findid, setUid] = useState("");
    const [form, setForm] = useState({
        user_uname: '',
        user_phone: '',
        user_email: ''
    });
    const { user_uname, user_phone, user_email } = form;

    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onFindId = async (user_uname, user_phone, user_email) => {
        try {
            const res = await axios.post('/user/findid', { user_uname, user_phone, user_email });
            console.log(res.data);
            if (res.data === "") {
                alert("등록된 아이디가 없습니다");
                if (window.confirm("회원가입하시겠습니까?")) {
                    window.location.href = "/user/join";
                }
            } else {
                setUid(res.data.user_uid);
            }
        } catch (error) {
            console.error('아이디 찾기 중 오류 발생:', error);
            alert("아이디 찾기 중 오류가 발생했습니다.");
        }
    }

    useEffect(() => {
        console.log(findid);
    }, [findid]);

    return (
        <Container>
            {findid ? (
                <Box textAlign="center" mt={5}>
                    <Typography variant="h4">아이디는 {findid} 입니다</Typography>
                    <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
                        <Button variant="contained" color="primary" component={Link} to="/user/login">
                            로그인
                        </Button>
                        <Button variant="contained" color="secondary" component={Link} to={`/user/searchPass?findid=${findid}`}>
                            비밀번호 찾기
                        </Button>
                    </Stack>
                </Box>
            ) : (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                    mt={5}
                >
                    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, width: '100%', position: 'relative', top: -200 }}>
                        <Box display="flex" alignItems="center" mb={3}>
                            <img src='/images/green.png' alt="logo" style={{ width: "3rem", marginRight: '1rem' }} />
                            <Typography variant="h5">
                                등록된 정보로 아이디 찾기
                            </Typography>
                        </Box>
                        <Box component="form" noValidate autoComplete="off">
                            <Stack spacing={2}>
                                <TextField
                                    label="이름"
                                    name="user_uname"
                                    value={user_uname}
                                    onChange={onChangeForm}
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    label="전화번호"
                                    name="user_phone"
                                    value={user_phone}
                                    onChange={onChangeForm}
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    label="이메일"
                                    name="user_email"
                                    value={user_email}
                                    onChange={onChangeForm}
                                    variant="outlined"
                                    fullWidth
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => onFindId(user_uname, user_phone, user_email)}
                                >
                                    아이디 찾기
                                </Button>
                            </Stack>
                        </Box>
                    </Paper>
                </Box>
            )}
        </Container>
    );
}

export default SearchIdPage;
