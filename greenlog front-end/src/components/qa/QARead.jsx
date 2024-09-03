import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../user/UserContext';
import { Container, Box, Typography, TextField, Button, Divider } from '@mui/material';

const QARead = () => {
  const { userData } = useContext(UserContext);
  const { qa_key } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    qa_key: '',
    qa_title: '',
    qa_contents: '',
    qa_writer: '',
    qa_regDate: '',
    qa_udate: '',
    comments: '',
    qa_state:''
  });

  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingComment, setEditingComment] = useState(false);

  const callAPI = async () => {
    try {
      const res = await axios.get(`/qa/read/${qa_key}`);
      console.log(res.data)
      setForm(res.data);
      setComment(res.data.comments);
    } catch (error) {
      alert('게시물 데이터를 가져오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    callAPI();
  }, [qa_key]);

  const handleEditComment = async (e) => {
    e.preventDefault();
    if (!comment) return alert("댓글을 입력하세요!");
    setLoading(true);

    try {
      await axios.post(`/qa/update/${qa_key}`, { ...form, comments: comment, qa_state:1 });
      setLoading(false);
      setEditingComment(false);
      callAPI();
    } catch (error) {
      setLoading(false);
      alert('댓글 수정 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteComment = async () => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
    setLoading(true);

    try {
      await axios.post(`/qa/update/${qa_key}`, { ...form, comments: '' });
      setLoading(false);
      setComment('');
      callAPI();
    } catch (error) {
      setLoading(false);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm(`${qa_key}번 게시글을 삭제하실래요?`)) return;
    try {
      await axios.post(`/qa/delete/${qa_key}`);
      alert("게시글 삭제 완료!");
      window.location.href = '/community/qa/list.json';
    } catch (error) {
      alert('게시물 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '40px' }}>
      <Box mb={4}>
        <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
          {form.qa_title}
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="subtitle2" color="textSecondary">
            작성자: {form.qa_writer}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            작성일: {form.qa_regDate}
          </Typography>
          {userData.uuid === form.qa_writer && (
            <Box>
              <Button
                variant="contained" sx={{ backgroundColor: 'black', color: 'white' }}
                style={{ marginRight: '10px' }}
                onClick={() => navigate(`/community/qa/update/${qa_key}`)}
              >
                수정
              </Button>
              <Button
                variant="contained" sx={{ backgroundColor: 'black', color: 'white' }}
                onClick={handleDeletePost}
              >
                삭제
              </Button>
            </Box>
          )}
        </Box>
        <Divider style={{ marginBottom: '20px', backgroundColor: '#ddd' }} />
      </Box>
      <Typography variant="body1" style={{ whiteSpace: 'pre-line' }} mt={2}>
        {form.qa_contents}
      </Typography>
      <Divider style={{ margin: '40px 0', backgroundColor: '#ddd' }} />

      {form.comments && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
            답변
          </Typography>
          <Divider style={{ marginBottom: '20px', backgroundColor: '#ddd' }} />
          <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
            {form.comments}
          </Typography>
        </Box>
      )}

      {userData.auth === '관리자' && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
            {editingComment ? '답변 수정' : form.comments ? '답변' : '답변 작성'}
          </Typography>
          <Divider style={{ marginBottom: '20px', backgroundColor: '#ddd' }} />
          {editingComment || !form.comments ? (
            <form onSubmit={handleEditComment}>
              <TextField
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="답변을 입력하세요."
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                style={{ marginTop: '10px' }}
              >
                {loading ? '저장 중...' : '답변 저장'}
              </Button>
            </form>
          ) : (
            <Button
              variant="contained"
              sx={{ backgroundColor: 'black', color: 'white' }}
              onClick={() => setEditingComment(true)}
            >
              답변 수정
            </Button>
          )}
        </Box>
      )}

      {userData.auth === '관리자' && form.comments && (
        <Box mt={2}>
          <Button
            onClick={handleDeleteComment}
            variant="contained" sx={{ backgroundColor: 'black', color: 'white' }}
          >
            답변 삭제
          </Button>
        </Box>
      )}

      <Box mt={4}>
        <Button
          variant="contained" sx={{ backgroundColor: 'black', color: 'white' }}
          onClick={() => navigate('/community/qa/list.json')}
        >
          목록
        </Button>
      </Box>
    </Container>
  );
};

export default QARead;
