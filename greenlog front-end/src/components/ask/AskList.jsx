import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box } from '@mui/material';
import axios from 'axios';
import inquireImage from './inquire.png'

const AskList = () => {
    const [chk, setChk] = useState('');
    const uid = sessionStorage.getItem("uid");
    const [list, setList] = useState('');
    const onClickAsk = async () => {
        if (chk === 0) {
            window.location.href = `/user/chat`;
            await axios.post("/chat/insert", { chat_sender: uid });
        } else {
            window.location.href = `/user/chat`;
        }
    }

    const callAPI = async () => {
        const res = await axios.get(`/chat/searchChatkey/${uid}`);
        const res2 = await axios.get(`/chat/ulist/${uid}`)
        console.log(res.data);
        setChk(res.data);
        setList(res2.data.doc)
    }

    useEffect(() => {
        callAPI();
    }, [uid]);

    return (
        <Container sx={{ my: 5 }}>
            <Box display="flex" justifyContent="center" my={3}>
                <img src={inquireImage} alt="inquire" style={{ width: '60%', maxWidth: '1000px' }} />
            </Box>
            <Card sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom align="center">
                        1대1 문의 내역
                    </Typography>
                    {list.length > 0 ? (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>no</TableCell>
                                        <TableCell>문의일자</TableCell>
                                        <TableCell>상태</TableCell>
                                        <TableCell>대화내용보기</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {list.map((l, index) => (
                                        <TableRow key={l.chat_key}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{l.chat_sendTime}</TableCell>
                                            <TableCell>{l.chat_state === "미처리" ? "문의중" : "문의완료"}</TableCell>
                                            <TableCell>{l.chat_state === "미처리" ? (
                                                <Button variant="contained" color="primary" onClick={onClickAsk}>
                                                    대화내용보기
                                                </Button>
                                            ) : (
                                                "대화내용보기"
                                            )}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Box textAlign="center" mt={3}>
                            <Button variant="contained" color="primary" size="large" onClick={onClickAsk}>
                                문의하러가기
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
}

export default AskList;
