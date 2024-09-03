import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../components/user/LoginPage'
import MyPage from '../components/user/MyPage'
import Dashboard from '../components/admin/Dashboard'
import UserListPage from '../components/admin/UserListPage'
import Question from '../components/admin/Question'
import SeedWallet from '../components/user/SeedWallet'
import SearchIdPage from '../components/user/SearchIdPage'
import SearchPassPage from '../components/user/SearchPassPage'
import UserUpdatePage from '../components/user/UserUpdatePage'
import Following from '../components/follow/Following'
import Follow from '../components/follow/Follow'
import AdminUpdate from '../components/admin/AdminUpdate'
import AdminReadPage from '../components/admin/AdminReadPage'
import ChatRoom from '../common/useful/ChatRoom'
import AdminAskList from '../components/admin/AdminAskList'
import AdminChat from '../components/admin/AdminChat'
import NewPass from '../components/user/NewPass'
import ReportPage from '../components/admin/ReportPage'
import StepPage from '../components/user/StepPage'


const UserRouter = () => {
  return (
    <Routes>
      <Route path='updatePass/:user_uid' element={<NewPass/>} />
      <Route path='login' element={<LoginPage />} />
      <Route path='join' element={<StepPage />} />
      <Route path='read/:user_uid' element={<MyPage />} /> 
      <Route path='admin' element={<Dashboard />} />
      <Route path='chat/:user_uid' element={<AdminChat />} />
      <Route path='admin/list.json' element={<UserListPage />} />
      <Route path='admin/ask/list.json' element={<AdminAskList />} />
      <Route path='admin/question' element={<Question />} />
      <Route path='admin/update/:user_uid' element={<AdminUpdate />} />
      <Route path='admin/read/:user_uid' element={<AdminReadPage />} />
      <Route path='admin/report' element={<ReportPage/>}/>
      <Route path='wallet/:uid' element={<SeedWallet />} />
      <Route path='searchId' element={<SearchIdPage />} />
      <Route path='searchPass' element={<SearchPassPage />} />
      <Route path='update/:user_uid' element={<UserUpdatePage />} />
      <Route path='following/:user_uid' element={<Following />} />
      <Route path='follower/:user_uid' element={<Follow />} />
      <Route path='chat' element={<ChatRoom />} />
    </Routes>
  )
}

export default UserRouter