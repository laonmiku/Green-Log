import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import axios from 'axios';

const FAQInsert = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const uid = sessionStorage.getItem("uid");
  const [form, setForm] = useState({
    faq_question: '',
    faq_answer: '',
    faq_type: '0',
    faq_writer: uid
  });

  const { faq_question, faq_answer, faq_type } = form;

  const onChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (faq_question === "") {
      alert("질문을 입력하세요!");
      return;
    }
    if (!window.confirm("FAQ를 등록하실래요?")) return;
    setLoading(true);

    const updateForm = { ...form };
    try {
      const response = await axios.post("/faq/insert", updateForm);
      setLoading(false);

      if (response.status === 200) {
        alert('FAQ가 등록되었습니다.');
        navigate(`/community/faq/list.json`);
      } else {
        alert('FAQ 등록에 실패했습니다.');
      }
    } catch (error) {
      setLoading(false);
      console.error('There was an error inserting the FAQ!', error);
      alert('FAQ 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h1 className="text-center my-5">FAQ 등록</h1>
      <Form onSubmit={onSubmit}>
        <InputGroup className="mb-3">
          <FormControl
            as="select"
            name="faq_type"
            value={faq_type}
            onChange={onChangeForm}
            style={{ maxWidth: '150px', marginRight: '10px' }}>
            <option value={1}>회원</option>
            <option value={2}>포인트</option>
            <option value={3}>일기</option>
            <option value={4}>피망몰</option>
          </FormControl>
          <FormControl
            type="text"
            name="faq_question"
            placeholder="질문을 입력하세요"
            value={faq_question}
            onChange={onChangeForm}
          />
        </InputGroup>
        <Form.Group controlId="faq_answer">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            name="faq_answer"
            value={faq_answer}
            onChange={onChangeForm}
            style={{ whiteSpace: 'pre-wrap' }} 
          />
        </Form.Group>
        <Button type="submit" className="mt-3" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : '등록'}
        </Button>
      </Form>
    </div>
  );
};

export default FAQInsert;
