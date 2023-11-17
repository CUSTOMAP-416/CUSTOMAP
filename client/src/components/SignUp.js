import { useEffect, useContext, useState } from 'react';
import AuthStoreContextProvider from '../auth_store';
import { Link } from "react-router-dom";
import "../styles/SignUp.css";
import logo from "../assets_img/signup_logo.svg";
import { useNavigate } from "react-router-dom";

export default function SignUp(){
    const { auth_store } = useContext(AuthStoreContextProvider);
    const navigate = useNavigate();

    //function to handle the sign-up process 
    const onSignUp = (state) => {
        auth_store.createUser(state)
    }

    useEffect(() => {
      if (auth_store.loggedIn) {
        navigate("/Dashboard/");
      }
      //checking state for login
    }, [auth_store.loggedIn]);

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
    //Handle error message
    const [errMessage, setErrMessage] = useState('');

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
    const handleCreateAccount = async() => {
      try{
        const state = {
            id: ID,
            password: password,
            passwordVerify: passwordVerify,
            name: name,
            email: email,
            phone: phone,
        }
        onSignUp(state)
      } catch(error){
        alert("User information not enough")
      }
      
    }

    return (
      <div className="inup">
        <div className="head">
          <img className="logo" src={logo} alt="My SVG" />
          <h1>Make New Account</h1>
        </div>
        <div className="bodys">
          <div className="leftText">
            <h2>ID</h2>
            <h2>Password</h2>
            <h2>Password Verify</h2>
            <h2>Name</h2>
            <h2>Email</h2>
            <h2>Phone</h2>
          </div>
          <div className="rightBox">
            <div>
              <input
                className="signup_input"
                type="text"
                value={ID}
                onChange={handleIDChange}
              ></input>
            </div>
            <div>
              <input
                className="signup_input"
                type="text"
                value={password}
                onChange={handlePasswordChange}
              ></input>
            </div>
            <div>
              <input
                className="signup_input"
                type="text"
                value={passwordVerify}
                onChange={handlePasswordVerifyChange}
              ></input>
            </div>
            <div>
              <input
                className="signup_input"
                type="text"
                value={name}
                onChange={handleNameChange}
              ></input>
            </div>
            <div>
              <input
                className="signup_input"
                type="text"
                value={email}
                onChange={handleEmailChange}
              ></input>
            </div>
            <div>
              <input
                className="signup_input"
                type="text"
                value={phone}
                onChange={handlePhoneChange}
              ></input>
            </div>
          </div>
        </div>
        <div>
          <Link
            className="createB"
            //to="/Dashboard/"
            onClick={() => handleCreateAccount()}
          >
            Create Account
          </Link>
        </div>
      </div>
    );
}