import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const StyledTabs = styled(Tabs)`
  .MuiTabs-flexContainer {
    justify-content: center;
  }

  .MuiTab-root {
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
    font-size: 1rem;
    text-transform: none;
  }

  .MuiTab-root.Mui-selected {
    background-color: initial; /* 배경 색 초기화 */
    color: initial !important; /* 글자 색 초기화 */
    font-weight: bold;
  }

  .MuiTab-root:hover {
    background-color: initial; /* 호버 배경 색 초기화 */
    color: initial; /* 호버 글자 색 초기화 */
  }

  .MuiTabs-indicator {
    display: none;
  }

  .header-container {
    text-align: center;
    margin-bottom: 20px;
  }

  .header-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const HeaderTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabSelect = (event, newValue) => {
    if (newValue === 'faq') {
      navigate('/community/faq/list.json');
    } else if (newValue === 'notice') {
      navigate('/community/notice/list.json');
    } else {
      navigate('/community/qa/list.json');
    }
  };

  const getDefaultTab = () => {
    if (location.pathname.includes('/community/faq')) {
      return 'faq';
    } else if (location.pathname.includes('/community/notice')) {
      return 'notice';
    }
    return 'qa';
  };

  return (
    <div className="header-container">
      <StyledTabs
        value={getDefaultTab()}
        onChange={handleTabSelect}
        variant="fullWidth"
        centered
      >
        <Tab label="NOTICE" value="notice" />
        <Tab label="FAQ" value="faq" />
        <Tab label="Q&A" value="qa" />
      </StyledTabs>
    </div>
  );
};

export default HeaderTabs;
