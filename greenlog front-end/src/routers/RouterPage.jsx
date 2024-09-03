import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from '../common/home/MainPage'
import UserRouter from './UserRouter'
import ReviewRouter from './ReviewRouter'
import MallRouter from './MallRouter'
import ReportRouter from './ReportRouter'
import ReplyRouter from './ReplyRouter'
import AboutRouter from './AboutRouter'
import CommunityRouter from './CommunityRouter'
import DiaryRouter from './DiaryRouter'
import TradeRouter from './TradeRouter'
import AuctionRouter from './AuctionRouter'
import RereplyRouter from './RereplyRouter'
import AdminRouter from './AdminRouter'
import BBSRouter from './BBSRouter'




const RouterPage = () => {
    return (
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/user/*' element={<UserRouter />} />
            <Route path='/mall/*' element={<MallRouter />} />
            <Route path='/report/*' element={<ReportRouter />} />
            <Route path='/review/*' element={<ReviewRouter />} />
            <Route path='/reply/*' element={<ReplyRouter />} />
            <Route path='/rereply/*' element={<RereplyRouter/>}/>
            <Route path='/about/*' element={<AboutRouter />} />
            <Route path='/community/*' element={<CommunityRouter />} />
            <Route path='/diary/*' element={<DiaryRouter />} />
            <Route path='/trade/*' element={<TradeRouter />} />
            <Route path='/auction/*' element={<AuctionRouter />} />
            <Route path='/admin/*' element={<AdminRouter />} />
            <Route path='/bbs/*' element={<BBSRouter />} />
        </Routes>
    )
}

export default RouterPage