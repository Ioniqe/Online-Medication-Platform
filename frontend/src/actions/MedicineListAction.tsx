import { AddMedicineToMedListInterface, CreateMedListInterface, MedicationWithId, MedicationWithSideEffectsListWithId } from "../model/models"
import { ADD_MEDICINE_TO_MED_LIST, ADD_MEDICINE_TO_MED_LIST_FAILURE, ADD_MEDICINE_TO_MED_LIST_REQUEST, ADD_MEDICINE_TO_MED_LIST_SUCCESS, CREATE_MED_LIST, CREATE_MED_LIST_FAILURE, CREATE_MED_LIST_REQUEST, CREATE_MED_LIST_SUCCESS, GET_MEDICINE_LIST, GET_MEDICINE_LIST_FAILURE, GET_MEDICINE_LIST_REQUEST, GET_MEDICINE_LIST_SUCCESS, GET_MED_LIST_W_SIDE_EFFECTS, GET_MED_LIST_W_SIDE_EFFECTS_FAILURE, GET_MED_LIST_W_SIDE_EFFECTS_REQUEST, GET_MED_LIST_W_SIDE_EFFECTS_SUCCESS } from "../types/MedicineListTypes"

export const getMedsWithSideEffects = (medPlan: string) => {
  return {
    type: GET_MED_LIST_W_SIDE_EFFECTS,
    payload: medPlan
  }
}

export const getMedicines = () => {
  return {
    type: GET_MEDICINE_LIST,
  }
}

export const createMedList = (medList: CreateMedListInterface) => {
  return {
    type: CREATE_MED_LIST,
    payload: medList
  }
}

export const addMedicineToMedList = (medicines: AddMedicineToMedListInterface) => {
  return {
    type: ADD_MEDICINE_TO_MED_LIST,
    payload: medicines
  }
}

//--------------------------------------------- GET MEDS WITH SIDE EFFECTS LISTS
export const getMedicinesWithSideEffectsListRequest = () => {
  return {
    type: GET_MED_LIST_W_SIDE_EFFECTS_REQUEST,
  }
}

export const getMedicinesWithSideEffectsListSuccess = (medsWSideEffs : MedicationWithSideEffectsListWithId[]) => {
  return {
    type: GET_MED_LIST_W_SIDE_EFFECTS_SUCCESS,
    payload : medsWSideEffs
  }
}

export const getMedicinesWithSideEffectsListFailure = () => {
  return {
    type: GET_MED_LIST_W_SIDE_EFFECTS_FAILURE,
  }
}

//--------------------------------------------- CREATE MEDICINE LIST
export const createMedListRequest = () => {
  return {
    type: CREATE_MED_LIST_REQUEST,
  }
}

export const createMedListSuccess = (medListId: string) => {
  return {
    type: CREATE_MED_LIST_SUCCESS,
    payload : medListId
  }
}

export const createMedListFailure = () => {
  return {
    type: CREATE_MED_LIST_FAILURE,
  }
}

//--------------------------------------------- GET MEDICINE LIST
export const getMedicinesRequest = () => {
  return {
    type: GET_MEDICINE_LIST_REQUEST,
  }
}

export const getMedicinesSuccess = (medicines : MedicationWithId[]) => {
  return {
    type: GET_MEDICINE_LIST_SUCCESS,
    payload : medicines
  }
}

export const getMedicinesFailure = () => {
  return {
    type: GET_MEDICINE_LIST_FAILURE,
  }
}

//--------------------------------------------- ADD MEDICINE TO MED LIST
export const addMedicineToMedListRequest = () => {
  return {
    type: ADD_MEDICINE_TO_MED_LIST_REQUEST,
  }
}

export const addMedicineToMedListSuccess = () => {
  return {
    type: ADD_MEDICINE_TO_MED_LIST_SUCCESS,
  }
}

export const addMedicineToMedListFailure = () => {
  return {
    type: ADD_MEDICINE_TO_MED_LIST_FAILURE,
  }
}