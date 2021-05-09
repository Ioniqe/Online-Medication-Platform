import { PersonWithId } from "../model/models"
import { GET_CAREGIVERS_REQUEST, GET_CAREGIVERS_SUCCESS, GET_CAREGIVERS_FAILURE, DELETE_CAREGIVER_FAILURE, DELETE_CAREGIVER_REQUEST, DELETE_CAREGIVER_SUCCESS, SAVE_CAREGIVER_FAILURE, SAVE_CAREGIVER_REQUEST, SAVE_CAREGIVER_SUCCESS, UPDATE_CAREGIVER_FAILURE, UPDATE_CAREGIVER_REQUEST, UPDATE_CAREGIVER_SUCCESS } from "../types/CaregiverTypes"

export interface CaregiverState {
  loading: boolean,
  people: PersonWithId[],
  error: boolean,

  loadingEdit: boolean,
  errorEdit: boolean,
}

const initialState: CaregiverState = {
  loading: false,
  people: [],
  error: false,

  loadingEdit: false,
  errorEdit: false,
}

const caregiverReducer = (state = initialState, action: { type: string, payload: PersonWithId[] }) => {
  switch (action.type) {
    case GET_CAREGIVERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_CAREGIVERS_SUCCESS:
      return {
        loading: false,
        people: action.payload,
        error: false
      }
    case GET_CAREGIVERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    //---------------------------
    case DELETE_CAREGIVER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_CAREGIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      }
    case DELETE_CAREGIVER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    //--------------------------
    case SAVE_CAREGIVER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SAVE_CAREGIVER_SUCCESS:
      return {
        loading: false,
        error: false
      }
    case SAVE_CAREGIVER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    //--------------------------
    case UPDATE_CAREGIVER_REQUEST:
      return {
        ...state,
        loadingEdit: true
      }
    case UPDATE_CAREGIVER_SUCCESS:
      return {
        loadingEdit: false,
        errorEdit: false
      }
    case UPDATE_CAREGIVER_FAILURE:
      return {
        ...state,
        loadingEdit: false,
        errorEdit: true
      }
    default: return state
  }
}

export default caregiverReducer