import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../auth_store';
import '../styles/MapView.css';
import MapComponent from "../map.jsx";

import MapViewDiscussionForum from './MapViewComponents/MapViewDiscussionForum';
import MapViewCustomizeToolbar from './MapViewComponents/MapViewCustomizeToolbar';

export default function MapView(){
    const { auth_store } = useContext(AuthStoreContextProvider);
  
    const selectMap = auth_store.selectMap

    //function to handle open discussion forum. 
    const openDiscussionForum = () => {
        auth_store.openDiscussionForum()
    }

    const [showDiscussionForum, setShowDiscussionForum] = useState(false);

    //Handle the discussion forum button click. 
    const handleDiscussionForum = () => {
        if(showDiscussionForum){
            setShowDiscussionForum(false)
        }
        else{
            setShowDiscussionForum(true)
        }
    }
    
    return (
        <div className="MapView-page-container">
            <MapViewDiscussionForum /> 

       
            <div className="content">
                <MapViewCustomizeToolbar />
                <MapComponent width="1800px" height="700px" />
            </div>
            

        </div>
    )
}