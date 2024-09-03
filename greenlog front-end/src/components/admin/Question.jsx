import React, { useState } from 'react'
import {Row, Col, Tab, Tabs} from 'react-bootstrap'
import Sidebar from './Sidebar'
import AdminAskList from './AdminAskList'
import AdminQAList from './AdminQAList'
import ReportPage from './ReportPage'
import { useLocation } from 'react-router-dom'

//탭을 누를때 마다 페이지 변경, 
const Question = () => {

  const useHash = () => {
    const location = useLocation();
    return location.hash.replace('#', '') || 'home';
  }

  const defaultKey = useHash();
  const [activeKey, setActiveKey] = useState(defaultKey);

  const handleSelect = (key) => {
    setActiveKey(key);
    window.location.hash = key;
  };

  return (
    <Row>
        <Col lg={2}>   
            <Sidebar/>
        </Col>
        <Col>
              <Tabs
                activeKey={activeKey} 
                onSelect={handleSelect}
                  id="fill-tab-example"
                  className="mb-3"
                  fill
                >
                  <Tab eventKey="1:1" title="1:1">
                    <AdminAskList/>
                  </Tab>
                  <Tab eventKey="notice" title="신고접수">
                    <ReportPage/>
                  </Tab>
                  <Tab eventKey="qa" title="Q&A">
                    <AdminQAList/> 
                  </Tab>
             </Tabs>
        </Col>
        
    </Row>    
  )
}


export default Question