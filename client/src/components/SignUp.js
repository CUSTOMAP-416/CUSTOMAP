import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../auth_store';
import { Link } from "react-router-dom";

export default function SignUp(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    //function to handle the sign-up process 
    const onSignUp = (state) => {
        auth_store.createUser(state)
    }

    //Stores the ID input. 
    const [ID, setID] = useState('');
    //Stores the password input. 
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    //Stores the name input. 
    const [name, setName] = useState('');
    //Stores the email input. 
    const [email, setEmail] = useState('');
    //Stores the phone input. 
    const [phone, setPhone] = useState('');

    //Handle changes to the ID input field. 
    const handleIDChange = (event) => {
        setID(event.target.value);
    }
    //Handle changes to the password input field. 
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handlePasswordVerifyChange = (event) => {
        setPasswordVerify(event.target.value);
    }
    //Handle changes to the name input field. 
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    //Handle changes to the email input field. 
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    //Handle changes to the phone input field. 
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    }
    //Handle the create account button click. 
    const handleCreateAccount = () => {
        const state = {
            id: ID,
            password: password,
            passwordVerify: passwordVerify,
            name: name,
            email: email,
            phone: phone,
        }
        onSignUp(state)
    }

    return (
        <div className="inup">
            <h2>ID</h2>
            <input type="text" value={ID} onChange={handleIDChange}></input>
            <h2>Password</h2>
            <input type="text" value={password} onChange={handlePasswordChange}></input>
            <h2>Password Verify</h2>
            <input type="text" value={passwordVerify} onChange={handlePasswordVerifyChange}></input>
            <h2>Name</h2>
            <input type="text" value={name} onChange={handleNameChange}></input>
            <h2>Email</h2>
            <input type="text" value={email} onChange={handleEmailChange}></input>
            <h2>Phone</h2>
            <input type="text" value={phone} onChange={handlePhoneChange}></input>
            <Link to='/Dashboard/' onClick={() => handleCreateAccount()}>Create Account</Link>
        </div>
        )
}