import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const QAUpdate = () => {
  const [loading, setLoading] = useState(false);
  const { qa_key } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    qa_title: '',
    qa_contents: '',
    qa_writer: '',
    qa_lock: 0
  });

  const { qa_title, qa_contents, qa_writer, qa_lock } = form;

  const callAPI = async () => {
    const res = await axios.get(`/qa/read/${qa_key}`);
    setForm(res.data);
  };

  useEffect(() => {
    callAPI();
  }, [qa_key]);

  const onChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onChangeCheckbox = (e) => {
    setForm({ ...form, qa_lock: e.target.checked ? 1 : 0 });
  };

  const onReset = () => {
    if (!window.confirm('변경된 내용을 취소하실래요?')) return;
    callAPI();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm('변경된 내용을 수정하실래요?')) return;
    setLoading(true);
    const response = await axios.post(`/qa/update/${qa_key}`, form);
    setLoading(false);
    if (response.status === 200) {
      alert('게시물이 수정되었습니다.');
      navigate(`/community/qa/read/${qa_key}`);
    } else {
      alert('게시물 수정에 실패했습니다.');
    }
  };

  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>질문 수정</h1>
      <Row className='justify-content-center'>
        <Col xs={12} md={10} lg={8}>
          {form && form.qa_title && (
            <Form onReset={onReset} onSubmit={onSubmit}>
              <InputGroup className='mb-3'>
                <FormControl
                  placeholder="제목을 입력하세요"
                  name="qa_title"
                  value={qa_title}
                  onChange={onChangeForm}
                  className='mb-2'
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
                  label="비밀글로 수정"
                  checked={qa_lock === 1}
                  onChange={onChangeCheckbox}
                />
              </Form.Group>
              <div className='text-center mt-3'>
                <Button type="submit" className='px-3 me-2' disabled={loading} variant='secondary'>
                  {loading ? '수정 중...' : '수정'}
                </Button>
                <Button type="reset" className='px-3' variant='secondary'>취소</Button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default QAUpdate;
