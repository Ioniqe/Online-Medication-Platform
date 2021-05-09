import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { getPatientsOfDoctor } from "../../actions/PatientOfDoctorAction";
import { PersonWithId } from "../../model/models";
import { useStyles2 } from "../../styles/doctorStyles";
import { useLoginStyles } from "../../styles/loginStyles";
import PatientList from "../caregiver/PatientList";
import NewPatientForm from "./NewPersonTypeForm";

interface Props {
  getPatientsList: (personId: string) => void,
  patientsList: {
    loading: boolean,
    people: PersonWithId[],
    error: boolean,
  },
}

function DoctorPatientList({ getPatientsList, patientsList }: Props) {
  const classes = useStyles2();
  const classesButton = useLoginStyles();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    let doctor = localStorage.getItem('user') !== null && JSON.parse(localStorage.getItem('user') as string);
    getPatientsList(doctor.id)
  }, [getPatientsList])

  let display = patientsList.loading ? <h1>Loading</h1> : (patientsList.error ? <h1>Error</h1> :
    <PatientList patientList={patientsList.people} backgroundColor={classes.paperStylePatientsList}
      titleColor={classes.titleText} backgroundStyle={classes.titleBackgroundColorDoctor}
      titleBackground={classes.titleBackgroundColorDoctor} buttColor={classes.buttColorDoctor} />)

  let handleNewPatient = (): void => {
    setOpen(true);
  }

  return (
    <>
      <NewPatientForm
        open={open}
        setOpen={setOpen}
        personType= 'patient'
      />

      {display}
      <div style={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          className={`${classesButton.baseButton} ${classesButton.btn1}`}
          onClick={() => handleNewPatient()}
          style={{
            width: '150px',
          }}
        >
          New Patient
        </Button>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    patientsList: state.patientOfPerson //from rootReducer
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getPatientsList: (personId: string) => dispatch(getPatientsOfDoctor(personId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorPatientList);