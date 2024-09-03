import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ReportPage from '../components/admin/ReportPage'

const ReportRouter = () => {
    return (
        <Routes>
            <Route path='list.json' element={<ReportPage/>}/>
        </Routes>
    )
}

export default ReportRouter