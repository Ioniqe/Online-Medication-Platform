import { Medication, MedicationWithId } from "../model/models"
import { SAVE_MEDICATION, SAVE_MEDICATION_REQUEST, SAVE_MEDICATION_SUCCESS, SAVE_MEDICATION_FAILURE, DELETE_MEDICATION, DELETE_MEDICATION_FAILURE, DELETE_MEDICATION_REQUEST, DELETE_MEDICATION_SUCCESS, UPDATE_MEDICATION, UPDATE_MEDICATION_FAILURE, UPDATE_MEDICATION_REQUEST, UPDATE_MEDICATION_SUCCESS } from "../types/MedicineTypes"

export const saveMedicine = (medication: Medication) => {
  return {
    type: SAVE_MEDICATION,
    payload: medication
  }
}

export const updateMedicine = (medication: MedicationWithId) => {
  return {
    type: UPDATE_MEDICATION,
    payload: medication
  }
}

export const deleteMedicine = (medicationId: string) => {
  return {
    type: DELETE_MEDICATION,
    payload: medicationId
  }
}

//--------------------------------------------- SAVE MEDICATION
export const saveMedicineRequest = () => {
  return {
    type: SAVE_MEDICATION_REQUEST,
  }
}

export const saveMedicineSuccess = (medicationId : string) => {
  return {
    type: SAVE_MEDICATION_SUCCESS,
    payload: medicationId
  }
}

export const saveMedicineFailure = () => {
  return {
    type: SAVE_MEDICATION_FAILURE,
  }
}

//--------------------------------------------- UPDATE MEDICATION
export const updateMedicineRequest = () => {
  return {
    type: UPDATE_MEDICATION_REQUEST,
  }
}

export const updateMedicineSuccess = () => {
  return {
    type: UPDATE_MEDICATION_SUCCESS,
  }
}

export const updateMedicineFailure = () => {
  return {
    type: UPDATE_MEDICATION_FAILURE,
  }
}

//--------------------------------------------- DELETE MEDICATION
export const deleteMedicineRequest = () => {
  return {
    type: DELETE_MEDICATION_REQUEST,
  }
}

export const deleteMedicineSuccess = () => {
  return {
    type: DELETE_MEDICATION_SUCCESS,
  }
}

export const deleteMedicineFailure = () => {
  return {
    type: DELETE_MEDICATION_FAILURE,
  }
}