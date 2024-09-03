import React, { createContext, useState, useContext } from 'react';

const UserContext = () => {
    const UserContext = createContext({
        userInfo: null,
        setUserInfo: () => { }
    });
    return (
        <div>UserContext</div>
    )
}

export default UserContext