import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../auth_store';
import { Link } from "react-router-dom";

export default function Login(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    //function to handle the login process 
    const onLogin = (state) => {
        auth_store.onLogin(state)
    }

    //function to handle open the sign-up screen 
    const openSignUp = () => {
        auth_store.openSignUp()
    }

    //function to handle open forgot password screen 
    const openForgotPassword = () => {
        auth_store.openForgotPassword()
    }

    //Stores the email input.
    const [email, setEmail] = useState('');

    //Stores the password input.
    const [password, setPassword] = useState('');

    //Handle changes to the email input field.
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    //Handle changes to the password input field. 
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    //Handles the login button click. 
    const handleLoginSubmit = () => {
        const state = {
            email: email,
            password: password,
        }
        onLogin(state)
    }

    return (
        <div>
            <h2>Email</h2>
            <input type="text" value={email} onChange={handleEmailChange}></input>
            <h2>Password</h2>
            <input type="text" value={password} onChange={handlePasswordChange}></input>
            <Link to='/Dashboard/' onClick={() => handleLoginSubmit()}>Log in</Link>
            <Link to='/ForgetPassword/' onClick={() => openForgotPassword()}>Forgot Password?</Link>
            <Link to='/SignUp/' onClick={() => openSignUp()}>Sign Up </Link>
        </div>
        )
}