import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import {
    Container, Card, Typography, MenuItem, Select, TextField, Button, Grid, IconButton, ButtonGroup
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useNavigate } from 'react-router-dom';
import diarybanner from './diarybanner.png'
import CircularProgress from '@mui/material/CircularProgress';


const DiaryInsertPage = () => {
    const [loading, setLoading] = useState(false);
    const uid = sessionStorage.getItem("uid");
    const [diary, setDiary] = useState({
        diary_writer: uid,
        diary_contents: "",
        diary_title: "",
        diary_state: ""
    });

    const navi = useNavigate();

    const onClickCancel = () => {
        navi(-1); // 뒤로 가기
    };

    const { diary_contents, diary_title, diary_state, diary_writer } = diary;

    const [data, setData] = useState({
        seed_key: '',
        seed_number: '',
        seed_point: ''
    })

    //포인트적립
    const callAPI = async () => {
        const res = await axios.get(`/seed/read/${uid}`)
        setData(res.data);
    }
    useEffect(() => { callAPI() }, [])

    //폼변경
    const onChangeForm = (e) => {
        setDiary({ ...diary, [e.target.name]: e.target.value });
    }

    //파일 여러개첨부

    const [files, setFiles] = useState([]);
    const [similarityScore, setSimilarityScore] = useState(null);

    const style = {
        border: '1px solid gray',
        width: '10rem',
        height: "10rem"
    }

    //파일 업로드 전 이미지 출력
    const onChangeFile = (e) => {
        let selFiles = [];
        for (let i = 0; i < e.target.files.length; i++) {
            const file = {
                name: URL.createObjectURL(e.target.files[i]),
                byte: e.target.files[i],
                sequence: i
            }
            selFiles.push(file);
        }
        setFiles(selFiles);
    }
    //유사성 체크
    const getEmbeddings = async (sentences) => {
        try {
            const res = await axios.post('/api/ai/embeddings', [sentences], {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return res.data;
            console.log(res.data)
        } catch (error) {
            console.error('Error fetching embeddings:', error);
            throw error;
        }

    };


    //일기사진저장

    const onClickUpload = async (diaryPhoto_diary_key) => {
        if (files.length === 0) return;
        if (!window.confirm(`${files.length}개 사진파일을 업로드 하시겠습니까?`)) return;
        setLoading(true);
        try {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('bytes', files[i].byte);
            }
            console.log(formData);

            await axios.post(`/diary/attach/${diaryPhoto_diary_key}`, formData);
            alert("이미지저장완료!");
            setFiles([]);
        } catch (error) {
            console.err("첨부파일업로드오류:", error);
            alert("첨부파일 업로드 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    }


    //일기등록
    const onClickInsert = async () => {
        if (!uid) {
            alert("로그인이 필요한 작업입니다.");
            sessionStorage.setItem('target', '/diary/insert');
            window.location.href = "/user/login";
            return;
        }

        if (!window.confirm("일기를 등록하시겠습니까?")) return;


        setLoading(true);
        try {
            const response = await axios.post('/diary/insert', diary);
            const lastkey = response.data;
            if (lastkey) {
                if (files.length === 0){
                    alert("사진등록을 필수로 해주셔야합니다.");
                    return;
                } 
                else {
                    await onClickUpload(lastkey);
                    await axios.post('/trade/insert', {
                        trade_to: data.seed_number,
                        trade_from: 'seed00000000',
                        amount: 1,
                        seed_number: data.seed_number,
                        trade_state: 1,
                        trade_info: "다이어리 작성"
                })}
            alert("일기등록완료!");
            alert("관련없는 일기가 있을 시, 포인트를 관리자가 차감합니다. 유의해주십시오.")
            window.location.href = `/user/read/${uid}`;
        }

        } catch (error) {
        console.error("일기 등록 오류:", error);
        alert("일기 등록 중 오류가 발생했습니다.");
    } finally {
        setLoading(false);
    }
}

if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>;
return (
    <Container maxWidth="sm">
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <img src={diarybanner} alt="car" style={{ width: '100%', maxWidth: '800px' }} />
        </div>
        <Card sx={{ padding: 3, marginTop: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                오늘은 어떤 활동을 하셨나요?
            </Typography>
            <Typography variant="h6" align="center" paragraph>
                초록을 통해 알려주세요
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Select
                        fullWidth
                        value={diary_state}
                        onChange={onChangeForm}
                        name="diary_state"
                        displayEmpty
                        inputProps={{ 'aria-label': '활동 카테고리 선택' }}
                    >
                        <MenuItem value="" disabled>
                            활동 카테고리를 선택해주세요
                        </MenuItem>
                        <MenuItem value="개인컵/텀블러">개인컵 활용(카페/사무실/식당)</MenuItem>
                        <MenuItem value="리필스테이션/개인용기">용기 활용(리필스테이션/배달음식)</MenuItem>
                        <MenuItem value="리사이클링 제작">리사이클링 제작(리사이클링/업사이클링)</MenuItem>
                        <MenuItem value="전자영수증">전자영수증(쇼핑)</MenuItem>
                        <MenuItem value="친환경 제품구매">친환경 제품구매(제로웨이스트/업사이클링/리사이클링)</MenuItem>
                        <MenuItem value="재활용품 배출">재활용품 배출(폐휴대폰 반납/페트병,유리병 반납)</MenuItem>
                        <MenuItem value="전기차 대여">전기차 대여(대여만 가능, 반납일 캡쳐)</MenuItem>
                        <MenuItem value="봉사활동/개인 환경활동">봉사활동/개인 환경활동 (쓰레기줍기, 봉사활동참여)</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="제목"
                        value={diary_title}
                        onChange={onChangeForm}
                        name="diary_title"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={5}
                        label="내용"
                        placeholder='관리자가 하나하나 체크하고 있습니다. 관련 일기가 아닐 시, 권한이 제한될 수 있으며 적립된 포인트가 차감될 수 있으니 이점 유의해주시기 바랍니다. 사진은 필수첨부입니다.'
                        value={diary_contents}
                        onChange={onChangeForm}
                        name="diary_contents"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        startIcon={<PhotoCamera />}
                    >
                        파일 첨부
                        <input
                            type="file"
                            hidden
                            onChange={onChangeFile}
                            multiple
                        />
                    </Button>
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                    <Row className='justify-content-center mt-2 text-center'>
                        {files.map(f =>
                            <Col key={f.name} lg={6} className='mb-2'>
                                <img src={f.name} style={style} />
                            </Col>
                        )}

                    </Row>
                </Grid>
                <Grid item xs={12} container justifyContent="center" spacing={2}>
                    <ButtonGroup variant="contained" aria-label="button group">
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={onClickInsert}
                        >
                            등록
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={onClickCancel}
                        >
                            취소
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Card>
    </Container>
)

}
export default DiaryInsertPage