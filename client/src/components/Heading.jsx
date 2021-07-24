import React from 'react'
import { useCurrentPage } from '../contexts/CurrentPageProvider'
import { useUserDetails } from '../contexts/UserContextProvider';

export default function Heading({ title = 'USER CRUD APP' }) {
    const { setCurrentPage } = useCurrentPage();
    const { setUserDetails } = useUserDetails();

    const handleCreate = () => {
        setUserDetails({ name: {}, address: {}, interests: [] });
        setCurrentPage('form');
    }

    return (
        <header>
            <span onClick={() => setCurrentPage('list')}>{title}</span>
            <button onClick={handleCreate}>Add User</button>
        </header>
    )
}
