import { useContext } from 'react';
import AuthStoreContextProvider from '../auth_store';
import { Link } from "react-router-dom";
import "../styles/AppBanner.css";
import icon from "../assets_img/icon.svg";

export default function AppBanner() {
  const { auth_store } = useContext(AuthStoreContextProvider);

  //function to handle open the home screen
  const openHome = () => {
    auth_store.openHome()
  }
  //function to handle open the my page screen
  const openMyPage = () => {
    auth_store.openMyPage()
  }
  //Handles user login button click.
  const handleLogin = () => {
     //function to handle open the login screen
    auth_store.openLogin()
  }
 //Handles user logout button click.
  const handleLogout = () => {
    //function to handle the logout process
    auth_store.onLogout()
  }

  return (
    <div className="banner">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Changa+One&display=swap');
      </style>
      <div className="flexbox">
        <div>
          <img className="icon" src={icon} alt="My SVG" />
        </div>
        <div className="logo">CUSTOMAP</div>
        <div className="links">
          <div>
            <Link
              to="/"
              style={{ color: "white", textDecoration: "none" }}
              onClick={() => openHome()}
            >
              Home{" "}
            </Link>
          </div>
          {auth_store.loggedIn ? (
            <div>
              <Link
                to="/Dashboard/"
                style={{ color: "white", textDecoration: "none" }}
                onClick={() => openMyPage()}
              >
                MyPage{" "}
              </Link>
            </div>
          ) : (
            <div></div>
          )}

          {auth_store.loggedIn ? (
            <div>
              {/* <div style ={{ marginRight:"10px" }}>{auth_store.user.username}</div> */}
              <Link
                to="/"
                className="login"
                style={{ color: "white", textDecoration: "none" }}
                onClick={() => handleLogout()}
              >
                Sign out
              </Link>
            </div>
          ) : (
            <div>
              <Link
                to="/login/"
                className="login"
                style={{ color: "white", textDecoration: "none" }}
                onClick={() => handleLogin()}
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
