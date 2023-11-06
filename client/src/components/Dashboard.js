import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../auth_store';

import DashboardMapListView from './DashboardComponents/DashboardMapListView';
import DashboardMyProfileView from './DashboardComponents/DashboardMyProfileView';
import DashboardCreateOrEditMapView from './DashboardComponents/DashboardCreateOrEditMapView';
import DashboardSearchMapView from './DashboardComponents/DashboardSearchMapView';

export default function Dashboard(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    //function to handle open the selected view screen 
    const openViewScreen = () => {
        auth_store.openViewScreen()
    }

    //Stores the currently selected view (Dash Board, My Profile, Create Map, Search Map)
    const [selectedView, setSelectedView] = useState(<DashboardMapListView/>);

    //Handles changing the selected view.
    const handleSelectedViewChange = (event) => {
        setSelectedView(event)
    }

    return (
        <div>
            <div>
                <button type="button" onClick={() => handleSelectedViewChange(<DashboardMapListView />)}>Dashboard</button>
                <button type="button" onClick={() => handleSelectedViewChange(<DashboardMyProfileView />)}>My Profile</button>
                <button type="button" onClick={() => handleSelectedViewChange(<DashboardCreateOrEditMapView />)}>Create Map</button>
                <button type="button" onClick={() => handleSelectedViewChange(<DashboardSearchMapView />)}>Search Map</button>
            </div>
                {selectedView}
        </div>
    )

}