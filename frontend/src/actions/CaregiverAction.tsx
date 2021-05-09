import { Person, PersonWithId } from '../model/models';
import { GET_CAREGIVERS, GET_CAREGIVERS_REQUEST, GET_CAREGIVERS_SUCCESS, GET_CAREGIVERS_FAILURE, DELETE_CAREGIVER, DELETE_CAREGIVER_FAILURE, DELETE_CAREGIVER_REQUEST, DELETE_CAREGIVER_SUCCESS, SAVE_CAREGIVER, SAVE_CAREGIVER_FAILURE, SAVE_CAREGIVER_REQUEST, SAVE_CAREGIVER_SUCCESS, UPDATE_CAREGIVER, UPDATE_CAREGIVER_FAILURE, UPDATE_CAREGIVER_REQUEST, UPDATE_CAREGIVER_SUCCESS } from '../types/CaregiverTypes';

export const getCaregiversList = () => {
  return {
    type: GET_CAREGIVERS,
  }
}

export const deleteCaregiver = (personId: string) => {
  return {
    type: DELETE_CAREGIVER,
    payload: personId
  }
}

export const saveCaregiver = (person: Person) => {
  return {
    type: SAVE_CAREGIVER,
    payload: person
  }
}

export const editCaregiver = (person: PersonWithId) => {
  return {
    type: UPDATE_CAREGIVER,
    payload: person
  }
}

//--------------------------------------------- GET CAREGIVERS
export const getCaregiversRequest = () => {
  return {
    type: GET_CAREGIVERS_REQUEST,
  }
}

export const getCaregiversSuccess = (people : PersonWithId[]) => {
  return {
    type: GET_CAREGIVERS_SUCCESS,
    payload : people
  }
}

export const getCaregiversFailure = () => {
  return {
    type: GET_CAREGIVERS_FAILURE,
  }
}

//--------------------------------------------- DELETE CAREGIVER
export const deleteCaregiverRequest = () => {
  return {
    type: DELETE_CAREGIVER_REQUEST,
  }
}

export const deleteCaregiverSuccess = () => {
  return {
    type: DELETE_CAREGIVER_SUCCESS,
  }
}

export const deleteCaregiverFailure = () => {
  return {
    type: DELETE_CAREGIVER_FAILURE,
  }
}

//--------------------------------------------- SAVE CAREGIVER
export const saveCaregiverRequest = () => {
  return {
    type: SAVE_CAREGIVER_REQUEST,
  }
}

export const saveCaregiverSuccess = () => {
  return {
    type: SAVE_CAREGIVER_SUCCESS,
  }
}

export const saveCaregiverFailure = () => {
  return {
    type: SAVE_CAREGIVER_FAILURE,
  }
}

//--------------------------------------------- UPDATE CAREGIVER
export const editCaregiverRequest = () => {
  return {
    type: UPDATE_CAREGIVER_REQUEST,
  }
}

export const editCaregiverSuccess = () => {
  return {
    type: UPDATE_CAREGIVER_SUCCESS,
  }
}

export const editCaregiverFailure = () => {
  return {
    type: UPDATE_CAREGIVER_FAILURE,
  }
}


