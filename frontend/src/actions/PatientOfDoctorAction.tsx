import { PersonWithId } from '../model/models';
import { GET_PATIENTS_OF_DOCTOR, GET_PATIENTS_OF_DOCTOR_REQUEST, GET_PATIENTS_OF_DOCTOR_SUCCESS, GET_PATIENTS_OF_DOCTOR_FAILURE } from '../types/PatientOfDoctorTypes';

export const getPatientsOfDoctor = (personId: string) => {
  return {
    type: GET_PATIENTS_OF_DOCTOR,
    payload: personId
  }
}

//--------------------------------------------- GET PATIENTS
export const getPatientsOfDoctorRequest = () => {
  return {
    type: GET_PATIENTS_OF_DOCTOR_REQUEST,
  }
}

export const getPatientsOfDoctorSuccess = (people : PersonWithId[]) => {
  return {
    type: GET_PATIENTS_OF_DOCTOR_SUCCESS,
    payload : people
  }
}

export const getPatientsOfDoctorFailure = () => {
  return {
    type: GET_PATIENTS_OF_DOCTOR_FAILURE,
  }
}




