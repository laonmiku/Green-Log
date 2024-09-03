import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Box, Typography, Pagination, Grid, Chip } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminAskList = () => {
    const [list, setList] = useState([]);
    const [alist, setAlist] = useState([]);
    const [count, setCount] = useState('');
    const [acount, setAcount] = useState('');
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const callList = async () => {
        try {
            const res = await axios.get(`/chat/list?page=${page}&size=${size}`);
            setList(res.data.doc);
            setCount(res.data.total);
        } catch (error) {
            console.error('Error fetching pending chats:', error);
        }
    };
    const callAlist = async () => {
        try {
            const res = await axios.get(`/chat/alist?page=${page}&size=${size}`);
            setAlist(res.data.doc);
            setAcount(res.data.total);
        } catch (error) {
            console.error('Error fetching completed chats:', error);
        }
    };
    useEffect(() => {
        callAlist();
    }, [page])
    useEffect(() => {
        callList();
    }, []);

    const onClickAdminChat = (sender) => {
        window.location.href = `/admin/chat/${sender}`;
    };

    const onClickClear = async (key) => {
        try {
            await axios.post("/chat/delete", { chat_key: key });
            alert("처리완료되었습니다");
            window.location.reload();
        } catch (error) {
            console.error('Error clearing chat:', error);
        }
    };

    return (
        <Box mt={3}>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={12}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h5" mb={2}>
                            대기중인 1대1 문의
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Chat_key</TableCell>
                                        <TableCell>요청자</TableCell>
                                        <TableCell>요청시간</TableCell>
                                        <TableCell>상태</TableCell>
                                        <TableCell>채팅방입장</TableCell>
                                        <TableCell>해결완료</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {list.map((chat) => (
                                        <TableRow key={chat.chat_key}>
                                            <TableCell>{chat.chat_key}</TableCell>
                                            <TableCell><Link to={`/admin/read/${chat.chat_sender}`}>{chat.chat_sender}</Link></TableCell>
                                            <TableCell>{chat.fmtdate}</TableCell>
                                            <TableCell>
                                                {chat.chat_state === '미처리' ? (
                                                    <Chip label="미처리" color="error" />
                                                ) : (
                                                    <Chip label="처리 완료" color="primary" />
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => onClickAdminChat(chat.chat_sender)} variant="outlined">
                                                    채팅방입장
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => onClickClear(chat.chat_key)} variant="outlined">
                                                    처리완료
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container justifyContent="center" mt={3}>
                <Grid item xs={12} md={12}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h5" mb={2}>
                            완료된 1대1 문의
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Chat_key</TableCell>
                                        <TableCell>요청자</TableCell>
                                        <TableCell>요청시간</TableCell>
                                        <TableCell>완료시간</TableCell>
                                        <TableCell>상태</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {alist.map((chat) => (
                                        <TableRow key={chat.chat_key}>
                                            <TableCell>{chat.chat_key}</TableCell>
                                            <TableCell><Link to={`/admin/read/${chat.chat_sender}`}>{chat.chat_sender}</Link></TableCell>
                                            <TableCell>{chat.fmtdate}</TableCell>
                                            <TableCell>{chat.fmtedate}</TableCell>
                                            <TableCell>
                                                {chat.chat_state === '미처리' ? (
                                                    <Chip label="미처리" color="error" />
                                                ) : (
                                                    <Chip label="처리 완료" color="primary" />
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {acount > size && (
                            <Box mt={3} display="flex" justifyContent="center">
                                <Pagination
                                    count={Math.ceil(acount / size)}
                                    page={page}
                                    onChange={(e, value) => setPage(value)}
                                    color="primary"
                                    boundaryCount={2}
                                    siblingCount={2}
                                    showFirstButton
                                    showLastButton
                                />
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminAskList;
