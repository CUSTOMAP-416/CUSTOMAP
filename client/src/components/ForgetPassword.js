import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../auth_store';

export default function ForgetPassword(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    //function to handle change password process 
    const updateUser = (state) => {
        auth_store.updateUser(state)
    }
    //function to handle verification process 
    const onVerification = (state) => {
        auth_store.onVerification(state)
    }

    //Stores the ID input. 
    const [ID, setID] = useState('');
    //Stores the email input. 
    const [email, setEmail] = useState('');
    //Stores the phone input. 
    const [phone, setPhone] = useState('');
    //Stores the new password input. 
    const [newPassword, setNewPassword] = useState('');
    //Stores the new password again input. 
    const [newPasswordAgain, setNewPasswordAgain] = useState('');

    //Handle changes to the ID input field. 
    const handleIDChange = (event) => {
        setID(event.target.value);
    }
    //Handle changes to the email input field. 
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    //Handle changes to the phone input field. 
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    }
    //Handle changes to the new password input field. 
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    }
    //Handle changes to the new password again input field. 
    const handleNewPasswordAgainChange = (event) => {
        setNewPasswordAgain(event.target.value);
    }
    //Handles the Verification button click. 
    const handleVerification = () => {
        const state = {
            ID: ID,
            email: email,
            phone: phone
        }
        onVerification(state)
    }
    //Handles the change password button click. 
    const handleChangePassword = () => {
        const state = {
            newPassword: newPassword,
            newPasswordAgain: newPasswordAgain
        }
        updateUser(state)
    }

    const Verification = 
        <div className="inup">
            <h2>ID</h2>
            <input type="text" value={ID} onChange={handleIDChange}></input>
            <h2>Email</h2>
            <input type="text" value={email} onChange={handleEmailChange}></input>
            <h2>Phone</h2>
            <input type="text" value={phone} onChange={handlePhoneChange}></input>
            <button type="button" onClick={() => handleVerification()}>Verification</button>
        </div>

    const ChangePassword = 
        <div className="inup">
            <h2>New Password</h2>
            <input type="text" value={newPassword} onChange={handleNewPasswordChange}></input>
            <h2>New Password Again</h2>
            <input type="text" value={newPasswordAgain} onChange={handleNewPasswordAgainChange}></input>
            <button type="button" onClick={() => handleChangePassword()}>Change Password</button>
        </div>

    return Verification
}