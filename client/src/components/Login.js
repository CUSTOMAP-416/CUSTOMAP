import { useContext, useState } from "react";
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

  //Handle changes to the email input field.
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  //Handle changes to the password input field.
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  //Handles the login button click.
  const handleLoginSubmit = () => {
    const state = {
      email: email,
      password: password,
    };
    onLogin(state);
  };

  return (
    <div className="loginall">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Changa+One&display=swap');
      </style>
      <div className="left">
        <h1 className="welcome">WELCOME BACK!</h1>
        <h2 className="smallWelcome">Login to your account</h2>
        <h3>Email</h3>
        <input
          id="logemail"
          data-cy="log_email"
          name="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        ></input>
        <h3>Password</h3>
        <input
          className="log_passw"
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
        <div className="buttons">
          <Link
            className="signin"
            to="/Dashboard/"
            onClick={() => handleLoginSubmit()}
          >
            Log in
          </Link>
          <Link className="signup" to="/SignUp/" onClick={() => openSignUp()}>
            Sign Up{" "}
          </Link>
        </div>
      </div>
      <div className="right">
        <img className="mapdot" src={mapdot} alt="My SVG" />
      </div>
    </div>
  );
}
