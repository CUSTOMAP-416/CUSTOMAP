import { useContext } from 'react';
import AuthStoreContextProvider from '../auth_store';
import { Link } from "react-router-dom";

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
    <div>
        <p>CUSTOMAP </p>
        <Link to='/Dashboard/' onClick={() => openHome()}>Home </Link>
        <Link to='/Dashboard/' onClick={() => openMyPage()}>MyPage </Link>
        {auth_store.loggedIn 
        ? <div>
            <p>{auth_store.user.username}</p>
            <Link to='/'onClick={() => handleLogout()}>Sign out</Link>
          </div>
        : <Link to='/login/' onClick={() => handleLogin()}>Sign in</Link>}
    </div>
  );
}
