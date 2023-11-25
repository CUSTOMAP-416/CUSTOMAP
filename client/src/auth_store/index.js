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
      userMaps: null,
      selectMap: null,
      isCreatePage: true,
      errorMessage: null,
      successMessage: null,
      forkMap: null,
      searchMaps: null,
    });

    const history = useNavigate();

    const auth_storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthStoreActionType.GET_LOGGED_IN: {
                console.log(type)
                return setAuthStore((prevAuthStore) => ({
                    ...prevAuthStore,
                    user: payload,
                    loggedIn: payload.loggedIn
                }));
            }
            case AuthStoreActionType.LOGIN_USER: {
                console.log(type)
                return setAuthStore((prevAuthStore) => ({
                    ...prevAuthStore,
                    user: payload,
                    loggedIn: true
                }));
            }
            case AuthStoreActionType.LOGOUT_USER: {
                console.log(type)
                return setAuthStore((prevAuthStore) => ({
                    ...prevAuthStore,
                    user: null,
                    loggedIn: false
                }));
            }
            case AuthStoreActionType.REGISTER_USER: {
                console.log(type)
                return setAuthStore((prevAuthStore) => ({
                    ...prevAuthStore,
                    user: payload,
                    loggedIn: true
                }));
            }
            case AuthStoreActionType.LOGIN_ADMIN: {
                console.log(type)
                return setAuthStore((prevAuthStore) => ({
                    ...prevAuthStore,
                    user: payload,
                    loggedIn: true
                }));
            }
            case AuthStoreActionType.LOGOUT_ADMIN: {
                console.log(type)
                return setAuthStore((prevAuthStore) => ({
                    ...prevAuthStore,
                    user: null,
                    loggedIn: false
                }));
            }
            default:
                return auth_store;
        }
    }

    auth_store.getUser = async function () {
        await apis.getUser().then(response => {
            auth_storeReducer({
                type: AuthStoreActionType.GET_LOGGED_IN,
                payload: response.data.user,
            });
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    //All user list in Admin dashboard const getUsers = async () => { ?
    auth_store.getAllUsers = async function () {
        await apis.getAllUsers().then(response => {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
            return response.data.users;
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    // Registers the user const onSignUp = async (userData) => ?
    auth_store.createUser = async function (state) {
        await apis.createUser(state.name, state.phone, state.id, state.email, state.password, state.passwordVerify).then(response => {
            auth_storeReducer({
                type: AuthStoreActionType.REGISTER_USER,
                payload: response.data.user,
            });
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    //Change the profile user const onChangeInformation = async (userData) => {...
    //function to handle change password process const onChangePassword = async () => ?
    auth_store.updateUser = async function (state) {
        await apis.updateUser(state.name, state.email, state.phone, state.password).then(response => {
            auth_storeReducer({
                type: AuthStoreActionType.REGISTER_USER,
                payload: response.data.user,
            });
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                successMessage: response.data.message,
            }));
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    ///All map list in Admin dashboard const getMaps = async () => { ?
    auth_store.getAllMaps = async function () {
        await apis.getAllMaps().then(response => {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    auth_store.getMap = async function (mapId) {
        await apis.getMap(mapId).then(response => {
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                selectMap: response.data.map
            }));
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    //function to handle the create a new map process const onCreateMap = async (map) => { ?
    auth_store.createMap= async function (mapData, mapTitle, mapDescription) {
        await apis.createMap(mapData, mapTitle, mapDescription, auth_store.user).then(response => {
            const user = this.user
            user.maps.push(response.data.map)
            setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                user: user,
            }));
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    auth_store.updateMap= async function () {
        await apis.updateMap().then(response => {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    //function to handle delete map process. const onDeleteMap = async (map) => { ?
    auth_store.deleteMap= async function (id) {
        let maps =[]
        for(let i=0; i<this.user.maps.length; i++){
            if(this.user.maps[i]._id != id){
                maps.push(this.user.maps[i])
            }
        }
        this.user.maps = maps
        await apis.deleteMap(id).then(response => {
            return ''
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    auth_store.shareMap= async function (mapId, email) {
        await apis.shareMap(mapId, email).then(response => {
            return ''
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    // Logs in the user const onLogin = async (userData) => { ?
    auth_store.onLogin= async function (state) {
        await apis.loggedIn(state.email, state.password).then(response => {
            auth_storeReducer({
                type: AuthStoreActionType.LOGIN_USER,
                payload: response.data.user,
            });
            setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: null,
              }));
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    // Logs out the user
    auth_store.onLogout= async function () {
        await apis.onLogout().then(response => {
            auth_storeReducer({
                type: AuthStoreActionType.LOGOUT_USER,
                payload: null,
            });
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    //function to handle verification process 
    auth_store.onVerification= async function (state) {
        await apis.onVerification(state.username, state.email, state.phone).then(response => {
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                successMessage: response.data.message,
            }));
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    //function to handle the edit map process 
    auth_store.onEditMap= async function (title, description) {
        for(let i=0; i<this.user.maps.length; i++){
            if(this.user.maps[i]._id == this.selectMap._id){
                this.user.maps[i].title = title
                this.selectMap.title = title;
                this.user.maps[i].description = description
                this.selectMap.description = description;
                break;
            }
        }
        await apis.onEditMap(title, description, this.selectMap._id).then(response => {
            return ''
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    //function to handle the fork map process 
    auth_store.onForkMap= async function (name) {
        await apis.onForkMap(name).then(response => {
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                forkMap: response.data.geojson,
            }))
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    //function to handle the attach property process 
    auth_store.onAttachProperty= async function () {
        await apis.onAttachProperty().then(response => {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    //function to handle the Discussion process 
    auth_store.onDiscussion= async function () {
        await apis.onDiscussion().then(response => {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    //function to handle the text process 
    auth_store.onText= async function (array) {
        await apis.onText(array, this.selectMap._id).then(response => {
            return
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    //function to handle the Color process 
    auth_store.onColor= async function (array) {
        await apis.onColor(array, this.selectMap._id).then(response => {
            return
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    //function to handle the Legend process 
    auth_store.onLegend= async function (array) {
        await apis.onLegend(array, this.selectMap._id).then(response => {
            return
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    auth_store.deleteLegend= async function (legendId) {
        await apis.deleteLegend(legendId, this.selectMap._id).then(response => {
            return
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    //function to handle the search process 
    auth_store.changeVisibility= async function (mapId, visibility) {
        await apis.changeVisibility(mapId, visibility).then(response => {
            return ''
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    auth_store.onSearch= async function (searchTerm) {
        await apis.onSearch(searchTerm).then(response => {
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                searchMaps: response.data.maps
            }));
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    //function to handle get the Array Discussions. 
    auth_store.getArrayDiscussions= async function () {
        await apis.getArrayDiscussions().then(response => {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
    }
    //function to handle getting the list of user's created maps. 
    auth_store.getUserMaps= async function () {
        await apis.getUserMaps().then(response => {
            auth_storeReducer({
                type: AuthStoreActionType.null,
                payload: null,
            });
        })
        .catch(error => {
            console.log(error.response.data.errorMessage)
            return setAuthStore((prevAuthStore) => ({
                ...prevAuthStore,
                errorMessage: error.response.data.errorMessage
            }));
        });
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
    auth_store.openForgotPassword = () => {
        return setAuthStore((prevAuthStore) => ({
          ...prevAuthStore,
          errorMessage: null,
        }));
    }
    //function to handle open the selected view screen 
    auth_store.openViewScreen = () => {}
    //function to handle open edit map Screen. 
    auth_store.openEdit = (page) => {
        return setAuthStore((prevAuthStore) => ({
            ...prevAuthStore,
            isCreatePage: page,
          }));
    }
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
