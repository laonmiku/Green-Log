import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Row, Col, Badge, InputGroup, Form, Card } from 'react-bootstrap'
import { InputText, Button, Dropdown } from 'primereact'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import ModalAddress from '../../common/useful/ModalAddress';
import CircularProgress from '@mui/material/CircularProgress';

const AdminUpdate = () => {
  const { user_uid } = useParams();
  const uid = user_uid
  const [form, setForm] = useState("");
  const [origin, setOrigin] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [phoneCheck, setPhoneCheck] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user_key, user_nickname, user_uname, user_phone, user_address1, user_address2,
    user_birth, user_email, user_gender, user_auth, user_img } = form;

  const [file, setfile] = useState({
    name: '',
    byte: null
  })
  const photoStyle = {
    borderRadius: '10px',
    cursor: "pointer",
  }

  const refFile = useRef();
  const styleRed = "danger"
  const styleBlue = "primary"



  const callAPI = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`/user/read/${user_uid}`);
      setForm(res.data);
      setOrigin(res.data);
      console.log(res.data)

    } catch (error) {
      console.error('Error data diary:', error);
      alert("데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    callAPI();
  }, []);

  //이미지업로드
  const onChangeFile = (e) => {
    setfile({
      name: URL.createObjectURL(e.target.files[0]),
      byte: e.target.files[0]
    })
  }

  const onUploadImage = async () => {
    if (file.byte) {
      if (!window.confirm("이미지를 수정하시겠습니까?")) return;
      setLoading(true)
      try {
        const formData = new FormData();
        formData.append("byte", file.byte);
        const config = {
          Headers: { 'content-type': 'multipart/form-data' }
        }
        await axios.post(`/upload/img/${uid}`, formData, config);
        alert("이미지가 변경되었습니다");
        callAPI();
      } catch (error) {
        console.error('Error data diary:', error);
        alert("데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }

    }
  }

  //수정취소
  const onClickReset = () => {
    alert("취소하시겠습니까?");
    callAPI();
  }

  //회원영구삭제
  const onClickDelete = async (user_key) => {
    alert(`${user_key} 회원 정보는 다시 복구할 수 없습니다. 그래도 삭제하시겠습니까?`);
    setLoading(true);
    try {
      await axios.post(`/user/delete/${user_key}`);
      alert("회원영구 삭제완료!");
      window.location.href = "/user/admin/list.json";
    } catch (error) {
      console.error('Error data diary:', error);
      alert("데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  
  }

  //닉네임 중복확인
  const onCheckNickname = (user_nickname) => {
    if (origin.user_nickname === user_nickname) {
      alert("다른유저가 사용하고 있는 닉네임입니다.");
      setIsCheck(false);
    } else {
      alert("사용가능한 닉네임입니다");
      setIsCheck(true);
    }
  }

  //폼변경
  const onChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  //전화번호 유효성 및 자동하이픈 입력
  const handlePress = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    const regex = /^[0-9\b -]{0,13}$/; // 숫자, 백스페이스, 하이픈 포함한 정규식

    if (regex.test(e.target.value)) {
      setPhoneCheck(e.target.value);
      const formattedPhoneNumber = e.target.value
        .replace(/-/g, '') // 기존 하이픈 제거
        .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'); // 새로운 하이픈 삽입
      setForm({ ...form, [e.target.name]: formattedPhoneNumber }); // 상태 업데이트
    } else {
      alert("잘못된 입력값입니다.");
    }
  };

  //이메일주소 체크 맞을경우, true로 틀릴경우 false로 리턴 정보수정을 누른 후에 확인이 가능
  const emailPress = (e) => {
    if (e.target.value === origin.user_email) {
      return setIsEmail(true);
    }

    const regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/; // 이메일주소 체크 정규식

    if (regex.test(e.target.value)) {
      return setIsEmail(true);
    } else {
      return setIsEmail(false);
    }
  };


  //정보수정
  const onClickUpdate = async () => {
    if (!window.confirm("변경된 내용을 수정하시겠습니까?")) return;
    setLoading(true)
    try {
      await axios.post("/user/admin/update", form);
      window.location.href = `/user/admin/read/${user_uid}`;

    } catch (error) {
      console.error('Error data diary:', error);
      alert("데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  
  }

  //모달
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //셀렉트박스
  const genderOptions = [
    { label: '남자', value: '남자' },
    { label: '여자', value: '여자' }
  ];

  const authOptions = [
    { label: '일반회원', value: '일반회원' },
    { label: '우수회원', value: '우수회원' },
    { label: '휴면회원', value: '휴면회원' },
    { label: '블랙리스트', value: '블랙리스트' },
    { label: '탈퇴회원', value: '탈퇴회원' },
    { label: '관리자', value: '관리자' }
  ];

  if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>;
  return (
    <div className="user-profile"><h1 className='text-center my-5'>{user_uid}({user_uname})님 회원정보</h1>
      <Row className='justify-content-center'>
        <Col xs={12} md={10} lg={9} className='mb-3'>
          <Card className='text-center' border={user_gender === "남자" ? styleBlue : styleRed}>
            <Card.Body>
              <Row>
                <Col lg={4}>
                  <Card.Img src={file.name || (user_img || "/images/woman.jpg")} variant="top" width="100%"
                    style={photoStyle} onClick={() => refFile.current.click()} />
                  <InputGroup>
                    <input ref={refFile} type="file" style={{ display: 'none' }} onChange={onChangeFile} />
                  </InputGroup>
                  <div className='text-center mt-2'>
                    <Button className='w-100' size="small" text raised onClick={onUploadImage} label="이미지저장"></Button>
                  </div>
                </Col>
                <Col>
                  <Card.Text>
                    <div className='text-start'>
                      <br />
                      <div className="form-group">
                        <div className="form-input">
                          <label htmlFor="user_key">회원번호</label>
                          <InputText value={user_key} disabled className="input-half" />
                        </div>
                        <div className="form-input">
                          <label htmlFor="user_uid">아이디</label>
                          <InputText value={user_uid} disabled className="input-half" />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-input">
                          <label htmlFor="user_uname">이름</label>
                          <InputText value={user_uname} name="user_uname" onChange={onChangeForm} className="input-half" />
                        </div>
                        <div className="form-input">
                          <label htmlFor="user_auth">등급</label>
                          <Dropdown
                            onChange={onChangeForm}
                            value={user_auth}
                            name="user_auth"
                            options={authOptions}
                            className="input-half"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-input">
                          <label htmlFor="user_birth">생일</label>
                          <InputText value={user_birth} name="user_birth" onChange={onChangeForm} type="date" className="input-half" />
                        </div>
                        <div className="form-input">
                          <label htmlFor="user_gender">성별</label>
                          <Dropdown
                            onChange={onChangeForm}
                            value={user_gender}
                            name="user_gender"
                            options={genderOptions}
                            className="input-half"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-input">
                          <label htmlFor="user_phone">전화번호</label>
                          <InputText value={user_phone} name="user_phone" onChange={handlePress} maxLength={13} className="input-half" />
                        </div>
                        <div className="form-input">
                          <label htmlFor="user_email">이메일</label>
                          <InputText value={user_email} name="user_email" onChange={onChangeForm} onBlur={emailPress} type="email" className="input-half" />
                        </div>
                      </div>
                      <div className="p-inputgroup flex-1 mb-2">
                        <InputText value={user_nickname} name="user_nickname" onChange={onChangeForm} className="input-half"
                          placeholder="닉네임" />
                        <Button onClick={() => onCheckNickname(user_nickname)} icon="pi pi-check" ></Button>
                      </div>
                      <div className=" p-inputgroup flex-1 mb-2">
                        <InputText value={user_address1} name="user_address1" onChange={onChangeForm} className="input-half"
                          placeholder="주소" />
                        <Button onClick={openModal} icon="pi pi-search" ></Button>
                      </div>
                      <div className="p-inputgroup flex-1 mb-2">
                        <InputText value={user_address2} name="user_address2" onChange={onChangeForm} className="w-100" placeholder="상세주소" />
                        <ModalAddress
                          show={isModalOpen}
                          handleClose={closeModal}
                          setform={setForm}
                          form={form}
                        />
                      </div>
                    </div>
                  </Card.Text>
                </Col>
              </Row>
              <div className='text-center mt-3'>
                <Button className='me-4 px-5' text raised onClick={onClickUpdate}>수정하기</Button>
                <Button className='me-4 px-5' text raised onClick={onClickReset}>취소하기</Button>
                <Button className='px-5' onClick={() => onClickDelete(user_key)}>회원영구삭제</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default AdminUpdate