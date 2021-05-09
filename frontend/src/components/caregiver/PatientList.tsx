import React, { useEffect, useState } from "react";
import { PersonWithId, url, WebSocketMessages } from "../../model/models";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TablePaginationActions } from "./TablePaginationActions";
import { Button, TableHead } from "@material-ui/core";
import { useLoginStyles } from "../../styles/loginStyles";
import { useStyles2 } from "../../styles/caregiverStyles";
import MedPlanPopup from "./MedPlanPopup";
import { connect } from "react-redux";
import { deletePatient } from "../../actions/PatientAction";
import EditPatientForm from "../doctor/NewPersonTypeForm";
import AssignCaregiver from "../doctor/AssignCaregiver";
import AddMedPlanForm from "../doctor/AddMedPlanForm";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

interface Props {
  deletePatient: (personId: string) => void,

  patientList: PersonWithId[],
  backgroundColor: string,
  titleColor: string,
  backgroundStyle: string,
  titleBackground: string,
  buttColor: string,
}

const verifyPatientOfCargiver = (personId: string, patientList: PersonWithId[]): boolean => {
  let ok = false;
  patientList.some(function (patient) {
    if (patient.id === personId) {
      ok = true;
      return ok;
    }
  });
  return ok;
}


function PatientList({ deletePatient, patientList, backgroundColor, titleColor, backgroundStyle, titleBackground, buttColor }: Props) {
  const classes = useStyles2();
  const classesButton = useLoginStyles();

  const [editPage, setEditPage] = useState(<></>);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(""); //the string is the person's id
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openAssignC, setOpenAssignC] = useState("");
  const [openAddMedPlanForm, setOpenAddMedPlanForm] = useState("");
  const [doctor, setDoctor] = useState(false);

  useEffect(() => {
    setDoctor(localStorage.getItem('user') !== null && JSON.parse(localStorage.getItem('user') as string).type === "doctor");
  }, []);

  var sock = new SockJS(`${url}/activity`);

  useEffect(() => {

    let person = localStorage.getItem('user') !== null && JSON.parse(localStorage.getItem('user') as string);

    if (person.type === "caregiver") {

      let stompClient = Stomp.over(sock);
      sock.onopen = function () {
        console.log('open');
      }

      stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);

        stompClient.subscribe("/topic/app", function (greeting) {

          let message: WebSocketMessages = JSON.parse(greeting.body);

          verifyPatientOfCargiver(message.personId, patientList) && alert(message.message);
        });
      });
    }

  }, [patientList, sock]);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, patientList.length - page * rowsPerPage);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = (personId: string) => {
    setOpen(personId);
  };

  const handleAddMedicationPlan = (personId: string) => {
    console.log("Add med plan: " + personId);
    setOpenAddMedPlanForm(personId);
  };

  const handleEditPatient = (patient: PersonWithId) => {
    console.log("patient:");
    console.log(patient);

    setEditPage(<EditPatientForm
      open={true}
      setOpen={setOpenEditForm}
      personType='patient'
      person={patient}
    />)
  };

  const handleDeletePatient = (personId: string, personType: string) => {
    deletePatient(personId)
    window.location.reload();
  };

  const handleAssignCaregiver = (personId: string) => {
    console.log("Assign caregiver: " + personId);
    setOpenAssignC(personId);
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: '3em' }}>Patients List</h1>

      {editPage}

      <AddMedPlanForm
        open={openAddMedPlanForm}
        setOpen={setOpenAddMedPlanForm}
      />

      <AssignCaregiver
        open={openAssignC}
        setOpen={setOpenAssignC}
      />

      <MedPlanPopup
        personId={open}
        setOpen={setOpen}
        titleColor={titleColor}
        backgroundStyle={backgroundStyle}
        titleBackground={titleBackground}
        buttColor={buttColor}
      />

      <TableContainer component={Paper} className={backgroundColor}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.text}>Firstname</TableCell>
              <TableCell className={classes.text}>Lastname</TableCell>
              <TableCell className={classes.text}>Address</TableCell>
              <TableCell className={classes.text}>Birthdate</TableCell>
              <TableCell className={classes.text}>Gender</TableCell>
              <TableCell />
              {doctor &&
                <>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                </>
              }
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? patientList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : patientList
            ).map((patient) => (
              <TableRow key={patient.id}>
                <TableCell scope="row" className={classes.text}>
                  {patient.firstname}
                </TableCell>

                <TableCell className={classes.text} style={{ minWidth: 70 }}>
                  {patient.lastname}
                </TableCell>

                <TableCell className={classes.text} style={{ maxWidth: 190 }}>
                  {patient.address}
                </TableCell>

                <TableCell className={classes.text} style={{ minWidth: 80 }}>
                  {patient.birth_date}
                </TableCell>

                <TableCell className={classes.text} style={{ minWidth: 70 }}>
                  {patient.gender}
                </TableCell>

                <TableCell align="right" className={classes.butt} style={{ minWidth: 140 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={`${classesButton.baseButton} ${classesButton.btn2}`}
                    onClick={() => handleClickOpen(patient.id)}
                  >
                    Med. Plans
                  </Button>
                </TableCell>

                {doctor &&
                  <>
                    <TableCell align="right" className={classes.butt} style={{ minWidth: 140 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={`${classesButton.baseButton} ${classesButton.btn2}`}
                        onClick={() => handleAddMedicationPlan(patient.id)}
                      >
                        Add med. plan
                      </Button>
                    </TableCell>

                    <TableCell align="right" className={classes.butt} style={{ minWidth: 140 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={`${classesButton.baseButton} ${classesButton.btn2}`}
                        onClick={() => handleAssignCaregiver(patient.id)}
                      >
                        Assign Caregiver
                      </Button>
                    </TableCell>

                    <TableCell align="right" className={classes.butt} style={{ minWidth: 140 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={`${classesButton.baseButton} ${classesButton.btn2}`}
                        onClick={() => handleEditPatient(patient)}
                      >
                        Edit
                      </Button>
                    </TableCell>

                    <TableCell align="right" className={classes.butt} style={{ minWidth: 140 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={`${classesButton.baseButton} ${classesButton.btn2}`}
                        onClick={() => handleDeletePatient(patient.id, patient.type)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </>
                }
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
                count={patientList.length}
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
    deletePatient: (personId: string) => dispatch(deletePatient(personId)),
  }
}

export default connect(null, mapDispatchToProps)(PatientList);