import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../../auth_store';
import "../../styles/DashboardMyProfileView.css";

export default function DashboardMyProfileView(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    //user data.
    const user = auth_store.user
    console.log("auth_store.user ", auth_store.user);
    //function to handle the change Information process 
    const updateUser = (state) => {
        auth_store.updateUser(state)
    }

    //Stores the phone input. 
    const [email, setEmail] = useState(auth_store.user.email);
    //Stores the phone input. 
    const [phone, setPhone] = useState(auth_store.user.phone);
    //Stores the name input. 
    const [name, setName] = useState(auth_store.user.username);
    //Stores the change password input. 
    const [changePassword, setChangePassword] = useState('********');
    //Stores the confirm password input. 
    const [confirmPassword, setConfirmPassword] = useState('********');

    const [errorMessage, setErrorMessage] = useState("");

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    }
    //Handle changes to the phone input field. 
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    }
    //Handle changes to the name input field. 
    const handleNameChange = (event) => {
      setName(event.target.value);
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
      console.log("Button clicked");
      if(changePassword === confirmPassword){
        setErrorMessage("");
        const state = {
            name: name,
            phone: phone,
            email: email,
            password: changePassword,
        }
        updateUser(state)
        alert("Success Changed!")
      }else{
        setErrorMessage("Please enter the same password twice.")
      }
      if(!(/^\d+$/.test(phone))){
        setErrorMessage("Phone number contains non-numeric characters.")
      }
      if(changePassword < 8){
        setErrorMessage("Please enter a password of at least 8 characters")
      }

    }

    return (
      <div className="myprofile_all">
        <div className="myprofile_H">My Profile</div>
        <div style={{color: "grey", paddingTop: "20px", paddingLeft: "10px"}}>User email cannot be changed</div>
        <div className="profi_bottoms">
          <div className="profi_content">
            <div className="profile_left">
              <h2>Name</h2>
              <h2>Email</h2>
              <h2>Phone</h2>

              <h2>Change Password</h2>
              <h2>Confirm Password</h2>
            </div>

            <div className="profile_right">
              <div>
              </div>
              <div>
                <input
                  type="text"
                  className="profile_input"
                  value={name}
                  onChange={handleNameChange}
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  className="profile_input"
                  value={email}
                  onChange={handleEmailChange}
                  disabled
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  className="profile_input"
                  value={phone}
                  onChange={handlePhoneChange}
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  className="profile_input"
                  value={changePassword}
                  onChange={handleChangePasswordChange}
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  className="profile_input"
                  s
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                ></input>
              </div>
            </div>
          </div>
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          <button
            className="changeInfo_btn"
            type="button"
            onClick={() => handleChangeInformation()}
          >
            Change Information
          </button>
        </div>
      </div>
    );
}