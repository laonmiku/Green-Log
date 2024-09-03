import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination as MuiPagination, Chip, TextField, Button, MenuItem, Select, FormControl, Box } from '@mui/material';
import { styled } from '@mui/system';
import { FaHotjar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import BBSImage from './bbs.png'

// Define custom styles for top list rows
const TopListTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: '#f5f5f5',
}));

// Define custom styles for default rows
const DefaultTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: '#ffffff',
}));

const BBSListPage = () => {
    const [list, setList] = useState([]);
    const [topList, setTopList] = useState([]);
    const [noticeList, setNoticeList] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [key, setKey] = useState('title');
    const [key2, setKey2] = useState("all");
    const [word, setWord] = useState('');
    const [showNotice, setShowNotice] = useState(true);

    const callAPI = async () => {
        const res = await axios.get(`/bbs/list?key=${key}&word=${word}&page=${page}&size=${size}&key2=${key2}`);
        setList(res.data.documents);
        setCount(res.data.total);
        const res2 = await axios.get('/bbs/top');
        setTopList(res2.data);
        const res3 = await axios.get('/bbs/notice');
        setNoticeList(res3.data);
    };

    useEffect(() => {
        callAPI();
    }, [page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

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

    const onClickRead = (bbs_key) => {
        window.location.href = `/bbs/read/${bbs_key}`;
    };

    const renderChip = (type) => {
        switch (type) {
            case 0:
                return <Chip label="자유" sx={{ backgroundColor: '#AEDFF7', color: '#000', border: 'none' }} size="small" />;
            case 1:
                return <Chip label="꿀팁" sx={{ backgroundColor: '#C3FDB8', color: '#000', border: 'none' }} size="small" />;
            case 2:
                return <Chip label="공지사항" sx={{ backgroundColor: '#FFD1DC', color: '#000', border: 'none' }} size="small" />;
            default:
                return <Chip label="기타" sx={{ backgroundColor: '#F3E5AB', color: '#000', border: 'none' }} size="small" />;
        }
    };

    const onClickShow = () => {
        setShowNotice(!showNotice);
    };

    return (
        <div className='mt-2'>
            <Box display="flex" justifyContent="center" my={3}>
                <img src={BBSImage} alt="bbs" style={{ width: '100%', maxWidth: '1000px' }} />
            </Box>
            <Box sx={{ mb: 3, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FormControl variant="outlined" sx={{ mr: 2, minWidth: 120 }}>
                            <Select
                                value={key2}
                                onChange={(e) => setKey2(e.target.value)}
                            >
                                <MenuItem value="all">전체</MenuItem>
                                <MenuItem value="free">자유</MenuItem>
                                <MenuItem value="tip">꿀팁</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" sx={{ mr: 2, minWidth: 120 }}>
                            <Select
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                            >
                                <MenuItem value="title">제목</MenuItem>
                                <MenuItem value="writer">글쓴이</MenuItem>
                                <MenuItem value="contents">내용</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="검색어"
                            variant="outlined"
                            value={word}
                            onChange={(e) => setWord(e.target.value)}
                            onKeyDown={handleKeyDown} // Enter 키 입력 처리
                            sx={{ mr: 2, width: '300px' }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon
                                            onClick={onClickSearch}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Box>
                <Box>
                    <Button onClick={onClickShow} variant="contained" sx={{ backgroundColor: 'black', color: 'white', mr: 2 }}>
                        {showNotice ? '공지접기' : '공지보기'}
                    </Button>
                    {sessionStorage.getItem('uid') && (
                        <Link to="/bbs/insert">
                            <Button variant="contained" sx={{ backgroundColor: 'black', color: 'white' }}>글쓰기</Button>
                        </Link>
                    )}
                </Box>
            </Box>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: 'none' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '8%' }}>글번호</TableCell>
                            <TableCell sx={{ width: '54%' }}>제목</TableCell>
                            <TableCell sx={{ width: '10%' }}>글쓴이</TableCell>
                            <TableCell sx={{ width: '10%' }}>등록일</TableCell>
                            <TableCell sx={{ width: '8%' }}>조회수</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {showNotice && noticeList.map(post => (
                            <TopListTableRow key={post.bbs_key} onClick={() => onClickRead(post.bbs_key)} sx={{ cursor: 'pointer' }}>
                                <TableCell>{post.bbs_key}</TableCell>
                                <TableCell>
                                    {renderChip(post.bbs_type)} <strong>{post.bbs_title}</strong>
                                </TableCell>
                                <TableCell>
                                    <Chip label="관리자" sx={{ backgroundColor: 'rgb(0, 0, 0)', color: 'rgb(255, 255, 255)', border: 'none' }} size="small" />
                                    <img src="/images/green.png" alt="Icon" style={{ width: "2rem", marginRight: "0.5rem" }} />
                                </TableCell>
                                <TableCell>{post.fmtdate}</TableCell>
                                <TableCell>{post.bbs_vcnt}</TableCell>
                            </TopListTableRow>
                        ))}
                        {topList.map(post => (
                            <TopListTableRow key={post.bbs_key} onClick={() => onClickRead(post.bbs_key)} sx={{ cursor: 'pointer' }}>
                                <TableCell>{post.bbs_key}</TableCell>
                                <TableCell>
                                    {renderChip(post.bbs_type)} {post.bbs_title} <span style={{ color: "red" }}>HOT<FaHotjar style={{ color: "red" }} /> </span>
                                </TableCell>
                                <TableCell>{post.bbs_writer}</TableCell>
                                <TableCell>{post.fmtdate}</TableCell>
                                <TableCell>{post.bbs_vcnt}</TableCell>
                            </TopListTableRow>
                        ))}
                        {list.map(post => (
                            <DefaultTableRow key={post.bbs_key} onClick={() => onClickRead(post.bbs_key)} sx={{ '&:hover': { backgroundColor: '#f5f5f5' }, cursor: 'pointer' }}>
                                <TableCell>{post.bbs_key}</TableCell>
                                <TableCell>
                                    {renderChip(post.bbs_type)} {post.bbs_title}
                                </TableCell>
                                <TableCell>{post.bbs_writer}</TableCell>
                                <TableCell>{post.fmtdate}</TableCell>
                                <TableCell>{post.bbs_vcnt}</TableCell>
                            </DefaultTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {count > size &&
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <MuiPagination
                        count={Math.ceil(count / size)}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                    />
                </Box>
            }
        </div>
    );
};

export default BBSListPage;
