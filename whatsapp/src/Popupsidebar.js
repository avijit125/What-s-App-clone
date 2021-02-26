import React from 'react';
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
  

  return (
    <div>
      <IconButton onClick={handleClickOpen}><Avatar src={user?.photoURL} /></IconButton>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {user.displayName}
        </DialogTitle>
        <DialogContent dividers>
        <CardMedia
          className={classes.media}
          image={user?.photoURL}
        />
        <Typography style={{marginTop:"20px"}} gutterBottom>
        You are precious for me, if you are hurt, think I’m hurt too. Always, think I’m standing next to you, still take good care of yourself. Love you!
          </Typography>
        </DialogContent>
       
      </Dialog>
    </div>
  );
}
