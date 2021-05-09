import { Medication, MedicationWithId } from "../model/models"
import { GET_MEDICINE_LIST_REQUEST, GET_MEDICINE_LIST_SUCCESS, GET_MEDICINE_LIST_FAILURE } from "../types/MedicineListTypes"
import { SAVE_MEDICATION_REQUEST, SAVE_MEDICATION_SUCCESS, SAVE_MEDICATION_FAILURE, DELETE_MEDICATION_FAILURE, DELETE_MEDICATION_REQUEST, DELETE_MEDICATION_SUCCESS, UPDATE_MEDICATION_FAILURE, UPDATE_MEDICATION_REQUEST, UPDATE_MEDICATION_SUCCESS } from "../types/MedicineTypes"

export interface MedicineState {
  loading: boolean,
  medicine: MedicationWithId[],
  error: boolean,

  loadingSaved: boolean,
  savedMedicationId: string,
  errorSaved: boolean,

  loadingDeleted: boolean, 
  errorDeleted: boolean,
  
  loadingUpdate: boolean, 
  errorUpdate: boolean, 
}

const initialState: MedicineState = {
  loading: false,
  medicine: [],
  error: false,

  loadingSaved: false,
  savedMedicationId: "",
  errorSaved: false,

  loadingDeleted: false, 
  errorDeleted: false, 

  loadingUpdate: false, 
  errorUpdate: false,
}

const medicineReducer = (state = initialState, action: { type: string, payload: MedicationWithId[] | string}) => {
  switch (action.type) {
    case GET_MEDICINE_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_MEDICINE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        medicine: action.payload as MedicationWithId[],
        error: false
      }
    case GET_MEDICINE_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    case SAVE_MEDICATION_REQUEST:
      return {
        ...state,
        loadingSaved: true
      }
    case SAVE_MEDICATION_SUCCESS:
      return {
        ...state,
        loadingSaved: false,
        savedMedicationId: action.payload as string,
        errorSaved: false
      }
    case SAVE_MEDICATION_FAILURE:
      return {
        ...state,
        loadingSaved: false,
        errorSaved: true
      }
    case UPDATE_MEDICATION_REQUEST:
      return {
        ...state,
        loadingUpdate: true
      }
    case UPDATE_MEDICATION_SUCCESS:
      return {
        ...state,
        loadingUpdate: false,
        errorUpdate: false
      }
    case UPDATE_MEDICATION_FAILURE:
      return {
        ...state,
        loadingUpdate: false,
        errorUpdate: true
      }
    case DELETE_MEDICATION_REQUEST:
      return {
        ...state,
        loadingDeleted: true
      }
    case DELETE_MEDICATION_SUCCESS:
      return {
        ...state,
        loadingDeleted: false,
        errorDeleted: false
      }
    case DELETE_MEDICATION_FAILURE:
      return {
        ...state,
        loadingDeleted: false,
        errorDeleted: true
      }
    default: return state
  }
}

export default medicineReducer