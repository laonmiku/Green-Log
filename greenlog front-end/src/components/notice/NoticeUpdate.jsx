import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

const NoticeUpdate = () => {
  const [loading, setLoading] = useState(false);
  const { notice_key } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    notice_title: '',
    notice_contents: '',
    notice_writer: '',
    notice_type: '',
    notice_regDate: '',
    notice_views: 0
  });

  const { notice_title, notice_contents, notice_writer, notice_type } = form;

  const callAPI = async () => {
    try {
      const res = await axios.get(`/notice/read/${notice_key}`);
      setForm(res.data);
    } catch (error) {
      console.error('There was an error fetching the notice data!', error);
      alert('공지사항 데이터를 가져오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    callAPI();
  }, [notice_key]);

  const onChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onReset = () => {
    if (!window.confirm('변경된 내용을 취소하실래요?')) return;
    callAPI();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm('변경된 내용을 수정하실래요?')) return;
    setLoading(true);
    try {
      const response = await axios.post(`/notice/update/${notice_key}`, form);
      setLoading(false);
      if (response.status === 200) {
        alert('공지사항이 수정되었습니다.');
        navigate(`/community/notice/read/${notice_key}`);
      } else {
        alert('공지사항 수정에 실패했습니다.');
      }
    } catch (error) {
      setLoading(false);
      console.error('There was an error updating the notice!', error);
      alert('공지사항 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>공지사항 수정</h1>
      <Row className='justify-content-center'>
        <Col xs={12} md={10} lg={8}>
          {form && form.notice_title && (
            <Form onReset={onReset} onSubmit={onSubmit}>
              <InputGroup className='mb-3'>
                <FormControl
                  as="select"
                  name="notice_type"
                  value={notice_type}
                  onChange={onChangeForm}
                  style={{ maxWidth: '150px', marginRight: '10px' }}>
                  <option value="1">일반</option>
                  <option value="2">회원</option>
                  <option value="3">포인트</option>
                  <option value="4">기타</option>
                </FormControl>
                <FormControl
                  placeholder="제목을 입력하세요"
                  name="notice_title"
                  value={notice_title}
                  onChange={onChangeForm}
                  className='mb-2'
                />
              </InputGroup>
              <Form.Group controlId="notice_contents">
                <Form.Label>내용</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  name="notice_contents"
                  value={notice_contents}
                  onChange={onChangeForm}
                  style={{ whiteSpace: 'pre-wrap' }} 
                />
              </Form.Group>
              <div className='text-center mt-3'>
                <Button type="submit" className='px-5 me-2' disabled={loading}>
                  {loading ? '수정 중...' : '수정'}
                </Button>
                <Button type="reset" className='px-5' variant='secondary'>취소</Button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default NoticeUpdate;
