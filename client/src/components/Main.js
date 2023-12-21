import { useContext } from 'react';
import AuthStoreContextProvider from '../auth_store';
import { Link } from "react-router-dom";

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
    return(
      <div className='main-body'>
        <div style={{position:"relative", height: "88vh", textAlign: "center"}}>
            <img id="welcome"src={image} alt="welcom to the customap" ></img>
            <div className='bear-title'>
                <img className="mainpage-bear-logo" src={icon} alt="logo"></img>
                <div className="main-title-logo" >CUSTOMAP</div>
            </div>
            <div className='main-subtitle-logo'>Explore and Customize Your Own Map!</div>
            {auth_store.loggedIn ? '':
            <Link
                to="/login/"
                className="login"
                style={{ color: "white", textDecoration: "none", position: "absolute", top: "60%", left: "50%", height: "fit-content" }}
              >
                SignIn
              </Link>}
            
        </div>
        <div style={{position: "relative"}}>
            <img id="second"src={second} alt="welcom to the customap" ></img>
            <div className="second-part">   
                <div className="main-header" style={{border: "#012c01", borderWidth: "4px"}}>
                    <span>Welcome to</span> <span style={{color: "#006400"}}>CUSTOMAP</span><span>, Discover and Customize Various Map!</span>
                </div>
            <div className="main-content" style={{textAlign: "left", paddingLeft: "50px", paddingBottom: "40px"}}>
                <div>Create custom maps according to your needs. With CUSTOMAP, you can adjust properties and add extra details easily.  </div>   
                <div>Try it out for a simple and enjoyable mapping experience!</div>
            </div>
            <img className="main-laptop" src={laptop} alt="My SVG" />
        </div>
    </div>
    <div>
    <div className="main-header" style={{textAlign: "left", paddingTop: "40px", color: "#104502", fontSize: "55px"}}>Why Choose CUSTOMAP?</div>
    <div className="main-content-items">
        <div className='main-flex'>
            <img className="main-image" src={create} alt="My SVG" />
            <div className="main-subtitle">
                Map Graphic Creation 
                <div className="main-feature">
                    Create map by uploading SHP/DBF (ZIP), GeoJSON, KML files, or forking existing maps.
                </div>
            </div>
        </div>
        <div className='main-flex'>
            <img className="main-image" src={selection} alt="My SVG" />
                <div className="main-subtitle">
                    Map Graphic Selection
                    <div className="main-feature">
                        Select various map type you want to create! We provide Default, Heat, Point, Bubble, Thematic, and Choropleth map.
                    </div>
                </div>
        </div>
        <div className='main-flex'>
            <img className="main-image" src={edit} alt="My SVG" />
                <div className="main-subtitle">
                    Map Graphic Editing 
                    <div className="main-feature">
                        Edit map according to your needs. You can rename region, specify color of it or add legend.
                    </div>
                </div>
        </div>
        <div className='main-flex'>
            <img className="main-image" src={share} alt="My SVG" />
                <div className="main-subtitle">
                    Map Graphics Exporting
                    <div className="main-feature">
                        Export your map in PNG, JPG and JSON formats.
                    </div>
                </div>
        </div>
        <div className='main-flex'>
            <img className="main-image" src={search} alt="My SVG" />
                <div className='main-subtitle'>
                    Map Search
                    <div className="main-feature">
                        Search the map that suits your needs.
                    </div>
                </div>
        </div>
    <div className='main-flex'>
    <img className="main-image" src={community} alt="My SVG" />
    <div className='main-subtitle'>
        Community Interactions
    <div className="main-feature">
        Discuss maps with others, give feedback, and collaborate through map sharing.
    </div>
    </div>
    </div>
    </div>
    </div>
    <div className="main-footer">
        Interact with maps with CUSTOMAP. Create, share, and explore various custom maps!
    </div>
    </div>
    ) 
    

}
