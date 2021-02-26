import React, {useState,useEffect} from 'react';
import {Avatar,IconButton} from "@material-ui/core";
import "./chat.css";
import { AttachFile, SearchOutlined } from '@material-ui/icons';
import MoreVert from '@material-ui/icons/MoreVert';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from"@material-ui/icons/InsertEmoticon";
import {useParams} from "react-router-dom";
import firebase from "firebase";
import db from "./firebase.js";
import { useStateValue } from './StateProvider';
import Popupchat from "./Popupchat";

function Chat() {
    const [input, setInput] = useState("");
    const [roomName, setroomName] = useState();
    const [Messages, setMessages] = useState([]);
    
    const [{user},dispatch]= useStateValue();
    const {roomId} = useParams();


    useEffect(()=>{
        if(roomId){
            db.collection("Rooms").doc(roomId).onSnapshot((snapshot)=>(
                setroomName(snapshot.data().name)


            ))
            db.collection("Rooms").doc(roomId).collection("massages").orderBy('timestamp','asc').onSnapshot((snapshot)=>(
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))

        }
    },[roomId])
    
    

  

        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        var recognition = new SpeechRecognition();
                
        // This runs when the speech recognition service starts
        recognition.onstart = function() {
        console.log("We are listening. Try speaking into the microphone.");
        };

        recognition.onspeechend = function() {
        // when user is done speaking
        recognition.stop();
        }



    const sendMessage = (e)=>{
        e.preventDefault();

        db.collection("Rooms").doc(roomId).collection("massages").add({
            message:input,
            name:user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),

        })
        

        setInput("");
    };
    recognition.onresult = function(event) {
        let current = event.resultIndex;
        var transcript = event.results[current][0].transcript;
    
        db.collection("Rooms").doc(roomId).collection("massages").add({
            message:transcript,
            name:user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),

        })
          
    };
     
  
    const sendVoiceMessage = ()=>{
        recognition.start();
        
    }
    return (
        <div className='chat'>
            <div className="chat-header">
                <Popupchat/>
                <div className="header-info">
                    <h3>{roomName}</h3>
                    <p>last Seen....{" "}{new Date(Messages[Messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="header-right">
                        <IconButton><SearchOutlined/></IconButton>
                        <IconButton><AttachFile/></IconButton>
                        <IconButton><MoreVert/></IconButton>
                </div>
            </div>
            <div className="chat-body">
                {Messages.map(message =>(
                     <p className={`chat-msg ${message.name === user.displayName && "chat-reciever" }`}>
                     <span className="chat-name">{message.name}</span>
                         {message.message}
                         <span className="chat-timestamp">{new Date(message?.timestamp?.toDate()).toUTCString()}</span>
                     </p>
                ))}
               
            </div>
            <div className="chat-footer">
                <InsertEmoticonIcon/>
                <form>
                    <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" placeholder="Type a message"/>
                    <button onClick={sendMessage} type="submit"></button>
                </form>
                <IconButton onClick={sendVoiceMessage}><MicIcon/></IconButton>
            </div>
            
        </div>
    )
}

export default Chat
