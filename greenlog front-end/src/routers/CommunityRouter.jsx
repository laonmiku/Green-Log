import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FAQInsert from '../components/faq/FAQInsert';
import FAQList from '../components/faq/FAQList';
import FAQUpdate from '../components/faq/FAQUpdate';
import QAInsert from '../components/qa/QAInsert';
import QAList from '../components/qa/QAList';
import QARead from '../components/qa/QARead';
import QAUpdate from '../components/qa/QAUpdate';
import EventInsert from '../components/event/EventInsert';
import EventList from '../components/event/EventList';
import EventRead from '../components/event/EventRead';
import EventUpdate from '../components/event/EventUpdate';
import NoticeList from '../components/notice/NoticeList';
import NoticeRead from '../components/notice/NoticeRead';
import NoticeUpdate from '../components/notice/NoticeUpdate';
import AskInsert from '../components/ask/AskInsert';
import AskList from '../components/ask/AskList';
import AskRead from '../components/ask/AskRead';
import AskUpdate from '../components/ask/AskUpdate';
import NoticeInsert from '../components/notice/NoticeInsert';
import FAQRead from '../components/faq/FAQRead';

const CommunityRouter = () => {
  return (
    <Routes>
      <Route path="/faq/insert" element={<FAQInsert />} />
      <Route path="/faq/read/:{faq_key}" element={<FAQRead />} />
      <Route path="/faq/list.json" element={<FAQList />} />
      <Route path="/faq/update/:faq_key" element={<FAQUpdate />} />
      <Route path="/qa/insert" element={<QAInsert />} />
      <Route path="/qa/list.json" element={<QAList />} />
      <Route path="/qa/read/:qa_key" element={<QARead />} />
      <Route path="/qa/update/:qa_key" element={<QAUpdate />} />
      <Route path="/event/insert" element={<EventInsert />} />
      <Route path="/event/list.json" element={<EventList />} />
      <Route path="/event/read/:event_key" element={<EventRead />} />
      <Route path="/event/update/:event_key" element={<EventUpdate />} />
      <Route path="/notice/insert" element={<NoticeInsert />} />
      <Route path="/notice/list.json" element={<NoticeList />} />
      <Route path="/notice/read/:notice_key" element={<NoticeRead />} />
      <Route path="/notice/update/:notice_key" element={<NoticeUpdate />} />
      <Route path="/ask/insert" element={<AskInsert />} />
      <Route path="/ask/list.json" element={<AskList />} />
      <Route path="/ask/read/:ask_key" element={<AskRead />} />
      <Route path="/ask/update/:ask_key" element={<AskUpdate />} />
    </Routes>
  );
};

export default CommunityRouter;
