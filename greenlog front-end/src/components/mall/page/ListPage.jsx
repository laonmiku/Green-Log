

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Table, Dropdown, Row, Col, InputGroup, Button, Form } from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import {Card } from 'antd'; 
import { Link } from 'react-router-dom';
import { BsPencilSquare } from "react-icons/bs";
import {UserContext} from '../../user/UserContext';
import SearchIcon from '@mui/icons-material/Search';
import {InputAdornment, IconButton, MenuItem, TextField } from '@mui/material';



const ListPage = () => {
    const { Meta } = Card;
    const [loading, setLoading] = useState(false);
    const uid = sessionStorage.getItem("uid");
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(16);
    const [dropDown, setDropDown] = useState('정렬조건');
    const {userData} =useContext(UserContext); 
    //console.log(userData);
    //패스로보낼값
    const [key, setKey] = useState('mall_title');
    const [word, setWord] = useState('');
    const [orderBy, setOrderBy] = useState('desc');
    const [pstateWord, setPstateWord] = useState("");
    const [tstateWord, setTstateWord] = useState("");
    const [itisEnd, setItisEnd] = useState('');
    //체크
    const [form, setForm] = useState({
        checkT0: false,
        checkT1: false,
        checkT2: false,
        checkP0: false,
        checkP1: false
    });

    const today = new Date(); // 오늘 날짜
    const filterData = (documents) => {
        const filterData = documents.map(doc => {
            const endDate = new Date(doc.mall_endDate); // 데이터에서 endDate 필드로 변경
            const isEndTrue = (today >= endDate); // true: 오늘 날짜가 endDate 이후인 경우
            return { ...doc, isEnd: isEndTrue };
        });
        return { data: filterData };
    };

    const callAPI = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `/mall/list?key=${key}&word=${word}&page=${page}&size=${size}
                    &orderBy=${orderBy}&pstateWord=${pstateWord}&tstateWord=${tstateWord}&itisEnd=${itisEnd}`
            );
            // 데이터 가공 함수 호출
            const { data } = filterData(res.data.documents);
            setList(data); // 전체 목록 업데이트
            setCount(res.data.total);
            //console.log("ListPage : " + JSON.stringify(list));
            setLoading(false);
        } catch (error) {
            console.error("Error fetching mall list:", error);
            return;
        }
    };

    const onChangeChecked = (e) => {
        setForm({ ...form, [e.target.name]: e.target.checked })
    };

    const onClickSearch = async () => {
        setLoading(true);
        const tArray = []
        const pArray = []
        if (form.checkT0) tArray.push(0);
        if (form.checkT1) tArray.push(1);
        if (form.checkT2) tArray.push(2);
        if (form.checkP0) pArray.push(0);
        if (form.checkP1) pArray.push(1);
        await setTstateWord(tArray.join(','));
        await setPstateWord(pArray.join(','));
        await callAPI();
        setPage(1);
        setWord("");
        setKey("mall_title");
        setOrderBy('desc');
        setLoading(false);
    };

    useEffect(() => {
        callAPI();
        console.log(page, orderBy, itisEnd, pstateWord, tstateWord, count);
    }, [page, orderBy, itisEnd, pstateWord, tstateWord]);

    const countST = {
        width: "100%",
        textAlign: "left",
        color: "gray"
    }
    const badgeST = {
        width: "100%",
        height: "100%",
        position: 'absolute',
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        color: 'rgba(71, 123, 93, 0.74)',
        textAlign: "center",
        fontSize: "5rem",
        borderRadius: '5px',
        top: '0',      // 상단 여백
        right: '0',    // 오른쪽 여백 기본이 오른쪽아래로 쳐져잇어서 줘야댐..
    }
    const adminST = {
        width: "100%",
        height: "10%",
        position: 'absolute',
        backgroundColor: "rgba(0, 0, 0, 1)",
        color: 'white',
        textAlign: "center",
        fontSize: "1rem",
        borderRadius: '5px',
        top: '0%',      // 상단 여백
        right: '0%',    // 오른쪽 여백 기본이 오른쪽아래로 쳐져잇어서 줘야댐..
    }
    const stateBox = {
        width: "6.8rem",
        margin: "1rem 2rem",
        border: "1px solid #ccc", 
        borderRadius: "1rem" ,
        textAlign:"center",
        backgroundColor:"black",
        color:"white"
    }
    const stateRow={
        display: "flex",
        alignItems: "center",
        width:"100%", height:"4rem",
        borderTop: "1px solid #ccc",borderBottom: "1px solid #ccc",
        textAlign:"center"
    }

    if (loading) return <h1 className='text-center'>로딩중...</h1>
    return (
        <div className='justify-content-center text-center'>
            <div className=' mb-3'>
                <img src='../images/pimang3.jpg' style={{width:"100%",height:"25rem"}}/>
            </div>
            <div>
                <Row className='my-2 '>
                    {uid ?
                        <div className='text-end ' style={{fontSize:"1.5rem"}}><Link to="/mall/insert" className='insert_link'>
                            활동하기<BsPencilSquare style={{fontSize:"2rem"}}/></Link> </div>
                        :
                        <div className='text-end'><Link to="/user/login">♻로그인 하기♻</Link> </div>
                    }
                </Row>
                <Row className='my-0 d-flex align-items-end justify-content-end'>
                    {word === '' ?
                        <div style={countST}>총 게시글 : {count}건</div>
                        :
                        <div style={countST}>검색수 : {count}건</div>
                    }
                </Row>
                <div style={{ border: "1px solid #ccc", borderRadius: "5px" }}  >
                    <Row className='my-2'>
                        <Col xs={3} ms={3} lg={2} style={{ borderRight: "1px solid #ccc" }}>
                            <Dropdown className="mt-1" style={{ width: "100%" }}>
                                <Dropdown.Toggle variant="">{dropDown}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={()=>callAPI()} value="desc" >모두보기</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { setDropDown("최신순"); setOrderBy("desc"); }} value="desc" >최신순</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { setDropDown("오래된순"); setOrderBy("asc"); }} value="asc">오래된순</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { setDropDown("피망마켓"); setItisEnd("false"); }}  >진행중</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { setDropDown("마감"); setItisEnd("true"); }}  >마감</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> 
                        </Col>
                        <Col className='text-center ' xs={9} ms={9} lg={10}>
                        <TextField
          select
          value={key}
          onChange={(e) => setKey(e.target.value)}
          variant="standard"
          style={{ width: '30%'}}
          InputProps={{
            disableUnderline: true, // 하단 테두리 제거
          }}
        >
          <MenuItem value="mall_seller">아이디</MenuItem>
          <MenuItem value="mall_title">제목</MenuItem>
          <MenuItem value="mall_info">내용</MenuItem>
        </TextField>
        <TextField
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="검색어"
          variant="standard"
          style={{ width: '68%'}}
          InputProps={{ 
            disableUnderline: true, // 하단 테두리 제거
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={onClickSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
                        </Col>
                    </Row>
                </div>
                <Row className=' mx-0 mt-2 my-5 justify-content-center'  style={stateRow}>
                <InputGroup  style={stateBox}>
                        <input className='mall_stateBox_input' type="checkbox" id="ch1" onChange={onChangeChecked} name="checkT0" checked={form.checkT0} />
                        <label for="ch1" className='mall_stateBox ' >일반나눔</label>
                    </InputGroup>
                    <InputGroup  style={stateBox}>
                        <input className='mall_stateBox_input' type="checkbox" id="ch2" onChange={onChangeChecked} name="checkT1" checked={form.checkT1} />
                        <label for="ch2" className='mall_stateBox' >무료나눔</label>
                    </InputGroup>
                    <InputGroup  style={stateBox}>
                        <input className='mall_stateBox_input' type="checkbox" id="ch3" onChange={onChangeChecked} name="checkT2" checked={form.checkT2} />
                        <label for="ch3" className='mall_stateBox ' >구매글</label>
                    </InputGroup>
                    <InputGroup style={stateBox}>
                        <input className='mall_stateBox_input' type="checkbox" id="ch4" onChange={onChangeChecked} name="checkP0" checked={form.checkP0} />
                        <label for="ch4" className='mall_stateBox' >중고상품</label>
                    </InputGroup>
                    <InputGroup  style={stateBox}>
                        <input className='mall_stateBox_input' type="checkbox" id="ch5" onChange={onChangeChecked} name="checkP1" checked={form.checkP1} />
                        <label for="ch5" className='mall_stateBox' >새상품</label>
                    </InputGroup>
                </Row>
            </div>
            <Row className='my-3'>
                {count === 0 &&
                    <h1 className='my-5 text-muted'>해당하는 글이 없습니다.</h1>
                }
                {list &&
                    list.map(card => (
                        <Col key={card.mall_key} xs={3} md={3} lg={3} className='' >
                            <Card
                                hoverable
                                style={{   width: '17rem',
                                    height: '15rem',
                                    margin: '0.5rem',
                                    display: 'flex',
                                    flexDirection: 'column'}}
                                cover={
                                    <a href={`/mall/read/${card.mall_key}`} style={{ display: 'block', height: '10rem', overflow: 'hidden' }}>
                                        <img alt="mall"
                                            src={card.mall_photo ? card.mall_photo : '../images/sorry.png' }
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </a>
                                }
                            >
                                {card.isEnd && (
                                    userData.auth === "관리자" ? 
                                        (<div  style={adminST}>마감</div>) 
                                    : 
                                        (<div style={badgeST} >마감  </div>)
                                )}
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', textAlign: 'center' }}>
                                    <Meta
                                        title={`[${card.mall_key}] ${card.mall_title}`}
                                        style={{ fontSize: '0.75rem', margin: 0 }}
                                    />
                                </div>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
            <Row style={{paddingTop:"1rem"}}>
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
            </Row>
        </div>
    )
}

export default ListPage