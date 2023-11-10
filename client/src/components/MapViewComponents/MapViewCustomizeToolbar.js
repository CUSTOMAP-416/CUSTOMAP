import { useContext, useState } from 'react';
import AuthStoreContextProvider from '../../auth_store';

export default function MapViewCustomizeToolbar(){
    const { auth_store } = useContext(AuthStoreContextProvider);

    //function to handle the text process 
    const onText = (event) => {
        auth_store.onText(event)
    }
    //function to handle the Color process 
    const onColor = (event) => {
        auth_store.onColor(event)
    }
    //function to handle the Legend process 
    const onLegend = (event) => {
        auth_store.onLegend(event)
    }

    //'Text', 'Color', 'Legend' 
    const [selectedTool, setSelectedTool] = useState('');

    //Handle show font list.
    const handleShowFonts = () => {
    }
    //Handle the text button click. 
    const handleText = (event) => {
        setSelectedTool(event)
    }
    //Handle the Select Font button click. 
    const handleSelectFont = (event) => {
        onText(event)
    }
    //Handle show color list.
    const handleShowColors = () => {
    }
    //Handle the color button click. 
    const handleColor = (event) => {
        setSelectedTool(event)
    }
    //Handle the Select Color button click. 
    const handleSelectColor = (event) => {
        onColor(event)
    }
    //Handle show legend list.
    const handleShowLegends = () => {
    }
    //Handle the legend button click. 
    const handleLegend = (event) => {
        setSelectedTool(event)
    }
    //Handle the Change Legend button click. 
    const handleChangeLegend = (event) => {
        onLegend(event)
    }

    return (
        <div>
            <button type="button" onClick={() => handleText()}>Text</button>
            <button type="button" onClick={() => handleColor()}>Color</button>
            <button type="button" onClick={() => handleLegend()}>Legend</button>
        </div>
    )
}