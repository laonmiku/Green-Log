import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NoticeRead.css'; // CSS 파일 추가

const NoticeRead = () => {
  const { notice_key } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    notice_key: '',
    notice_title: '',
    notice_contents: '',
    notice_writer: '',
    notice_regDate: '',
    notice_vcnt: 0
  });

  const { notice_title, notice_contents, notice_writer, notice_regDate } = form;

  // 관리자 아이디 목록
  const adminIds = ['admin', 'seop', 'hanna', 'gr001231', 'laonmiku', 'ne4102'];
  const currentUser = sessionStorage.getItem('uid');

  const callAPI = async () => {
    try {
      const res = await axios.get(`/notice/read/${notice_key}`);
      setForm(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('There was an error fetching the notice data!', error);
      alert('공지사항 데이터를 가져오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    callAPI();
  }, [notice_key]);

  const onDelete = async () => {
    if (!window.confirm(`${notice_key}번 공지사항을 삭제하실래요?`)) return;
    try {
      await axios.post(`/notice/delete/${notice_key}`);
      alert("공지사항 삭제 완료!");
      window.location.href = '/community/notice/list.json';
    } catch (error) {
      console.error('There was an error deleting the notice!', error);
      alert('공지사항 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="notice-read-container">
      <div className="notice-header">
        <h2>{notice_title}</h2>
        <div className="notice-meta">
          <span>작성자: {notice_writer}</span>
          <span>작성일: {notice_regDate}</span>
        </div>
        <hr className="divider" />
      </div>
      <div className="notice-content">
        <p>{notice_contents}</p>
      </div>
      {adminIds.includes(currentUser) && (
        <div className="notice-actions">
          <Link to={`/community/notice/update/${notice_key}`}>
            <button className="btn">수정</button>
          </Link>
          <button className="btn" onClick={onDelete}>삭제</button>
        </div>
      )}
      <div className="notice-navigation">
        <button className="btn" onClick={() => navigate('/community/notice/list.json')}>목록</button>
      </div>
    </div>
  );
};

export default NoticeRead;
