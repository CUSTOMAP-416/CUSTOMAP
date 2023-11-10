import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../auth_store';

import AdminDashboardUserList from './AdminDashboardComponents/AdminDashboardUserList';
import AdminDashboardMapList from './AdminDashboardComponents/AdminDashboardMapList';

export default function AdminDashboard(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    //function to handle open the selected view screen 
    const openAdminViewScreen = () => {
        auth_store.openAdminViewScreen()
    }

    //'User List', 'Map List' 
    const [selectedView, setSelectedView] = useState(<AdminDashboardUserList/>);

    //Handles changing the selected view change. 
    const handleSelectedViewChange = (event) => {
        setSelectedView(event)
    }

    return (
        <div>
            <div>
                <button type="button" onClick={() => handleSelectedViewChange(<AdminDashboardUserList/>)}>User List</button>
                <button type="button" onClick={() => handleSelectedViewChange(<AdminDashboardMapList/>)}>Map List</button>
            </div>
                {selectedView}
        </div>
    )
}