import React, { useState } from 'react'
import { useUserDetails } from '../contexts/UserContextProvider';
import { useCurrentPage } from '../contexts/CurrentPageProvider';
import { apiRequest } from '../lib/apiRequest';
import { FIREBASE_ENABLE } from '../lib/constants';
import { firestoreRequest } from '../lib/firebaseHelper';


const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && object.hasOwnProperty(key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
}


export default function CreateEditUser() {
    const { userDetails } = useUserDetails();
    const isEditUser = Boolean(userDetails.email);
    const { setCurrentPage } = useCurrentPage();
    const [userInfo, setUserInfo] = useState(userDetails);

    const handleChange = (event) => {
        const { name = '', value = '' } = event?.target || {};
        if (['firstName', 'lastName'].includes(name))
            return setUserInfo({ ...userInfo, name: { ...userInfo.name, [name]: value } });

        if (['city', 'state', 'pincode'].includes(name))
            return setUserInfo({ ...userInfo, address: { ...userInfo.address, [name]: value } });

        setUserInfo({ ...userInfo, [name]: value });

    }

    const saveUserByEmail = async (email, userInfo) => {
        const { id, ...restUserInfo } = userInfo;
        const requestMethod = FIREBASE_ENABLE ? firestoreRequest : apiRequest;
        const response = await requestMethod({ api: isEditUser ? 'updateUser' : 'createUser', urlAppend: isEditUser ? `?email=${email}` : '', content: restUserInfo, extraContent: { id } });
        return response;
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email } = userInfo;
        if (!email) return;
        const _user = pick(userInfo, ['email', 'name', 'address', 'designation', 'dob', 'gender', 'interests', 'phone', 'id']);
        _user.address.pincode = `${_user.address.pincode}`;
        const success = await saveUserByEmail(email, _user);
        if (success) {
            setCurrentPage('list');
        }
    }

    return (
        <div className="form-container" >
            <form onSubmit={handleSubmit}>
                <input className="form-input" name="firstName" type="text" value={userInfo.name.firstName} onChange={handleChange} placeholder="First Name" required />
                <input className="form-input" name="lastName" type="text" value={userInfo.name.lastName} onChange={handleChange} placeholder="Last Name" required />
                <input className="form-input" name="email" type="email" value={userInfo.email} onChange={handleChange} placeholder="Email" required />
                <input className="form-input" name="phone" type="tel" value={userInfo.phone} onChange={handleChange} placeholder="Phone" />
                <div className="form-input--dob">
                    <label htmlFor="dob">Date of Birth</label>
                    <input id="dob" className="form-input" name="dob" type="date" value={userInfo.dob ? userInfo.dob.slice(0, 10) : ''} onChange={handleChange} />
                </div>
                <input className="form-input" name="city" type="text" value={userInfo.address?.city || ''} onChange={handleChange} placeholder="City" required />
                <input className="form-input" name="state" type="text" value={userInfo.address?.state || ''} onChange={handleChange} placeholder="State" required />
                <input className="form-input" name="pincode" type="text" value={`${userInfo.address?.pincode || ''}`} onChange={handleChange} placeholder="Pin Code" required />

                <div className="radio">
                    <span className="radio-label">Gender</span>
                    <label>
                        <input
                            type="radio"
                            value="male"
                            checked={userInfo.gender === "male"}
                            onChange={handleChange}
                            name="gender"
                        />
                        Male
                </label>
                    <label>
                        <input
                            type="radio"
                            value="female"
                            checked={userInfo.gender === "female"}
                            onChange={handleChange}
                            name="gender"
                        />
                        Female
                </label>
                    <label>
                        <input
                            type="radio"
                            value="other"
                            checked={userInfo.gender === "other"}
                            onChange={handleChange}
                            name="gender"
                        />
                        Other
                        </label>
                </div>
                <input className="form-input" name="designation" type="text" onChange={handleChange} value={userInfo.designation} placeholder="Designation" />
                <button className="form--submit" type="submit">Submit</button>
            </form>
        </div>
    )
}
