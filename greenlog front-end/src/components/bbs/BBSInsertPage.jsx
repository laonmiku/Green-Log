import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, TextField, InputLabel, MenuItem, Select, FormControl, IconButton, Grid, CircularProgress, Tooltip, ButtonGroup } from '@mui/material';
import axios from 'axios';
import { Editor } from 'primereact/editor';
import { UserContext } from '../user/UserContext';
import { Form, InputGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';

const BBSInsertPage = () => {
    const { userData } = useContext(UserContext);
    const auth = userData.auth;
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const [text, setText] = useState('');
    const navigate = useNavigate();
    const uid = sessionStorage.getItem('uid');
    const [form, setForm] = useState({
        bbs_title: '',
        bbs_contents: '',
        bbs_type: 0,
        bbs_writer: uid
    });

    const { bbs_title, bbs_type, bbs_writer } = form;

    // 폼 입력 변경 핸들러
    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 카테고리 변경 핸들러
    const onChangeCategory = (e) => {
        setForm({ ...form, bbs_type: parseInt(e.target.value) });
    };

    // 파일 선택 핸들러
    const onChangeFile = (e) => {
        let selFiles = [];
        for (let i = 0; i < e.target.files.length; i++) {
            const file = {
                name: URL.createObjectURL(e.target.files[i]),
                byte: e.target.files[i],
                sequence: i
            };
            selFiles.push(file);
        }
        setFiles(selFiles);
    };

    // 사진 업로드 함수
    const uploadPhoto = async (bbsPhoto_bbs_key) => {
        if (files.length === 0) return;

        const result = await Swal.fire({
            title: `${files.length} 개 파일을 업로드 하시겠습니까?`,
            text: '취소시 이미지는 올라가지 않습니다!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '업로드',
            cancelButtonText: '취소'
        });

        if (result.isConfirmed) {
            try {
                const formData = new FormData();
                for (let i = 0; i < files.length; i++) {
                    formData.append('bytes', files[i].byte);
                }
                // 첨부 파일 업로드 요청
                await axios.post(`/bbs/attach/${bbsPhoto_bbs_key}`, formData);
                setFiles([]); // 파일 상태 초기화
            } catch (error) {
                console.error("첨부 파일 업로드 오류:", error);
                Swal.fire({
                    icon: 'error',
                    title: '첨부 파일 업로드 오류',
                    text: '첨부 파일 업로드 중 오류가 발생했습니다.'
                });
            }
        }
    };

    // 폼 제출 핸들러
    const onSubmit = async (e) => {
        e.preventDefault();

        const result = await Swal.fire({
            position: 'top',
            title: '게시글을 등록하시겠습니까?',
            text: "게시글을 등록하려면 확인 버튼을 클릭하세요.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '등록',
            cancelButtonText: '취소'
        });

        if (result.isConfirmed) {
            try {
                // 게시글 등록
                const updatedForm = { ...form, bbs_contents: text.replace(/<\/?p>/g, '') };
                const response = await axios.post('/bbs/insert', updatedForm);
                const insertedMallKey = response.data; // 삽입된 행의 자동 생성 키

                // 첨부 파일 업로드 함수 호출
                if (insertedMallKey) {
                    await uploadPhoto(insertedMallKey);
                    Swal.fire({
                        icon: 'success',
                        title: '게시글 등록 완료!',
                        text: '게시글이 성공적으로 등록되었습니다.'
                    });
                    navigate('/bbs/list.json');
                }
            } catch (error) {
                console.error("게시글 등록 오류:", error);
                Swal.fire({
                    icon: 'error',
                    title: '게시글 등록 오류',
                    text: '게시글 등록 중 오류가 발생했습니다.'
                });
            }
        }
    };

    // 미리보기 이미지 클릭 핸들러
    const thumbnail = (props) => (
        <Tooltip title="가장 왼쪽에 있는 이미지가 대표이미지로 임의 지정됩니다." {...props} />
    );

    return (
        <div>
            <h1 className="text-center my-5">글쓰기</h1>
            <Box component="form" onSubmit={onSubmit} sx={{ width: '100%', maxWidth: '600px', mx: 'auto' }}>
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                    <FormControl variant="outlined" sx={{ mr: 2, minWidth: 150 }}>
                        <InputLabel>카테고리</InputLabel>
                        <Select
                            name="bbs_type"
                            value={bbs_type}
                            onChange={onChangeCategory}
                            label="카테고리"
                        >
                            <MenuItem value={0}>자유</MenuItem>
                            <MenuItem value={1}>꿀팁</MenuItem>
                            {auth === "관리자" && <MenuItem value={2}>공지사항</MenuItem>}
                        </Select>
                    </FormControl>
                    <TextField
                        name="bbs_title"
                        label="제목을 입력하세요"
                        variant="outlined"
                        value={bbs_title}
                        onChange={onChangeForm}
                        fullWidth
                    />
                </Box>
                <div className="card">
                    <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} />
                </div>
                <Box sx={{ mb: 2 }}>
                    <InputGroup className='my-2'>
                        <Form.Control type="file" onChange={onChangeFile} multiple />
                    </InputGroup>
                </Box>
                <Grid container spacing={2}>
                    {files.map((f) => (
                        <Grid item key={f.name} xs={4} sm={3} md={2}>
                            <img src={f.name} alt="Preview" style={{ width: "100%", height: "auto", maxHeight: "150px", objectFit: "cover" }} />
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <ButtonGroup variant="outlined">
                        <Button
                            type="submit"
                            color="primary"
                            disabled={loading}
                            endIcon={loading ? <CircularProgress size="1rem" /> : null}
                        >
                            등록
                        </Button>
                        <Button
                            color="error"
                            onClick={() => navigate('/bbs/list.json')}
                        >
                            취소
                        </Button>
                    </ButtonGroup>
                </Box>
            </Box>
        </div>
    );
};

export default BBSInsertPage;
