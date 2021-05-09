import { SideEffect, SideEffectsListWithMedicationId, SideEffectWithId, url } from "../model/models"
import { securityToken } from "../utils/securityToken"

export const saveSideEffectAPI = (sideEffect: SideEffect) => {
  return fetch(`${url}/side_effect/new`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': securityToken(),
    },
    body: JSON.stringify(sideEffect)
  }).then(response => response.json())
}

export const saveSideEffectsListForMedicineAPI = (medicationWithSideEffectList :  SideEffectsListWithMedicationId) => {
  return fetch(`${url}/side_effects_list/${medicationWithSideEffectList.id}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': securityToken(),
    },
    body: JSON.stringify(medicationWithSideEffectList.sideEffectsList)
  }).then(response => response.json())
}

export const getSideEffectsListAPI = () => {
  return fetch(`${url}/side_effects`, { 
    method: 'GET',
    headers: {
      'Authorization': securityToken(),
    },
  }).then(response => response.json())
}

export const getSideEffectsOfMedicineAPI = (medicineId: string) => {
  return fetch(`${url}/side_effects/medicine/${medicineId}`, { 
    method: 'GET',
    headers: {
      'Authorization': securityToken(),
    },
  }).then(response => response.json())
}