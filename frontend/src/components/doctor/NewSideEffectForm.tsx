import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useLoginStyles } from '../../styles/loginStyles';
import { Grid } from '@material-ui/core';
import { SideEffect } from '../../model/models';
import { connect } from 'react-redux';
import { saveSideEffect } from '../../actions/SideEffectAction';

interface Props {
  open: boolean,
  setOpen: (open: boolean) => void,

  saveSideEffect: (sideEffect: SideEffect) => void,
  savedSideEffect: {
    loading: boolean,
    error: boolean
  },
}

function NewSideEffectForm({ open, setOpen, saveSideEffect, savedSideEffect }: Props) {
  const classes = useLoginStyles();

  const [sideEffect, setSideEffect] = useState("")

  const handleClose = () => {
    setOpen(false)
  };

  const handleSave = () => {
    let sideEffectToSave: SideEffect = {
      sideEffect: sideEffect,
    };

    saveSideEffect(sideEffectToSave)

    setOpen(false);
    window.location.reload();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" className={classes.newPatientFormStyle}>Subscribe</DialogTitle>
      <DialogContent className={classes.newPatientFormStyle}>
        <DialogContentText className={classes.newPatientFormStyle}>
          Please fill in the form in orer to create a new medication
          </DialogContentText>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={sideEffect}
              onChange={e => { setSideEffect(e.target.value) }}
              variant="outlined"
              name="sideEffect"
              required
              fullWidth
              id="sideEffect"
              label="Side Effect"
              color="secondary"
              className={classes.text}
              InputLabelProps={{
                classes: {
                  root: classes.textField,
                },
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions className={classes.newPatientFormStyle}>
        <Button onClick={handleClose} color="secondary">
          Cancel
          </Button>
        <Button onClick={handleSave} color="secondary">
          Save
          </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state: any) => {
  return {
    savedSideEffect: state.sideEffect,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    saveSideEffect: (sideEffect: SideEffect) => dispatch(saveSideEffect(sideEffect)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSideEffectForm);
