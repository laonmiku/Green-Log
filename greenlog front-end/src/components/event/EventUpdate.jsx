import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EventUpdate = () => {
  const [loading, setLoading] = useState(false);
  const { event_key } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    event_title: '',
    event_contents: '',
    event_type: 0,
    event_writer: '',
    event_category: '',
    event_uDate: ''
  });

  const { event_title, event_contents, event_type, event_writer, event_category } = form;

  const callAPI = async () => {
    const res = await axios.get(`/event/read/${event_key}`);
    setForm(res.data);
  };

  useEffect(() => {
    callAPI();
  }, [event_key]);

  const onChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onChangeCKEditor = (event, editor) => {
    let data = editor.getData();
    data = data.replace(/<\/?p>/g, '');  // <p> 태그를 제거
    setForm({ ...form, event_contents: data });
  };

  const onReset = () => {
    if (!window.confirm('변경된 내용을 취소하실래요?')) return;
    callAPI();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm('변경된 내용을 수정하실래요?')) return;
    setLoading(true);
    const response = await axios.post(`/event/update/${event_key}`, form);
    setLoading(false);
    if (response.status === 200) {
      alert('게시물이 수정되었습니다.');
      navigate(`/community/event/read/${event_key}`);
    } else {
      alert('게시물 수정에 실패했습니다.');
    }
  };

  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>이벤트 수정</h1>
      <Row className='justify-content-center'>
        <Col xs={12} md={10} lg={8}>
          {form && form.event_title && (
            <Form onReset={onReset} onSubmit={onSubmit}>
              <InputGroup className='mb-3'>
                <FormControl
                  as="select"
                  name="event_category"
                  value={event_category || ''}
                  onChange={onChangeForm}
                  style={{ maxWidth: '150px', marginRight: '10px' }}>
                  <option value="0">이벤트</option>
                  <option value="1">봉사</option>
                </FormControl>
                <FormControl
                  placeholder="제목을 입력하세요"
                  name="event_title"
                  value={event_title}
                  onChange={onChangeForm}
                  className='mb-2'
                />
              </InputGroup>
              <CKEditor
                editor={ClassicEditor}
                data={event_contents}
                onChange={onChangeCKEditor}
              />
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

export default EventUpdate;
