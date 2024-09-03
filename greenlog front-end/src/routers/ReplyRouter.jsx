import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ReplyPage from '../components/reply/ReplyPage'
import ReplyReadPage from '../components/reply/ReplyReadPage'
import ReplyListPage from '../components/reply/ReplyListPage'

const ReplyRouter = () => {
    return (
        <Routes>
            <Route path='insert' element={<ReplyPage/>}></Route>
            <Route path='read/:reply_key' element={<ReplyReadPage/>}></Route>
            <Route path='list.json' element={<ReplyListPage/>}></Route>
        </Routes>
    )
}

export default ReplyRouter