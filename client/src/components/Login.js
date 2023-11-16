import { useEffect, useContext, useState } from "react";
import AuthStoreContextProvider from "../auth_store";
import { Link } from "react-router-dom";
import "../styles/Login.css"
import mapdot from "../assets_img/login_mapWp.svg";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { auth_store } = useContext(AuthStoreContextProvider);

  useEffect(() => {
    if (auth_store.loggedIn) {
      navigate("/Dashboard/");
    }
    //checking state for login
  }, [auth_store.loggedIn]);

  const navigate = useNavigate();
  //function to handle the login process
  const onLogin = (state) => {
    auth_store.onLogin(state);
  };

  //function to handle open the sign-up screen
  const openSignUp = () => {
    auth_store.openSignUp();
  };

  //function to handle open forgot password screen
  const openForgotPassword = () => {
    auth_store.openForgotPassword();
  };

  //Stores the email input.
  const [email, setEmail] = useState("");

  //Stores the password input.
  const [password, setPassword] = useState("");

  const [ready, setReady] = useState(false);

  //Handle changes to the email input field.
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  //Handle changes to the password input field.
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const [errorMessage, setErrorMessage] = useState("");
  console.log(auth_store);
  // Handles the login button click.
  const handleLoginSubmit = () => {
    const state = {
      email: email,
      password: password,
    };
    onLogin(state);

    if(!auth_store.loggedIn){
      setErrorMessage(
        "You are not the user or your email and password do not match."
      );
    }
  };


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
            onClick={() => openForgotPassword()}
          >
            Forgot Password?
          </Link>
        </div>
        {errorMessage && <p className="error-message" style={{color:"red"}}>{errorMessage}</p>}
        <div className="buttons">
          <button className="signin" onClick={() => handleLoginSubmit()}>Log in</button>
          <Link className="signup" to="/SignUp/" onClick={() => openSignUp()}>
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
