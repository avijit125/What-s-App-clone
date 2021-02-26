import React, {useState,useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import Typography from '@material-ui/core/Typography';
import { Avatar } from "@material-ui/core";
import { useStateValue } from './StateProvider';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import {useParams} from "react-router-dom";
import db from "./firebase.js";
import firebase from "firebase";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography style={{textAlign:"center"}} variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton style={{color:"#FF5212"}} aria-label="close" className={classes.closeButton} onClick={onClose}>
          <RemoveCircleOutlineOutlinedIcon/>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
const useStyles = makeStyles({
    root: {
      maxWidth: 460,
    },
    media: {
      height: 300,
      width: 566,
    },
  });

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
  const [{user},dispatch]= useStateValue();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const [seed ,setSeed]= useState("");
  const {roomId} = useParams();
  const [roomName, setroomName] = useState();
  const [Messages, setMessages] = useState([]);

  useEffect(()=>{
    setSeed(roomId);
},[roomId])

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
  

  return (
    <div>
      <IconButton onClick={handleClickOpen}><Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/></IconButton>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <h2>{roomName}</h2>
          <p style={{fontSize:'15px'}}>last Message....{" "}{new Date(Messages[Messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
        </DialogTitle>
        <DialogContent dividers>
        <CardMedia
          className={classes.media}
          image={`https://avatars.dicebear.com/api/human/${seed}.svg`}
        />
        <Typography style={{marginTop:"20px"}} gutterBottom>
         <span style={{fontWeight:"bold"}}>{roomName}</span> is created to talk with others... don`t use foul languages ... show love  and respect to each others ...
          </Typography>
        </DialogContent>
       
      </Dialog>
    </div>
  );
}