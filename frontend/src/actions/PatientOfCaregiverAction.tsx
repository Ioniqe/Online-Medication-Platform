import { PersonWithId } from '../model/models';
import { GET_PATIENTS_OF_CAREGIVER, GET_PATIENTS_OF_CAREGIVER_REQUEST, GET_PATIENTS_OF_CAREGIVER_SUCCESS, GET_PATIENTS_OF_CAREGIVER_FAILURE } from '../types/PatientOfCaregiverTypes';

export const getPatientsOfCaregiver = (personId: string) => {
  return {
    type: GET_PATIENTS_OF_CAREGIVER,
    payload: personId
  }
}

//--------------------------------------------- GET PATIENTS
export const getPatientsOfCaregiverRequest = () => {
  return {
    type: GET_PATIENTS_OF_CAREGIVER_REQUEST,
  }
}

export const getPatientsOfCaregiverSuccess = (people : PersonWithId[]) => {
  return {
    type: GET_PATIENTS_OF_CAREGIVER_SUCCESS,
    payload : people
  }
}

export const getPatientsOfCaregiverFailure = () => {
  return {
    type: GET_PATIENTS_OF_CAREGIVER_FAILURE,
  }
}


