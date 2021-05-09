import { MedicationWithSideEffectsListWithId } from "../model/models"
import { GET_MED_LIST_W_SIDE_EFFECTS_REQUEST, GET_MED_LIST_W_SIDE_EFFECTS_SUCCESS, GET_MED_LIST_W_SIDE_EFFECTS_FAILURE, CREATE_MED_LIST_FAILURE, CREATE_MED_LIST_REQUEST, CREATE_MED_LIST_SUCCESS, ADD_MEDICINE_TO_MED_LIST_FAILURE, ADD_MEDICINE_TO_MED_LIST_REQUEST, ADD_MEDICINE_TO_MED_LIST_SUCCESS } from "../types/MedicineListTypes"

export interface CaregiverState {
  loading: boolean,
  meds: MedicationWithSideEffectsListWithId[],
  error: boolean,

  loadingCreate: boolean,
  createdMedListId: string,
  errorCreate: boolean, 

  loadingAddMedicine: boolean,
  successfulAdd: boolean,
  errorAddMedicine: boolean, 
}

const initialState: CaregiverState = {
  loading: false,
  meds: [],
  error: false,

  loadingCreate: false,
  createdMedListId: "",
  errorCreate: false,  

  loadingAddMedicine: false,
  successfulAdd: false,
  errorAddMedicine: false,
}

const medicineListReducer = (state = initialState, action: { type: string, payload: MedicationWithSideEffectsListWithId[] | string}) => {
  switch (action.type) {
    case GET_MED_LIST_W_SIDE_EFFECTS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_MED_LIST_W_SIDE_EFFECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        meds: action.payload as MedicationWithSideEffectsListWithId[],
        error: false
      }
    case GET_MED_LIST_W_SIDE_EFFECTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    //------------------------
    case CREATE_MED_LIST_REQUEST:
      return {
        ...state,
        loadingCreate: true
      }
    case CREATE_MED_LIST_SUCCESS:
      return {
        ...state,
        loadingCreate: false,
        createdMedListId: action.payload as string,
        errorCreate: false
      }
    case CREATE_MED_LIST_FAILURE:
      return {
        ...state,
        loadingCreate: false,
        errorCreate: true
      }
    //------------------------
    case ADD_MEDICINE_TO_MED_LIST_REQUEST:
      return {
        ...state,
        loadingAddMedicine: true
      }
    case ADD_MEDICINE_TO_MED_LIST_SUCCESS:
      return {
        ...state,
        loadingAddMedicine: false,
        successfulAdd: true,
        errorAddMedicine: false
      }
    case ADD_MEDICINE_TO_MED_LIST_FAILURE:
      return {
        ...state,
        loadingAddMedicine: false,
        errorAddMedicine: true
      }
    default: return state
  }
}

export default medicineListReducer