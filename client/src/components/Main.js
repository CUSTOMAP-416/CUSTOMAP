import { useContext } from 'react';
import AuthStoreContextProvider from '../auth_store';
import Dashboard from './Dashboard';
import image from "./MainWelcome.png"
import laptop from "../assets_img/main_laptop.svg";
import create from "../assets_img/main-1.png";
import edit from "../assets_img/main-2.png";
import share from "../assets_img/main-3.png";
import search from "../assets_img/main-4.png";
import community from "../assets_img/main-5.png";
import "../styles/Main.css"

export default function Main() {
    const { auth_store } = useContext(AuthStoreContextProvider);
    console.log("Main auth_store.loggedIn: " + auth_store.loggedIn);
    const imageStyle = {
        width: '100%',
        height: '80%',
        objectFit: 'cover', // Cover the container without stretching
        // position: 'absolute',
        // top: '56%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)' // Center the image
      };
       
    return(
      <div className='main-body'>
        <img id="welcome"src={image} alt="welcom to the customap" style={imageStyle} ></img>
    <div style={{backgroundColor:"#e6ffe6", padding: "50px 0px"}}>   
        <div className="main-header" style={{border: "#012c01", borderWidth: "4px"}}>
            Welcome to CUSTOMAP, Explore and Customize Your own Map!
        </div>
        <div className="main-content">
            Start on a journey of discovery and creativity with our innovative web application. At CUSTOMAP, we transcend the boundaries of conventional map-making, offering a dynamic platform for creating, editing, and sharing custom map graphics.
        </div>
        <img className="main-laptop" src={laptop} alt="My SVG" />
    </div>
    <div className="main-header" style={{textAlign: "left", paddingTop: "30px"}}>Why Choose CUSTOMAP?</div>
    <div className='main-flex'>
    <div className="main-subtitle">
        Map Graphic Creation: 
        <div className="main-feature">
        Upload SHP/DBF (ZIP), GeoJSON, KML files, or fork existing maps on the platform to create map graphics.
    </div>
    </div>
    <img className="main-image" src={create} alt="My SVG" />
    </div>
    <div className='main-flex'>
    <img className="main-image" src={edit} alt="My SVG" />
    <div className="main-subtitle">
        Map Graphic Editing: 
    <div className="main-feature">
        Graphic editing (text, color, legend), map viewing and navigation, naming regions, attaching custom data properties, and adding decorations.
    </div>
    </div>
    </div>
    <div className='main-flex'>
    <div className="main-subtitle">
    Map Graphics Exporting:
    <div className="main-feature">
        Provides map export in PNG, JPG and JSON formats.
    </div>
    </div>
    <img className="main-image" src={share} alt="My SVG" />
    </div>
    <div className='main-flex'>
    <img className="main-image" src={search} alt="My SVG" />
    <div className='main-subtitle'>
    Map Classification and Search:
    <div className="main-feature">
        Map classification and search functions based on properties.
    </div>
    </div>
    </div>
    <div className='main-flex'>
    <div className='main-subtitle'>
    Community Interactions:
    <div className="main-feature">
        Users discuss maps, give feedback, and collaborate through map sharing.
    </div>
    </div>
    <img className="main-image" src={community} alt="My SVG" />
    </div>
    <div className="main-footer">
        Join CUSTOMAP and interact with maps. Create, share, and explore the limitless possibilities of custom map graphics today!
    </div>
    </div>
    ) 
    

}
