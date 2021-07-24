import React from 'react'
import Heading from '../components/Heading'
import UserList from './UserList'
import CreateEditUser from './CreateEditUser';
import { useCurrentPage } from '../contexts/CurrentPageProvider';
import UserContextProvider from '../contexts/UserContextProvider';

export default function UserDetailsContainer() {
    const { currentPage } = useCurrentPage();

    return (
        <UserContextProvider>
            <Heading />
            {
                currentPage === 'list' ? <UserList /> : <CreateEditUser />
            }
        </UserContextProvider>
    )
}
