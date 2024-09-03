import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';

const EventRead = () => {
  const { event_key } = useParams();
  const [form, setForm] = useState({
    event_key: '',
    event_title: '',
    event_contents: '',
    event_writer: '',
    event_regDate: '',
    event_uDate: '',
    eid: ''
  });

  const { event_contents, event_title, event_writer, event_regDate, event_uDate, event_vcnt } = form;

  // 관리자 아이디 목록
  const adminIds = ['admin', 'seop', 'hanna', 'gr001231', 'laonmiku', 'ne4102'];
  const currentUser = sessionStorage.getItem('uid');

  const callAPI = async () => {
    const res = await axios.get(`/event/read/${event_key}`);
    setForm(res.data);
    console.log(res.data);
  }

  useEffect(() => {
    callAPI();
  }, []);

  const onDelete = async () => {
    if (!window.confirm(`${event_key}번 게시글을 삭제하실래요?`)) return;
    try {
      await axios.post(`/event/delete/${event_key}`);
      alert("게시글 삭제 완료!");
      window.location.href = '/community/event/list.json';
    } catch (error) {
      console.error('There was an error deleting the post!', error);
      alert('게시물 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: '50rem' }} className="mt-5">
        <Card.Img variant="top" /> {/*이미지넣을자리*/}
        <Card.Body>
          <Card.Title>{event_title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">작성자: {event_writer}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">작성일: {event_regDate}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">수정일: {event_uDate}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">조회수: {event_vcnt}</Card.Subtitle>
          <Card.Text>{event_contents}</Card.Text>
          {adminIds.includes(currentUser) && (
            <>
              <Link to={`/community/event/update/${event_key}`}>
                <Button className='me-2'>수정</Button>
              </Link>
              <Button onClick={onDelete}>삭제</Button>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default EventRead;
