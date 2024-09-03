import React, { useEffect, useState } from 'react';
import { Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Typography, Checkbox, Chip, Button, Paper, Grid } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const ReportPage = () => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(12);
    const [key, setKey] = useState('id');
    const [word, setWord] = useState('');
    const [count, setCount] = useState('');
    const [allChecked, setAllChecked] = useState(false);
    const [alist, setAlist] = useState([]);
    const [acount, setAcount] = useState('');
    const [loading, setLoading] = useState(false);

    const callAPI = async () => {
        setLoading(true)
        try{
            const res = await axios.get(`/report/list?key=${key}&word=${word}&page=${page}&size=${size}`);
            console.log(res.data);
            const data = res.data.doc.map(r => r && { ...r, checked: false });
            setList(data);
            setCount(res.data.total);
        }catch (error) {
            console.error('Error data diary:', error);
            alert("데이터를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
       
    };

    const callAPI2 = async () => {
        setLoading(true)
        try{
            const res = await axios.get(`/report/alist?key=${key}&word=${word}&page=${page}&size=${size}`);
            console.log(res.data);
            const data = res.data.doc.map(r => r && { ...r, checked: false });
            setAlist(data);
            setAcount(res.data.total);
        }catch (error) {
            console.error('Error data diary:', error);
            alert("데이터를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
       
    };

    useEffect(() => { callAPI(); }, []);
    useEffect(() => { callAPI2(); }, [page]);

    const onChangeAll = () => {
        const newChecked = !allChecked;
        const data = list.map(r => r && { ...r, checked: newChecked });
        setAllChecked(newChecked);
        setList(data);
    }

    const onChangeSingle = (rid) => {
        const updatedReports = list.map(r =>
            r.report_key === rid ? { ...r, checked: !r.checked } : r
        );
        setList(updatedReports);
    }

    const onCheckedUpdate = async () => {
        const checkedReports = list.filter(report => report.checked);
        const checkedCount = checkedReports.length;

        if (checkedCount === 0) {
            alert("변경할 신고기록을 선택하세요");
            return;
        }

        try {
            // 비동기 작업을 순차적으로 처리하기 위해 for...of 루프 사용
            let cnt = 0;
            let inserted = 0;

            for (const report of checkedReports) {
                const res = await axios.post('/report/update', { report_key: report.report_key });
                if (res.data === 1) inserted++;
                cnt++;
            }

            // 모든 요청이 완료된 후 체크박스 상태를 초기화
            const data = list.map(report => report && { ...report, checked: false });
            setList(data);

            alert(`${inserted}개의 신고기록이 업데이트되었습니다.`);
            callAPI(); // 업데이트 후 데이터를 새로고침
            callAPI2();
        } catch (error) {
            console.error("업데이트 중 오류 발생:", error);
            alert("업데이트 중 오류가 발생했습니다.");
        }
    };
    useEffect(() => {
        const allChecked = list.length > 0 && list.every(r => r.checked);
        setAllChecked(allChecked);
    }, [list]);

    if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>;
    return (
        <Container>
            <Box mt={3}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={12}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h5" mb={2}>
                                신고접수 현황
                            </Typography>
                            <div className='text-end'>
                                <Button onClick={onCheckedUpdate} variant="contained" color="primary" className='mb-2'>
                                    처리하기
                                </Button>
                            </div>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={allChecked} onChange={onChangeAll} />
                                            </TableCell>
                                            <TableCell>신고접수번호</TableCell>
                                            <TableCell>신고글</TableCell>
                                            <TableCell>신고자</TableCell>
                                            <TableCell>신고당한회원</TableCell>
                                            <TableCell>신고내용</TableCell>
                                            <TableCell>처리상태</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {list.map((report) => (
                                            <TableRow key={report.report_key}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={report.checked || false}
                                                        onChange={() => onChangeSingle(report.report_key)}
                                                    />
                                                </TableCell>
                                                <TableCell>{report.report_key}</TableCell>
                                                <TableCell>
                                                    <Link to={`/${report.report_root}/read/${report.report_origin}`}>
                                                        {report.report_root}_key={report.report_origin}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>{report.report_from}</TableCell>
                                                <TableCell><Link to={`/user/admin/update/${report.report_to}`}>{report.report_to}</Link></TableCell>
                                                <TableCell>{report.report_contents}</TableCell>
                                                <TableCell>
                                                    {report.report_state === 0 ? (
                                                        <Chip label="미처리" color="error" />
                                                    ) : (
                                                        <Chip label="처리완료" color="primary" />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {count > size && (
                                <Box mt={3} display="flex" justifyContent="center">
                                    <Pagination
                                        count={Math.ceil(count / size)}
                                        page={page}
                                        onChange={(e, value) => setPage(value)}
                                        color="primary"
                                        boundaryCount={2}
                                        siblingCount={2}
                                        showFirstButton
                                        showLastButton
                                    />
                                </Box>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            <Box mt={3}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={12}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h5" mb={2}>
                                완료된 신고 현황
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>신고접수번호</TableCell>
                                            <TableCell>신고글</TableCell>
                                            <TableCell>신고자</TableCell>
                                            <TableCell>신고당한회원</TableCell>
                                            <TableCell>신고내용</TableCell>
                                            <TableCell>처리상태</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {alist.map((report) => (
                                            <TableRow key={report.report_key}>
                                                <TableCell>{report.report_key}</TableCell>
                                                <TableCell>
                                                    <Link to={`/${report.report_root}/read/${report.report_origin}`}>
                                                        {report.report_root}_key={report.report_origin}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>{report.report_from}</TableCell>
                                                <TableCell>{report.report_to}</TableCell>
                                                <TableCell>{report.report_contents}</TableCell>
                                                <TableCell>
                                                    {report.report_state === 0 ? (
                                                        <Chip label="미처리" color="error" />
                                                    ) : (
                                                        <Chip label="처리완료" color="primary" />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {acount > size && (
                                <Box mt={3} display="flex" justifyContent="center">
                                    <Pagination
                                        count={Math.ceil(acount / size)}
                                        page={page}
                                        onChange={(e, value) => setPage(value)}
                                        color="primary"
                                        boundaryCount={2}
                                        siblingCount={2}
                                        showFirstButton
                                        showLastButton
                                    />
                                </Box>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default ReportPage;
