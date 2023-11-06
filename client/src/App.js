import './App.css';
import { React } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthStoreContextProvider } from './auth_store';

import AppBanner from './components/AppBanner';
import Main from './components/Main';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgetPassword from './components/ForgetPassword';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
    return (
        <BrowserRouter>
            <AuthStoreContextProvider> 
                <div id="heading-banner">       
                    <AppBanner />
                </div>
                <Routes>
                    <Route path="/" element={<Main/>} />
                    <Route path="/login/" element={<Login/>} />
                    <Route path="/SignUp/" element={<SignUp/>} />
                    <Route path="/ForgetPassword/" element={<ForgetPassword/>} />
                    <Route path="/Dashboard/" element={<Dashboard/>} />
                    <Route path="/MapView/" element={<MapView/>} />
                    <Route path="/AdminDashboard/" element={<AdminDashboard/>} />
                </Routes>
                <div id="buttom-banner">
                    Group project by Green team. Team members: Juyeon Nam, Seolhee Yun, Shihao Wen, Weikang Yang
                </div>
            </AuthStoreContextProvider>
        </BrowserRouter>
    )
}

export default App