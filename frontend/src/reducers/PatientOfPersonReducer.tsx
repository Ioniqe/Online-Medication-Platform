import { PersonWithId } from "../model/models"
import { GET_PATIENTS_OF_CAREGIVER_REQUEST, GET_PATIENTS_OF_CAREGIVER_SUCCESS, GET_PATIENTS_OF_CAREGIVER_FAILURE } from "../types/PatientOfCaregiverTypes"
import { GET_PATIENTS_OF_DOCTOR_REQUEST, GET_PATIENTS_OF_DOCTOR_SUCCESS, GET_PATIENTS_OF_DOCTOR_FAILURE } from "../types/PatientOfDoctorTypes"

export interface PatientOfPersonState {
  loading: boolean,
  people: PersonWithId[],
  error: boolean,
}

const initialState: PatientOfPersonState = {
  loading: false,
  people: [],
  error: false,
}

const patientOfPersonReducer = (state = initialState, action: { type: string, payload: PersonWithId[] }) => {
  switch (action.type) {
    case GET_PATIENTS_OF_CAREGIVER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_PATIENTS_OF_CAREGIVER_SUCCESS:
      return {
        loading: false,
        people: action.payload,
        error: false
      }
    case GET_PATIENTS_OF_CAREGIVER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    case GET_PATIENTS_OF_DOCTOR_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_PATIENTS_OF_DOCTOR_SUCCESS:
      return {
        loading: false,
        people: action.payload,
        error: false
      }
    case GET_PATIENTS_OF_DOCTOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    default: return state
  }
}

export default patientOfPersonReducer