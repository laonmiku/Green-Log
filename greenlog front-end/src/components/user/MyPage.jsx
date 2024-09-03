import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { MdOutlineSettings } from "react-icons/md";
import { PiNotebookDuotone } from "react-icons/pi";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import MypageSlick from './MypageSlick';
import DiaryListPage from '../diary/DiaryListPage';
import { PiUserCirclePlus } from "react-icons/pi";
import { PiUserCircleMinusThin } from "react-icons/pi";
import { TbBrandSnapseed } from "react-icons/tb";
import mypage from './mypage.png'
import generalmemebr from './generalmember.png'
import goodmemebr from './goodmember.png'
import staffmemebr from './staffmember.png'
import { Box,  Card, Grid } from '@mui/material';
import ModalFollower from '../follow/ModalFollower';
import ModalFollowing from '../follow/ModalFollowing';
import CircularProgress from '@mui/material/CircularProgress';


const MyPage = () => {
  const [loading, setLoading] = useState(false);
  const { user_uid } = useParams();
  const [diary, setDiary] = useState([]);
  const [follow, setFollow] = useState("");
  const [data, setData] = useState({});
  const navi = useNavigate();


  //일기내용 조회
  const callAPI2 = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`/user/mypage2/${user_uid}`);
      setDiary(res.data);
    } catch (error) {
      console.error('Error data diary:', error);
      alert("데이터를 불러오지 못했습니다.");
    }finally{
      setLoading(false);
    }

  }

  //팔로우정보부르기
  const callAPI3 = async () => {
    setLoading(true)
    try {
      const res = await axios.post('/follow/chkfollow', { follow_to: user_uid, follow_from: sessionStorage.getItem("uid") })
      console.log(res.data);
      setFollow(res.data);
    } catch (error) {
      console.error('Error data follow:', error);
      alert("팔로우 데이터를 불러오지 못했습니다.");
    }finally{
      setLoading(false);
    }

  }

  //마이페이지 전체 데이터
  const callAPI4 = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`/user/mypage/${user_uid}`);
      setData(res.data);
    } catch (error) {
      console.error('Error data mypage:', error);
      alert("마이페이지 데이터를 불러오지 못했습니다.");
    }finally{
      setLoading(false);
    }

  }

  useEffect(() => {
    callAPI2();
    callAPI3();
    callAPI4();
  }, [])


  //팔로우추가
  const onAddFollow = async () => {
    setLoading(true)
    try {
      const res = await axios.post("/follow/addFollow", { follow_to: user_uid, follow_from: sessionStorage.getItem("uid") })

      if (res.data === 1) {
        alert("팔로우완료!")
        window.location.reload();
      } else {
        alert("이미 팔로우한 친구입니다!")
      }
      
    } catch (error) {
      console.error('Error data follow:', error);
      alert("addfollow 데이터를 불러오지 못했습니다.");
    }finally{
      setLoading(false);
    }

  }

  //팔로우취소
  const onUnFollow = async () => {
    setLoading(true)
    try{
      const res = await axios.post("/follow/unFollow", { follow_to: user_uid, follow_from: sessionStorage.getItem("uid") })
      if (res.data === 1) {
        alert("팔로우 취소 완료!")
        window.location.reload();
      } else {
        alert("팔로우하지 않은 친구입니다!")
      }

    }catch (error) {
      console.error('Error data follow:', error);
      alert("minusfollow 데이터를 불러오지 못했습니다.");
    }finally{
      setLoading(false);
    }
    
  }
  if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <img src={mypage} alt="car" style={{ width: '100%', maxWidth: '800px' }} />
      </div>
      <Row className='my-5'>
        <Col xs={8} md={6} lg={4}>
          <Grid item >
            <img src={data.user_img || "http://via.placeholder.com/200x200"} style={{ width: "27rem", height: "27rem" }} />
          </Grid>
        </Col>
        <Col xs={7} md={6} lg={8}>
          <Card>
            <Box sx={{ minWidth: 275, padding: '16px', }}>
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item xs={12}>
                  <Row className='justify-content-center'>
                    <Col xs={6} md={5} lg={4}>
                      <ModalFollower uid={user_uid} cnt={data.follower_count} />
                    </Col>
                    <Col xs={6} md={5} lg={4}>
                      <ModalFollowing uid={user_uid} cnt={data.following_count} />
                    </Col>
                    {!(sessionStorage.getItem("uid") === user_uid) && (
                      <Col xs={1} md={3} lg={2}>
                        <Grid item>
                          <div style={{ display: 'flex' }}>
                            {follow ? <PiUserCircleMinusThin style={{ cursor: "pointer", fontSize: "50px" }} onClick={onUnFollow} />
                              : <PiUserCirclePlus style={{ cursor: "pointer", fontSize: "50px" }} onClick={onAddFollow} />
                            }
                          </div>

                        </Grid>
                      </Col>
                    )}
                  </Row>
                </Grid>
                {(sessionStorage.getItem("uid") === user_uid) &&
                  <>
                    <Grid item xs={12}>
                      <Row className='justify-content-center'>
                        <Col xs={6} md={5} lg={4}>
                          <Card style={{ cursor: "pointer", padding: "20px" }} onClick={() => navi(`/auction/list.json/${user_uid}`)}>
                            <div className='text-center'>
                              <span className='me-2'>피망마켓이용건 {data.auction_count}</span>
                            </div>
                          </Card>
                        </Col>
                        <Col xs={6} md={5} lg={4}>
                          <Card style={{ cursor: "pointer", padding: "20px" }} onClick={() => navi(`/user/wallet/${user_uid}`)}>
                            <div className='text-center '>
                              <span >
                                내 씨앗 {data.seed_point}
                                <TbBrandSnapseed className='ms-1' style={{ fontSize: '23px', color: 'brown', verticalAlign: 'middle', width: "1.5rem" }} />
                              </span>
                            </div>
                          </Card>
                        </Col>
                      </Row>
                    </Grid>
                    <Grid item xs={12}>
                      <Row className='justify-content-center'>
                        <Col xs={6} md={5} lg={4}>
                          <Card style={{ cursor: "pointer", padding: "20px" }} onClick={() => navi(`/diary/insert`)}>
                            <div className='text-center'>
                              <span className='me-1'>일기쓰기 </span>
                              <PiNotebookDuotone style={{ fontSize: '28px', color: 'brown', verticalAlign: 'middle' }} />
                            </div>
                          </Card>
                        </Col>
                        <Col xs={6} md={5} lg={4}>
                          <Card style={{ cursor: "pointer", padding: "20px" }} onClick={() => navi(`/user/update/${user_uid}`)}>
                            <div className='text-center'>
                              <span className='me-1'>내 정보수정 </span>
                              <MdOutlineSettings style={{ fontSize: '28px', color: 'gray', verticalAlign: 'middle' }} />
                            </div>
                          </Card>
                        </Col>
                      </Row>
                      <Grid item xs={12}>
                        <Row className='justify-content-center my-3'>
                          <Col xs={11} md={10} lg={8} >
                            <Card className='d-flex justify-content-center align-items-center text-center mb-2'
                              style={{ padding: "20px", height: "148px" }}>
                              <div>
                                <span style={{ fontSize: "20px" }}>{data.user_nickname}님의 등급은 <b>{data.user_auth}</b>입니다.</span>
                              </div>
                              {data.user_auth === "우수회원" && <div>
                                <img src={goodmemebr} alt="car" style={{ width: '100%', maxWidth: '110px' }} />
                              </div>
                              }
                              {data.user_auth === "일반회원" && <div style={{ margin: "5px, 5px" }}>
                                <img src={generalmemebr} alt="car" style={{ width: '100%', maxWidth: '110px' }} />
                              </div>
                              }
                              {data.user_auth === "관리자" && <div style={{ margin: "5px, 5px" }}>
                                <img src={staffmemebr} alt="car" style={{ width: '100%', maxWidth: '110px' }} />
                              </div>
                              }
                            </Card>
                          </Col>
                        </Row>
                      </Grid>
                    </Grid>
                  </>
                }
              </Grid>

            </Box>
          </Card>
          {!(sessionStorage.getItem("uid") === user_uid) && (
            <Box sx={{ padding: '16px' }}>
              <Row className='justify-content-center'>
                <Col>
                  {diary.length === 0 ? <div className='text-muted'><h2 className='text-center'>일기내역없음</h2></div> :
                    <MypageSlick user_img={data.user_img} user_uid={user_uid} />}
                </Col>
              </Row>
            </Box>
          )}
        </Col>
      </Row>
      <div className='my-5'>
        <h4 className='text-center mb-3'>{data.user_nickname}님의 럭키클로버 일기</h4>
        <h5 className='text-center'>{data.user_ment}</h5>
      </div>
      <div className='mt-3 mb-5'>
        <Row className='justify-content-center'>
          {diary.length === 0 ? <div className='text-muted'><h2 className='text-center'>일기내역없음</h2></div> :
            <DiaryListPage user_uid={user_uid} />}
        </Row>
      </div>
    </div>
  )
}
export default MyPage