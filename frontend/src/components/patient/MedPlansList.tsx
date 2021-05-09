import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, TableFooter, TablePagination } from "@material-ui/core";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { getMedPlans } from "../../actions/MedicalPlanActions";
import { MedPlanWithIntervals } from "../../model/models";
import { useLoginStyles } from "../../styles/loginStyles";
import { medicineListStyles } from "../../styles/medicineListStyles";
import { useStyles2 } from "../../styles/patientStyles";
import MedicineListPopup from "../caregiver/MedicineListPopup";

interface Props {
  getMedPlansList: (personId: string) => void,
  medPlansList: {
    medPlansLoading: boolean,
    medPlans: MedPlanWithIntervals[],
    medPlansError: boolean,
  },
  backgroundStyle: string
}

function MedPlansList({ getMedPlansList, medPlansList, backgroundStyle }: Props) {
  const classesButton = useLoginStyles();
  const classes = useStyles2();
  const color = medicineListStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [medListId, setOpenMedList] = useState("");

  useEffect(() => {
    let patient = localStorage.getItem('user') !== null && JSON.parse(localStorage.getItem('user') as string);
    getMedPlansList(patient.id);
  }, [getMedPlansList])

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, medPlansList.medPlans.length - page * rowsPerPage);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = (medPlanId: string) => {
    setOpenMedList(medPlanId);
  };


  return (
    <>
      <MedicineListPopup
        medListId={medListId}
        setOpenMedList={setOpenMedList}
        backgroundStyle={color.titleBackgroundColorPatient}
        buttColor={color.buttColorPatient}
        backgroundColor={backgroundStyle}
      />

      <h1 style={{ textAlign: 'center', fontSize: '3em' }}>Medical Plans List</h1>

      <TableContainer component={Paper} className={classes.paperStylePatientsList}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.text}>Treatment Name</TableCell>
              <TableCell className={classes.text}>Period</TableCell>
              <TableCell className={classes.text}>Start Interval</TableCell>
              <TableCell className={classes.text}>End Interval</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? medPlansList.medPlans.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : medPlansList.medPlans
            ).map((medPlan) => (
              <TableRow key={medPlan.id}>
                <TableCell scope="row" className={classes.text}>
                  {medPlan.treatmentName}
                </TableCell>

                <TableCell className={classes.text} style={{ minWidth: 70 }}>
                  {`${ medPlan.treatmentPeriod } days`}
                </TableCell>

                <TableCell className={classes.text} style={{ maxWidth: 190 }}>
                  {(medPlan.startInterval).split('T')[1]}
                </TableCell>

                <TableCell className={classes.text} style={{ minWidth: 80 }}>
                  {(medPlan.endInterval).split('T')[1]}
                </TableCell>

                <TableCell align="right" className={classes.butt} style={{ minWidth: 140 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={`${classesButton.baseButton} ${classesButton.btn2}`}
                    onClick={() => handleClickOpen(medPlan.id)}
                  >
                    Medications
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
                count={medPlansList.medPlans.length}
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
};

const mapStateToProps = (state: any) => {
  return {
    medPlansList: state.medPlansReducer //from rootReducer
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getMedPlansList: (personId: string) => dispatch(getMedPlans(personId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MedPlansList);