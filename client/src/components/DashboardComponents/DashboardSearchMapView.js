import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../../auth_store';

export default function DashboardSearchMapView(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    const [searchKeyword, setSearchKeyword] = useState('');
    //List of search maps. 
    const [searchMaps, setSearchMaps] = useState([]);
    //Stores the currently selected map. 
    const [mapSelected, setMapSelected] = useState(null);
    //Stores the map sorting option. 
    const [sortingOption, setSortingOption] = useState('');

    //function to handle the search process 
    const onSearch = () => {
        setSearchMaps(auth_store.onSearch(searchKeyword))
    }
    //function to handle open map select view Screen. 
    const openMapSelect = () => {
        auth_store.openMapSelect(mapSelected)
    }

    //Handle Search input changes.
    const handleSearchChange = (event) => {
        setSearchKeyword(event.target.value)
    }
    //Handle the search button click. 
    const handleSearch = () => {
        onSearch()
    }
    //Handles map selection button click. 
    const handleMapSelect = (event) => {
        setMapSelected(event)
        openMapSelect()
    }
    //Handle changes in map sorting change. 
    const handleSortingChange = (event) => {
        setSortingOption(event)
    }

    return <div>
                <h2>Search Map</h2>
                <input type="text" value={searchKeyword} onChange={handleSearchChange}></input>
                <button type="button" onClick={() => handleSearch()}>Edit</button>
                <button type="button" onClick={() => handleSortingChange()}>sorting</button>
                <button type="button" onClick={() => handleMapSelect()}>Map Name</button>
            </div>
}