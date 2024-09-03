import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, Grid, Container, Typography, FormControl, InputLabel, Box, Alert } from '@mui/material';
import axios from 'axios';
import ModalAddress from '../../common/useful/ModalAddress';
import { Calendar } from 'primereact/calendar';

const JoinPage = ({ onNextStep }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        user_uid: '',
        user_uname: '',
        user_upass: '',
        checkPass: '',
        user_phone: '',
        user_gender: '',
        user_birth: '',
        user_address1: '',
        user_address2: '',
        user_email: '',
        user_nickname: ''
    });
    const { user_uid, user_uname, user_upass, user_phone, user_gender, user_birth, checkPass, user_email, user_address1, user_address2, user_nickname } = form;
    const [isCheckUid, setIsCheckUid] = useState(false); // 아이디 중복체크 상태
    const [isCheckNickname, setIsCheckNickname] = useState(false); // 닉네임 중복체크 상태
    const [uidCheckMessage, setUidCheckMessage] = useState('');
    const [nicknameCheckMessage, setNicknameCheckMessage] = useState('');
    const [passMatchMessage, setPassMatchMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [date, setDate] = useState(null);

    const onChangeForm = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (name === 'user_uid') {
            checkUserId(value);
        }

        if (name === 'checkPass') {
            checkPasswordMatch(value);
        }

        if (name === 'user_nickname') {
            checkNickname(value);
        }
    };

    const handleDateChange = (e) => {
        setForm({ ...form, user_birth: e.value });
    };

    const checkUserId = async (user_uid) => {
        if (user_uid === "") {
            setUidCheckMessage('');
            setIsCheckUid(false);
            return;
        }
        try {
            const res = await axios.get(`/user/read/${user_uid}`);
            if (res.data.user_uid === user_uid) {
                setUidCheckMessage("이미 가입되어있는 아이디입니다.");
                setIsCheckUid(false);
            } else {
                setUidCheckMessage("사용 가능한 아이디입니다");
                setIsCheckUid(true);
            }
        } catch (error) {
            console.error('Error checking ID:', error);
        }
    };

    const checkNickname = async (user_nickname) => {
        if (user_nickname === "") {
            setNicknameCheckMessage('');
            setIsCheckNickname(false);
            return;
        }
        try {
            const res = await axios.get(`/user/chknickname/${user_nickname}`);
            if (res.data.user_nickname === user_nickname) {
                setNicknameCheckMessage("현재 사용중인 닉네임입니다.");
                setIsCheckNickname(false);
            } else {
                setNicknameCheckMessage("사용 가능한 닉네임입니다");
                setIsCheckNickname(true);
            }
        } catch (error) {
            console.error('Error checking nickname:', error);
        }
    };

    const checkPasswordMatch = (checkPass) => {
        if (checkPass === user_upass) {
            setPassMatchMessage("비밀번호가 일치합니다.");
        } else {
            setPassMatchMessage("비밀번호가 일치하지 않습니다.");
        }
    };

    const onClickInsert = async () => {
        if (!isCheckUid) {
            alert("아이디 중복체크를 해주세요");
            return;
        }

        if (!isCheckNickname) {
            alert("닉네임 중복체크를 해주세요");
            return;
        }

        if (user_upass !== checkPass) {
            alert("비밀번호가 일치하지 않습니다");
            return;
        }

        try {
            await axios.post(`/user/insert`, form);
            await axios.post('/seed/insert', { seed_uid: form.user_uid });
            if (!window.confirm("회원가입하시겠습니까?")) return
            onNextStep(); // 부모 컴포넌트의 콜백 호출
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const testBtn = () => {
        if (onNextStep) {
            onNextStep(); // 부모 컴포넌트의 콜백 호출
        }
    }

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                        <Box display="flex" alignItems="center">
                            <TextField
                                label="아이디"
                                name="user_uid"
                                value={user_uid}
                                onChange={onChangeForm}
                                fullWidth
                                variant="outlined"
                            />
                        </Box>
                        {uidCheckMessage && (
                            <Alert severity={isCheckUid ? "success" : "error"} style={{ marginTop: '8px' }}>
                                {uidCheckMessage}
                            </Alert>
                        )}
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="비밀번호"
                        name="user_upass"
                        type="password"
                        value={user_upass}
                        onChange={onChangeForm}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="비밀번호 확인"
                        name="checkPass"
                        type="password"
                        value={checkPass}
                        onChange={onChangeForm}
                        fullWidth
                        variant="outlined"
                    />
                    {passMatchMessage && (
                        <Alert severity={checkPass === user_upass ? "success" : "error"} style={{ marginTop: '8px' }}>
                            {passMatchMessage}
                        </Alert>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="이름"
                        name="user_uname"
                        value={user_uname}
                        onChange={onChangeForm}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="닉네임"
                        name="user_nickname"
                        value={user_nickname}
                        onChange={onChangeForm}
                        fullWidth
                        variant="outlined"
                    />
                    {nicknameCheckMessage && (
                        <Alert severity={isCheckNickname ? "success" : "error"} style={{ marginTop: '8px' }}>
                            {nicknameCheckMessage}
                        </Alert>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="이메일"
                        name="user_email"
                        type="email"
                        value={user_email}
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
                        onChange={onChangeForm}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>성별</InputLabel>
                        <Select
                            name="user_gender"
                            value={user_gender}
                            onChange={onChangeForm}
                            label="성별"
                        >
                            <MenuItem value="남자">남자</MenuItem>
                            <MenuItem value="여자">여자</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                        <Calendar
                            value={user_birth}
                            onChange={handleDateChange}
                            dateFormat="yy-mm-dd"
                            showButtonBar
                            placeholder="생년월일"
                            style={{
                                width: '100%',
                                border: '1px solid rgba(0, 0, 0, 0.23)',
                                borderRadius: '4px',
                                padding: '16px'
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="주소"
                        name="user_address1"
                        value={user_address1}
                        onClick={openModal} // 클릭 시 모달 열기
                        fullWidth
                        variant="outlined"
                    />
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
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={onClickInsert}>
                        정보 입력 완료!
                    </Button>
                </Grid>
            </Grid>

            {/* 모달 주소 입력 */}
            <ModalAddress
                show={isModalOpen}
                handleClose={closeModal}
                setform={setForm}
                form={form}
            />
        </Container>
    );
};

export default JoinPage;
