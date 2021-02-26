import React, { useState,useEffect } from 'react';
import { Avatar,IconButton } from '@material-ui/core';
import "./SidebarChat.css"
import db from "./firebase.js";
import {Link} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from "firebase";

function SidebarChat({id, name, addNewChats }) {
    const [seed ,setSeed]= useState("");
    const [Messages, setMessages] = useState([]);
    

    useEffect(()=>{
        setSeed( Math.floor(Math.random()*500));
    },[])

    useEffect(()=>{
        if(id){
            db.collection("Rooms").doc(id).collection("massages").orderBy('timestamp','desc').onSnapshot((snapshot)=>(
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    },[id])
    
    const createChat = ()=>{
        const RoomName = prompt("Please Enater a Room Name");

        if(RoomName){
            // do some crazy stuffs
            db.collection("Rooms").add({
                name: RoomName,
            });
        }

    };

    
    
        return !addNewChats ? ( 
            <Link to={`/rooms/${id}`}>
                <div className="sidebarChat">
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                    <div className="chat-info">
                        <h1>{name}</h1>
                        <p>{Messages[0]?.message}</p>
                    </div>
                    <IconButton id="delete-chat" style={{marginLeft:"2rem",marginTop:'-31px'}}><DeleteIcon/></IconButton>
                </div>
            </Link>
         ):(
             <div onClick={createChat} className="sidebarChat">
                 <h2>Add New Chat</h2>
             </div>
         );
    }

 
export default SidebarChat;