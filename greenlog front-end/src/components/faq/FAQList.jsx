import React, { useState, useEffect, useContext } from 'react';
import Pagination from 'react-js-pagination';
import axios from 'axios';
import HeaderTabs from '../../common/useful/HeaderTabs';
import { Accordion, AccordionSummary, Pagination as MuiPagination, AccordionDetails, TextField, Button, Typography, Container, Box, InputAdornment, IconButton, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { UserContext } from '../user/UserContext';
import FAQImage from './faq.png';
import './FAQList.css'; // CSS 파일 임포트

const FAQList = () => {
  const { userData } = useContext(UserContext);
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [key, setKey] = useState('all');
  const [word, setWord] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);

  const callAPI = async () => {
    try {
      const res = await axios.get('/faq/list.json', {
        params: {
          key: key,
          word: word || '%',
          page: page,
          size: size
        }
      });
      setList(res.data.documents);
      setCount(res.data.total);
      const last = Math.ceil(res.data.total / size);
      if (page > last) setPage(last);

      if (res.data.total === 0) {
        alert('검색 결과가 없습니다.');
      }
    } catch (error) {
      console.error('Error fetching FAQ list:', error);
    }
  };

  useEffect(() => {
    callAPI();
  }, [page, size, key]);

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

  const WriteClick = () => {
    window.location.href = '/community/faq/insert';
  };

  const UpdateClick = (faq_key) => {
    window.location.href = `/community/faq/update/${faq_key}`;
  };

  const DeleteClick = async (faq_key) => {
    if (!window.confirm('정말로 이 FAQ를 삭제하시겠습니까?')) return;
    await axios.post(`/faq/delete/${faq_key}`);
    setList(list.filter(faq => faq.FAQ_key !== faq_key));
  };

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Container maxWidth="xl">
      <HeaderTabs />
      <Box display="flex" justifyContent="center" my={3}>
        <img src={FAQImage} alt="faq" style={{ width: '100%', maxWidth: '1000px' }} />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
        <div className="toggle-button-group">
          <button className={`toggle-button ${key === 'all' ? 'active' : ''}`} onClick={() => setKey('all')}>전체</button>
          <button className={`toggle-button ${key === 'member' ? 'active' : ''}`} onClick={() => setKey('member')}>회원</button>
          <button className={`toggle-button ${key === 'point' ? 'active' : ''}`} onClick={() => setKey('point')}>포인트</button>
          <button className={`toggle-button ${key === 'diary' ? 'active' : ''}`} onClick={() => setKey('diary')}>일기</button>
          <button className={`toggle-button ${key === 'mall' ? 'active' : ''}`} onClick={() => setKey('mall')}>피망몰</button>
        </div>
      </Box>
      <Box className="search-bar" mb={3}>
        <TextField
          variant="outlined"
          placeholder="검색어를 입력하세요"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={handleKeyDown}
          className="search-field"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={onClickSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography>검색수: {count}건</Typography>
        {userData.auth === '관리자' && (
          <Button variant="contained" sx={{ backgroundColor: 'black', color: 'white' }} onClick={WriteClick}>
            글쓰기
          </Button>
        )}
      </Box>
      {list.map((faq, index) => (
        <Box key={faq.FAQ_key} mb={2}>
          <Accordion
            expanded={activeIndex === index}
            onChange={() => toggleAccordion(index)}
            sx={{ boxShadow: 'none', '&:before': { display: 'none' }, '& .MuiAccordionSummary-root': { minHeight: 'auto', '&.Mui-expanded': { minHeight: 'auto' } }, '& .MuiAccordionDetails-root': { padding: 0 } }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: activeIndex === index ? 'bold' : 'normal' }}>Q. {faq.FAQ_question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ whiteSpace: 'pre-wrap' }}>A. {faq.FAQ_answer}</Typography>
              {userData.auth && (
                <Box mt={3} display="flex" justifyContent="flex-end">
                  <Button variant="contained" sx={{ backgroundColor: 'black', color: 'white', mr: 1 }} onClick={() => UpdateClick(faq.FAQ_key)} >
                    수정
                  </Button>
                  <Button variant="contained" sx={{ backgroundColor: 'black', color: 'white' }} onClick={() => DeleteClick(faq.FAQ_key)}>
                    삭제
                  </Button>
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ backgroundColor: 'black' }} />
        </Box>
      ))}
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

export default FAQList;
