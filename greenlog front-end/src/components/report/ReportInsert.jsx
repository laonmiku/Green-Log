import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, InputGroup, Form, Button, Card } from 'react-bootstrap'
import { PiSirenFill } from "react-icons/pi";
import axios from 'axios';


const ReportInsert = ({ uid, writer, root, origin }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [form, setform] = useState({
        report_from: uid,
        report_to: writer,
        report_root: root,
        report_origin: origin,
        report_contents: ''
    })
    let { report_from, report_to, report_root, report_origin, report_contents } = form;
    const onChangeForm = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const onClickReport = async () => {
        await axios.post("/report/insert", { report_from: uid, report_to: writer, report_root: root, report_origin: origin, report_contents })
        setform({report_from: "",
            report_to: "",
            report_root: "",
            report_origin: "",
            report_contents: ''})
        alert("신고접수가 완료되었습니다")
        handleClose();
    }

    useEffect(() => {
        setform({
            report_from: uid,
            report_to: writer,
            report_root: root,
            report_origin: origin,
            report_contents: ''
        });
    }, [uid, writer, root, origin]);
    
    return (
        <>
            <div onClick={handleShow} style={{cursor:"pointer"}}>
                신고
                <span><PiSirenFill style={{ color: "red" }} /></span>
            </div>

            <Modal
                style={{ top: "20%" }}
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>신고하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <InputGroup className='h-25'>
                            <InputGroup.Text style={{ backgroundColor: "#002412", color: 'white' }} className=' justify-content-center w-25'><b>신고닉네임</b></InputGroup.Text>
                            <Form.Control name="report_to" value={report_to} onChange={onChangeForm} />
                        </InputGroup >
                        <InputGroup className='mt-3'>
                            <Form.Control
                                as='textarea'
                                rows={5}
                                name="report_contents"
                                value={report_contents}
                                onChange={onChangeForm}
                                placeholder='상세신고 내용을 적어주세요'
                            />
                        </InputGroup >
                        <InputGroup className='h-25' style={{display:"none"}}>
                            <InputGroup.Text style={{ backgroundColor: "#002412", color: 'white' }} className=' justify-content-center w-25'><b>신고한 사람</b></InputGroup.Text>
                            <Form.Control name="report_from" value={report_from} onChange={onChangeForm} />
                        </InputGroup >
                        <InputGroup className='h-25' style={{display:"none"}}>
                            <InputGroup.Text style={{ backgroundColor: "#002412", color: 'white' }} className=' justify-content-center w-25'><b>신고 루트</b></InputGroup.Text>
                            <Form.Control name="report_root" value={report_root} onChange={onChangeForm} />
                        </InputGroup >
                        <InputGroup className='h-25'style={{display:"none"}}>
                            <InputGroup.Text style={{ backgroundColor: "#002412", color: 'white' }} className=' justify-content-center w-25'><b>신고 키</b></InputGroup.Text>
                            <Form.Control name="report_origin" value={report_origin} onChange={onChangeForm} />
                        </InputGroup >
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => onClickReport(form)}>신고내용제출</Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ReportInsert