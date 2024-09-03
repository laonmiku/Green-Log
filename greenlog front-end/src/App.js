import './App.css';
import { Container } from 'react-bootstrap';
import Menupage from './common/home/Menupage';
import { UserContext } from './components/user/UserContext'; // UserProvider 가져오기
import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
    const [userData, setUserData] = useState({
        auth: null,
        img: null,
        uname: null,
        nickname: null
    });
    const UserAPI=async()=>{
        const user_uid=sessionStorage.getItem('uid')
        const res2= await axios.get(`/user/read/${user_uid}`)
        setUserData({auth:res2.data.user_auth, img:res2.data.user_img, uname:res2.data.user_uname, nickname:res2.data.user_nickname, uuid:res2.data.user_uid})
    }

    useEffect(()=>{UserAPI()},[])

    return (
        <UserContext.Provider value={{userData,setUserData}}>
            <Container>
                <Menupage />
            </Container>
        </UserContext.Provider>
    );
}

export default App;
