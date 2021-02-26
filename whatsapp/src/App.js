import React, {useState} from "react";
import {BrowserRouter, Switch, Route } from "react-router-dom"; 
import './App.css';
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import LogIn from "./LogIn";
import { useStateValue } from "./StateProvider";

function App() {

  const [{user},dispatch]= useStateValue();

  return (
    <div className="app">
    {!user ? (
      <LogIn/>
    ):(
      <div className="app-body">
      <BrowserRouter>
      <Sidebar />
          <Switch>
                
                <Route path="/rooms/:roomId">
                  <Chat/>
                </Route>
                <Route path="/">
                  <Chat/>
                </Route>
          </Switch>
      
      </BrowserRouter>
      </div>
    )}
      
        
    </div>
  );
}

export default App;
