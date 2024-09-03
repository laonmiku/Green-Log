import React, { useState } from 'react'
import { Row, Col, InputGroup, Form, Button, Card } from 'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2';

const LoginPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const onKakaoLogin=()=>{
        window.location.href = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=92b5d7839ab9b4b0e8f2f0897d74aa3d&redirect_uri=http://localhost:8080/user/login/kakao/oauth"
    }
    const [form, setform] = useState({
        user_uid: '',
        user_upass: ''
    })

    const { user_uid, user_upass } = form;

    const onChangeForm = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const onClickLogin = async (e) => {
        e.preventDefault();
        const res = await axios.post('/user/login', { user_uid, user_upass })
        if (res.data === 0) {
            Swal.fire({
                icon: "error",
                title: "아이디가 존재하지 않습니다",
              });
        } else if (res.data === 2) {
            Swal.fire({
                icon: "error",
                title: "비밀번호가 일치하지 않습니다",
              });
        } else if (res.data === 1) {
            sessionStorage.setItem("uid", user_uid);
            Swal.fire({
                icon: "success",
                title: "로그인 성공",
                showConfirmButton: false,
                timer: 1500
            });
            if (sessionStorage.getItem('target')) {
                window.location.href = sessionStorage.getItem('target')
            } else {
                window.location.href = "/"
            }
        }
    }

    const fetchUserInfo = async (code) => {
        try {
            const response = await axios.get(`http://localhost:8080/user/login/kakao?code=${code}`);
            setUserInfo(response.data);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    // URL에서 코드 추출
    const getCodeFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('code');
    };

    // 카카오 로그인 완료 후 URL에서 코드 추출 및 사용자 정보 가져오기
    React.useEffect(() => {
        const code = getCodeFromUrl();
        if (code) {
            fetchUserInfo(code);
        }
    }, []);

    return (
        <div className='d-flex justify-content-center'>
            <Card style={{ width: "50rem" }} className='text-center mt-5 o-hidden border-0 shadow-lg'>
                <Row className='mt-5'>
                    <div>
                        <img src='/images/green.png' style={{ width: "15rem" }} />
                    </div>
                </Row>
                <Row className='justify-content-center mb-5' >
                    <Col xs={12} md={10} lg={12} className='d-flex justify-content-center align-items-center'>
                        <div className='loginbox px-0'>
                            <form onSubmit={onClickLogin}>
                                <InputGroup className='h-25'>
                                    <InputGroup.Text style={{ backgroundColor: "#002412", color: 'white' }} className=' justify-content-center w-25'><b>ID</b></InputGroup.Text>
                                    <Form.Control name="user_uid" value={user_uid} onChange={onChangeForm} />
                                </InputGroup >
                                <InputGroup>
                                    <InputGroup.Text style={{ backgroundColor: "#002412", color: 'white' }} className='justify-content-center w-25'><b>PW</b></InputGroup.Text>
                                    <Form.Control type="password" name="user_upass" value={user_upass} onChange={onChangeForm} />
                                </InputGroup>
                                <Button style={{ backgroundColor: "#2BBEC6", borderColor: "#2BBEC6", color: 'white' }} className='w-100 mt-2' type='submit' ><b>로그인</b></Button>
                                <div className='text-center mt-2'>
                                    <span>
                                        <a href='/user/join'>회원가입</a>
                                    </span>
                                    <span className='mx-3'>
                                        <a href='/user/searchId'>아이디 찾기</a>
                                    </span>
                                    <span>
                                        <a href='/user/searchPass'>비밀번호 찾기</a>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default LoginPage