import React, { createContext, useState, useContext } from 'react';

const CurrentPageContext = createContext({});

const CurrentPageContextProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState('list');
    return (
        <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </CurrentPageContext.Provider>
    )
}

export default CurrentPageContextProvider;

export const useCurrentPage = () => useContext(CurrentPageContext);
