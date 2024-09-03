import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Row, Col, Badge } from 'react-bootstrap';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { UserContext } from '../user/UserContext';
import { Box, TextField, Select, MenuItem, InputLabel, FormControl, ButtonGroup, Button, CircularProgress } from '@mui/material';
import { Editor } from 'primereact/editor';

const BBSUpdatePage = () => {
    const { userData } = useContext(UserContext);
    const auth = userData.auth;
    const { bbs_key } = useParams();
    const [loading, setLoading] = useState(true); // Initial loading state
    const [file, setfile] = useState({ name: '', byte: null });
    const [attach, setAttach] = useState([]);
    const refFile = useRef();
    const [photos, setPhotos] = useState([]);
    const [form, setForm] = useState({
        bbs_title: '',
        bbs_contents: '',
        bbs_type: '',
        bbs_writer: ''
    });
    const [list, setList] = useState(""); // Existing data
    const [isModified, setIsModified] = useState(false);
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const { bbs_title, bbs_contents, bbs_type, bbs_writer, bbs_photo } = form;

    const onChangeFile = (e) => {
        setfile({
            name: URL.createObjectURL(e.target.files[0]),
            byte: e.target.files[0]
        })
    }
    // Fetch API data
    const callAPI = async () => {
        try {
            const res = await axios.get(`/bbs/read/${bbs_key}`);
            setForm(res.data);
            setList(res.data);
            setText(res.data.bbs_contents);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); // Set loading to false after data is fetched
        }
    };

    // Fetch attachments
    const callAttach = async () => {
        try {
            const res1 = await axios.get(`/bbs/attach/list/${bbs_key}`);
            setPhotos(res1.data);
            setAttach(res1.data);
        } catch (error) {
            console.error("Error fetching attachments:", error);
        }
    };

    useEffect(() => {
        callAPI();
        callAttach();
    }, [bbs_key]);

    const onClickUpdate = async (photos) => {
        if (isModified === true) {
            alert("게시글 수정 완료!");
            navigate('/bbs/list.json');
        } else {
            if (JSON.stringify(list) === JSON.stringify(form) && photos === attach) {
                alert("변경된 내용이 없습니다!");
                return;
            }
            if (!window.confirm("내용을 수정하실래요?")) return;

            try {
                if (photos) {
                    photos.forEach(async p => {
                        await axios.post('/bbs/update/photo', p);
                    });
                }
                await axios.post(`/bbs/update/${bbs_key}`, { bbs_contents, bbs_type, bbs_title, bbs_key });
                alert("수정완료!");
                navigate(`/bbs/read/${bbs_key}`);
            } catch (error) {
                console.error("게시글 수정 오류:", error.toString());
                alert("게시글 수정 중 오류가 발생했습니다.");
            }
        }
    };

    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onChangeCategory = (e) => {
        setForm({ ...form, bbs_type: parseInt(e.target.value) });
    };

    const onChangeText = (e) => {
        const newText = e.htmlValue || ''; // null일 경우 빈 문자열로 대체
        setText(newText);
        setForm({ ...form, bbs_contents: newText.replace(/<\/?p>/g, '') });
    };

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = [...photos];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        const updateSequence = items.map((item, index) => ({
            ...item,
            mallPhoto_sequence: index
        }));
        setPhotos(updateSequence);
    };

    const onClickDelete = async (photo) => {
        if (!window.confirm(`${photo.bbsPhoto_key}번 이미지를 삭제하시겠습니까?`)) return;
        try {
            const res = await axios.post("/bbs/attach/delete", photo);
            if (res.data === 0) {
                alert("삭제 완료!");
                setIsModified(true);
                callAttach();
            } else {
                alert("대표이미지는 삭제 할 수 없습니다!");
            }
        } catch (error) {
            console.error("Error deleting photo:", error);
        }
    };

    const onClickImageSave = async () => {
        if (file.byte === null) return;
        if (!window.confirm("이미지를 추가하시겠습니까?")) return;
        try {
            const formData = new FormData();
            formData.append("byte", file.byte);
            await axios.post(`/bbs/attachOne/${bbs_key}`, formData);
            alert("이미지 추가완료!");
            setfile("");
            setIsModified(true);
            callAttach();
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const onUpdateMainPhoto = async (photo) => {
        try {
            await axios.post("/bbs/update/mainPhoto", photo);
            setIsModified(true);
            callAPI();
            alert("대표이미지 변경 완료!");
        } catch (error) {
            console.error("Error updating main photo:", error);
        }
    };

    return (
        <div>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <h1 className="text-center my-5">글 수정하기</h1>
                    <Box sx={{ mb: 3 }}>
                        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                            <FormControl variant="outlined" sx={{ mr: 2, minWidth: 150 }}>
                                <InputLabel>카테고리</InputLabel>
                                <Select
                                    name="bbs_type"
                                    value={bbs_type}
                                    onChange={onChangeCategory}
                                    label="카테고리"
                                >
                                    <MenuItem value={0}>자유</MenuItem>
                                    <MenuItem value={1}>꿀팁</MenuItem>
                                    {auth === "관리자" && <MenuItem value={2}>공지사항</MenuItem>}
                                </Select>
                            </FormControl>
                            <TextField
                                name="bbs_title"
                                label="제목을 입력하세요"
                                variant="outlined"
                                value={bbs_title}
                                onChange={onChangeForm}
                                fullWidth
                            />
                        </Box>
                        <Editor value={text} onTextChange={onChangeText} style={{ height: '320px' }} />
                    </Box>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId='photo.mallPhoto_photo' direction="horizontal">
                            {(provided) => (
                                <div
                                    className='photo.mallPhoto_photo'
                                    {...provided.droppableProps} ref={provided.innerRef}
                                >
                                    <Row>
                                        {photos.map((photo, index) => (
                                            <Draggable key={photo.bbsPhoto_photo} draggableId={photo.bbsPhoto_photo} index={index}>
                                                {(provided) => (
                                                    <Col key={photo.bbsPhoto_photo} xs={2} className='mt-2'
                                                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <div style={{ position: "relative" }}>
                                                            <span>
                                                                {bbs_photo === photo.bbsPhoto_photo ?
                                                                    <Badge style={{ position: "absolute", top: '10px', right: "30px" }} bg='primary'>현재 대표이미지</Badge>
                                                                    :
                                                                    <Badge onClick={() => onUpdateMainPhoto(photo)} style={{ cursor: "pointer", position: "absolute", top: '10px', right: "30px" }} bg='success'>썸네일 설정하기</Badge>
                                                                }
                                                                <Badge onClick={() => onClickDelete(photo)} style={{ cursor: "pointer", position: "absolute", top: '10px', right: "5px" }} bg='danger'>X</Badge>
                                                            </span>
                                                        </div>
                                                        <img src={photo.bbsPhoto_photo} style={{ borderRadius: "50%", width: "10rem", height: "10rem" }} />
                                                    </Col>
                                                )}
                                            </Draggable>
                                        ))}
                                        <Col xs={2}>
                                            <img src={file.name || "/images/plus.png"} style={{ borderRadius: "50%", width: "10rem", height: "10rem" }} onClick={() => refFile.current.click()} />
                                            <input ref={refFile} type="file" onChange={onChangeFile} style={{ display: "none" }} />
                                            {file.name &&
                                                <div className="text-center mt-2"><Button onClick={onClickImageSave} size="sm">이미지 추가</Button></div>
                                            }
                                        </Col>
                                        {provided.placeholder}
                                    </Row>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                        <ButtonGroup variant="outlined">
                            <Button
                                type="submit"
                                color="primary"
                                disabled={loading}
                                endIcon={loading ? <CircularProgress size="1rem" /> : null}
                                onClick={() => onClickUpdate(photos)}
                            >
                                수정
                            </Button>
                            <Button
                                color="error"
                                onClick={() => navigate('/bbs/list.json')}
                            >
                                취소
                            </Button>
                        </ButtonGroup>
                    </Box>
                </>
            )}
        </div>
    );
};

export default BBSUpdatePage;
