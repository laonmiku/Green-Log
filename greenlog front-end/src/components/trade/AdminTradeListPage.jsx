import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, InputGroup, Table, Form, Badge } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { TbBrandSnapseed } from "react-icons/tb";
import Sidebar from '../admin/Sidebar'
import { Calendar } from 'primereact/calendar';
import Button from '@mui/material/Button';
import seedtransaction from './seedtransaction.png'
import CircularProgress from '@mui/material/CircularProgress';


const AdminTradeListPage = () => {
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [key, setKey] = useState('from');
    const [word, setWord] = useState("");
    const [list, setList] = useState([]);
    const [checked, setChecked] = useState(false);
    const [dates, setDates] = useState(null);
    const [date1, setDate1] = useState(null);
    const [date2, setDate2] = useState(null);
    const [loading, setLoading] = useState(false);

    const callAPI = async () => {
        setLoading(true)
        try{
            const res = await axios.get(`/trade/adminList?key=${key}&word=${word}&page=${page}&size=${size}&date1=${date1}&date2=${date2}`)
            console.log(res.data.doc)
            const data = res.data.doc.map(t => t && { ...t, checked: false });
            setList(data);
            setCount(res.data.total)
        }catch (error) {
            console.error('Error data diary:', error);
            alert("데이터를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
        
    }
    const onClickSearch = async (e) => {
        e.preventDefault();
        setPage(1);
        callAPI();
    };
    useEffect(() => { callAPI() }, [page])

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
    const onClickDelete = async () => {
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


    //데이터복구(update trade_status=0)
    const onClickRestore = async () => {
        if (!window.confirm("거래내역을 복구하시겠습니까?")) return;

        const checkedItems = list.filter(item => item.checked);
        if (checkedItems.length === 0) {
            alert("선택하신 내역이 없습니다.");
            return;
        }

        let cnt = 0;
        for (const item of checkedItems) {
            await axios.post(`/trade/restore/${item.trade_key}`);
            cnt++;
        }

        alert(`${cnt}개의 거래내역이 복구되었습니다.`);
        callAPI();
        setPage(1);
    };


    //날짜표시
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
                <Col lg={2}>
                    <Sidebar />
                </Col>
                <Col>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '5px 0' }}>
                        <img src={seedtransaction} alt="car" style={{ width: '100%', maxWidth: '800px' }} />
                    </div>
                    <Row className="my-3">
                        <Col xs={12} md={10} lg={8}>
                            <InputGroup >
                                <Form.Select className='me-2' value={key} onChange={(e) => setKey(e.target.value)}>
                                    <option value="from">보내는 사람</option>
                                    <option value="to">받는 사람</option>
                                    <option value="trade">거래일</option>
                                    <option value="status">삭제상태</option>
                                </Form.Select>
                                {key === "trade" ?
                                    <Calendar value={dates} onChange={onChangedate} selectionMode="range" dateFormat="yy/mm/dd" readOnlyInput={false} hideOnRangeSelection /> :
                                    <Form.Control placeholder='검색어' value={word} onChange={(e) => setWord(e.target.value)} />
                                }
                                <Button variant="contained" color='success' onClick={(e) => onClickSearch(e)} className='me-2'>검색</Button>
                                <span> 총: {count}건</span>
                            </InputGroup>
                        </Col>
                        <Col>
                            <div className='text-end me-2'>
                                <Button variant="outlined" color='error' size="sm" className='me-2' onClick={onClickDelete}>선택삭제</Button>
                                <Button variant="outlined" size="sm" onClick={onClickRestore}>선택복구</Button>
                            </div>
                        </Col>
                    </Row>
                    <Table>
                        <thead>
                            <tr>
                                <td><input type="checkbox" onClick={onChangeAll} checked={list.length === checked} /></td>
                                <td>거래번호</td>
                                <td>거래날짜</td>
                                <td>보내는 사람</td>
                                <td>받는 사람</td>
                                <td>씨앗 <span style={{ fontSize: '15px', color: "brown" }}><TbBrandSnapseed /></span>  </td>
                                <td>내용</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(trade =>
                                <tr key={trade.trade_key}>
                                    <td><input type="checkbox" onChange={(e) => onChangeSingle(e, trade.trade_key)} checked={trade.checked} /></td>
                                    <td>{trade.trade_key}</td>
                                    <td>{trade.fmtdate}</td>
                                    <td>{trade.from_user_uid === "admin" ? <Badge bg='dark'>관리자</Badge> : `${trade.from_user_uid} (${trade.from_user_nickname})`}</td>
                                    <td>{trade.to_user_uid} ( {trade.to_user_nickname} )</td>
                                    <td>{trade.trade_amount} <span style={{ fontSize: '15px', color: "brown" }}><TbBrandSnapseed /></span>  </td>
                                    <td>{trade.trade_info}</td>
                                    <td>{trade.trade_status === 1 && "삭제"}</td>
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

export default AdminTradeListPage