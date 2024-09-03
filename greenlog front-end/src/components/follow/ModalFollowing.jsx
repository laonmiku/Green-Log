import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { Card, CardContent, Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Avatar } from '@mui/material';
const ModalFollowing = ({ uid, cnt }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [word, setWord] = useState('');
    const [key, setKey] = useState('id');
    const [size, setSize] = useState(10);
    const [page, setPage] = useState(1);
    const [list, setList] = useState([])
    const [count, setCount] = useState('');
    const callAPI = async () => {
        const res = await axios.get(`/follow/following/${uid}?key=${key}&word=${word}&size=${size}&page=${page}`)
        setList(res.data.doc)
        setCount(res.data.total)
        console.log(res.data)
    }
    useEffect(() => { callAPI() }, [page])

    const onClickSearch = (e) => {
        e.preventDefault();
        setWord("");
        callAPI();
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onClickSearch(e); // e를 전달
        }
    };

    const onClickID = (uid) => {
        window.location.href = `/user/read/${uid}`
        handleClose();
    }

    const onUnFollow = async (uid) => {
        const res = await axios.post("/follow/unFollow", { follow_to: uid, follow_from: sessionStorage.getItem("uid") })
        if (res.data === 1) {
            alert("삭제완료!")
            callAPI();
        } else {
            alert("팔로우하지 않은 친구입니다!")
        }
    }
    return (
        <>
            <Card  style={{ cursor: "pointer", padding: "20px" }}>
                        <div className='text-center' onClick={handleShow}>
                        팔로잉 {count}
                        </div>
        </Card>
            <Modal
                style={{ top: "25%" }}
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5 className='text-center mt-3'>내가 팔로우 하는 친구</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container style={{ marginTop: '16px' }}>
                        <Card style={{ padding: '16px' }}>
                            <CardContent>
                                <form onSubmit={onClickSearch} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                    <TextField
                                        label="검색어"
                                        variant="outlined"
                                        value={word}
                                        onChange={(e) => setWord(e.target.value)}
                                        onKeyDown={handleKeyDown} // Enter 키 입력 처리
                                        sx={{ mr: 2, width: '300px' }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <SearchIcon
                                                        onClick={onClickSearch}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </form>

                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            {list.map((f, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <Avatar
                                                            src={f.user_img || "/images/woman.jpg"}
                                                            style={{ width: '50px', height: '50px' }}
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ cursor: "pointer" }} onClick={() => { onClickID(f.user_uid) }}>{f.user_uid} ({f.user_nickname})</TableCell>
                                                    {uid === sessionStorage.getItem("uid") && (
                                                        <TableCell align='right'>
                                                            <Button
                                                                variant='contained'
                                                                color='error'
                                                                size='small'
                                                                onClick={() => onUnFollow(f.user_uid)}
                                                            >
                                                                삭제
                                                            </Button>
                                                        </TableCell>
                                                    )}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                {count > size && (
                                    <TablePagination
                                        rowsPerPageOptions={[size]}
                                        component="div"
                                        count={count}
                                        rowsPerPage={size}
                                        page={page - 1}
                                        onPageChange={(event, newPage) => setPage(newPage + 1)}
                                        style={{ marginTop: '16px' }}
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalFollowing