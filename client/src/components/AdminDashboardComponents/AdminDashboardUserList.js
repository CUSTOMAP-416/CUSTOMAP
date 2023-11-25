import '../../styles/AdminDashboard.css';

import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../../auth_store';

import user from "../../assets_img/adminDashboard_user.svg";
import arrow from "../../assets_img/dashboard_arrow.svg";

export default function AdminDashboardUserList(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    const [userSortingOption, setUserSortingOption] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [toolOpen, setToolOpen] = useState(false);

    //function to handle get the array of user objects 
    const getAllUsers = () => {
        setAllUsers(auth_store.getAllUsers())
        console.log(allUsers)
    }

    // useEffect(() => {
    //     const maps = []
    //     for(let i=0; i<auth_store.user.maps.length; i++){
    //         maps.push(
    //             <div key={auth_store.user.maps[i]._id} className="box">
    //                 <div style={{display: "flex", justifyContent: "center", paddingBottom:"10px"}}>
    //                     <div className='map-name'>{auth_store.user.maps[i].title}</div>
    //                     <button className="delete" onClick={() => handleEdit(auth_store.user.maps[i]._id)}>Edit</button>
    //                     <button className="delete" onClick={() => handleDeleteMap(auth_store.user.maps[i]._id)}>X</button>
    //                 </div>
    //                 <Link to="/MapView/" onClick={() => handleMapSelect(auth_store.user.maps[i]._id)}>
    //                     <img className="map" src={map} alt="My SVG" />
    //                 </Link>
    //             </div>
    //         )
    //     }
    //     setUserMaps(maps)
    // }, []);
    //Handle changes in user sorting change.
    const handleUserSortingChange = (option) => {
        setUserSortingOption(option)
    }
    //Handle the user edit button click. 
    const handleUserEdit = (event) => {
    }
    //Handle the user delete button click. 
    const handleUserDelete = (event) => {
    }
    const handleToolBar = (event) =>{
        if(toolOpen){
            setToolOpen(false);
        }
        else{
            setToolOpen(true);
        }
    }
    return (
        // <div>
        //     <button type="button" onClick={() => handleUserSortingChange()}>Sorting</button>
        //     <button type="button" onClick={() => handleUserEdit()}>User Edit</button>
        //     <button type="button" onClick={() => handleUserDelete()}>User Delete</button>
        // </div>
        <div className='right-body'>
            <div className="admin-header">
                <h1 className='header-font'>Admin Dashboard</h1>
            </div>
            <div class="user-list">
                <div className='sort-buttons'>
                    <button className='sort-tool' onClick={()=>{handleToolBar()}}> TOOL </button>
                    <button className='sort-tool' onClick={()=>{getAllUsers();}}> TOOL </button>

                </div>
                <div className='sort-buttons'>
                    
                    {toolOpen && 
                    <>
                    <button className='arrow-button' onClick={() => handleUserSortingChange()}><img className="arrow" src={arrow} alt="My SVG" /></button><button class="sort-button" onClick={() => handleUserSortingChange()}>Ascending</button>
                    <button className='arrow-button' onClick={() => handleUserSortingChange()}><img className="arrow" src={arrow} alt="My SVG" /></button><button class="sort-button" onClick={() => handleUserSortingChange()}>Descending</button>
                    <button className='arrow-button' onClick={() => handleUserSortingChange()}><img className="arrow" src={arrow} alt="My SVG" /></button><button class="sort-button" onClick={() => handleUserSortingChange()}>Date</button>
                    </>}
                    
                </div>
                <div class="user-item">
                <div style={{display: "flex", alignItems: "center"}}> 
                <img className="user" src={user} style={{paddingRight:"20px"}} alt="My SVG" />
                    <span>User Name 1</span></div>
                    <div>
                        <button className="map">Map</button>
                        <button className="edit">Edit</button>
                        <button className="delete">Delete</button>
                    </div>
                </div>
                <div className="user-item">
                <div style={{display: "flex", alignItems: "center"}}> 
                <img className="user" src={user} style={{paddingRight:"20px"}} alt="My SVG" />
                    <span>User Name 2</span></div>
                    <div>
                        <button className="edit">Edit</button>
                        <button className="delete">Delete</button>
                    </div>
                </div>
                <div className="user-item">
                    <div style={{display: "flex", alignItems: "center"}}> 
                <img className="user" src={user} style={{paddingRight:"20px"}} alt="My SVG" />
                    <span>User Name 3</span>
                    </div>
                    <div>
                        
                        <button className="edit">Edit</button>
                        <button className="delete">Delete</button>
                    </div>
                </div>
            </div>
            </div>
    )
}