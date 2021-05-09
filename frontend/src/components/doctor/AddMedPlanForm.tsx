import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useLoginStyles } from '../../styles/loginStyles';
import { Chip, createStyles, FormControl, Grid, Input, InputLabel, makeStyles, MenuItem, Select, Theme, useTheme } from '@material-ui/core';
import { useState } from 'react';
import { connect } from 'react-redux';
import { getMedicines } from '../../actions/MedicineListAction';
import { Medication, MedicationWithId } from '../../model/models';
import AddMedPlanUtils from './AddMedPlanUtils';

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

function getStyles(med: Medication, medList: Medication[], theme: Theme) {
  return {
    fontWeight:
      medList.indexOf(med) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Props {
  open: string, //patientPersonId
  setOpen: (open: string) => void,

  getMedicineList: () => void,
  medicineList: {
    loading: boolean,
    medicine: MedicationWithId[],
    error: boolean,
  },
}

function AddMedPlanForm({ open, setOpen, getMedicineList, medicineList }: Props) {
  const classes = useLoginStyles();
  const classes2 = useStyles();
  const theme = useTheme();

  const [treatmentPeriod, setTreatmentPeriod] = useState(1);
  const [treatmentName, setTreatmentName] = useState("");
  const [startInterval, setStartInterval] = useState("10:00");
  const [endInterval, setEndInterval] = useState("15:00");
  const [finalStartI, setFinalStartI] = useState("");
  const [finalEndI, setFinalEndI] = useState("");
  const [openUtils, setOpenUtils] = useState(false);
  const [personId, setPersonId] = useState("");
  const [medList, setMedList] = useState<Medication[]>([]);
  const [close, setClose] = useState(false);
  const [chosenMedicines, setChosenMedicines] = useState<MedicationWithId[]>([]);

  useEffect(() => {
    getMedicineList()
    setPersonId(open);
  }, [open, getMedicineList, setPersonId])

  const handleClose = () => {
    setOpen("");
  };

  const handleSave = () => {
    let startI = "2020-10-10T" + startInterval;
    setFinalStartI(startI);
    let endI = "2020-10-10T" + endInterval;
    setFinalEndI(endI);

    setOpenUtils(true);
  };

  useEffect(() => {
    if (close) {
      setOpen("");
      window.location.reload();
    }
  }, [close]);

  let display = medicineList.loading ? <h1>Loading</h1> : medicineList.error ? <h1>Error</h1> : null

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMedList(event.target.value as Medication[]);

    let mList: MedicationWithId[] = [];
    (event.target.value as Medication[]).forEach(med => {
      let found = medicineList.medicine.find(m => m.name === med as unknown as string);
      found !== undefined && mList.push(found)
    })

    setChosenMedicines(mList);
  };

  return (
    <>
      <AddMedPlanUtils
        openUtils={openUtils}
        setOpenUtils={setOpenUtils}
        personId={personId}
        setClose={setClose}

        treatmentPeriod={treatmentPeriod}
        treatmentName={treatmentName}
        startInterval={finalStartI}
        endInterval={finalEndI}
        chosenMedicines={chosenMedicines}
      />

      <Dialog open={open.length > 0} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.newPatientFormStyle}>Add Medication Plan</DialogTitle>
        <DialogContent className={classes.newPatientFormStyle}>
          <DialogContentText className={classes.newPatientFormStyle}>
            Please fill in the form in order to add a new medication plan
          </DialogContentText>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={treatmentPeriod}
                type="number"
                onChange={e => { setTreatmentPeriod(e.target.value as unknown as number) }}
                variant="outlined"
                name="treatmentPeriod"
                required
                fullWidth
                id="treatmentPeriod"
                label="Treatment Period"
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
                  inputProps: { min: 1 }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                value={treatmentName}
                onChange={e => { setTreatmentName(e.target.value) }}
                variant="outlined"
                required
                fullWidth
                id="treatmentName"
                label="Treatment Name"
                name="treatmentName"
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
                value={startInterval}
                onChange={e => { setStartInterval(e.target.value) }}
                id="startInterval"
                required
                fullWidth
                color="secondary"
                variant="outlined"
                label="Start Interval"
                type="time"
                className={classes.formControl}
                InputLabelProps={{
                  classes: {
                    root: classes.textField,
                  },
                  shrink: true,
                }}
                inputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                  step: 300, // 5 min
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                value={endInterval}
                onChange={e => { setEndInterval(e.target.value) }}
                id="endInterval"
                required
                fullWidth
                color="secondary"
                variant="outlined"
                label="End Interval"
                type="time"
                className={classes.formControl}
                InputLabelProps={{
                  classes: {
                    root: classes.textField,
                  },
                  shrink: true,
                }}
                inputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                  step: 300, // 5 min
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
                  value={medList}
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
                  {medicineList.medicine.map((med) => (
                    <MenuItem key={med.id} value={med.name} style={getStyles(med, medList, theme)}>
                      {med.name}
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
    medicineList: state.medicine //from rootReducer
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getMedicineList: () => dispatch(getMedicines()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMedPlanForm);
