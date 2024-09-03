import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

const FAQUpdate = () => {
  const [loading, setLoading] = useState(false);
  const { faq_key } = useParams();
  const [form, setForm] = useState(null); 
  const navigate = useNavigate();

  // 데이터 가져오는 함수
  const fetchFAQ = async () => {
    try {
      const response = await axios.get(`/faq/read/${faq_key}`);
      setForm(response.data);
    } catch (error) {
      console.error('There was an error fetching the FAQ data!', error);
      alert('FAQ 데이터를 가져오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchFAQ();
  }, [faq_key]);

  const onChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onReset = () => {
    if (!window.confirm('변경된 내용을 취소하실래요?')) return;
    fetchFAQ();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!window.confirm('변경된 내용을 수정하실래요?')) return;
    setLoading(true);
    axios.post(`/faq/update/${faq_key}`, form, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setLoading(false);
        if (response.status === 200) {
          alert('FAQ가 수정되었습니다.');
          navigate('/community/faq/list.json');
        } else {
          alert('FAQ 수정에 실패했습니다.');
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('There was an error updating the FAQ!', error);
        alert('FAQ 수정 중 오류가 발생했습니다.');
      });
  };

  if (!form) {
    return <div>Loading...</div>; 
  }

  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>FAQ 수정</h1>
      <Row className='justify-content-center'>
        <Col xs={12} md={10} lg={8}>
          <Form onReset={onReset} onSubmit={onSubmit}>
            <InputGroup className='mb-3'>
              <FormControl
                as="select"
                name="faq_type"
                value={form.faq_type} 
                onChange={onChangeForm}
                style={{ maxWidth: '150px', marginRight: '10px' }}>
                <option value="0">회원</option>
                <option value="2">포인트</option>
                <option value="3">일기</option>
                <option value="4">피망몰</option>
              </FormControl>
              <FormControl
                placeholder="질문을 입력하세요"
                name="faq_question"
                value={form.faq_question} 
                onChange={onChangeForm}
                className='mb-2'
              />
            </InputGroup>
            <Form.Group controlId="faq_answer">
              <Form.Label>답변</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                name="faq_answer"
                value={form.faq_answer}
                onChange={onChangeForm}
                style={{ whiteSpace: 'pre-wrap' }} 
              />
            </Form.Group>
            <div className='text-center mt-3'>
              <Button type="submit" className='px-5 me-2' disabled={loading} variant='dark'>
                {loading ? '수정 중...' : '수정'}
              </Button>
              <Button type="reset" className='px-5' variant='dark'>취소</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default FAQUpdate;
