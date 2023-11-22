import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:8080/auth_store',
})

const getUser = () => api.get('/loggedIn/');
//All user list in Admin dashboard const getUsers = async () => { ?
const getAllUsers = () => api.get('');
// Registers the user const onSignUp = async (userData) => ?
const createUser = (name, phone, id, email, password, passwordVerify) => {
    return api.post('/register/', {
        username : name,
        email : email,
        password : password,
        passwordVerify: passwordVerify,
        phone: phone
    })
};
//Change the profile user const onChangeInformation = async (userData) => {...
//function to handle change password process const onChangePassword = async () => ?
const updateUser = (name, email, phone, password) => {
    console.log('email: ', email);
    return api.put(`/Dashboard/${email}`, { 
        username : name,
        email: email,
        phone : phone,
        password : password 
    })
};
///All map list in Admin dashboard const getMaps = async () => { ?
const getAllMaps = () => api.get('');
const getMap = (mapId) => {
    return api.post('/getMap/', {
        mapId : mapId,
    })
};
//function to handle the create a new map process const onCreateMap = async (map) => { ?
const createMap = (mapData, mapTitle, user) => {
    // Serialize the data
    const serializedData = JSON.stringify(mapData);
    return api.post('/createMap/', {
        email : user.email,
        mapTitle : mapTitle,
        mapData : serializedData,
    })
};
const updateMap = (id_, name, phone, id, email, password) => {
    return api.post('', {
        id_ : id_,
        username : name,
        phone : phone,
        id : id,
        email : email,
        password : password
    })
};
//function to handle delete map process. const onDeleteMap = async (map) => { ?
const deleteMap = (id) => {
    return api.post('/deleteMap/', {
        _id : id,
    })
};
const shareMap = (mapId, email) => {
    return api.post('/shareMap/', {
        mapId : mapId,
        email : email,
    })
};
// Logs in the user const onLogin = async (userData) => { ?
const loggedIn = (email, password) => {
    return api.post('/login/', {
        email : email,
        password : password
    })
};

// Logs out the user
const onLogout = () => api.get('/logout/')

//function to handle verification process 
const onVerification = (username, email, phone) => {
  return api.post("/forgetPassword/", {
    username: username,
    email: email,
    phone: phone
  });
};
//function to handle the edit map process 
const onEditMap = (title, _id) => {
    return api.post("/editMap/", {
        _id: _id,
        title: title
      });
}
//function to handle the fork map process 
const onForkMap = (name) => {
    return api.post("/forkMap/", {
        name: name,
    });
}
//function to handle the attach property process 
const onAttachProperty = (map) => {}
//function to handle the Discussion process 
const onDiscussion = (map, user) => {}
//function to handle the text process 
const onText = (map) => {}
//function to handle the Color process 
const onColor = (map) => {}
//function to handle the Legend process 
const onLegend = (map) => {}
//function to handle the search process
const changeVisibility = (mapId, visibility) => {
    return api.post("/changeVisibility/", {
        mapId: mapId, 
        visibility: visibility,
    });
} 
const onSearch = (searchTerm) => {
    return api.post("/searchMap/", {
        searchTerm: searchTerm,
    });
}
//function to handle get the Array Discussions. 
const getArrayDiscussions = (map) => {}
//function to handle getting the list of user's created maps. 
const getUserMaps = (user) => {}

const apis = {
    getUser,
    getAllUsers,
    createUser,
    updateUser,
    getAllMaps,
    getMap,
    createMap,
    updateMap,
    deleteMap,
    shareMap,
    loggedIn,
    onLogout,
    onVerification,
    onEditMap,
    onForkMap,
    onAttachProperty,
    onDiscussion,
    onText,
    onColor,
    onLegend,
    onSearch,
    getArrayDiscussions,
    getUserMaps,
    changeVisibility,
}

export default apis
