import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import { Row, Col, InputGroup, Form, Button } from 'react-bootstrap';

const ChatRoom = () => {
    const uid = sessionStorage.getItem('uid'); // 사용자 ID 또는 식별자
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [key, setKey] = useState('');
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stomp = Stomp.over(socket);
        stomp.connect({}, frame => {
            console.log('Connected: ' + frame);
            setStompClient(stomp);

            stomp.subscribe(`/topic/${uid}`, message => {
                const receivedMessage = JSON.parse(message.body);
                console.log('Received message:', receivedMessage);
                setMessages(prevMessages => [...prevMessages, receivedMessage]);
                setTimeout(scrollToBottom, 100);
            });
        });

        return () => {
            if (stompClient) stompClient.disconnect();
        };
    }, [uid]);

    useEffect(() => {
        callAPI();
    }, []);

    const callAPI = async () => {
        const res = await axios.get(`/chat/searchChatkey/${uid}`);
        setKey(res.data);
        const listRes = await axios.get(`/chat/listMsg/${res.data}?page=0&size=20`);
        setMessages(listRes.data);
        setTimeout(scrollToBottom, 100);
    };

    const sendMessage = async () => {
        if (stompClient && messageInput) {
            const messageData = {
                chat_content: messageInput,
                chat_sender: uid,
                chat_path: uid,
            };

            stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(messageData));
            setMessageInput('');

            await axios.post(`/chat/saveMsg`, { chat_sender: uid, chatlog_msg: messageInput, chat_key: key });
        }
    };

    const handleChange = (event) => {
        setMessageInput(event.target.value);
    };

    const handleDisconnect = async() => {
        if (stompClient) {
            stompClient.deactivate(); // Use deactivate() to properly close the connection
            console.log('WebSocket connection closed.');
        }
        await axios.post("/chat/exit", { chat_path: uid , chat_sender:uid })
        await axios.post("/chat/delete", { chat_key: key })

        alert("처리완료되었습니다")
        window.location.href="/";
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <Row className='justify-content-center'>
            <Col xs={6}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span>관리자와 1:1 대화</span>
                    <Button variant="danger" onClick={handleDisconnect}>대화종료</Button>
                </div>
                <div ref={chatContainerRef} style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#fff', padding: '10px', marginBottom: '10px' }}>
                    {messages.map((msg, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            justifyContent: msg.chat_sender === 'admin' ? 'flex-start' : 'flex-end',
                            marginBottom: '10px'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                maxWidth: '60%',
                                backgroundColor: msg.chat_sender === 'admin' ? '#f1f1f1' : '#e1ffc7',
                                padding: '8px',
                                borderRadius: '10px',
                                wordBreak: 'break-word'
                            }}>
                                {msg.chat_sender !== 'admin' && <img src={msg.user_img} alt="User" style={{ borderRadius: "50%", width: "1.5rem", height: "1.5rem", marginRight: '8px' }} />}
                                <strong>{msg.chat_sender}</strong>: {msg.chatlog_msg || msg.chat_content}
                            </div>
                        </div>
                    ))}
                </div>
                <form onSubmit={sendMessage}>
                    <InputGroup className="chat-input-group" style={{ display: 'flex', alignItems: 'center' }}>
                        <Form.Control
                            value={messageInput}
                            onChange={handleChange}
                            placeholder="메세지를 입력해주세요"
                            style={{ borderRadius: '20px 0 0 20px' }}
                        />
                        <Button type="submit" variant="primary" style={{ borderRadius: '0 20px 20px 0' }}>Send</Button>
                    </InputGroup>
                </form>
            </Col>
        </Row>
    </div>
    );
}

export default ChatRoom;
