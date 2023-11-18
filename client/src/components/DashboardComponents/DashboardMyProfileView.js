import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../../auth_store';
import "../../styles/DashboardMyProfileView.css";

export default function DashboardMyProfileView(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    //user data.
    const user = auth_store.user
    //function to handle the change Information process 
    const updateUser = (state) => {
        auth_store.updateUser(state)
    }

    //Stores the name input. 
    const [username, setUsername] = useState(auth_store.user.username);
    //Stores the phone input. 
    const [email, setEmail] = useState(auth_store.user.email);
    //Stores the phone input. 
    const [phone, setPhone] = useState(auth_store.user.phone);
    //Stores the name input. 
    const [name, setName] = useState(auth_store.user.name);
    //Stores the change password input. 
    const [changePassword, setChangePassword] = useState('********');
    //Stores the confirm password input. 
    const [confirmPassword, setConfirmPassword] = useState('********');

    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    }
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
        const state = {
            name: name,
            phone: phone,
            newPassword: changePassword,
            newPasswordAgain: confirmPassword,
        }
        updateUser(state)
    }

    return (
      <div className="myprofile_all">
        <div className="myprofile_H">My Profile</div>
        <div className="profi_bottoms">
          <div className="profi_content">
            <div className="profile_left">
              <h2>Username</h2>
              <h2>Email</h2>
              <h2>Phone</h2>
              <h2>Name</h2>
              <h2>Change Password</h2>
              <h2>Confirm Password</h2>
            </div>

            <div className="profile_right">
              <div>
                <input
                  type="text"
                  className="profile_input"
                  value={username}
                  onChange={handleUsernameChange}
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  className="profile_input"
                  value={email}
                  onChange={handleEmailChange}
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
                  value={name}
                  onChange={handleNameChange}
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