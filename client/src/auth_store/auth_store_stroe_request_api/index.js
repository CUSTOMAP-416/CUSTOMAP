import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:8080/auth_store',
})

const getUser = () => api.get('/loggedIn/');
//All user list in Admin dashboard const getUsers = async () => { ?
const getAllUsers = () => api.get('/users/');
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

const deleteUser = (email) => {
    console.log('email in delete: ', email);
    return api.post(`/Dashboard/${email}`, { 
    })
};

///All map list in Admin dashboard const getMaps = async () => { ?
const getAllMaps = () => api.get('/maps/');
const getMap = (mapId) => {
    return api.post('/getMap/', {
        mapId : mapId,
    })
};
//function to handle the create a new map process const onCreateMap = async (map) => { ?
const createMap = (mapData, mapTitle, mapDescription, mapType, user) => {
    // Serialize the data
    const serializedData = JSON.stringify(mapData);
    return api.post('/createMap/', {
        email : user.email,
        mapTitle : mapTitle,
        mapDescription: mapDescription,
        mapData : serializedData,
        mapType: mapType,
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

const session = () => {
    return api.get('/session/')
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
const onEditMap = (title, description, _id) => {
    return api.post("/editMap/", {
        _id: _id,
        title: title,
        description: description
      });
}
//function to handle the fork map process 
const onForkMap = (name) => {
    return api.post("/forkMap/", {
        name: name,
    });
}
//function to handle the Discussion process 
const onDiscussion = (mapId, email, content) => {
    return api.post("/discussion/", {
        mapId: mapId,
        email: email,
        content: content,
    });
}

//function to handle the text process 
const onText = (array, mapId) => {
    return api.post("/onText/", {
        array: array,
        mapId: mapId, 
    });
}
//function to handle the Color process 
const onColor = (array, mapId) => {
    return api.post("/onColor/", {
        array: array,
        mapId: mapId, 
    });
}
//function to handle the Legend process 
const onLegend = (array, mapId) => {
    return api.post("/onLegend/", {
        array: array,
        mapId: mapId, 
    });
}
const deleteLegend = (legendId, mapId) => {
    return api.post("/deleteLegend/", {
        legendId: legendId,
        mapId: mapId, 
    });
}
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

const onFont = (mapId, font) => {
    return api.post("/onFont/", {
        mapId: mapId, 
        font: font
    });
}
const onBackgroundColor = (mapId, backgroundColor) => {
    return api.post("/onBackgroundColor/", {
        mapId: mapId,
        backgroundColor: backgroundColor
    });
}
const onCustom = (array, deleteCustoms, mapId) => {
    return api.post("/onCustom/", {
        array: array, 
        deleteCustoms,
        mapId: mapId
    });
}
const onThematicLegends = (mapId, thematicLegends) => {
    return api.post("/onThematicLegends/", {
        mapId: mapId, 
        thematicLegends: thematicLegends
    });
}

const apis = {
    getUser,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getAllMaps,
    getMap,
    createMap,
    deleteMap,
    shareMap,
    loggedIn,
    session,
    onLogout,
    onVerification,
    onEditMap,
    onForkMap,
    onDiscussion,
    onText,
    onColor,
    onLegend,
    onSearch,
    changeVisibility,
    deleteLegend,
    onFont,
    onBackgroundColor,
    onCustom,
    onThematicLegends,
}

export default apis
