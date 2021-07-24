import React, { useState, useEffect } from 'react'
import UserCard from '../components/UserCard'
import { apiRequest } from '../lib/apiRequest';
import { FIREBASE_ENABLE } from '../lib/constants';
import { firestoreRequest } from '../lib/firebaseHelper';

const fetchUsers = async () => {
    const requestMethod = FIREBASE_ENABLE ? firestoreRequest : apiRequest;
    const response = await requestMethod({ api: 'fetchUsers' });
    return response || [];
}

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [counter, refetch] = useState(1);

    useEffect(async () => {
        const _users = await fetchUsers();
        setUsers(_users);
    }, [counter]);

    return (
        <main>
            {users.map(user => <UserCard key={user._id} user={user} counter={counter} refetch={refetch} />)}
        </main>
    )
}
