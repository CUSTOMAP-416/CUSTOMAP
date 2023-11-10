import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../../auth_store';

export default function AdminDashboardMapList(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    //List of maps. 
    const [allMaps, setAllMaps] = useState([]);
    const [mapSortingOption, setMapSortingOption] = useState('');

    //function to handle get the array of map objects 
    const getALLMaps = () => {
        setAllMaps(auth_store.getAllMaps())
    }
    //function to handle open map select view Screen. 
    const openMapSelect = (map) => {
        auth_store.openMapSelect(map)
    }

    //Handle changes in map sorting change.
    const handleMapSortingChange = (option) => {
        setMapSortingOption(option)
    }
    //Handles map selection button click. 
    const handleMapSelect = (event) => {
        openMapSelect(event)
    }

    return (
        <div>
            <button type="button" onClick={() => handleMapSortingChange()}>Sorting</button>
            <button type="button" onClick={() => handleMapSelect()}>Map Select</button>
        </div>
    )
}