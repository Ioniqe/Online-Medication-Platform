import React, { useState } from "react";
import { MedicationWithId } from "../../model/models";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TableHead } from "@material-ui/core";
import { useLoginStyles } from "../../styles/loginStyles";
import { useStyles2 } from "../../styles/doctorStyles";
import { TablePaginationActions } from "../caregiver/TablePaginationActions";
import { deleteMedicine } from "../../actions/MedicineAction";
import { connect } from "react-redux";
import SideEffectsList from "./SideEffectsList";
import UpdateMedicineForm from "./UpdateMedicineForm";

interface Props {
  medicineList: MedicationWithId[],
  deleteMedicine: (medicineId: string) => void,
}

function MedicineList({ medicineList, deleteMedicine }: Props) {
  const classes = useStyles2();
  const classesButton = useLoginStyles();

  const [page, setPage] = useState(0);
  const [medId, setMedId] = useState("");
  const [medicineToUpdate, setMedicineToUpdate] = useState<MedicationWithId>({id: "", name:"", dosage: ""});
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, medicineList.length - page * rowsPerPage);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let handleEditMedicine = (medicine: MedicationWithId): void => {
    setMedicineToUpdate(medicine);
  }

  let handleViewSideEffects = (medicineId: string): void => {
    setMedId(medicineId);
  }

  let handleDeleteMedicine = (medicineId: string): void => {
    deleteMedicine(medicineId);
    window.location.reload();
  }

  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: '3em' }}>Medicine List</h1>

      <UpdateMedicineForm
        medicineToUpdate={medicineToUpdate}
        setMedicineToUpdate={setMedicineToUpdate}
      />

      <SideEffectsList
        open={medId}
        setOpen={setMedId}
      />

      <TableContainer component={Paper} className={`${classes.titleBackgroundColorDoctor} ${classes.medicineListStyle}`}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.text}>Name</TableCell>
              <TableCell className={classes.text}>Dosage</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? medicineList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : medicineList
            ).map((medicine) => (
              <TableRow key={medicine.id}>
                <TableCell scope="row" className={classes.text}>
                  {medicine.name}
                </TableCell>

                <TableCell className={classes.text} style={{ minWidth: 70 }}>
                  {medicine.dosage}
                </TableCell>

                <TableCell align="right" className={classes.butt} style={{ minWidth: 140 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={`${classesButton.baseButton} ${classesButton.btn2}`}
                    onClick={() => handleViewSideEffects(medicine.id)}
                  >
                    Side Effects
                  </Button>
                </TableCell>

                <TableCell align="right" className={classes.butt} style={{ minWidth: 140 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={`${classesButton.baseButton} ${classesButton.btn2}`}
                    onClick={() => handleEditMedicine(medicine)}
                  >
                    Edit
                  </Button>
                </TableCell>

                <TableCell align="right" className={classes.butt} style={{ minWidth: 140 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={`${classesButton.baseButton} ${classesButton.btn2}`}
                    onClick={() => handleDeleteMedicine(medicine.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                style={{ overflow: 'initial', paddingLeft: '50px' }}
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={medicineList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteMedicine: (medicineId: string) => dispatch(deleteMedicine(medicineId)),
  }
}

export default connect(null, mapDispatchToProps)(MedicineList);