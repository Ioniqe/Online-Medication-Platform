import { PatientAndCaregiverIds, PersonWithDoctorId, PersonWithId } from "../model/models"
import { SAVE_PATIENT, SAVE_PATIENT_REQUEST, SAVE_PATIENT_SUCCESS, SAVE_PATIENT_FAILURE, DELETE_PATIENT, DELETE_PATIENT_FAILURE, DELETE_PATIENT_REQUEST, DELETE_PATIENT_SUCCESS, UPDATE_PATIENT, UPDATE_PATIENT_FAILURE, UPDATE_PATIENT_REQUEST, UPDATE_PATIENT_SUCCESS, ASSIGN_CAREGIVER, ASSIGN_CAREGIVER_FAILURE, ASSIGN_CAREGIVER_REQUEST, ASSIGN_CAREGIVER_SUCCESS } from "../types/PatientTypes"

export const savePatient = (newPatient: PersonWithDoctorId) => {
  return {
    type: SAVE_PATIENT,
    payload: newPatient
  }
}

export const deletePatient = (patientId: string) => {
  return {
    type: DELETE_PATIENT,
    payload: patientId
  }
}

export const editPatient = (patientToEdit: PersonWithId) => {
  return {
    type: UPDATE_PATIENT,
    payload: patientToEdit
  }
}

export const assignCaregiver = (ids: PatientAndCaregiverIds) => {
  return {
    type: ASSIGN_CAREGIVER,
    payload: ids
  }
}

//--------------------------------------------- SAVE PATIENT
export const savePatientRequest = () => {
  return {
    type: SAVE_PATIENT_REQUEST,
  }
}

export const savePatientSuccess = () => {
  return {
    type: SAVE_PATIENT_SUCCESS,
  }
}

export const savePatientFailure = () => {
  return {
    type: SAVE_PATIENT_FAILURE,
  }
}

//--------------------------------------------- DELETE PATIENT
export const deletePatientRequest = () => {
  return {
    type: DELETE_PATIENT_REQUEST,
  }
}

export const deletePatientSuccess = () => {
  return {
    type: DELETE_PATIENT_SUCCESS,
  }
}

export const deletePatientFailure = () => {
  return {
    type: DELETE_PATIENT_FAILURE,
  }
}

//--------------------------------------------- UPDATE PATIENT
export const editPatientRequest = () => {
  return {
    type: UPDATE_PATIENT_REQUEST,
  }
}

export const editPatientSuccess = () => {
  return {
    type: UPDATE_PATIENT_SUCCESS,
  }
}

export const editPatientFailure = () => {
  return {
    type: UPDATE_PATIENT_FAILURE,
  }
}

//--------------------------------------------- ASSIGN CAREGIVER
export const assignCaregiverRequest = () => {
  return {
    type: ASSIGN_CAREGIVER_REQUEST,
  }
}

export const assignCaregiverSuccess = () => {
  return {
    type: ASSIGN_CAREGIVER_SUCCESS,
  }
}

export const assignCaregiverFailure = () => {
  return {
    type: ASSIGN_CAREGIVER_FAILURE,
  }
}