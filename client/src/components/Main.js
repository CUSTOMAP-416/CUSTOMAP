import { useContext } from 'react';
import AuthStoreContextProvider from '../auth_store';
import Dashboard from './Dashboard';
import image from "./MainWelcome.png"

export default function Main() {
    const { auth_store } = useContext(AuthStoreContextProvider);
    console.log("Main auth_store.loggedIn: " + auth_store.loggedIn);
    const imageStyle = {
        width: '100%',
        height: '90%',
        objectFit: 'cover', // Cover the container without stretching
        position: 'absolute',
        top: '56%',
        left: '50%',
        transform: 'translate(-50%, -50%)' // Center the image
      };
       
    return <img id="welcome"src={image} alt="welcom to the customap" style={imageStyle} ></img>

}
