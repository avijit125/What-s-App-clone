import React from 'react';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import {Button} from "@material-ui/core";
import "./login.css"
import {auth, provider} from "./firebase";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function LogIn() {
    const [{},dispatch] = useStateValue();
    const signIn = ()=>{
        auth.signInWithPopup(provider).then((result)=>{
            dispatch({
                type:actionTypes.SET_USER,
                user: result.user,
            });
        }).catch((error)=>{console.log(error.massage)});
    };
    return (
        <div className="login">
            <div className="login-container">
                <WhatsAppIcon/>
                <div className="login-text">
                    <h1>Sign in to WhatsApp Using GoogleSignIn</h1>
                </div>
                <Button onClick={signIn}>
                    Sign in With Google
                </Button> 
            </div> 
        </div>
    )
}

export default LogIn;
