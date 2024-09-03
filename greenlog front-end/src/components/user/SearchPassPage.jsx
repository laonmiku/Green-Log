import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Stack, InputAdornment } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchPassPage = () => {
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const findid = search.get("findid");

    const [form, setForm] = useState({
        user_uid: findid || '',
        user_uname: '',
        user_phone: '',
        user_email: ''
    });
    const { user_uname, user_phone, user_uid, user_email } = form;

    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onFindPass = async (form) => {
        try {
            const res = await axios.post('/user/findpass', form);
            if (res.data === "") {
                alert("회원정보가 일치하지 않습니다");
                return;
            } else {
                window.location.href = `/user/updatePass/${form.user_uid}`;
            }
        } catch (error) {
            console.error('비밀번호 찾기 중 오류 발생:', error);
            alert("비밀번호 찾기 중 오류가 발생했습니다.");
        }
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ padding: 3, width: '100%', position: 'relative', top: -200  }}>
                <Box display="flex" alignItems="center" mb={3}>
                    <img src='/images/green.png' alt="logo" style={{ width: "3rem", marginRight: '1rem' }} />
                    <Typography variant="h5">
                        등록된 정보로 비밀번호 찾기
                    </Typography>
                </Box>
                <Box component="form" noValidate autoComplete="off">
                    <Stack spacing={2}>
                        <TextField
                            label="아이디"
                            name="user_uid"
                            value={findid || user_uid}
                            onChange={onChangeForm}
                            InputProps={{
                                readOnly: !!findid,
                                startAdornment: findid ? <InputAdornment position="start">아이디</InputAdornment> : null
                            }}
                            variant="outlined"
                            fullWidth
                        />
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
                            onClick={() => onFindPass(form)}
                            fullWidth
                        >
                            비밀번호 찾기
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}

export default SearchPassPage;
