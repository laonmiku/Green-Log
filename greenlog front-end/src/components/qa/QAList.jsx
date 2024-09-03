import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeaderTabs from '../../common/useful/HeaderTabs';
import { UserContext } from '../user/UserContext';
import SearchIcon from '@mui/icons-material/Search';
import QAImage from './qa.png';
import { Container, Box, Typography, Pagination as MuiPagination, Select, MenuItem, Button, Table, TableHead, TableRow, TableCell, TableBody, InputAdornment, OutlinedInput } from '@mui/material';

const QAList = () => {
  const { userData } = useContext(UserContext);
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(8);
  const [key, setKey] = useState('qa_title');
  const [word, setWord] = useState('');

  const callAPI = async () => {
    const res = await axios.get(`/qa/list.json?key=${key}&word=${word}&page=${page}&size=${size}`);
    console.log(res.data);
    setList(res.data.documents);
    setCount(res.data.total);

    if (res.data.total === 0) {
      alert('검색어가 없습니다');
    }
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
    callAPI();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onClickSearch(e);
    }
  };

  return (
    <Container maxWidth="xl">
      <HeaderTabs />
      <Box display="flex" justifyContent="center" my={3}>
        <img src={QAImage} alt="qa" style={{ width: '100%', maxWidth: '1000px' }} />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center">
          <Select
            value={key}
            onChange={(e) => setKey(e.target.value)}
            variant="outlined"
            sx={{ marginRight: 2 }}
          >
            <MenuItem value="qa_title">제목</MenuItem>
            <MenuItem value="qa_contents">내용</MenuItem>
            <MenuItem value="qa_writer">글쓴이</MenuItem>
          </Select>
          <OutlinedInput
            placeholder="검색어"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={handleKeyDown}
            endAdornment={
              <InputAdornment position="end">
                <Button onClick={(e) => onClickSearch(e)} style={{ border: 'none', background: 'none' }}>
                  <SearchIcon
                    style={{ cursor: 'pointer', color: 'black' }}
                  />
                </Button>
              </InputAdornment>
            }
            sx={{ width: 300, marginRight: 2 }} // 검색창 크기 조정
          />
        </Box>
        {sessionStorage.getItem('uid') && (
          <Link to="/community/qa/insert">
            <Button variant="contained" sx={{ backgroundColor: 'black', color: 'white' }}>글쓰기</Button>
          </Link>
        )}
      </Box>
      <Typography variant="subtitle1" gutterBottom>
        검색수: {count}건
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>제목</TableCell>
            <TableCell>글쓴이</TableCell>
            <TableCell>등록일</TableCell>
            <TableCell>답변상태</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((post, index) => (
            <TableRow key={post.QA_key}>
              <TableCell>{count - ((page - 1) * size + index)}</TableCell>
              <TableCell>
                {post.QA_lock === 1 && !((userData.auth === '관리자') || (userData.uuid === post.QA_writer)) ? (
                  <span>🔒 비밀글</span>
                ) : (
                  <Link to={`/community/qa/read/${post.QA_key}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {post.QA_title}
                  </Link>
                )}
              </TableCell>
              <TableCell>{post.QA_writer}</TableCell>
              <TableCell>{post.fmtdate}</TableCell>
              <TableCell>{post.QA_state === 0 ? '답변대기' : '답변완료'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    </Container>
  );
};

export default QAList;
