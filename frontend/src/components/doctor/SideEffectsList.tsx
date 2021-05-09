import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { SideEffect, SideEffectsListWithMedicationId, SideEffectWithId } from '../../model/models';
import { medicineListStyles } from '../../styles/medicineListStyles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Chip, FormControl, Input, InputLabel, MenuItem, Select, Theme, useTheme, createStyles, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { getSideEffectsList, getSideEffectsListOfMedicine, saveSideEffectsList } from '../../actions/SideEffectAction';
import { useStyles2 } from '../../styles/doctorStyles';
import RemoveIcon from '@material-ui/icons/Remove';

function Row(props: { row: SideEffectWithId, list: SideEffectWithId[], setList: (list: SideEffectWithId[]) => void }) {
  const { row, list, setList } = props;
  const classes = medicineListStyles();

  let deleteSideEff = (sideEffId: string) => {
    let newList: SideEffectWithId[] = list;
    newList = newList.filter(item => item.id !== sideEffId);
    setList(newList);
  }

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell />
        <TableCell component="th" scope="row" className={classes.textStyle}>
          {row.sideEffect}
        </TableCell>
        <TableCell component="th" scope="row" className={classes.textStyle} style={{ textAlignLast: "center" }}>
          <IconButton color="secondary" onClick={() => deleteSideEff(row.id)}>
            <RemoveIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

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

interface Props {
  open: string,
  setOpen: (medId: string) => void,

  saveSideEffectsList: (sideEffectsListWithMedicationId: SideEffectsListWithMedicationId) => void,

  getSideEffectsListOfMedicine: (medicineId: string) => void,
  sideEffsListOfMedId: {
    loadingSideEffsOfMed: boolean,
    sideEffsOfMed: SideEffectWithId[],
    errorSideEffsOfMed: boolean,
  },
  getSideEffectsList: () => void,
  sideEffectsList: {
    loading: boolean,
    sideEffects: SideEffectWithId[],
    error: boolean
  },
}

function getStyles(sideEff: SideEffect, sideEffList: SideEffect[], theme: Theme) {
  return {
    fontWeight:
      sideEffList.indexOf(sideEff) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function SideEffectsList({ open, setOpen, saveSideEffectsList, getSideEffectsListOfMedicine, sideEffsListOfMedId, getSideEffectsList, sideEffectsList }: Props) {
  const classes = medicineListStyles();
  const classes2 = useStyles2();
  const classes3 = useStyles();

  const [list, setList] = useState<SideEffectWithId[]>([]);
  const [sideEffList, setSideEffList] = React.useState<SideEffect[]>([]);
  const [chosenSideEffs, setChosenSideEffs] = useState<SideEffectWithId[]>([]);
  const theme = useTheme();

  useEffect(() => {
    open !== "" &&
      getSideEffectsListOfMedicine(open) &&
      getSideEffectsList()
  }, [open, getSideEffectsListOfMedicine, getSideEffectsList]);

  let handleAdd = () => {
    
    if (chosenSideEffs.length > 0) {
      let sdList: SideEffectWithId[] = [];

      sdList = chosenSideEffs.filter(chosenSE => {  //get rid of duplicates
        return !sideEffsListOfMedId.sideEffsOfMed.find(medSE => {
          return chosenSE.sideEffect === medSE.sideEffect
        })
      })

      let finalList: SideEffectWithId[] = list;
      finalList.push(...sdList)

      setList(finalList);
      setSideEffList([]);
    }
  }

  let handleClose = () => {
    setSideEffList([]);
    setOpen("");
  }

  let handleSave = () => {
    let toSave: SideEffectsListWithMedicationId = {
      id: open,
      sideEffectsList: list
    }

    saveSideEffectsList(toSave);
    setOpen("");
    window.location.reload();
  }

  let displayAll = sideEffectsList.loading ? <h1>Loading</h1> : sideEffectsList.error ? <h1>Error</h1> : null

  let display = sideEffsListOfMedId.loadingSideEffsOfMed ?
    "Loading" :
    sideEffsListOfMedId.errorSideEffsOfMed ? "Error" : "Side Effects"

  useEffect(() => {
    if (sideEffsListOfMedId !== undefined && sideEffsListOfMedId.sideEffsOfMed !== undefined)
      setList(sideEffsListOfMedId.sideEffsOfMed)
  }, [sideEffsListOfMedId]);

  let sideEffectList =
    <TableBody>
      {list.map((sideEff) => (
        <Row key={sideEff.id} row={sideEff} list={list} setList={setList} />
      ))}
    </TableBody>

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSideEffList(event.target.value as SideEffect[]);

    let sdList: SideEffectWithId[] = [];
    (event.target.value as SideEffect[]).forEach(sideEff => {
      let found = sideEffectsList.sideEffects.find(sd => sd.sideEffect === sideEff as unknown as string);
      found !== undefined && sdList.push(found)
    })

    setChosenSideEffs(sdList);
  };

  return (
    <Dialog open={(open.length > 0)} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" className={classes2.paperStyleCaregiverAccDetails} style={{ color: 'white' }}>{display}</DialogTitle>
      <DialogContent className={classes2.listStyle}>
        <TableContainer component={Paper} className={classes.listStyle}>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell className={classes.textStyle}>Name</TableCell>
                <TableCell className={classes.textStyle}>remove</TableCell>
              </TableRow>
            </TableHead>
            {display === "Side Effects" && sideEffectList}
          </Table>
        </TableContainer>

        {displayAll}
        <FormControl className={classes3.formControl}>
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
              <div className={classes3.chips}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} className={classes3.chip} />
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

      </DialogContent>
      <DialogActions className={classes2.paperStyleCaregiverAccDetails}>
        <Button onClick={handleClose} color="secondary">
          Cancel
          </Button>
        <Button onClick={handleAdd} color="secondary">
          Add
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
    sideEffsListOfMedId: state.sideEffect, //from rootReducer
    sideEffectsList: state.sideEffect,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSideEffectsListOfMedicine: (medicineId: string) => dispatch(getSideEffectsListOfMedicine(medicineId)),
    getSideEffectsList: () => dispatch(getSideEffectsList()),

    saveSideEffectsList: (sideEffectsListWithMedicationId: SideEffectsListWithMedicationId) => dispatch(saveSideEffectsList(sideEffectsListWithMedicationId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideEffectsList);
