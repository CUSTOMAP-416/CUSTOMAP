import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../../auth_store';

export default function DashboardMapListView(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    //List of user maps. 
    const [userMaps, setUserMaps] = useState([]);
    //Stores the currently selected map. 
    const [mapSelected, setMapSelected] = useState(null);
    //Stores the map sorting option. 
    const [sortingOption, setSortingOption] = useState('');

    const user = auth_store.user

    //function to handle getting the list of user's created maps. 
    const getUserMaps = (user) => {
        setUserMaps(auth_store.getUserMaps(user))
    }
    //function to handle delete map process. 
    const deleteMap = (map) => {
        auth_store.deleteMap(map)
    }
    //function to handle open edit map Screen. 
    const openEdit = (map) => {
        auth_store.openEdit(map)
    }
    //function to handle open map select view Screen. 
    const openMapSelect = () => {
        auth_store.openMapSelect(mapSelected)
    }

    //Handles map selection button click. 
    const handleMapSelect = (event) => {
        setMapSelected(event)
        openMapSelect()
    }
    //Handle changes in map sorting.
    const handleSortingChange = (event) => {
        setSortingOption(event)
    }
    //Handles map delete button click. 
    const handleDeleteMap = (event) => {
        deleteMap(event)
    }
    //Handles map edit button click. 
    const handleEdit = (event) => {
        openEdit(event)
    }
    
    return <div>
                <button type="button" onClick={() => handleSortingChange()}>sorting</button>
                <button type="button" onClick={() => handleMapSelect()}>Map Name</button>
                <button type="button" onClick={() => handleEdit()}>Edit</button>
                <button type="button" onClick={() => handleDeleteMap()}>X</button>
            </div>
}