import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ReviewListPage from '../components/review/ReviewListPage'
import InsertPage from '../components/review/InsertPage'
import ReviewReadPage from '../components/review/ReviewReadPage'

const ReviewRouter = () => {
    return (
        <Routes>
            <Route path='list.json/:review_key' element={<ReviewListPage/>}></Route>
            <Route path='read/:review_key' element={<ReviewReadPage/>}></Route>
            <Route path='insert' element={<InsertPage/>}></Route>
        </Routes>
    )
}

export default ReviewRouter