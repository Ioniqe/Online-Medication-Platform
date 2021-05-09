import { MedicationWithId, SideEffectWithId } from "../model/models"
import { SAVE_SIDE_EFFECT_REQUEST, SAVE_SIDE_EFFECT_SUCCESS, SAVE_SIDE_EFFECT_FAILURE, GET_SIDE_EFFECTS_LIST_FAILURE, GET_SIDE_EFFECTS_LIST_REQUEST, GET_SIDE_EFFECTS_LIST_SUCCESS, SAVE_SIDE_EFFECTS_LIST_FAILURE, SAVE_SIDE_EFFECTS_LIST_REQUEST, SAVE_SIDE_EFFECTS_LIST_SUCCESS, GET_SIDE_EFFECTS_OF_MEDICINE_REQUEST, GET_SIDE_EFFECTS_OF_MEDICINE_FAILURE, GET_SIDE_EFFECTS_OF_MEDICINE_SUCCESS } from "../types/SideEffectTypes"

export interface SideEffectState {
  loading: boolean,
  sideEffects: SideEffectWithId[]
  error: boolean,

  loadingSave: boolean,
  saved: boolean,
  errorSave: boolean,

  loadingSideEffsOfMed: boolean,
  sideEffsOfMed: SideEffectWithId[],
  errorSideEffsOfMed: boolean,
}

const initialState: SideEffectState = {
  loading: false,
  sideEffects: [],
  error: false,

  loadingSave: false,
  saved: false,
  errorSave: false,

  loadingSideEffsOfMed: false,
  sideEffsOfMed: [],
  errorSideEffsOfMed: false,
}

const sideEffectReducer = (state = initialState, action: { type: string, payload: SideEffectWithId[] }) => {
  switch (action.type) {
    case SAVE_SIDE_EFFECT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SAVE_SIDE_EFFECT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      }
    case SAVE_SIDE_EFFECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    //---------------------------------
    case SAVE_SIDE_EFFECTS_LIST_REQUEST:
      return {
        ...state,
        loadingSave: true
      }
    case SAVE_SIDE_EFFECTS_LIST_SUCCESS:
      return {
        ...state,
        loadingSave: false,
        saved: true,
        errorSave: false
      }
    case SAVE_SIDE_EFFECTS_LIST_FAILURE:
      return {
        ...state,
        loadingSave: false,
        errorSave: true
      }
    //----------------------------------
    case GET_SIDE_EFFECTS_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_SIDE_EFFECTS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        sideEffects: action.payload,
        error: false
      }
    case GET_SIDE_EFFECTS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    //----------------------------------
    case GET_SIDE_EFFECTS_OF_MEDICINE_REQUEST:
      return {
        ...state,
        loadingSideEffsOfMed: true
      }
    case GET_SIDE_EFFECTS_OF_MEDICINE_SUCCESS:
      return {
        ...state,
        loadingSideEffsOfMed: false,
        sideEffsOfMed: action.payload,
        errorSideEffsOfMed: false
      }
    case GET_SIDE_EFFECTS_OF_MEDICINE_FAILURE:
      return {
        ...state,
        loadingSideEffsOfMed: false,
        errorSideEffsOfMed: true
      }
    default: return state
  }
}

export default sideEffectReducer