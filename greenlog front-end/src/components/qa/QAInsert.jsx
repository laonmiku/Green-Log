import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import axios from 'axios';

const QAInsert = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const uid = sessionStorage.getItem("uid");
  const [form, setForm] = useState({
    qa_title: '',
    qa_contents: '',
    qa_writer: uid,
    qa_lock: 0 
    
  });

  const { qa_title, qa_contents, qa_writer, qa_lock } = form;

  const onChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onChangeCheckbox = (e) => {
    setForm({ ...form, qa_lock: e.target.checked ? 1 : 0 });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (qa_title === "") {
      alert("제목을 입력하세요!");
      return;
    }
    if (!window.confirm("질문을 등록하실래요?")) return;
    setLoading(true);
  
    const updateForm = { ...form };
    const response = await axios.post("/qa/insert", updateForm);
    setLoading(false);
  
    if (response.status === 200) {
      alert('질문이 등록되었습니다.');
      navigate(`/community/qa/list.json`);
    } else {
      alert('질문 등록에 실패했습니다.');
    }
  };
  

  return (
    <div>
      <h1 className="text-center my-5">Q&A</h1>
      <Form onSubmit={onSubmit}>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            name="qa_title"
            placeholder="제목을 입력하세요"
            value={qa_title}
            onChange={onChangeForm}
          />
        </InputGroup>
        <Form.Group controlId="qa_contents">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            name="qa_contents"
            value={qa_contents}
            onChange={onChangeForm}
            style={{ whiteSpace: 'pre-wrap' }} 
          />
        </Form.Group>
        <Form.Group controlId="qa_lock" className="mt-3">
          <Form.Check 
            type="checkbox" 
            label="비밀글로 설정" 
            checked={qa_lock === 1}
            onChange={onChangeCheckbox} 
          />
        </Form.Group>
        <Button type="submit" className="mt-3" disabled={loading} variant="success">
          {loading ? <Spinner animation="border" size="sm" /> : '등록'}
        </Button>
      </Form>
    </div>
  );
};

export default QAInsert;
