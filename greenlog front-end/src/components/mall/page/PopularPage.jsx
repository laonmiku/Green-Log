
import React, { useEffect, useState } from 'react'
import { Container, Row, Col,  Table } from 'react-bootstrap';
import {Card } from 'antd'; 
import axios from 'axios';
import moment from 'moment';
import MallList from '../MallList';

const PopularPage = () => {
    const { Meta } = Card;
    const [list, setList] = useState([]);

    const callAPI = async () => { 
        const res = await axios.get("/mall/reviewCount");
        const fmtdata = res.data.map(item => ({
            ...item,
            mall_endDate: moment(item.mall_endDate).format('YYYY-MM-DD')
        }));
        console.log(fmtdata);
        setList(fmtdata);
        console.log(res.data);
    }

    useEffect(() => {
        callAPI();
    }, [])

    const photoST = { /*리스트 썸네일 */ 
        position:"absolute",
        width: "8rem",
        height: "7.8rem",
        top:"0",
        right:""
    }
    const topST = { /*카드 썸네일 */ 
        width: "14rem", /*width는 베이스와같아야함 */
        height: "10rem",
        top:"-1rem"
    }
    const topCard ={ /*카드 베이스 */ 
        width: '14rem',
        height: '12rem',/*썸네일보다 조금 더 아래로 내려야 바디가들어옴 */
        margin: '0.5rem',
        display: 'flex',
        flexDirection: 'column'
        ,position:"absolute"
    }
    const topCover={/*카드 썸네일 영역*/ 
        display: 'block', 
        height: '90%',/*커버이미지가 보이는 비율 */ 
        overflow: 'hidden' 
    }
    const topMeta={ /*메타영역*/ 
        fontSize: '0.75rem', 
        margin: 0,
        textAlign:"center",
        display: "flex", 
        alignItems: "center",
    }
    const metaDiv={
        height:"0",
        margin:"0",
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'flex-end', 
        textAlign: 'center' ,
    }
    const badgeST={
        position:"relative",
        bottom:"13rem",
        right:"4rem",
        width:"7rem",
        height:"5rem",
    }
    const rankST={
        position:"relative",
        bottom:"19.2rem",
        right:"1.3rem",
        fontSize:"3.5rem",
        color:"black"
    }

    return (
        <div>
            <div className='bg-secondary mb-5'>
                <img src='../images/popularList.png' style={{width:"100%",height:"25rem"}}/>
            </div>
            <Row className="mall-table-stand mx-5 " style={{marginTop:"5rem"}} >
                <Col md={4} className="mall-stand-leg">
                    {list && list.slice(1, 2).map(top2 =>
                        <Card hoverable className='mall_pop_card2' key={top2.mall_key}
                            style={topCard}
                            cover={
                                <a href={`/mall/read/${top2.mall_key}`} style={topCover}>
                                    <img alt="mall" style={topST}
                                        src={top2.mall_photo ? top2.mall_photo :  '../images/sorry.png'}/>
                                </a>
                            }
                        >
                            <div style={metaDiv}>
                                <Meta
                                    title={`[${top2.mall_key}] ${top2.mall_title}`}
                                    style={topMeta}/>
                            </div> 
                            <img src='../images/rankk2.png' style={badgeST}/>
                            <div style={rankST}>2</div>
                        </Card>
                    )}
                </Col>
                <Col md={4} className="mall-stand-top">
                    {list && list.slice(0, 1).map(top1 =>
                         <Card hoverable className='mall_pop_card1' key={top1.mall_key}
                         style={topCard}
                         cover={
                             <a href={`/mall/read/${top1.mall_key}`} style={topCover}>
                                 <img alt="mall" style={topST}
                                     src={top1.mall_photo ? top1.mall_photo :  '../images/sorry.png'}/>
                             </a>
                         }
                        >
                        <div style={metaDiv}>
                            <Meta
                            title={`[${top1.mall_key}] ${top1.mall_title}`}
                            style={topMeta}/>
                        </div>
                        <img src='../images/rankk.png' style={badgeST}/>
                        <div style={rankST}>1</div>
                     </Card>
                    )}
                </Col>
                <Col md={4} className="mall-stand-row-leg">
                    {list && list.slice(2,3 ).map(top3 =>
                       
                        <Card hoverable className='mall_pop_card3' key={top3.mall_key}
                            style={topCard}
                            cover={
                            <a href={`/mall/read/${top3.mall_key}`} style={topCover}>
                                <img alt="mall" style={topST}
                                    src={top3.mall_photo ? top3.mall_photo :  '../images/sorry.png'}/>
                            </a>}
                        >
                        <div style={metaDiv}>
                            <Meta
                                title={`[${top3.mall_key}] ${top3.mall_title}`}
                                style={topMeta}/>
                        </div>
                        <img src='../images/rankk3.png' style={badgeST}/>
                        <div style={rankST}>3</div>
                     </Card>
                    )}
                </Col>
            </Row>
            <hr className='mx-5'/>
            <h3 className='text-center my-5'>
                <img src="../images/pmang1.png" style={{width:"3rem",height:"3rem", marginBottom:"1rem"}} />
                    인기상품리스트 TOP10
                <img src="../images/pmang1.png" style={{width:"3rem",height:"3rem",marginBottom:"1rem"}} />
            </h3>
            <div className='' style={{position:"relative"}}>
                {list.slice(0, 10).map((list, index) => (
                    <Card key={index} className='m-0 p-0  mx-5 mb-3' style={{height:"8rem"}}>
                            <a href={`/mall/read/${list.mall_key}`} style={{color:"#5a9410",textDecoration: 'none'}} >
                            <Row>
                                <Col xs={2} md={2} lg={2}>
                                    <img src={list.mall_photo ? list.mall_photo :  '../images/sorry.png'} style={photoST}/>
                                </Col>
                                <Col className='me-5 py-0'>
                                    <Row className='mb-0 pb-0'>
                                        <Col >
                                            <p className='my-0 py-0'style={{fontSize:"1.5rem"}}>
                                                [{index+1}]  {list.mall_title} 
                                            </p> 
                                            <p className='mt-3'>
                                                마감일 : {list.mall_endDate}
                                            </p>
                                        </Col>
                                        <Col className='text-center' xs={2} md={2} lg={2}>
                                           <div style={{border:"1px solid black",backgroundColor:"black", borderRadius:"20px",color:"white"}}> ID : {list.mall_seller} </div>
                                            <p className='my-0 py-0 ' >
                                                글 유형 : 
                                                {list.mall_tstate === 0 && <span style={{textDecoration: 'underline'}}>일반나눔</span>}
                                                {list.mall_tstate === 1 && <span style={{textDecoration: 'underline'}}>무료나눔</span>}
                                                {list.mall_tstate === 2 && <span style={{textDecoration: 'underline'}}>구매글</span>}
                                            </p>
                                            <p>
                                                상품상태 : 
                                                {list.mall_pstate === 0 && <span style={{textDecoration: 'underline'}}>중고상품</span>}
                                                {list.mall_pstate === 1 && <span style={{textDecoration: 'underline'}}>새상품</span>}
                                            </p>
                                        </Col>
                                    </Row>
                                    
                                     
                                </Col>
                            </Row>
                        </a>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default PopularPage