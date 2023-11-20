import { useEffect, useContext, useState } from "react";
import AuthStoreContextProvider from '../auth_store';
import "../styles/ForgetPassword.css";
import logo from "../assets_img/forgetP_logo.svg";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword(){
  const { auth_store } = useContext(AuthStoreContextProvider);
  const [passInfo, setPassInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth_store.errorMessage) {
      setErrorMessage(auth_store.errorMessage);
    }
    //checking state for login
  }, [auth_store.errorMessage]);
  useEffect(() => {
    if (auth_store.successMessage === "ForgetSuccess") {
      setErrorMessage("");
      setPassInfo(true);
    }
    if(auth_store.successMessage === "Changed User Info"){
      console.log(0)
      navigate("/login/");
    }
    //checking state for login
  }, [auth_store.successMessage]);

  //function to handle change password process
  const updateUser = (state) => {
    auth_store.updateUser(state);
  };
  
  const onVerification = (state) => {
    auth_store.onVerification(state)
  };

  //Stores the Name input.
  const [name, setName] = useState("");
  //Stores the email input.
  const [email, setEmail] = useState("");
  //Stores the phone input.
  const [phone, setPhone] = useState("");
  //Stores the new password input.
  const [newPassword, setNewPassword] = useState("");
  //Stores the new password again input.
  const [newPasswordAgain, setNewPasswordAgain] = useState("");

  //Handle changes to the Name input field.
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  //Handle changes to the email input field.
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  //Handle changes to the phone input field.
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  //Handle changes to the new password input field.
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };
  //Handle changes to the new password again input field.
  const handleNewPasswordAgainChange = (event) => {
    setNewPasswordAgain(event.target.value);
  };
  //Handles the Verification button click.
  const handleVerification = () => {
    const state = {
      username: name,
      email: email,
      phone: phone,
    };
    // console.log(state)
    onVerification(state);
  };
  //Handles the change password button click.
  const handleChangePassword = () => {
    if(newPassword.length < 8){
      setErrorMessage("Please enter a password of at least 8 characters")
      return ''
    }
    if(newPassword === newPasswordAgain){
      const state = {
        name: name,
        email: email,
        phone: phone,
        password: newPassword,
      };
      updateUser(state);
    }
    else{
      setErrorMessage("The new password does not match.");
    }
  };

  const Verification = (
    <div className="forgetAll">
      <div className="bodys">
        <div className="forget_left">
          <h2>Name</h2>
          <h2>Email</h2>
          <h2>Phone</h2>
        </div>
        <div className="forget_right">
          <div>
            <input
              className="f_input"
              type="text"
              value={name}
              onChange={handleNameChange}
            ></input>
          </div>
          <div>
            <input
              className="f_input"
              type="text"
              value={email}
              onChange={handleEmailChange}
            ></input>
          </div>
          <div>
            <input
              className="f_input"
              type="text"
              value={phone}
              onChange={handlePhoneChange}
            ></input>
          </div>
        </div>
      </div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <div>
        <button
          className="forget_verif"
          type="button"
          onClick={() => handleVerification()}
        >
          Verification
        </button>
      </div>
    </div>
  );

  const ChangePassword = (
    <div className="forgetAll">
      <div className="bodys">
        <div className="forget_left">
          <h2>New Password</h2>
          <h2>New Password Again</h2>
        </div>
        <div className="forget_right">
          <div>
            <input
              className="f_input"
              type="text"
              value={newPassword}
              onChange={handleNewPasswordChange}
            ></input>
          </div>
          <div>
            <input
              className="f_input"
              type="text"
              value={newPasswordAgain}
              onChange={handleNewPasswordAgainChange}
            ></input>
          </div>
        </div>
      </div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <div>
        <button
          className="chage_pass"
          type="button"
          onClick={() => handleChangePassword()}
        >
          Change Password
        </button>
      </div>
    </div>
  );
  // const modalVeri = (
  //   <div id="modal">
  //     <div className="modal-content">
  //       <div>
  //         <h2>WARNING</h2>
  //       </div>
  //       <div className="modalbody">
  //         <p className="empty">.</p>
  //         <p>
  //           Input information does not match the system Verification Failure
  //         </p>
  //       </div>
  //       <div className="modalfoot">
  //         <button id="close-modal">Try again</button>
  //       </div>
  //     </div>
  //   </div>
  // );
  // const modalTwo = (
  //   <div id="modal">
  //     <div className="modal-content">
  //       <div>
  //         <h2>WARNING</h2>
  //       </div>
  //       <div className="modalbody">
  //         <p className="empty">.</p>
  //         <p>2 new passwords doesn’t match Please try again</p>
  //       </div>
  //       <div className="modalfoot">
  //         <button id="close-modal">Try again</button>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Changa+One&family=DM+Sans:opsz,wght@9..40,300;9..40,600;9..40,900&display=swap');
      </style>
      <div className="head">
        <img className="logo" src={logo} alt="My SVG" />
        <h1>Forget Password</h1>
      </div>
      {passInfo ? <>{ChangePassword}</> : <>{Verification}</>}
    </div>
  );
}