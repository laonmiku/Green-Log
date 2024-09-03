import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RereplyPage from '../components/rereply/RereplyPage'
import RereplyReadPage from '../components/rereply/RereplyReadPage'
import RereplyListPage from '../components/rereply/RereplyListPage'

const RereplyRouter = () => {
    return (
        <Routes>
            <Route path='insert' element={<RereplyPage/>}></Route>
            <Route path='read/:rereply_key' element={<RereplyReadPage/>}></Route>
            <Route path='list.json' element={<RereplyListPage/>}></Route>
        </Routes>   
    )
}

export default RereplyRouter