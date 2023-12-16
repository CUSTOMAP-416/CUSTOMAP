import { useContext } from 'react';
import AuthStoreContextProvider from '../auth_store';
import Dashboard from './Dashboard';

import image from "../assets_img/WorldMap.png"
import laptop from "../assets_img/main_laptop.svg";
import create from "../assets_img/main-1.png";
import edit from "../assets_img/main-2.png";
import share from "../assets_img/main-3.png";
import search from "../assets_img/main-4.png";
import community from "../assets_img/main-5.png";
import selection from "../assets_img/main-6.png";
import icon from "../assets_img/icon.svg";
import second from "../assets_img/secondpage.png";
import "../styles/Main.css"

export default function Main() {
    const { auth_store } = useContext(AuthStoreContextProvider);
    console.log("Main auth_store.loggedIn: " + auth_store.loggedIn);
    
    return(
      <div className='main-body'>
        <div style={{position:"relative", height: "88vh", textAlign: "center"}}>
            <img id="welcome"src={image} alt="welcom to the customap" ></img>
            <div className='bear-title'>
            <img className="mainpage-bear-logo" src={icon} alt="logo"></img>
            <div className="main-title-logo" >CUSTOMAP</div>
            </div>
            <div className='main-subtitle-logo'>Explore and Customize Your Own Map!</div>
        </div>
    <div style={{backgroundColor:"rgb(236 249 236)", padding: "50px 0px"}}>   
        <div className="main-header" style={{border: "#012c01", borderWidth: "4px"}}>
            <span>Welcome to</span> <span style={{color: "#006400"}}>CUSTOMAP</span><span>, Explore and Customize Your Own Map!</span>
        </div>
        <div className="main-content" style={{textAlign: "left", paddingLeft: "50px", paddingBottom: "40px"}}>
            <div>Start on a journey of discovery and creativity with our platform. </div>
            <div>With CUSTOMAP, you can create, edit, and share map as you want beyond the boundaries of the traditional map creation technique.</div>        </div>
        <img className="main-laptop" src={laptop} alt="My SVG" />
    </div>
    <div className="main-header" style={{textAlign: "left", paddingTop: "40px", color: "#104502", fontSize: "55px"}}>Why Choose CUSTOMAP?</div>
    
    <div className="main-content-items">
    <div className='main-flex'>
    <img className="main-image" src={create} alt="My SVG" />
    <div className="main-subtitle">
        Map Graphic Creation 
        <div className="main-feature">
        Upload SHP/DBF (ZIP), GeoJSON, KML files, or fork existing maps on the platform to create map graphics.
    </div>
    </div>
    </div>
    <div className='main-flex'>
    <img className="main-image" src={selection} alt="My SVG" />
    <div className="main-subtitle">
        Map Graphic Selection
        <div className="main-feature">
        Select various map type you want to create! You can choose among Default, Heat, Point, Bubble, Thematic, and Choropleth map.
    </div>
    </div>
    </div>
    <div className='main-flex'>
    <img className="main-image" src={edit} alt="My SVG" />
    <div className="main-subtitle">
        Map Graphic Editing 
    <div className="main-feature">
        Graphic editing (text, color, legend), map viewing and navigation, naming regions, attaching custom data properties, and adding decorations.
    </div>
    </div>
    </div>
    <div className='main-flex'>
    <img className="main-image" src={share} alt="My SVG" />
    <div className="main-subtitle">
    Map Graphics Exporting
    <div className="main-feature">
        Provides map export in PNG, JPG and JSON formats.
    </div>
    </div>
    </div>
    <div className='main-flex'>
    <img className="main-image" src={search} alt="My SVG" />
    <div className='main-subtitle'>
    Map Classification and Search
    <div className="main-feature">
        Map classification and search functions based on properties.
    </div>
    </div>
    </div>
    <div className='main-flex'>
    <img className="main-image" src={community} alt="My SVG" />
    <div className='main-subtitle'>
        Community Interactions
    <div className="main-feature">
        Users discuss maps, give feedback, and collaborate through map sharing.
    </div>
    </div>
    </div>
    </div>
    <div className="main-footer">
        Join CUSTOMAP and interact with maps. Create, share, and explore the limitless possibilities of custom map graphics today!
    </div>
    </div>
    ) 
    

}
