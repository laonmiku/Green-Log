
import React, { useState } from "react";
import { TextField, Grid, Typography, Paper, MenuItem } from "@mui/material";
import { Form, Row, Col, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import axios from "axios";

const InsertPage = () => {
    const uid = sessionStorage.getItem("uid");
    const today = new Date(); //오늘
    const tomorrowDate = new Date(today);
    tomorrowDate.setDate(today.getDate() + 1); //내일
    const tomorrow = tomorrowDate.toISOString().split('T')[0]; //내일 형식변환본
    const [edate, setEdate] = useState(tomorrow); // endDate값
    const [form, setForm] = useState({
        mall_seller: uid,
        mall_title: "",
        mall_info: "",
        mall_price: 0,
        mall_photo: "",
        mall_tstate: 0,
        mall_pstate: 0,
        mall_endDate: edate,
    });
    const { mall_title, mall_info, mall_price, mall_photo, mall_tstate, mall_pstate, mall_endDate } = form;
    const [files, setFiles] = useState([]);//사진업로드
    // 일반 입력 필드 경우
    const onChangeForm = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        if (name === "mall_price" && value === "0") return;
        setForm((prevData) => ({
            ...prevData,
            [name]: name === "mall_price" ? parseInt(value) : value
        }));
    };
    const onChangeEndDate = (e) => {
        setEdate(e.target.value);
    }
    // 사진 변경
    const onChangeFiles = (e) => {
        let selectedFiles = []
        for (let i = 0; i < e.target.files.length; i++) {
            const file = {
                name: URL.createObjectURL(e.target.files[i]),
                byte: e.target.files[i]
            }
            selectedFiles.push(file)
        }
        setFiles(selectedFiles);
    }
    const uploadPhoto = async (mallPhoto_mall_key) => {
        if (files.length === 0) return;
        if (!window.confirm(`${files.length} 개 파일을 업로드 하시겠습니까? 취소시 이미지는 올라가지 않습니다!`)) return;

        try {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('bytes', files[i].byte);
            }
            //console.log(formData);
            // 첨부 파일 업로드 요청
            await axios.post(`/mall/attach/${mallPhoto_mall_key}`, formData);
            //alert("첨부파일 업로드 완료!");
            setFiles([]); // 파일 상태 초기화
        } catch (error) {
            console.error("첨부 파일 업로드 오류:", error);
            alert("첨부 파일 업로드 중 오류가 발생했습니다.");
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (mall_tstate === 0 && mall_price === 0) {
            alert("일반나눔은 1씨드부터 가능합니다.씨드를 수정해주세요.");
            return;
        }
        if (!window.confirm("피망마켓에 등록하실래요?")) return;
        //console.log(form);
        try {
            // 게시글 등록
            const formData = { ...form, mall_seller: uid, mall_endDate: edate }
            const response = await axios.post('/mall/insert', formData);
            const insertedMallKey = response.data; // 삽입된 행의 자동 생성 키
            //첨부 파일 업로드 함수 호출
            if (insertedMallKey) {
                await uploadPhoto(insertedMallKey);
                alert("게시글 등록 완료!");
                window.location.href = '/mall/list.json';
            }
        } catch (error) {
            // 오류 발생 시 오류 메시지 출력
            console.error("게시글 등록 오류:", error);
            alert("게시글 등록 중 오류가 발생했습니다.");
        }
    }
    const thumbnail = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            가장 왼쪽에 있는 이미지가 대표이미지로 임의 지정됩니다.
        </Tooltip>
    );

    return (
        <div className="my-5 ">
            <Paper elevation={3} style={{ padding: 20 }}>
                <Typography variant="h3" gutterBottom className="text-center">
                    <img src="../images/pmang1.png" style={{width:"3rem",height:"3rem", marginBottom:"1rem"}} />
                    피망마켓에 글쓰기
                    <img src="../images/pmang1.png" style={{width:"3rem",height:"3rem",marginBottom:"1rem"}} />
                </Typography>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="mall_title"
                                label="제목"
                                value={mall_title}
                                onChange={onChangeForm}
                                fullWidth
                                required
                                inputProps={{ maxLength: 20 }}
                                helperText="최대 20자까지 입력 가능합니다." 
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                select
                                label="유형"
                                defaultValue={0}
                                value={mall_tstate}
                                onChange={onChangeForm}
                                name="mall_tstate"
                                required
                                fullWidth>
                                <MenuItem value={0}>일반나눔으로 올리기</MenuItem>
                                <MenuItem value={1}>무료나눔으로 올리기</MenuItem>
                                <MenuItem value={2}>구매글 올리기</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                select
                                label="물품상태"
                                defaultValue={0}
                                value={mall_pstate}
                                onChange={onChangeForm}
                                name="mall_pstate"
                                required
                                fullWidth>
                                <MenuItem value={0}>중고</MenuItem>
                                <MenuItem value={1}>미개봉,미사용</MenuItem>
                            </TextField>
                        </Grid>
                        {mall_tstate === 1 ?

                            <Grid item xs={3}>
                                <TextField
                                    label="Seed"
                                    type="number"
                                    name="mall_price"
                                    fullWidth
                                    value={0}
                                    onChange={onChangeForm}
                                    required
                                    disabled />
                            </Grid>
                            :
                            <Grid item xs={3}>
                                <TextField
                                    label="Seed"
                                    type="number"
                                    name="mall_price"
                                    fullWidth
                                    required
                                    inputProps={{ min: "0", step: "1" }}
                                    value={mall_price}
                                    onChange={onChangeForm} />
                            </Grid>
                        }
                        <Grid item xs={3}>
                            <TextField
                                label="마감일"
                                type="date"
                                name="endDate"
                                fullWidth
                                value={edate}
                                onChange={onChangeEndDate}
                                inputProps={{
                                    min: tomorrow // 현재 날짜 이전의 날짜 선택 불가능
                                }}
                                required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="mall_info"
                                label="내용"
                                fullWidth
                                multiline
                                value={mall_info}
                                rows={4}
                                onChange={onChangeForm} />
                        </Grid>
                        <Grid item xs={12}>
                            <Form.Group as={Row} className="mb-3">
                                <Col sm={12}>
                                    <OverlayTrigger placement="top" overlay={thumbnail}>
                                        <Form.Control
                                            type="file"
                                            multiple
                                            onChange={onChangeFiles} />
                                    </OverlayTrigger>
                                </Col>
                            </Form.Group>
                        </Grid>
                        <Grid item xs={12}>
                            <Row>
                                {files.map(f =>
                                    <Col key={f.name} xs={2} className='mb-2'>
                                        <img src={f.name} style={{ width: "10rem" }} />
                                    </Col>
                                )}
                            </Row>
                        </Grid>
                        <Grid item xs={12} className="text-end">
                            <Button type="submit" variant="outline-secondary" >게시글 작성</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    )
}

export default InsertPage