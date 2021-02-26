import React, { useState,useEffect } from 'react';
import { IconButton  } from "@material-ui/core";
import DonutLargeIcon  from "@material-ui/icons/DonutLarge";
import  ChatIcon  from "@material-ui/icons/Chat";
import Logout from "./Logout";
import {SearchOutlined } from "@material-ui/icons";
import "./Sidebar.css";
import SidebarChat from './SidebarChat';
import db from './firebase.js';
import { useStateValue } from './StateProvider';
import Popupsidebar from "./Popupsidebar"

function Sidebar() {

    const [Rooms, setRooms] = useState([]);
    const[{user},dispatch]= useStateValue();

    useEffect(()=>{
        db.collection("Rooms").onSnapshot((snapshot) =>(
            setRooms(snapshot.docs.map((doc) =>

            ({
                id: doc.id,
                data: doc.data()

            })
            
            ))
        ));
        // console.log(Rooms.data)
    },[]);

        return ( 
            <div className="sidebar">
                <div className='sidebar-header'>
                    <Popupsidebar/>
                    <div className="sidebar-header-right">
                        <IconButton><DonutLargeIcon/></IconButton>
                        <IconButton><ChatIcon/></IconButton>
                        <Logout/>
                    </div>
                </div>
                <div className="sidebar-search">
                    <div className="Search-container">
                    <SearchOutlined/>
                    <input placeholder="Search for a New Room" type="text" />
                    </div>
                </div>
                <div className="sidebar-chats">
                    <SidebarChat addNewChats/>
                    {Rooms.map(Room =>(
                        <SidebarChat key={Room.id} id={Room.id} name={Room.data.name} />
                    ))}
                    
                </div>

            </div>
         );
    
}
 
export default Sidebar;