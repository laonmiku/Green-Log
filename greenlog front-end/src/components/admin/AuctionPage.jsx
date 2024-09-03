import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Badge, InputGroup, Form, Card, Table } from 'react-bootstrap'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../common/useful/Paging.css';
import Pagination from 'react-js-pagination'
import { Calendar } from 'primereact/calendar';
import Button from '@mui/material/Button';
import malltransaction from './malltransaction.png'
import CircularProgress from '@mui/material/CircularProgress';

const AuctionPage = () => {
  const [list, setList] = useState([]);
  const [key, setKey] = useState("auction_seller");
  const [word, setWord] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [count, setCount] = useState(0);
  const [checked, setChecked] = useState(false);
  const [dates, setDates] = useState(null);
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [loading, setLoading] = useState(false);

  const callAPI = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`/auction/admin/list?key=${key}&word=${word}&page=${page}&size=${size}&date1=${date1}&date2=${date2}`)
      console.log(res.data);
      setCount(res.data.total);
      const data = res.data.documents.map(t => t && { ...t, checked: false });
      setList(data);
    } catch (error) {
      console.error('Error data diary:', error);
      alert("데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    callAPI();
  }, [page])

  const onSubmit = (e) => {
    e.preventDefault();
    if (word === "") {
      alert("검색어를 입력하세요");
      return;
    }
    callAPI();
  }

  //체크박스
  useEffect(() => {
    let cnt = 0;
    list.forEach(list => list.checked && cnt++);
    setChecked(cnt);
  }, [list])

  const onChangeAll = (e) => {
    const data = list.map(t => t && { ...t, checked: e.target.checked });
    setList(data);
  }

  const onChangeSingle = (e, auction_key) => {
    const data = list.map(t => t.auction_key === auction_key ? { ...t, checked: e.target.checked } : t);
    setList(data);
  }

  //데이터삭제(update auction_state=1)
  const onClickDelete = async () => {
    if (!window.confirm("거래내역은 복구하기 어렵습니다. 삭제하시겠습니까?")) return;

    const checkedItems = list.filter(item => item.checked);
    if (checkedItems.length === 0) {
      alert("선택하신 내역이 없습니다.");
      return;
    }

    let cnt = 0;
    for (const item of checkedItems) {
      await axios.post(`/auction/delete/${item.auction_key}`);
      cnt++;
    }

    alert(`${cnt}개의 거래내역이 삭제되었습니다.`);
    callAPI();
    setPage(1);
  };


  //데이터복구(update auction_state=0)
  const onClickRestore = async () => {
    if (!window.confirm("거래내역을 복구하시겠습니까?")) return;

    const checkedItems = list.filter(item => item.checked);
    if (checkedItems.length === 0) {
      alert("선택하신 내역이 없습니다.");
      return;
    }

    let cnt = 0;
    for (const item of checkedItems) {
      await axios.post(`/auction/restore/${item.auction_key}`);
      cnt++;
    }

    alert(`${cnt}개의 거래내역이 복구되었습니다.`);
    callAPI();
    setPage(1);
  };



  //달력날짜표시
  function fmtDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  function fmtDate2(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = '23';
    const minutes = '59';
    const seconds = '59';
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const onChangedate = (e) => {
    setDates(e.value);
    setDate1(fmtDate(e.value[0]))
    setDate2(fmtDate2(e.value[1]))
  };


  if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>;
  return (
    <div>
      <Row>
        <Col md={3} lg={2}>
          <Sidebar />
        </Col>
        <Col>
          <Row className='justify-content-center my-2'>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '5px 0' }}>
              <img src={malltransaction} alt="car" style={{ width: '100%', maxWidth: '800px' }} />
            </div>
            <Col xs={12} md={10} lg={8}>
              <form onSubmit={onSubmit}>
                <InputGroup className="mb-5">
                  <Form.Select value={key} name="key" onChange={(e) => setKey(e.target.value)}>
                    <option value="auction_seller">판매자</option>
                    <option value="auction_buyer">구매자</option>
                    <option value="auction_regDate">거래일</option>
                    <option value="auction_state">삭제상태</option>
                  </Form.Select>
                  {key === "auction_regDate" ?
                    <Calendar value={dates} onChange={onChangedate} selectionMode="range" dateFormat="yy/mm/dd" readOnlyInput hideOnRangeSelection /> :
                    <Form.Control value={word} name="word" onChange={(e) => setWord(e.target.value)} />
                  }
                  <Button variant="contained" color='success' type="submit" size="sm" className="me-3">검색</Button>
                  <span> 총: {count}건</span>
                </InputGroup>
              </form>
            </Col>
            <Col>
              <div className="text-end me-2 mt-2">
                <Button variant="outlined" color='error' size="sm" className="me-2" onClick={onClickDelete}>선택삭제</Button>
                <Button variant="outlined" type="submit" size="sm" onClick={onClickRestore}>선택복원</Button>
              </div>
            </Col>
          </Row>
          <Table>
            <thead>
              <tr>
                <td><input type="checkbox" onClick={onChangeAll} checked={list.length === checked} /></td>
                <td>경매번호</td>
                <td>상품번호</td>
                <td colSpan={2}>상품명</td>
                <td>판매자</td>
                <td>구매자</td>
                <td>등록일</td>
                <td>거래씨드</td>
                <td>상태</td>
              </tr>
            </thead>
            <tbody>
              {list.map(auc =>
                <tr key={auc.auction_key}>
                  <td><input type="checkbox" onChange={(e) => onChangeSingle(e, auc.auction_key)} checked={auc.checked} /></td>
                  <td>{auc.auction_key}</td>
                  <td>{auc.auction_mall_key}</td>
                  <td>{auc.mall_title}</td>
                  <td><Link to={`/mall/read/${auc.mall_key}`}>
                    <img src={auc.mall_photo || "http://via.placeholder.com/200x200"} style={{ width: "40%", height: "4rem", objectFit: "contain" }} />
                  </Link>
                  </td>
                  <td>{auc.auction_seller}</td>
                  <td>{auc.auction_buyer}</td>
                  <td>{auc.fmtdate}</td>
                  <td>{auc.auction_amount}씨드</td>
                  <td>{auc.auction_state === 1 ? "삭제" : ""}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      {count > size &&
        <Pagination
          activePage={page}
          itemsCountPerPage={size}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={(e) => setPage(e)}
        />
      }
    </div>
  )
}

export default AuctionPage