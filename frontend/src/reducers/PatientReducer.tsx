import { SAVE_PATIENT_REQUEST, SAVE_PATIENT_SUCCESS, SAVE_PATIENT_FAILURE, DELETE_PATIENT_FAILURE, DELETE_PATIENT_REQUEST, DELETE_PATIENT_SUCCESS, UPDATE_PATIENT_FAILURE, UPDATE_PATIENT_REQUEST, UPDATE_PATIENT_SUCCESS, ASSIGN_CAREGIVER_FAILURE, ASSIGN_CAREGIVER_REQUEST, ASSIGN_CAREGIVER_SUCCESS } from "../types/PatientTypes"

export interface PatientState {
  loading: boolean,
  error: boolean,
  loadingEdit: boolean,
  errorEdit: boolean,

  loadingAssignC: boolean,
  errorAssignC: boolean
}

const initialState: PatientState = {
  loading: false,
  error: false,
  loadingEdit: false,
  errorEdit: false,

  loadingAssignC: false,
  errorAssignC: false
}

const patientReducer = (state = initialState, action: { type: string }) => {
  switch (action.type) {
    case SAVE_PATIENT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SAVE_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      }
    case SAVE_PATIENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    case DELETE_PATIENT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      }
    case DELETE_PATIENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    case UPDATE_PATIENT_REQUEST:
      return {
        ...state,
        loadingEdit: true
      }
    case UPDATE_PATIENT_SUCCESS:
      return {
        ...state,
        loadingEdit: false,
        errorEdit: false
      }
    case UPDATE_PATIENT_FAILURE:
      return {
        ...state,
        loadingEdit: false,
        errorEdit: true
      }
    case ASSIGN_CAREGIVER_REQUEST:
      return {
        ...state,
        loadingAssignC: true
      }
    case ASSIGN_CAREGIVER_SUCCESS:
      return {
        ...state,
        loadingAssignC: false,
        errorAssignC: false
      }
    case ASSIGN_CAREGIVER_FAILURE:
      return {
        ...state,
        loadingAssignC: false,
        errorAssignC: true
      }
    default: return state
  }
}

export default patientReducer