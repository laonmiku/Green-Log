import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../components/admin/Dashboard'
import UserListPage from '../components/admin/UserListPage'
import Question from '../components/admin/Question'
import AdminUpdate from '../components/admin/AdminUpdate'
import AdminReadPage from '../components/admin/AdminReadPage'
import AdminAskList from '../components/admin/AdminAskList'
import AdminChat from '../components/admin/AdminChat'
import ReportPage from '../components/admin/ReportPage'
import AdminSeedPage from '../components/admin/AdminSeedPage'


const AdminRouter = () => {
    return (
        <Routes>
            <Route path='/dash' element={<Dashboard />} />
            <Route path='chat/:user_uid' element={<AdminChat />} />
            <Route path='/list.json' element={<UserListPage />} />
            <Route path='/ask/list.json' element={<AdminAskList />} />
            <Route path='/question' element={<Question />} />
            <Route path='/update/:user_uid' element={<AdminUpdate />} />
            <Route path='/read/:user_uid' element={<AdminReadPage />} />
            <Route path='/seed/list.json' element={<AdminSeedPage />} />
            <Route path='/report' element={<ReportPage />} />
        </Routes>
    )
}

export default AdminRouter