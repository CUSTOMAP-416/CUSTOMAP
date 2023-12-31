import { useContext, useEffect } from 'react';
import AuthStoreContextProvider from '../auth_store';
import { Link } from "react-router-dom";
import "../styles/AppBanner.css";
import icon from "../assets_img/icon.svg";
import { useNavigate } from "react-router-dom";

export default function AppBanner() {
  const { auth_store } = useContext(AuthStoreContextProvider);
 //Handles user logout button click.
  const handleLogout = () => {
    //function to handle the logout process
    auth_store.onLogout()
  }

  const navigate = useNavigate();
  useEffect(() => {
    auth_store.successMessage = null
    if (auth_store.loggedIn) {
      if(auth_store.user.role === "admin"){
        auth_store.getAllUsers()
        auth_store.getAllMaps()
        navigate("/AdminDashboard/");
      }
      else{
        navigate("/Dashboard/");
      }
    }
    //checking state for login
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth_store.loggedIn]);

  useEffect(() => {
    if(!auth_store.user){
      navigate("/");
    }
    auth_store.session()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <Link
              id="banner-home"
              className="banner-button"
              typle="button"
              to="/"
              style={{ color: "white", textDecoration: "none" }}
            >
              Home{" "}
            </Link>
          {auth_store.loggedIn ? (
            auth_store.user.role === "admin" ?
                <Link
                  id="banner-mypage"
                  className="banner-button"
                  type="button"
                  to="/AdminDashboard/"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  MyPage{" "}
                </Link>
              :
                <Link
                  className="banner-button"
                  id="banner-mypage"
                  type="button"
                  to="/Dashboard/"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  MyPage{" "}
                </Link>
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
                SignOut
              </Link>
            </div>
          ) : (
            <div className="login-container">
              <Link
                to="/login/"
                className="login"
                style={{ color: "white", textDecoration: "none" }}
              >
                SignIn
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
