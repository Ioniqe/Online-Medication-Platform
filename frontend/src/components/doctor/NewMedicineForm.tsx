import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useLoginStyles } from '../../styles/loginStyles';
import { Chip, createStyles, FormControl, Grid, Input, InputLabel, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';
import { Medication, MedicationWithId, SideEffect, SideEffectsListWithMedicationId, SideEffectWithId } from '../../model/models';
import { connect } from 'react-redux';
import useTheme from '@material-ui/core/styles/useTheme';
import { getSideEffectsList, saveSideEffectsList } from '../../actions/SideEffectAction';
import { saveMedicine } from '../../actions/MedicineAction';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
  }),
);

function getStyles(sideEff: SideEffect, sideEffList: SideEffect[], theme: Theme) {
  return {
    fontWeight:
      sideEffList.indexOf(sideEff) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Props {
  open: boolean,
  setOpen: (open: boolean) => void,
  medicine?: MedicationWithId,

  getSideEffectsList: () => void,
  saveMedicine: (medicine: Medication) => void,
  saveSideEffectsList: (sideEffsListWithMedication: SideEffectsListWithMedicationId) => void,
  sideEffectsList: {
    loading: boolean,
    sideEffects: SideEffectWithId[],
    error: boolean,
  },
  savedMedicine: {
    loadingSaved: boolean,
    savedMedicationId: string,
    errorSaved: boolean,
  },
  savedSideEffsList: {
    loadingSave: boolean,
    saved: boolean,
    errorSave: boolean,
  },
}

function NewMedicineForm({ open, setOpen, medicine, getSideEffectsList, sideEffectsList, saveMedicine, saveSideEffectsList, savedMedicine, savedSideEffsList }: Props) {
  const classes = useLoginStyles();
  const classes2 = useStyles();
  const theme = useTheme();

  const [openEditForm, setOpenEditForm] = useState(open);

  const [name, setName] = useState(medicine === undefined ? "" : medicine.name);
  const [dosage, setDosage] = useState(medicine === undefined ? "" : medicine.dosage);
  const [chosenSideEffs, setChosenSideEffs] = useState<SideEffectWithId[]>([]);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const [sideEffList, setSideEffList] = React.useState<SideEffect[]>([]);

  useEffect(() => {
    getSideEffectsList();
  }, [getSideEffectsList]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSideEffList(event.target.value as SideEffect[]);

    let sdList: SideEffectWithId[] = [];
    (event.target.value as SideEffect[]).forEach(sideEff => {
      let found = sideEffectsList.sideEffects.find(sd => sd.sideEffect === sideEff as unknown as string);
      found !== undefined && sdList.push(found)
    })

    setChosenSideEffs(sdList);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleClose = () => {
    if (medicine === undefined) {
      setOpen(false)
    } else {
      setOpenEditForm(false)
      window.location.reload();
    }
  };

  const handleSave = () => {
    let medicationToSave: Medication = {
      name: name,
      dosage: dosage,
    };

    // let medicineToEdit = createEditedPersonToSave(person, personToSave, personType) as PersonWithId

    if (medicine === undefined) {
      console.log('saving');
      saveMedicine(medicationToSave)
      setSaving(true);
    } else {
      //edit
    }

  };

  useEffect(() => {
    if (saving === true) {
      if (savedMedicine !== undefined && savedMedicine.errorSaved === false && savedMedicine.savedMedicationId !== undefined) {
        let sideEffsListWithMedId: SideEffectsListWithMedicationId = {
          id: savedMedicine.savedMedicationId,
          sideEffectsList: chosenSideEffs
        }

        console.log("FINAL: ");
        console.log(sideEffsListWithMedId);

        saveSideEffectsList(sideEffsListWithMedId);
        setSaved(true);
      }
    }
  }, [saving, chosenSideEffs, savedMedicine, saveSideEffectsList, setOpen]);


  useEffect(() => {
    if (saved === true && savedSideEffsList !== undefined && savedSideEffsList.saved === true) {
      setOpen(false);
      window.location.reload();
    }

  }, [saved, savedSideEffsList]);

  let display = sideEffectsList.loading ? <h1>Loading</h1> : sideEffectsList.error ? <h1>Error</h1> : null

  return (
    <>
      <Dialog open={medicine === undefined ? open : openEditForm} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.newPatientFormStyle}>Subscribe</DialogTitle>
        <DialogContent className={classes.newPatientFormStyle}>
          <DialogContentText className={classes.newPatientFormStyle}>
            Please fill in the form in orer to create a new medication
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

            <Grid item xs={12} >
              {display}
              <FormControl className={classes2.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  fullWidth
                  value={sideEffList}
                  onChange={handleChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div className={classes2.chips}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} className={classes2.chip} />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {sideEffectsList.sideEffects.map((sideEff) => (
                    <MenuItem key={sideEff.id} value={sideEff.sideEffect} style={getStyles(sideEff, sideEffList, theme)}>
                      {sideEff.sideEffect}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
    sideEffectsList: state.sideEffect, //from rootReducer

    savedMedicine: state.medicine,
    savedSideEffsList: state.sideEffect
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSideEffectsList: () => dispatch(getSideEffectsList()),

    saveMedicine: (medicine: Medication) => dispatch(saveMedicine(medicine)),
    saveSideEffectsList: (sideEffsListWithMedication: SideEffectsListWithMedicationId) => dispatch(saveSideEffectsList(sideEffsListWithMedication))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMedicineForm);
