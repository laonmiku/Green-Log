import React from 'react'
import { NavLink } from "react-router-dom";
import SidebarItem from "./SidebarItem";


const Sidebar = () => {
    const menus = [
        { name: "대시보드", path: "/admin/dash" },
        { name: "사용자관리", path: "/admin/list.json" },
        { name: "씨드월렛관리", path: "/admin/seed/list.json"},
        { name: "씨드내역관리", path: "/trade/admin/list.json"},
        { name: "피망몰이용내역관리", path: "/auction/admin/list.json"},
        { name: "1:1/신고접수/Q&A", path: "/admin/question#notice"},
        { name: "FAQ", path: "/community/faq/list.json"},
        { name: "공지사항", path: "/community/notice/list.json"}
      ];
  return (
    <div>
        {menus.map((menu, index)=>
            <NavLink
            exact
            style={{color: "gray", textDecoration: "none"}}
            to={menu.path}
            key={index}
            activeStyle={{color: "black"}}>
                <SidebarItem menu={menu}/> 
            </NavLink>
            
        )}
    </div>
  )
}

export default Sidebar