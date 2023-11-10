import { useContext } from 'react';
import AuthStoreContextProvider from '../auth_store';
import Dashboard from './Dashboard';

export default function Main() {
    const { auth_store } = useContext(AuthStoreContextProvider);
    console.log("Main auth_store.loggedIn: " + auth_store.loggedIn);
    
    if (auth_store.loggedIn)
        return <Dashboard />
    else
        return  <p>CUSTOMAP</p>

}