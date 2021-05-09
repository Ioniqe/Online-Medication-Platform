import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { getPatientsOfCaregiver } from "../../actions/PatientOfCaregiverAction";
import { PersonWithId } from "../../model/models";
import { useStyles2 } from "../../styles/caregiverStyles";
import PatientList from "./PatientList";

interface Props {
  getPatientsList: (personId: string) => void,
  patientsList: {
    loading: boolean,
    people: PersonWithId[],
    error: boolean,
  },
}

function CaregiverPatients({ getPatientsList, patientsList }: Props) {
  const classes = useStyles2();
  
  useEffect(() => {
    let caregiver = localStorage.getItem('user') !== null && JSON.parse(localStorage.getItem('user') as string);
    getPatientsList(caregiver.id)
  }, [getPatientsList])

  let display = patientsList.loading ? <h1>Loading</h1> : (patientsList.error ? <h1>Error</h1> :
    <PatientList patientList={patientsList.people} backgroundColor={classes.paperStylePatientsList}
      titleColor={classes.titleText} backgroundStyle={classes.titleBackgroundColorCaregiver}
      titleBackground={classes.titleBackgroundColorCaregiver} buttColor={classes.buttColorCaregiver}/>)

  return (
    <>
      {display}
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
    getPatientsList: (personId: string) => dispatch(getPatientsOfCaregiver(personId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaregiverPatients);