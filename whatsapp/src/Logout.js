import React from 'react';
import { IconButton  } from "@material-ui/core";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import  MoreVertIcon  from "@material-ui/icons/MoreVert";
import {auth} from "./firebase";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';


export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [{},dispatch] = useStateValue();

  const handleClick = (event) => {
   

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {

    auth.signOut().then(()=>{
        dispatch({
            type:actionTypes.SET_USER,
            user: null,
        });
    }).catch((Error)=>{
        console.log(Error.messsage)
    })
    
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
      <MoreVertIcon/>
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >

        <MenuItem style={{color:"white",backgroundColor:"gray"}} onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
