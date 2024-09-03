import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Table, Badge, InputGroup, Form } from 'react-bootstrap'
import { TbBrandSnapseed } from "react-icons/tb";
import Pagination from 'react-js-pagination';
import { Calendar } from 'primereact/calendar';

const TradeListPage = ({ seed_number }) => {
    const [list, setList] = useState([]);
    const [word, setWord] = useState('');
    const [key, setKey] = useState('id');
    const [size, setSize] = useState(10);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState('');
    const [checked, setChecked] = useState(false);
    const [dates, setDates] = useState(null);
    const [date1, setDate1] = useState(null);
    const [date2, setDate2] = useState(null);

    const callAPI = async () => {
        if (seed_number) {
            const res = await axios.get(`/trade/userList/${seed_number}?key=${key}&word=${word}&size=${size}&page=${page}&date1=${date1}&date2=${date2}`)
            console.log(res.data);
            const data = res.data.doc.map(t => t && { ...t, checked: false });
            setList(data);
            setCount(res.data.total);
        }
    }
    useEffect(() => { callAPI() }, [seed_number, page])

    const onClickSearch = (e) => {
        e.preventDefault();
        setPage(1);
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

    const onChangeSingle = (e, trade_key) => {
        const data = list.map(t => t.trade_key === trade_key ? { ...t, checked: e.target.checked } : t);
        setList(data);
    }

//데이터삭제(update trade_status=1)
    const onClickUpdate = async () => {
        if (!window.confirm("거래내역은 복구하기 어렵습니다. 삭제하시겠습니까?")) return;
        
        const checkedItems = list.filter(item => item.checked);
        if (checkedItems.length === 0) {
            alert("선택하신 내역이 없습니다.");
            return;
        }
    
        let cnt = 0;
        for (const item of checkedItems) {
            await axios.post(`/trade/update/${item.trade_key}`);
            cnt++;
        }
    
        alert(`${cnt}개의 거래내역이 삭제되었습니다.`);
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

    return (
        <div>
            <Row className>
                <Col xs={8} className='my-2'>
                    <form id="searchForm" onSubmit={onClickSearch}>
                        <InputGroup className='text-center'>
                            <Form.Select
                                value={key}
                                onChange={(e) => {
                                    setKey(e.target.value)
                                }}>
                                <option value="id">아이디+닉네임</option>
                                <option value="type">입출금</option>
                                <option value="trade">거래일</option>
                            </Form.Select>
                            {key === 'id' &&
                                <Form.Control
                                    onChange={(e) => {
                                        setWord(e.target.value);
                                    }}
                                    value={word}
                                    placeholder='검색어를 입력하세요'
                                />
                            }
                            {key === 'type' && (
                                <Form.Select
                                    onChange={(e) => {
                                        setWord(e.target.value);
                                    }}
                                    value={word}
                                    placeholder='검색어를 입력하세요'
                                >
                                    <option value="">선택하세요</option>
                                    <option value={1}>입금</option>
                                    <option value={-1}>출금</option>
                                </Form.Select>
                            ) } 
                             {key === "trade"&&
                                    <Calendar value={dates} onChange={onChangedate} selectionMode="range" dateFormat="yy/mm/dd"  readOnlyInput={false} hideOnRangeSelection />
                                }
                            <Button type='submit' size='sm'>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col>
                    <div className="text-end me-2 mt-2">
                        <Button size="sm" onClick={onClickUpdate}>선택삭제</Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                            {count===0 || <td><input type="checkbox" onClick={onChangeAll} checked={list.length === checked} /></td>}
                                <td>No</td>
                                <td>타입</td>
                                <td>Date</td>
                                <td>from</td>
                                <td>amount</td>
                                <td>내용</td>
                            </tr>
                        </thead>
                        {list.map(data =>
                            <tbody key={data.trade_key}>
                                <tr className='mt-2'>
                                    <td><input type="checkbox" onChange={(e) => onChangeSingle(e, data.trade_key)} checked={data.checked} /></td>
                                    <td >{data.trade_key}</td>
                                    <td>{data.trade_state === 1 ? "입금" : "출금"}</td>
                                    <td>{data.fmtdate}</td>
                                    <td>{data.from_user_uid === "admin" ? <Badge bg='dark'>관리자</Badge> : `${data.from_user_uid} (${data.from_user_nickname})`}</td>
                                    <td>{data.trade_amount} <span style={{ fontSize: '15px', color: "brown" }}><TbBrandSnapseed /></span> </td>
                                    <td>{data.trade_info ? data.trade_info : "경매 낙찰"}</td>
                                </tr>
                            </tbody>
                        )}
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
                    onChange={(e) => setPage(e)} />
            }
        </div>
    )
}

export default TradeListPage