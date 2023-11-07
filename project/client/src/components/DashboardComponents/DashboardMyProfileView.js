import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../../auth_store';

export default function DashboardMyProfileView(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    //user data.
    const user = auth_store.user
    //function to handle the change Information process 
    const updateUser = (state) => {
        auth_store.updateUser(state)
    }

    //Stores the name input. 
    const [name, setName] = useState([]);
    //Stores the phone input. 
    const [phone, setPhone] = useState([]);
    //Stores the change password input. 
    const [changePassword, setChangePassword] = useState([]);
    //Stores the confirm password input. 
    const [confirmPassword, setConfirmPassword] = useState([]);

    //Handle changes to the name input field. 
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    //Handle changes to the phone input field. 
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    }
    //Handle changes to the change password input field. 
    const handleChangePasswordChange = (event) => {
        setChangePassword(event.target.value);
    }
    //Handle changes to the confirm password input field. 
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }
    //Handles the Change Information button click. 
    const handleChangeInformation = () => {
        const state = {
            name: name,
            phone: phone,
            newPassword: changePassword,
            newPasswordAgain: confirmPassword,
        }
        updateUser(state)
    }

    return (
        <div>
            <h2>Name</h2>
            <input type="text" value={name} onChange={handleNameChange}></input>
            <h2>Phone</h2>
            <input type="text" value={phone} onChange={handlePhoneChange}></input>
            <h2>Change Password</h2>
            <input type="text" value={changePassword} onChange={handleChangePasswordChange}></input>
            <h2>Confirm Password</h2>
            <input type="text" value={confirmPassword} onChange={handleConfirmPasswordChange}></input>
            <button type="button" onClick={() => handleChangeInformation()}>Change Information</button>
        </div>
        )
}