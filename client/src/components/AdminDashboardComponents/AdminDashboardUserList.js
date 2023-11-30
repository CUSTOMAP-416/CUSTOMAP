import '../../styles/AdminDashboard.css';

import { useContext, useState, useEffect } from 'react';
import AuthStoreContextProvider from '../../auth_store';

import UserIcon from "../../assets_img/adminDashboard_user.svg";
import arrow from "../../assets_img/dashboard_arrow.svg";

export default function AdminDashboardUserList(){
    const {auth_store} = useContext(AuthStoreContextProvider);

    const [userMaplistOpen, setUserMaplistOpen] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    const [toolOpen, setToolOpen] = useState(false);

    const [mapDetails, setMapDetails] = useState({});

    useEffect(() => {
      auth_store.getAllUsers().then(() => {
        setAllUsers(auth_store.users);
      });
    }, [auth_store.users]);
    useEffect(() => {
      auth_store.maps.forEach((mapId) =>
        setMapDetails((prevDetails) => ({
          ...prevDetails,
          [mapId._id]: {
            title: mapId.title,
            description: mapId.description,
          },
        }))
      );
    }, [auth_store.maps]);

    const handleUserMaplistOpen = (userId) => {
      setUserMaplistOpen((prevState) => ({
        ...prevState,
        [userId]: !prevState[userId],
      }));      
    };
    const handleSortingChange = (event) => {
        const userSort = [...allUsers]
        if(event == "Ascending"){
            userSort.sort((a, b) => a.username.localeCompare(b.username));
        }
        else if(event == "Descending"){
            userSort.sort((a, b) => b.username.localeCompare(a.username));
        }
        else if(event == "Recent Date"){
            userSort.sort((a, b) => a.createdDate - b.createdDate);
        }

        setAllUsers(userSort);
    }
    //Handle the user edit button click. 
    const handleUserDelete = (email) => {
        deleteUser(email)
        console.log(email)
    }
    const deleteUser = (email) => {
        auth_store.deleteUser(email)
    }
    

    return (
      <div className="right-body">
        <div className="admin-header">
          <h1 className="header-font">Admin Dashboard</h1>
        </div>
        <div class="user-list">

          <div className="sort-buttons">
            <div className="sort-dropdown">
              <select onChange={(e) => handleSortingChange(e.target.value)}>
                <option value="defult">SORT</option>
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
                <option value="Recent Date">Recent Date</option>
              </select>
            </div>
          </div>
          <div style={{ color: "black" }}>
            {allUsers.length > 0 &&
              allUsers.map((user) => (
                <div key={user._id} className="user-box">
                  <div className="user-item">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        className="user"
                        src={UserIcon}
                        style={{ paddingRight: "20px" }}
                        alt="My SVG"
                      />
                      <span>
                        {user.username}
                        <div className="small-email">{user.email}</div>
                      </span>
                    </div>
                    <div>
                      <button
                        className="map"
                        onClick={() => handleUserMaplistOpen(user._id)}
                      >
                        Map
                      </button>
                      <button className="edit">Edit</button>
                      <button
                        className="delete"
                        onClick={() => handleUserDelete(user.email)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {userMaplistOpen[user._id] && (
                    <div className="hidden-maplist">
                      <hr className="hr-1"></hr>
                      <div>Map List</div>
                      <ul>
                        {user.maps.map((mapId) => (
                          <li key={mapId}>
                            <div>{mapDetails[mapId].title}</div>
                            <div>{mapDetails[mapId].description}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
}