import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../../auth_store';

export default function AdminDashboardUserList(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    const [userSortingOption, setUserSortingOption] = useState('');
    const [allUsers, setAllUsers] = useState([]);

    //function to handle get the array of user objects 
    const getAllUsers = () => {
        setAllUsers(auth_store.getAllUsers())
    }

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

    return (
        <div>
            <button type="button" onClick={() => handleUserSortingChange()}>Sorting</button>
            <button type="button" onClick={() => handleUserEdit()}>User Edit</button>
            <button type="button" onClick={() => handleUserDelete()}>User Delete</button>
        </div>
    )
}