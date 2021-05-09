import { SideEffect, SideEffectsListWithMedicationId, SideEffectWithId } from "../model/models"
import { SAVE_SIDE_EFFECT, SAVE_SIDE_EFFECT_REQUEST, SAVE_SIDE_EFFECT_SUCCESS, SAVE_SIDE_EFFECT_FAILURE, GET_SIDE_EFFECTS_LIST, GET_SIDE_EFFECTS_LIST_FAILURE, GET_SIDE_EFFECTS_LIST_REQUEST, GET_SIDE_EFFECTS_LIST_SUCCESS, SAVE_SIDE_EFFECTS_LIST, SAVE_SIDE_EFFECTS_LIST_FAILURE, SAVE_SIDE_EFFECTS_LIST_REQUEST, SAVE_SIDE_EFFECTS_LIST_SUCCESS, GET_SIDE_EFFECTS_OF_MEDICINE, GET_SIDE_EFFECTS_OF_MEDICINE_FAILURE, GET_SIDE_EFFECTS_OF_MEDICINE_REQUEST, GET_SIDE_EFFECTS_OF_MEDICINE_SUCCESS } from "../types/SideEffectTypes"

export const saveSideEffect = (sideEffect: SideEffect) => {
  return {
    type: SAVE_SIDE_EFFECT,
    payload: sideEffect
  }
}

export const saveSideEffectsList = (sideEffectsListWithMedicationId: SideEffectsListWithMedicationId) => {
  return {
    type: SAVE_SIDE_EFFECTS_LIST,
    payload: sideEffectsListWithMedicationId
  }
}

export const getSideEffectsList = () => {
  return {
    type: GET_SIDE_EFFECTS_LIST,
  }
}

export const getSideEffectsListOfMedicine = (medicineId: string) => {
  return {
    type: GET_SIDE_EFFECTS_OF_MEDICINE,
    payload: medicineId
  }
}

//--------------------------------------------- SAVE SIDE EFFECT
export const saveSideEffectRequest = () => {
  return {
    type: SAVE_SIDE_EFFECT_REQUEST,
  }
}

export const saveSideEffectSuccess = () => {
  return {
    type: SAVE_SIDE_EFFECT_SUCCESS,
  }
}

export const saveSideEffectFailure = () => {
  return {
    type: SAVE_SIDE_EFFECT_FAILURE,
  }
}

//--------------------------------------------- SAVE SIDE EFFECTS LIST FOR MEDICATION
export const saveSideEffectsListRequest = () => {
  return {
    type: SAVE_SIDE_EFFECTS_LIST_REQUEST,
  }
}

export const saveSideEffectsListSuccess = () => {
  return {
    type: SAVE_SIDE_EFFECTS_LIST_SUCCESS,
  }
}

export const saveSideEffectsListFailure = () => {
  return {
    type: SAVE_SIDE_EFFECTS_LIST_FAILURE,
  }
}

//--------------------------------------------- GET SIDE_EFFECTS_LIST
export const getSideEffectsListRequest = () => {
  return {
    type: GET_SIDE_EFFECTS_LIST_REQUEST,
  }
}

export const getSideEffectsListSuccess = (sideEffectsList : SideEffectWithId[]) => {
  return {
    type: GET_SIDE_EFFECTS_LIST_SUCCESS,
    payload : sideEffectsList
  }
}

export const getSideEffectsListFailure = () => {
  return {
    type: GET_SIDE_EFFECTS_LIST_FAILURE,
  }
}

//--------------------------------------------- GET SIDE_EFFECTS_ of med id
export const getSideEffectsOfMedicineRequest = () => {
  return {
    type: GET_SIDE_EFFECTS_OF_MEDICINE_REQUEST,
  }
}

export const getSideEffectsOfMedicineSuccess = (sideEffectsList : SideEffectWithId[]) => {
  return {
    type: GET_SIDE_EFFECTS_OF_MEDICINE_SUCCESS,
    payload : sideEffectsList
  }
}

export const getSideEffectsOfMedicineFailure = () => {
  return {
    type: GET_SIDE_EFFECTS_OF_MEDICINE_FAILURE,
  }
}