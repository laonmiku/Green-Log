import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import '../../common/useful/Paging.css';
import Button from '@mui/material/Button';
import malluselist from './malluselist.png'
import { Margin } from '@mui/icons-material';


const MallList = () => {
    const uid = sessionStorage.getItem("uid");
    const now = new Date(); // 오늘 날짜
    const today = moment(now).format('YYYY-MM-DD');
    const [view, setView] = useState('sellerlist');
    //내가쓴 게시글(셀러)
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    //리뷰(낙찰) 댓ㄱ글
    const [list2, setList2] = useState([]);
    const [total2, setTotal2] = useState(0);
    const [page2, setPage2] = useState(1);
    const [size2, setSize2] = useState(5);
    //리뷰(낙찰X) 댓글
    const [list3, setList3] = useState([]);
    const [total3, setTotal3] = useState(0);
    const [page3, setPage3] = useState(1);
    const [size3, setSize3] = useState(5);
    //ㄴ마감된 게시글
    const [list4, setList4] = useState([]);
    const [total4, setTotal4] = useState(0);
    const [page4, setPage4] = useState(1);
    const [size4, setSize4] = useState(5);

    const callAPI = async () => {
        //셀러
        const res = await axios.get(`/mall/list/${uid}?page=${page}&size=${size}`);
        setTotal(res.data.total);
        const formattedData = res.data.documents.map(item => ({
            ...item,
            mall_endDate: moment(item.mall_endDate).format('YYYY-MM-DD'),
            mall_regDate: moment(item.mall_regDate).format('yyyy년 MM월 DD일 HH시mm분')
        }));
        const res2 = formattedData.map(item => axios.get(`/mall/reviewCount/${item.mall_key}`));
        const responses = await Promise.all(res2);// 모든 요청 병렬 실행 및 결과 대기
        const updatedData = formattedData.map((item, index) => ({ // formattedData와 responses를 조합하여 업데이트된 데이터 생성
            ...item,
            reviewCount: responses[index].data.count // 리뷰 카운트 추가
        }));
        setList(updatedData);
        //리뷰(낙찰)
        const res3 = await axios.get(`/mall/buy/${uid}?&page=${page2}&size=${size2}`);
        const formattedData2 = res3.data.documents.map(item => ({
            ...item,
            mall_endDate: moment(item.mall_endDate).format('YYYY-MM-DD')
        }));
        console.log(res3.data);
        setTotal2(res3.data.total);
        setList2(formattedData2);
        //리뷰(낙찰X)
        const res4 = await axios.get(`/mall/review/${uid}?&page=${page2}&size=${size2}`);
        const formattedData3 = res4.data.documents.map(item => ({
            ...item,
            mall_endDate: moment(item.mall_endDate).format('YYYY-MM-DD')
        }));
        console.log(res4.data);
        setTotal3(res4.data.total);
        setList3(formattedData3);
        //마감된 내가쓴게시글
        const res5 = await axios.get(
            `/mall/list?key=mall_seller&word=${uid}&page=${page}&size=${size}
                &orderBy=desc&itisEnd=true`
        );
        const formattedData4 = res5.data.documents.map(item => ({
            ...item,
            mall_endDate: moment(item.mall_endDate).format('YYYY-MM-DD')
        }));
        console.log(res5.data);
        setTotal4(res5.data.total);
        setList4(formattedData4);
    }

    useEffect(() => {
        callAPI();
    }, [page, size, page2, size2, page3, size3, page4, size4])

    const onClicksellerlist = () => {
        setView('sellerlist');
    }

    const onClickreview = () => {
        setView('review');
    }

    const onClickbuy = () => {
        setView('buy');
    }

    const onClickendlist = () => {
        setView('endlist');
    }

    const noData ={
        marginTop:"10rem",
        marginBottom:"10rem",
        color:"#ccc",
        fontSize:"3rem",

    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <img src={malluselist} alt="car" style={{ width: '100%', maxWidth: '800px' }} />
            </div>
            <div className='text-end my-3'  >
                <Button onClick={onClicksellerlist} className='me-3' variant=''>판매 내역</Button>
                <Button onClick={onClickendlist} className='me-3' variant='dark'>마감 내역</Button>
                <Button onClick={onClickreview} className='me-3' variant='dark'>입찰 내역</Button>
                <Button onClick={onClickbuy} className='me-3' variant='dark'>낙찰 내역</Button>
            </div>

            {view === 'sellerlist' && (
                <>
                    {total === 0 ? (
                        <div  style={noData} className='text-center'> 데이터가 존재하지 않습니다.</div>
                    ) : (<>
                        <Table className='sellerList'>
                            <thead>
                                <tr>
                                    <td>글번호</td>
                                    <td colSpan={2}>제목</td>
                                    <td>반응수</td>
                                    <td>마감일</td>
                                    <td>작성일</td>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map(list =>
                                    <tr key={list.mall_key}>
                                        <td>[{list.mall_key}]</td>
                                        <td ><a href={`/mall/read/${list.mall_key}`}>{list.mall_title}</a></td>
                                        <td >
                                            <img src={list.mall_photo || "http://via.placeholder.com/200x200"}
                                                style={{ width: "40%", height: "4rem", objectFit: "contain" }} />
                                        </td>
                                        <td>{list.reviewCount}개</td>
                                        <td>{list.mall_endDate}</td>
                                        <td>{list.mall_regDate}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        {total > size &&
                            <Pagination
                                activePage={page}
                                itemsCountPerPage={size}
                                totalItemsCount={total}
                                pageRangeDisplayed={5}
                                prevPageText={"‹"}
                                nextPageText={"›"}
                                onChange={(e) => setPage(e)} />
                        }
                    </>
                    )}
                </>
            )}
            {view === 'buy' && (
                <>
                    {total2 === 0 ? (
                        <div  style={noData} className='text-center'>데이터가 존재하지 않습니다.</div>
                    ) : (<>
                        <Table className='reviewList'>
                            <thead>
                                <tr>
                                    <td>글번호</td>
                                    <td colSpan={2}>제목</td>
                                    <td>나의 반응</td>
                                    <td>마감일</td>
                                    <td>글쓴이</td>
                                </tr>
                            </thead>
                            <tbody>
                                {list2.map((list, index) =>
                                    <tr key={index}>
                                        <td>[{list.mall_key}]</td>
                                        <td ><a href={`/mall/read/${list.mall_key}`}>{list.mall_title}</a></td>
                                        <td >
                                            <img src={list.mall_photo || "http://via.placeholder.com/200x200"}
                                                style={{ width: "40%", height: "4rem", objectFit: "contain" }} />
                                        </td>
                                        <td>{list.review_rating}씨드</td>
                                        <td>{list.mall_endDate}</td>
                                        <td>{list.mall_seller}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        {total2 > size2 &&
                            <Pagination
                                activePage={page2}
                                itemsCountPerPage={size2}
                                totalItemsCount={total2}
                                pageRangeDisplayed={5}
                                prevPageText={"‹"}
                                nextPageText={"›"}
                                onChange={(e) => setPage2(e)} />
                        }
                    </>
                    )}
                </>
            )}
            {view === 'review' && (
                <>
                    {total3 === 0 ? (
                       <div  style={noData} className='text-center'>데이터가 존재하지 않습니다.</div>
                    ) : (<>
                        <Table className='reviewList'>
                            <thead>
                                <tr>
                                    <td>글번호</td>
                                    <td colSpan={2}>제목</td>
                                    <td>나의 반응</td>
                                    <td>마감일</td>
                                    <td>글쓴이</td>
                                </tr>
                            </thead>
                            <tbody>
                                {list3.map((list, index) =>
                                    <tr key={index}>
                                        <td>[{list.mall_key}]</td>
                                        <td ><a href={`/mall/read/${list.mall_key}`}>{list.mall_endDate > today ? list.mall_title : `[마감]${list.mall_title}`}</a></td>
                                        <td >
                                            <img src={list.mall_photo || "http://via.placeholder.com/200x200"}
                                                style={{ width: "40%", height: "4rem", objectFit: "contain" }} />
                                        </td>
                                        <td>{list.review_rating}씨드</td>
                                        <td>{list.mall_endDate}</td>
                                        <td>{list.mall_seller}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        {total3 > size3 &&
                            <Pagination
                                activePage={page3}
                                itemsCountPerPage={size3}
                                totalItemsCount={total3}
                                pageRangeDisplayed={5}
                                prevPageText={"‹"}
                                nextPageText={"›"}
                                onChange={(e) => setPage3(e)} />
                        }
                    </>
                    )}
                </>
            )}
            {view === 'endlist' && (
                <>
                    {total4 === 0 ? (
                        <div  style={noData} className='text-center'>데이터가 존재하지 않습니다.</div>
                    ) : (<>
                        <Table className='reviewList'>
                            <thead>
                                <tr>
                                    <td>글번호</td>
                                    <td colSpan={2}>제목</td>
                                    <td>낙찰자</td>
                                    <td>마감일</td>
                                    <td>작성일</td>
                                </tr>
                            </thead>
                            <tbody>
                                {list4.map((list, index) =>
                                    <tr key={list.mall_key}>
                                        <td>[{list.mall_key}]</td>
                                        <td >[마감]{list.mall_title}</td>
                                        <td >
                                            <img src={list.mall_photo || "http://via.placeholder.com/200x200"}
                                                style={{ width: "40%", height: "4rem", objectFit: "contain" }} />
                                        </td>
                                        <td>{list.auction_buyer !== undefined ? `${list.auction_buyer}님` : ` - `}</td>
                                        <td>{list.mall_endDate}</td>
                                        <td>{list.mall_regDate}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        {total4 > size4 &&
                            <Pagination
                                activePage={page4}
                                itemsCountPerPage={size4}
                                totalItemsCount={total4}
                                pageRangeDisplayed={5}
                                prevPageText={"‹"}
                                nextPageText={"›"}
                                onChange={(e) => setPage4(e)} />
                        }
                    </>
                    )}
                </>
            )}
            <hr className='my-5' />
        </>
    )
}

export default MallList