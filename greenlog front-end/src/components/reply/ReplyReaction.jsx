import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegThumbsUp, FaThumbsUp, FaRegThumbsDown, FaThumbsDown } from "react-icons/fa";

const ReplyReaction = ({ reply_key, uid }) => {
    const [reaction, setReaction] = useState([]);
    const [likeCount, setLikeCount] = useState('');
    const [hateCount, setHateCount] = useState('');
    const callAPI = async () => {
        const res = await axios.post("/reply/readReaction", { reply_key, reply_writer: uid })
        const res2 = await axios.get(`/reply/CountReaction/${reply_key}`)
        setReaction(res.data)
        setLikeCount(res2.data.likeCount)
        setHateCount(res2.data.hateCount)
    }
    const onInsertLike = async () => {
        const res = await axios.post("/reply/insert/like", { reply_key, reply_writer: uid })
        if (res.data === 1) {
            callAPI();
        } else {
            alert("로그인이 필요합니다")
        }
    }

    const onInsertHate = async () => {
        const res = await axios.post("/reply/insert/hate", { reply_key, reply_writer: uid })
        if (res.data === 1) {
            callAPI();
        } else {
            alert("로그인이 필요합니다")
        }
    }

    const onReactionUpdate = async () => {
        await axios.post("/reply/reactionUpdate", { reply_key, reply_writer: uid })
        callAPI();
    }

    const onReactionDelete = async () => {
        await axios.post("/reply/reactionDelete", { reply_key, reply_writer: uid })
        callAPI();
    }

    useEffect(() => {
        callAPI()
    }, [])

    return (
        <span>
            {reaction ?
                <>
                    {reaction === 1 ? (
                        <FaThumbsUp style={{ cursor: 'pointer' }} onClick={onReactionDelete} className='me-2' />
                    ) : (
                        <FaRegThumbsUp style={{ cursor: 'pointer' }} onClick={onReactionUpdate} className='me-2' />
                    )} <span className='me-3'>{likeCount}</span>


                    {reaction === -1 ? (
                        <FaThumbsDown style={{ cursor: 'pointer' }} onClick={onReactionDelete} className='me-2' />
                    ) : (
                        <FaRegThumbsDown style={{ cursor: 'pointer' }} onClick={onReactionUpdate} className='me-2' />
                    )} <span className='me-3'>{hateCount}</span>
                </>
                :
                <>
                    <FaRegThumbsUp style={{ cursor: 'pointer' }} onClick={onInsertLike} className='me-2' /> <span className='me-3'>{likeCount}</span>
                    <FaRegThumbsDown style={{ cursor: 'pointer' }} onClick={onInsertHate} className='me-2' /> <span className='me-3'>{hateCount}</span>
                </>
            }
        </span>
    )
}

export default ReplyReaction