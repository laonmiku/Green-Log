import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BBSInsertPage from '../components/bbs/BBSInsertPage';
import BBSReadPage from '../components/bbs/BBSReadPage';
import BBSUpdatePage from '../components/bbs/BBSUpdatePage';
import BBSListPage from '../components/bbs/BBSListPage';

const BBSRouter = () => {
    return (
        <Routes>
            <Route path="/insert" element={<BBSInsertPage />} />
            <Route path="/read/:bbs_key" element={<BBSReadPage />} />
            <Route path="/update/:bbs_key" element={<BBSUpdatePage />} />
            <Route path="/list.json" element={<BBSListPage />} />
        </Routes>
    );
}

export default BBSRouter