import '../../styles/AdminDashboard.css';

import { useContext, useState, useEffect } from 'react';
import AuthStoreContextProvider from '../../auth_store';

import UserIcon from "../../assets_img/adminDashboard_user.svg";
import arrow from "../../assets_img/dashboard_arrow.svg";

export default function AdminDashboardUserList(){
    const {auth_store} = useContext(AuthStoreContextProvider);

    const [userSortingOption, setUserSortingOption] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [toolOpen, setToolOpen] = useState(false);

    // function to handle get the array of user objects 
    

    useEffect(()=>{
        auth_store.getAllUsers().then(() => {
            setAllUsers(auth_store.users)
        })
    }, [])

    // useEffect(() => {
    //     const users = []
    //     for(let i=0; i<auth_store.users.length; i++){
    //         console.log("auth_store.users[i] ", auth_store.users)
    //         users.push(
    //             <div key={auth_store.users[i]._id} className="box">
    //                 <div class="user-item">
    //                     <div style={{display: "flex", alignItems: "center"}}> 
    //                         <img className="user" src={user} style={{paddingRight:"20px"}} alt="My SVG" />
    //                         <span>{auth_store.users[i].username}</span>
    //                     </div>
    //                     <div>
    //                         <button className="map">Map</button>
    //                         <button className="edit">Edit</button>
    //                         <button className="delete">Delete</button>
    //                     </div>
    //                 </div>
    //             </div>
    //         )
    //     }
    //     console.log(users)
    //     setAllUsers(users)
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
                    {/* <button className='sort-tool' onClick={()=>{getAllUsers()}}> TOOL </button> */}
                    <button className='sort-tool' > TOOL </button>
                </div>
                <div className='sort-buttons'>
                    
                    {toolOpen && 
                    <>
                    <button className='arrow-button' onClick={() => handleUserSortingChange()}><img className="arrow" src={arrow} alt="My SVG" /></button><button class="sort-button" onClick={() => handleUserSortingChange()}>Ascending</button>
                    <button className='arrow-button' onClick={() => handleUserSortingChange()}><img className="arrow" src={arrow} alt="My SVG" /></button><button class="sort-button" onClick={() => handleUserSortingChange()}>Descending</button>
                    <button className='arrow-button' onClick={() => handleUserSortingChange()}><img className="arrow" src={arrow} alt="My SVG" /></button><button class="sort-button" onClick={() => handleUserSortingChange()}>Date</button>
                    </>}
                </div>
                
                {/* <div class="user-item">
                    <div style={{display: "flex", alignItems: "center"}}> 
                        <img className="user" src={user} style={{paddingRight:"20px"}} alt="My SVG" />
                        <span></span>
                    </div>
                    <div>
                        <button className="map">Map</button>
                        <button className="edit">Edit</button>
                        <button className="delete">Delete</button>
                    </div>
                </div> */}
                {/* {<div style={{color: "black"}}>{allUsers}</div> } */}
                <div style={{color: "black"}}>
                    {allUsers.length > 0 && allUsers.map(user => (
                        <div key={user._id} className="box">
                            <div class="user-item">
                                <div style={{display: "flex", alignItems: "center"}}> 
                                    <img className="user" src={UserIcon} style={{paddingRight:"20px"}} alt="My SVG" />
                                    <span>{user.username}</span>
                                </div>
                                <div>
                                    <button className="map">Map</button>
                                    <button className="edit">Edit</button>
                                    <button className="delete">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            </div>
    )
}