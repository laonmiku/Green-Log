import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Card, CardHeader, CardContent, IconButton, Typography, Menu, MenuItem, Avatar, Button, Grid } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import ReplyPage from '../reply/ReplyPage';
import ReportInsert from '../report/ReportInsert';
import Swal from 'sweetalert2';

const BBSReadPage = () => {
    const { bbs_key } = useParams();
    const uid = sessionStorage.getItem('uid');
    const [form, setForm] = useState({});
    const [photos, setPhotos] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const callAPI = async () => {
        try {
            const res = await axios.get(`/bbs/read/${bbs_key}`);
            const res2 = await axios.get(`/bbs/attach/list/${bbs_key}`);
            setForm(res.data);
            setPhotos(res2.data);
        } catch (error) {
            console.error('There was an error fetching the post!', error);
        }
    };

    const onDelete = async () => {
        Swal.fire({
            title: "게시글을 삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: '삭제',
            cancelButtonText: '취소'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.post(`/bbs/delete/${bbs_key}`);
                    Swal.fire({
                        icon: "success",
                        title: "게시글 삭제가 완료되었습니다",
                        showConfirmButton: false,
                        timer: 2500
                    });
                    window.location.href = '/bbs/list.json';
                } catch (error) {
                    console.error('There was an error deleting the post!', error);
                    alert('게시물 삭제 중 오류가 발생했습니다.');
                }
            }
        });

    };

    useEffect(() => {
        callAPI();
    }, []);

    const { bbs_type, bbs_contents, bbs_title, bbs_writer, bbs_regDate, bbs_uDate, bbs_vcnt, user_img } = form;

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <div style={{ margin: '2rem 0' }}>
            <Grid container justifyContent="center">
                <Grid item xs={10}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar alt={bbs_writer} src={user_img} />
                            }
                            action={
                                sessionStorage.getItem("uid") !== bbs_writer && (
                                    <div>
                                        <ReportInsert uid={sessionStorage.getItem("uid")} origin={bbs_key} writer={bbs_writer} root="bbs" />
                                    </div>
                                )
                            }
                            title={
                                <Typography variant="h6">
                                    [{bbs_type === 0 ? "자유" : (bbs_type === 1 ? "꿀팁" : "공지사항")}] {bbs_title}
                                </Typography>
                            }
                            subheader={
                                <Typography variant="body2">
                                    <RouterLink to={`/user/read/${bbs_writer}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {bbs_writer}
                                    </RouterLink> - 조회수: {bbs_vcnt} - {bbs_uDate ? bbs_uDate : bbs_regDate}
                                </Typography>
                            }
                        />
                        <CardContent>
                            <Grid container spacing={2}>
                                {photos.map((p, index) => (
                                    <Grid item xs={12} key={index}>
                                        <img src={p.bbsPhoto_photo} alt="Post" style={{ width: '100%', maxWidth: '20rem', borderRadius: '8px' }} />
                                    </Grid>
                                ))}
                            </Grid>
                            <Typography variant="body1" paragraph style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
                                {bbs_contents}
                            </Typography>
                        </CardContent>
                    </Card>
                    {uid === bbs_writer && (
                        <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                            <Button variant="outlined" color="primary" component={RouterLink} to={`/bbs/update/${bbs_key}`} style={{ marginRight: '1rem' }}>
                                수정
                            </Button>
                            <Button variant="outlined" color="error" onClick={onDelete}>
                                삭제
                            </Button>
                        </div>
                    )}
                </Grid>
            </Grid>
            <ReplyPage bbs_key={bbs_key} bbs_writer={bbs_writer} />
        </div>

    );
}

export default BBSReadPage;
