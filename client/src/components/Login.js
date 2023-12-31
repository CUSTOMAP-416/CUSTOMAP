import { useEffect, useContext, useState } from "react";
import AuthStoreContextProvider from "../auth_store";
import { Link } from "react-router-dom";
import "../styles/Login.css"
import mapdot from "../assets_img/login_mapWp.svg";

export default function Login() {
  const { auth_store } = useContext(AuthStoreContextProvider);

  //function to handle the login process
  const onLogin = (state) => {
    auth_store.onLogin(state);
  };

  //Stores the email input.
  const [email, setEmail] = useState("");

  //Stores the password input.
  const [password, setPassword] = useState("");

  //Handle changes to the email input field.
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  //Handle changes to the password input field.
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const [errorMessage, setErrorMessage] = useState("");

  // Handles the login button click.
  const handleLoginSubmit = async () => {
    const state = {
      email: email,
      password: password,
    };

    await onLogin(state); 
    checkLoginStatus();
  };

  const checkLoginStatus = () => {
    if (!auth_store.loggedIn) {
      setErrorMessage(auth_store.errorMessage);
    }
  };

  // auth_store 상태 변화 감지
  useEffect(() => {
    if (!auth_store.loggedIn) {
      setErrorMessage(auth_store.errorMessage);
    }
  }, [auth_store.loggedIn, auth_store.errorMessage]);

  return (
    <div className="loginall">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Changa+One&display=swap');
      </style>
      <div className="log_left">
        <h1 className="welcome">WELCOME BACK!</h1>
        <h2 className="smallWelcome">Login to your account</h2>
        <h3>Email</h3>
        <input
          id="logemail"
          className="log_input"
          data-cy="log_email"
          name="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        ></input>
        <h3>Password</h3>
        <input
          className="log_input"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        ></input>
        <div className="forgetPassw">
          <Link
            className="forgetText"
            to="/ForgetPassword/"
          >
            Forgot Password?
          </Link>
        </div>
        {errorMessage && (
          <p className="error-message" style={{ color: "red" }}>
            {errorMessage}
          </p>
        )}
        <div className="buttons">
          <button className="signin" onClick={() => handleLoginSubmit()}>
            Log in
          </button>
          <Link className="signup" to="/SignUp/">
            Sign Up{" "}
          </Link>
        </div>
      </div>
      <div className="log_right">
        <img className="mapdot" src={mapdot} alt="My SVG" />
      </div>
    </div>
  );
}
