import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListPage from '../components/mall/page/ListPage'
import ReadPage from '../components/mall/page/ReadPage'
import InsertPage from '../components/mall/page/InsertPage'
import UpdatePage from '../components/mall/page/UpdatePage'
import PopularPage from '../components/mall/page/PopularPage'
import MallList from '../components/mall/MallList'

const MallRouter = () => {
    return (
        <Routes>
            <Route path='list.json' element={<ListPage/>}/>
            <Route path='read/:mall_key' element={<ReadPage/>}/>
            <Route path='insert' element={<InsertPage/>}/>
            <Route path='update/:mall_key' element={<UpdatePage/>}/>
            <Route path='pop' element={<PopularPage/>}/> 
            
        </Routes>
    )
}

export default MallRouter