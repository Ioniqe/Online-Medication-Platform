import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useLoginStyles } from '../../styles/loginStyles';
import { Grid } from '@material-ui/core';
import { MedicationWithId } from '../../model/models';
import { connect } from 'react-redux';
import { updateMedicine } from '../../actions/MedicineAction';

const verifyNotEmpty = (medicineToUpdate: MedicationWithId): boolean => {
  if (medicineToUpdate.id === "" && medicineToUpdate.name === "" && medicineToUpdate.dosage === "")
    return false;
  return true;
}

interface Props {
  medicineToUpdate: MedicationWithId,
  setMedicineToUpdate: (med: MedicationWithId) => void,

  updateMedicine: (medicine: MedicationWithId) => void,
  updatedMedicine: {
    loadingUpdate: boolean,
    errorUpdate: boolean,
  },
}

function UpdateMedicineForm({ medicineToUpdate, setMedicineToUpdate, updateMedicine, updatedMedicine }: Props) {
  const classes = useLoginStyles();

  const empty: MedicationWithId = {
    id: "",
    name: "",
    dosage: ""
  }

  const [name, setName] = useState(medicineToUpdate.name);
  const [dosage, setDosage] = useState(medicineToUpdate.dosage);

  useEffect(() => {
    if (verifyNotEmpty(medicineToUpdate)) {
      setName(medicineToUpdate.name)
      setDosage(medicineToUpdate.dosage)
    }
  }, [medicineToUpdate])

  const handleClose = () => {
    setMedicineToUpdate(empty)
  };

  const handleSave = () => {
    let toUpdate: MedicationWithId = {
      id: medicineToUpdate.id,
      name: name,
      dosage: dosage
    }
    updateMedicine(toUpdate);
    setMedicineToUpdate(empty);
    window.location.reload();
  };

  return (
    <>
      <Dialog open={verifyNotEmpty(medicineToUpdate)} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.newPatientFormStyle}>Update Medication</DialogTitle>
        <DialogContent className={classes.newPatientFormStyle}>
          <DialogContentText className={classes.newPatientFormStyle}>
            Please fill in the form in order to update the medication
          </DialogContentText>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={name}
                onChange={e => { setName(e.target.value) }}
                variant="outlined"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
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
            <Grid item xs={12} sm={6}>
              <TextField
                value={dosage}
                onChange={e => { setDosage(e.target.value) }}
                variant="outlined"
                required
                fullWidth
                id="dosage"
                label="Dosage"
                name="dosage"
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
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    updatedMedicine: state.medicine,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateMedicine: (medicine: MedicationWithId) => dispatch(updateMedicine(medicine)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMedicineForm);
