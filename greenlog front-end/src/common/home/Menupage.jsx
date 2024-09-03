import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import RouterPage from '../../routers/RouterPage';
import TotalPage from '../../components/TotalPage';
import BottomPage from './BottomPage';
import { UserContext } from '../../components/user/UserContext';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { RiUserSettingsFill } from 'react-icons/ri';

const Menupage = () => {
    const uid = sessionStorage.getItem('uid');
    const { userData } = useContext(UserContext);

    const onClickLogout = () => {
        sessionStorage.clear();
        window.location.href = '/';
    };

    const onClickLogin = () => {
        window.location.href = '/user/login';
    };

    const onClickIcon = () => {
        window.location.href = `/user/read/${uid}`;
    };

    const onClickAdmin = () => {
        window.location.href = '/admin/dash';
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <img src="/images/green.png" alt="Icon" style={{ width: '2.5rem', marginRight: '0.5rem' }} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="초록" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/about/greenlog">초록이 필요한 이유</NavDropdown.Item>
                                <NavDropdown.Item href="/about/clover">함께하는 사람들</NavDropdown.Item>
                                <NavDropdown.Item href="/about/seed">씨앗이란?</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="피망 마켓" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/mall/pop">베스트 피망</NavDropdown.Item>
                                <NavDropdown.Item href="/mall/list.json">피망 몰</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="클로버 숲" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/bbs/list.json">자유게시판</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/community/event/list.json">캠페인</NavDropdown.Item>
                                <NavDropdown.Item href="/about/carspot">나눔카</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="고객 센터" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/community/faq/list.json">고객 센터</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/community/ask/list.json">1대1 문의하기</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav className="ms-auto">
                            {userData.auth === '관리자' && (
                                <Nav.Link onClick={onClickAdmin} className="text-white d-flex align-items-center me-3">
                                    <RiUserSettingsFill size={24} />
                                </Nav.Link>
                            )}
                            {sessionStorage.getItem('uid') ? (
                                <>
                                    <Nav.Link onClick={onClickIcon} className="text-white d-flex align-items-center me-3">
                                        <AccountCircleIcon />
                                    </Nav.Link>
                                    <Nav.Link onClick={onClickLogout} className="text-white d-flex align-items-center">
                                        <LogoutIcon />
                                    </Nav.Link>
                                </>
                            ) : (
                                <Nav.Link onClick={onClickLogin} className="text-white d-flex align-items-center">
                                    <LoginIcon />
                                    <span className="ms-2">로그인</span>
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <RouterPage />
            <BottomPage />
            {/* <TotalPage /> */}
        </div>
    );
};

export default Menupage;
