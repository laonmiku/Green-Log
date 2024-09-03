import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NewPass = () => {
    const { user_uid } = useParams();
    const [form, setForm] = useState({
        user_npass: '',
        user_upass: '',
        user_uid: user_uid
    });
    const { user_npass, user_upass } = form;

    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onUpdatePass = async (form) => {
        // 새 비밀번호와 비밀번호 확인이 일치하는지 확인
        if (form.user_upass !== form.user_npass) {
            alert("새 비밀번호가 일치하지 않습니다!");
            return;
        } else {
            if (!window.confirm("비밀번호를 변경하시겠습니까?")) return;
            try {
                await axios.post("/user/updatePass", form);
                alert("비밀번호 변경 완료!");
                // 비밀번호 변경 후 로그인 페이지로 이동
                window.location.href = "/user/login";
            } catch (error) {
                console.error('비밀번호 변경 중 오류 발생:', error);
                alert("비밀번호 변경 중 오류가 발생했습니다.");
            }
        }
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ padding: 3, width: '100%' , position: 'relative', top: -200}}>
                <Box textAlign="center" mb={3}>
                    <Typography variant="h5" gutterBottom>
                        비밀번호 변경
                    </Typography>
                </Box>
                <Box component="form" noValidate autoComplete="off">
                    <Stack spacing={2}>
                        <TextField
                            label="새 비밀번호"
                            name="user_upass"
                            type="password"
                            value={user_upass}
                            onChange={onChangeForm}
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            label="비밀번호 확인"
                            name="user_npass"
                            type="password"
                            value={user_npass}
                            onChange={onChangeForm}
                            variant="outlined"
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => onUpdatePass(form)}
                            fullWidth
                        >
                            비밀번호 변경
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}

export default NewPass;
