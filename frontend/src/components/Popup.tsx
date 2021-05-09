import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import { useLoginStyles } from '../styles/loginStyles';

interface Props {
  open: boolean,
  handleClosePopup: () => void
}

function Popup({ open, handleClosePopup }: Props) {
  const classes = useLoginStyles();

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClosePopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className={`${ classes.popupColor } ${classes.popupTextColor}`}
        >
          Success
        </DialogTitle>
        <DialogContent
          className={classes.popupColor}
        >
          <DialogContentText id="alert-dialog-description" className={classes.popupTextColor}>
            The sign up was a success
          </DialogContentText>
        </DialogContent>
        <DialogActions
          className={classes.popupColor}
        >
          <Button
            onClick={handleClosePopup}
            className={`${classes.baseButton} ${classes.btn1} ${classes.popupButt}`}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Popup;