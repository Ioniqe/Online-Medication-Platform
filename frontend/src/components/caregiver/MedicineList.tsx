import React from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { MedicationWithSideEffectsListWithId } from '../../model/models';
import { medicineListStyles } from '../../styles/medicineListStyles';

function Row(props: { row: MedicationWithSideEffectsListWithId }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = medicineListStyles();

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} style={{ color: 'white' }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" className={classes.textStyle}>
          {row.name}
        </TableCell>
        <TableCell align="right" className={classes.textStyle}>{row.dosage}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {/* <Typography variant="h6" gutterBottom component="div" className={classes.textStyle} style={{fontSize: '3em !important', textAlign: 'center'}}>
                Side Effects
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.sideEffectsListDtos.map((sideEffect) => (
                    <TableRow key={sideEffect.id}>
                      <TableCell component="th" scope="row" style={{textAlign: 'center'}} className={classes.textStyle}>{sideEffect.sideEffect}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

interface Props{
  medList: MedicationWithSideEffectsListWithId[]
}

function MedicineList({ medList }: Props) {
  const classes = medicineListStyles();
  
  return (
    <TableContainer component={Paper} className={classes.listStyle}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className={classes.textStyle}>Medicine Name</TableCell>
            <TableCell align="right" className={classes.textStyle}>Dosage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medList.map((med) => (
            <Row key={med.id} row={med} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MedicineList;