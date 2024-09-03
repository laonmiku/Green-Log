import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, Paper, Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

const AdminQAList = () => {
    const [list, setList] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [key, setKey] = useState('qa_title');
    const [word, setWord] = useState('');
    const adminIds = ['admin', 'seop', 'hanna', 'gr001231', 'laonmiku', 'ne4102'];
    const currentUser = sessionStorage.getItem('uid');

    const callAPI = async () => {
        try {
            const res = await axios.get(`/qa/qaList?key=${key}&word=${word}&page=${page}&size=${size}`);
            setList(res.data.doc);
            setCount(res.data.total);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        callAPI();
    }, [page, key, word]);

    const onClickSearch = async (e) => {
        e.preventDefault();
        setPage(1);
        await callAPI();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onClickSearch(e); // e를 전달
        }
    };

    return (
        <Container sx={{ my: 4 }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={12}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            Q&A 목록
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>번호</TableCell>
                                        <TableCell>제목</TableCell>
                                        <TableCell>글쓴이</TableCell>
                                        <TableCell>등록일</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {list.map((post, index) => (
                                        <TableRow key={post.QA_key}>
                                            <TableCell>{list.length - index}</TableCell>
                                            <TableCell>
                                                {post.QA_lock === 1 && !adminIds.includes(currentUser) && currentUser !== post.QA_writer ? (
                                                    <span>🔒 비밀글</span>
                                                ) : (
                                                    <Link to={`/community/qa/read/${post.QA_key}`} style={{ textDecoration: 'none' }}>
                                                        {post.QA_title}
                                                    </Link>
                                                )}
                                            </TableCell>
                                            <TableCell>{post.QA_writer}</TableCell>
                                            <TableCell>{post.QA_regDate}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {count > size && (
                            <Box mt={3} display="flex" justifyContent="center">
                                <Pagination
                                    count={Math.ceil(count / size)}
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
        </Container>
    );
};

export default AdminQAList;
