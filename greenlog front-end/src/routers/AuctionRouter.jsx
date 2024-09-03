import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuctionPage from '../components/admin/AuctionPage'
import AuctionList from '../components/auction/AuctionList'

const AuctionRouter = () => {
  return (
    <Routes>
    <Route path='admin/list.json' element={<AuctionPage/>}/>
    <Route path='list.json/:user_uid' element={<AuctionList/>}/>
    </Routes>
  )
}

export default AuctionRouter