import React from 'react'
import { useCurrentPage } from '../contexts/CurrentPageProvider';
import { useUserDetails } from '../contexts/UserContextProvider';
import { apiRequest } from '../lib/apiRequest';
import { FIREBASE_ENABLE } from '../lib/constants';
import { firestoreRequest } from '../lib/firebaseHelper';

const getFormattedDateFromIsoString = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return `${dt}/${month}/${year}`;
}


export default function UserCard(props) {
    const { user = {}, counter, refetch } = props;
    const { setCurrentPage } = useCurrentPage();
    const { setUserDetails } = useUserDetails();
    const { name = {}, dob, address = {}, email = '', phone = '', designation = '', _id, id } = user;
    const { firstName = '', lastName = '' } = name;
    const { city = '', state = '', pincode = '' } = address;

    const formattedDate = getFormattedDateFromIsoString(dob);

    const handleEdit = () => {
        setUserDetails(user);
        setCurrentPage('form');
    }

    const handleDelete = async () => {
        const requestMethod = FIREBASE_ENABLE ? firestoreRequest : apiRequest;
        const response = await requestMethod({ api: 'deleteUser', urlAppend: _id || id, extraContent: { id } });
        if (response) {
            refetch(counter + 1)
        }
    }

    return (
        <div className="card">
            <div className="container">
                <h4><b>{`${firstName} ${lastName}`.toUpperCase()}</b></h4>
                <p>Designation: {designation || 'NA'}</p>
                <p>Email: {email}</p>
                <p>Phone: {phone}</p>
                <p>Address: {`${city}, ${state} - ${pincode}`}</p>
                <p>Date of birth: {formattedDate}</p>
                <button className="card--button card--button__edit" onClick={handleEdit}>edit</button>
                <button className="card--button card--button__delete" onClick={handleDelete}>detee user</button>
            </div>
        </div>
    )
}
