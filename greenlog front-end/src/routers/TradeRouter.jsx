import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TradeListPage from '../components/trade/TradeListPage'
import AdminTradeListPage from '../components/trade/AdminTradeListPage'

const TradeRouter = () => {
    return (
        <Routes>
            <Route path='list.json' element={<TradeListPage/>} />
            <Route path='admin/list.json' element={<AdminTradeListPage/>} />
        </Routes>
    )
}

export default TradeRouter