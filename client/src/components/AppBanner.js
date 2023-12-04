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
        <div className='logo-cotainer'>
          <div className="logo">CUSTOMAP</div>
        </div>
        
        <div className="links">
          <div id="banner-home" onClick={() => openHome()}>
            <Link
              id="banner-home"
              className="banner-button"
              typle="button"
              to="/"
              style={{ color: "white", textDecoration: "none" }}
              onClick={() => openHome()}
            >
              Home{" "}
            </Link>
          </div>

          {auth_store.loggedIn ? (
            auth_store.user.role == "admin" ?
              <div id="banner-mypage" onClick={() => openMyPage()}>
                <Link
                  id="banner-mypage"
                  className="banner-button"
                  type="button"
                  to="/AdminDashboard/"
                  style={{ color: "white", textDecoration: "none" }}
                  onClick={() => openMyPage()}
                >
                  MyPage{" "}
                </Link>
              </div>
              :<div id="banner-mypage"  onClick={() => openMyPage()}>
                <Link
                  className="banner-button"
                  id="banner-mypage"
                  type="button"
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
            <div className="login-container">
              {/* <div style ={{ marginRight:"10px" }}>{auth_store.user.username}</div> */}
              <Link
                type="button"
                to="/"
                className="login"
                style={{ color: "white", textDecoration: "none" }}
                onClick={() => handleLogout()}
              >
                Sign out
              </Link>
            </div>
          ) : (
            <div className="login-container">
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
