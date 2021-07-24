import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState({ name: {}, address: {}, interests: [] });
    return (
        <UserContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider

export const useUserDetails = () => useContext(UserContext);
