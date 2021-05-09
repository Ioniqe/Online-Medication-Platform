import React, { useState } from "react";
import { PersonWithId } from "../../model/models";
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
import { useStyles2 } from "../../styles/caregiverStyles";
import { TablePaginationActions } from "../caregiver/TablePaginationActions";
import { connect } from "react-redux";
import { deleteCaregiver } from "../../actions/CaregiverAction";
import EditPatientForm from "../doctor/NewPersonTypeForm";

interface Props {
  caregiverList: PersonWithId[],
  deleteCaregiver: (personId: string) => void,
}

function CaregiverList({ caregiverList, deleteCaregiver }: Props) {
  const classes = useStyles2();
  const classesButton = useLoginStyles();

  const [editPage, setEditPage] = useState(<></>);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openEditForm, setOpenEditForm] = useState(false);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, caregiverList.length - page * rowsPerPage);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let handleEditCaregiver = (caregiver: PersonWithId): void => {
    setEditPage(<EditPatientForm
      open={true}
      setOpen={setOpenEditForm}
      personType='caregiver'
      person={caregiver}
    />) 
  }

  let handleDeleteCaregiver = (caregiverId: string): void => {
    deleteCaregiver(caregiverId);
    window.location.reload();
  }

  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: '3em' }}>Caregivers List</h1>

      {editPage}

      {/* classes.paperStylePatientsList */}
      <TableContainer component={Paper} className={classes.paperStyleCaregiversList}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.text}>Firstname</TableCell>
              <TableCell className={classes.text}>Lastname</TableCell>
              <TableCell className={classes.text}>Address</TableCell>
              <TableCell className={classes.text}>Birthdate</TableCell>
              <TableCell className={classes.text}>Gender</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? caregiverList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : caregiverList
            ).map((caregiver) => (
              <TableRow key={caregiver.id}>
                <TableCell scope="row" className={classes.text}>
                  {caregiver.firstname}
                </TableCell>

                <TableCell className={classes.text} style={{ minWidth: 70 }}>
                  {caregiver.lastname}
                </TableCell>

                <TableCell className={classes.text} style={{ maxWidth: 190 }}>
                  {caregiver.address}
                </TableCell>

                <TableCell className={classes.text} style={{ minWidth: 80 }}>
                  {caregiver.birth_date}
                </TableCell>

                <TableCell className={classes.text} style={{ minWidth: 70 }}>
                  {caregiver.gender}
                </TableCell>

                <TableCell align="right" className={classes.butt} style={{ minWidth: 140 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={`${classesButton.baseButton} ${classesButton.btn2}`}
                    onClick={() => handleEditCaregiver(caregiver)}
                  >
                    Edit
                  </Button>
                </TableCell>


                <TableCell align="right" className={classes.butt} style={{ minWidth: 140 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={`${classesButton.baseButton} ${classesButton.btn2}`}
                    onClick={() => handleDeleteCaregiver(caregiver.id)}
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
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={caregiverList.length}
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
    deleteCaregiver: (personId: string) => dispatch(deleteCaregiver(personId)),
  }
}

export default connect(null, mapDispatchToProps)(CaregiverList);