import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useLoginStyles } from '../../styles/loginStyles';
import { FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';
import { Person, PersonWithDoctorId, PersonWithId } from '../../model/models';
import { connect } from 'react-redux';
import { editPatient, savePatient } from '../../actions/PatientAction';
import { editCaregiver, saveCaregiver } from '../../actions/CaregiverAction';

interface Props {
  open: boolean,
  setOpen: (open: boolean) => void,
  personType: string,
  person?: PersonWithId, //person to edit

  savePatient: (newPatient: PersonWithDoctorId) => void,
  saveCaregiver: (caregiver: Person) => void,
  editPatient: (editedPatient: PersonWithId) => void,
  editCaregiver: (editCaregiver: PersonWithId) => void,
  savedPatient: {
    loadingSave: boolean,
    errorSave: boolean
  },
  editedPatient: {
    loadingEdit: boolean,
    errorEdit: boolean
  },
  editedCaregiver: {
    loadingEdit: boolean,
    errorEdit: boolean
  },
  savedCaregiver: {
    loading: boolean,
    error: boolean
  },
}

let createEditedPersonToSave = (person: PersonWithId | undefined, personToSave: Person, personType: string): (PersonWithId | null) => {
  if (person !== undefined) {  
    let personToEdit: PersonWithId = person;
    if (person !== undefined) {
      personToEdit = {
        id: person.id,
        username: personToSave.username,
        password: personToSave.password,
        firstname: personToSave.firstname,
        lastname: personToSave.lastname,
        address: personToSave.address,
        birth_date: personToSave.birth_date,
        gender: personToSave.gender,
        type: personType
      };
    }
    return personToEdit;
  }
  return null;
}

function NewPatientForm({ open, setOpen, savePatient, personType, person, saveCaregiver, editPatient, editCaregiver, savedPatient,  savedCaregiver, editedPatient, editedCaregiver }: Props) {
  const classes = useLoginStyles();

  const [openEditForm, setOpenEditForm] = useState(open);

  const [username, setUsername] = useState(person === undefined ? "" : person.username);
  const [password, setPassword] = useState(person === undefined ? "" : person.password);
  const [firstName, setFirstName] = useState(person === undefined ? "" : person.firstname);
  const [lastName, setLastName] = useState(person === undefined ? "" : person.lastname);
  const [address, setAddress] = useState(person === undefined ? "" : person.address);
  const [birthday, setBirthday] = useState(person === undefined ? "1990-10-10" : person.birth_date);
  const [gender, setGender] = useState(person === undefined ? "male" : person.gender);

  const handleClose = () => {
    if (person === undefined) {
      setOpen(false)
    } else {
      setOpenEditForm(false)
      window.location.reload();
    }
  };

  const handleSave = () => {
    let personToSave: Person = {
      username: username,
      password: password,
      firstname: firstName,
      lastname: lastName,
      address: address,
      birth_date: birthday,
      gender: gender,
      type: personType
    };

    let newPatient: PersonWithDoctorId = {
      person: personToSave,
      doctorPersonId: JSON.parse(localStorage.getItem('user') as string).id
    }

    let personToEdit = createEditedPersonToSave(person, personToSave, personType) as PersonWithId

    if (person === undefined) {
      if (personType === "patient") {
        savePatient(newPatient)
      } else {
        saveCaregiver(personToSave)
      }
    } else {
      if (personType === "patient") {
        editPatient(personToEdit)
      } else {
        editCaregiver(personToEdit)
      }
    }
    
    setOpen(false);
    window.location.reload();
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGender(event.target.value as string);
  };

  return (
    <>
      <Dialog open={person === undefined ? open : openEditForm} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.newPatientFormStyle}>Subscribe</DialogTitle>
        <DialogContent className={classes.newPatientFormStyle}>
          <DialogContentText className={classes.newPatientFormStyle}>
            Please fill in the form in orer to create a new {personType}
          </DialogContentText>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={username}
                onChange={e => { setUsername(e.target.value) }}
                variant="outlined"
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
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
                value={password}
                onChange={e => { setPassword(e.target.value) }}
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
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
                value={firstName}
                onChange={e => { setFirstName(e.target.value) }}
                variant="outlined"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
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
                value={lastName}
                onChange={e => { setLastName(e.target.value) }}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
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
            <Grid item xs={12}>
              <TextField
                value={address}
                onChange={e => { setAddress(e.target.value) }}
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
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
              <FormControl variant="outlined" fullWidth color="secondary" className={classes.formControl}>
                <InputLabel id="gender" style={{ color: "#fff" }}>Gender</InputLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  value={gender}
                  onChange={handleChange}
                  label="Gender"
                  color="secondary"
                  style={{ color: "#fff" }}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                value={birthday}
                onChange={e => { setBirthday(e.target.value) }}
                fullWidth
                variant="outlined"
                id="date"
                label="Birthday"
                type="date"
                color="secondary"
                className={`${classes.textField} ${classes.text}`}
                InputLabelProps={{
                  shrink: true,
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
    savedPatient: state.patient, //from rootReducer
    editedPatient: state.patient, 
    editedCaregiver: state.caregiver, 
    savedCaregiver: state.caregiver 
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    savePatient: (newPatient: PersonWithDoctorId) => dispatch(savePatient(newPatient)),
    saveCaregiver: (caregiver: Person) => dispatch(saveCaregiver(caregiver)),

    editPatient: (person: PersonWithId) => dispatch(editPatient(person)),
    editCaregiver: (person: PersonWithId) => dispatch(editCaregiver(person)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPatientForm);
