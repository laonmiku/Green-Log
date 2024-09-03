import React, { useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import RouterPage from '../routers/RouterPage';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const TotalPage = () => {
    const uid = sessionStorage.getItem("uid");
    return (
        <div>
            <Row>
                <Col xs={2}>
                    <ListGroup>
                        <ListGroup.Item >유저</ListGroup.Item>
                        <ListGroup.Item> <Link to={"/user/login"}>로그인</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={`/user/read/${uid}`}>마이페이지</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/user/join"}>회원가입</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={`/user/wallet/${uid}`}>개인씨앗지갑</Link></ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col xs={2}>
                    <ListGroup>
                        <ListGroup.Item >관리자</ListGroup.Item>
                        <ListGroup.Item> <Link to={"/admin/dash"}>관리자대시보드</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/admin/question"}>관리자1:1/FAQ/Q&A</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/admin/list.json"}>관리자회원목록</Link></ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col xs={2}>
                    <ListGroup>
                        <ListGroup.Item>다이어리</ListGroup.Item>
                        <ListGroup.Item> <Link to={`/diary/list.json/${uid}`}>다이어리목록</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/diary/insert"}>다이어리작성</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/diary/read/103"}>다이어리읽기</Link></ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col xs={2}>
                    <ListGroup>
                        <ListGroup.Item>피망몰</ListGroup.Item>
                        <ListGroup.Item> <Link to={"/mall/list.json"}>상품리스트</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/mall/insert"}>상품등록</Link></ListGroup.Item>
                        <ListGroup.Item>경매</ListGroup.Item>
                        <ListGroup.Item> <Link to={`/auction/list.json/${uid}`}>개인경매목록</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={`/auction/admin/list.json`}>전체경매거래목록</Link></ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col xs={2}>
                    <ListGroup>
                        <ListGroup.Item>자유게시판</ListGroup.Item>
                        <ListGroup.Item> <Link to={"/BBS/list.json"}>게시판목록</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/BBS/insert"}>게시글등록</Link></ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col xs={2}>
                    <ListGroup>
                        <ListGroup.Item>씨앗</ListGroup.Item>

                        <ListGroup.Item> <Link to={"/admin/seed/list.json"}>전체씨앗지갑목록</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/trade/admin/list.json"}>전체씨앗거래내역</Link></ListGroup.Item>

                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default TotalPage