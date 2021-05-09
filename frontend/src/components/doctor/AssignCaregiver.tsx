import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStyles2 } from '../../styles/doctorStyles';
import { connect } from 'react-redux';
import { getCaregiversList } from '../../actions/CaregiverAction';
import { PatientAndCaregiverIds, PersonWithId } from '../../model/models';
import { assignCaregiver } from '../../actions/PatientAction';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
  }),
);

interface Props {
  open: string,
  setOpen: (open: string) => void,

  assignCaregiver: (ids: PatientAndCaregiverIds) => void,
  getCaregiversList: () => void,
  caregiversList: {
    loading: boolean,
    people: PersonWithId[],
    error: boolean,
  },
}

function AssignCaregiver({ open, setOpen, assignCaregiver, getCaregiversList, caregiversList }: Props) {
  const classes = useStyles();
  const classes2 = useStyles2();

  const [chosen, setChosen] = useState('');
  const [chosenId, setChosenId] = useState('');

  useEffect(() => {
    open.length > 0 &&
      getCaregiversList()
  }, [getCaregiversList, open])

  let display = caregiversList.loading ? <h1>Loading</h1> : caregiversList.error ? <h1>Error</h1> : null

  let handleClose = () => {
    setOpen("");
  }

  let handleSave = () => {
    let ids: PatientAndCaregiverIds = {
      patientId: open,
      caregiverId:chosenId
    }
    
    chosenId !== '' && assignCaregiver(ids);

    setOpen("");
    window.location.reload();
  }

  let onItemClick = (id: string) => {
    let caregiver = caregiversList.people.find(p => p.id === id);
    caregiver !== undefined && setChosen(caregiver.firstname + " " + caregiver.lastname) 
    caregiver !== undefined && setChosenId(id)
  }

  return (
    <>
      {display}

      <Dialog disableBackdropClick disableEscapeKeyDown open={open.length > 0} onClose={handleClose}>
        <DialogTitle className={classes2.titleBackgroundColorDoctor}>Fill the form</DialogTitle>
        <DialogContent className={classes2.listStyle}>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Caregiver</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={chosen}
                input={<Input />}
                style={{ color: "white" }}
              >
                {
                  caregiversList.people.map(c =>
                    <MenuItem onClick={() => onItemClick(c.id)} key={c.id} value={`${c.firstname} ${c.lastname}`}>{`${c.firstname} ${c.lastname}`}</MenuItem>
                  )
                }
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions className={classes2.titleBackgroundColorDoctor}>
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
    caregiversList: state.caregiver //from rootReducer
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getCaregiversList: () => dispatch(getCaregiversList()),
    assignCaregiver: (ids: PatientAndCaregiverIds) => dispatch(assignCaregiver(ids)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignCaregiver);