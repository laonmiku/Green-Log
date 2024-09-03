import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DiaryListPage from '../components/diary/DiaryListPage'
import DiaryUpdatePage from '../components/diary/DiaryUpdatePage'
import DiaryInsertPage from '../components/diary/DiaryInsertPage'
import DiaryReadPage from '../components/diary/DiaryReadPage'

const DiaryRouter = () => {
  return (
    <Routes>
            <Route path='list.json/:diary_writer' element={<DiaryListPage/>}/>
            <Route path='update/:diary_key' element={<DiaryUpdatePage/>}/>
            <Route path='insert' element={<DiaryInsertPage/>}/>
            <Route path='read/:diary_key' element={<DiaryReadPage/>}/>
    </Routes>
  )
}

export default DiaryRouter