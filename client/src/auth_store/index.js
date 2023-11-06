import React, {createContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import apis from './auth_store_stroe_request_api'

const AuthStoreContext = createContext();

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH AND STORE STATE THAT CAN BE PROCESSED
export const AuthStoreActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_ADMIN: "LOGIN_ADMIN",
    LOGOUT_ADMIN: "LOGOUT_ADMIN",
}

function AuthStoreContextProvider(props) {
    const [auth_store, setAuthStore] = useState({
        user: null,
        loggedIn: false,
        selectMap: null,
        isCreatePage: true,
    });

    const history = useNavigate();

    const auth_storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthStoreActionType.GET_LOGGED_IN: {
                console.log(type)
                return setAuthStore({
                    user: payload,
                    loggedIn: payload.loggedIn
                });
            }
            case AuthStoreActionType.LOGIN_USER: {
                console.log(type)
                return setAuthStore({
                    user: payload,
                    loggedIn: true
                })
            }
            case AuthStoreActionType.LOGOUT_USER: {
                console.log(type)
                return setAuthStore({
                    user: null,
                    loggedIn: false
                })
            }
            case AuthStoreActionType.REGISTER_USER: {
                console.log(type)
                return setAuthStore({
                    user: payload,
                    loggedIn: true
                })
            }
            case AuthStoreActionType.LOGIN_ADMIN: {
                console.log(type)
                return setAuthStore({
                    user: payload,
                    loggedIn: true
                })
            }
            case AuthStoreActionType.LOGOUT_ADMIN: {
                console.log(type)
                return setAuthStore({
                    user: null,
                    loggedIn: false
                })
            }
            default:
                return auth_store;
        }
    }

    auth_store.getUser = async function () {
        const response = await apis.getUser();
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.GET_LOGGED_IN,
                payload: response.data.user,
            });
        }
    }
    //All user list in Admin dashboard const getUsers = async () => { ?
    auth_store.getAllUsers = async function () {
        const response = await apis.getAllUsers();
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        }
    }
    // Registers the user const onSignUp = async (userData) => ?
    auth_store.createUser = async function (state) {
        const response = await apis.createUser(state.name, state.phone, state.id, state.email, state.password, state.passwordVerify);
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        }
    }
    //Change the profile user const onChangeInformation = async (userData) => {...
    //function to handle change password process const onChangePassword = async () => ?
    auth_store.updateUser = async function () {
        const response = await apis.updateUser();
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        }
    }
    ///All map list in Admin dashboard const getMaps = async () => { ?
    auth_store.getAllMaps = async function () {
        const response = await apis.getAllMaps();
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        }
    }
    auth_store.getMap = async function () {
        const response = await apis.getMap();
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        }
    }
    //function to handle the create a new map process const onCreateMap = async (map) => { ?
    auth_store.createMap= async function () {
        const response = await apis.createMap();
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.REGISTER_USER,
                payload: response.data.user,
            });
        }
    }
    auth_store.updateMap= async function () {
        const response = await apis.updateMap();
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        }
    }
    //function to handle delete map process. const onDeleteMap = async (map) => { ?
    auth_store.deleteMap= async function () {
        const response = await apis.deleteMap();
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        }
    }
    // Logs in the user const onLogin = async (userData) => { ?
    auth_store.onLogin= async function (state) {
        const response = await apis.loggedIn(state.email, state.password);
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.LOGIN_USER,
                payload: response.data.user,
            });
        }
    }
    // Logs out the user
    auth_store.onLogout= async function () {
        const response = await apis.onLogout();
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.LOGOUT_USER,
                payload: null,
            });
        }
    }
    //function to handle verification process 
    auth_store.onVerification= async function () {
        const response = await apis.onVerification();
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        }
    }
    //function to handle the edit map process 
    auth_store.onEditMap= async function () {
        const response = await apis.onEditMap();
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        }
    }
    //function to handle the fork map process 
    auth_store.onForkMap= async function () {
        const response = await apis.onForkMap();
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        }
    }
    //function to handle the attach property process 
    auth_store.onAttachProperty= async function () {
        const response = await apis.onAttachProperty();
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        }
    }
    //function to handle the Discussion process 
    auth_store.onDiscussion= async function () {
        const response = await apis.onDiscussion();
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        }
    }
    //function to handle the text process 
    auth_store.onText= async function () {
        const response = await apis.onText();
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        }
    }
    //function to handle the Color process 
    auth_store.onColor= async function () {
        const response = await apis.onColor();
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        }
    }
    //function to handle the Legend process 
    auth_store.onLegend= async function () {
        const response = await apis.onLegend();
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        }
    }
    //function to handle the search process 
    auth_store.onSearch= async function () {
        const response = await apis.onSearch();
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        }
    }
    //function to handle get the Array Discussions. 
    auth_store.getArrayDiscussions= async function () {
        const response = await apis.getArrayDiscussions();
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        }
    }
    //function to handle getting the list of user's created maps. 
    auth_store.getUserMaps= async function () {
        const response = await apis.getUserMaps();
        if (response.status === 200) {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        }
    }
    //function to handle the redo process. 
    auth_store.onRedo = function () {}
    //function to handle the undo process. 
    auth_store.onUndo = function () {}
    //function to handle open the home screen 
    auth_store.openHome = () => {}
    //function to handle open the my page screen 
    auth_store.openMyPage = () => {}
    //function to handle open the login screen 
    auth_store.openLogin = () => {}
    //function to handle open the sign-up screen 
    auth_store.openSignUp = () => {}
    //function to handle open forgot password screen 
    auth_store.openForgotPassword = () => {}
    //function to handle open the selected view screen 
    auth_store.openViewScreen = () => {}
    //function to handle open edit map Screen. 
    auth_store.openEdit = (map) => {}
    //function to handle open map select view Screen. 
    auth_store.openMapSelect = (map) => {}
    //function to handle open customize tool Screen. 
    auth_store.openCustomizeTool = (map) => {}
    //function to handle open discussion forum. 
    auth_store.openDiscussionForum = (map) => {}
    //function to handle open the selected view screen 
    auth_store.openAdminViewScreen = () => {}

    return (
        <AuthStoreContext.Provider value={{
            auth_store
        }}>
            {props.children}
        </AuthStoreContext.Provider>
    );
}

export default AuthStoreContext;
export { AuthStoreContextProvider };