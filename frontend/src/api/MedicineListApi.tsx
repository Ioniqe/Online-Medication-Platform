import { AddMedicineToMedListInterface, CreateMedListInterface, url } from "../model/models"
import { securityToken } from "../utils/securityToken"

export const getMedsWithSideEffectsListsAPI = (medPlanId: string) => {
  return fetch(`${url}/medicines_w_sideEffects/med_plan/${medPlanId}`, { 
    method: 'GET',
    headers: {
      'Authorization': securityToken(),
    },
  }).then(response => response.json())
}

export const getMedicinesAPI = () => {
  return fetch(`${url}/medicines`, { 
    method: 'GET',
    headers: {
      'Authorization': securityToken(),
    },
  }).then(response => response.json())
}

export const createMedListAPI = (medList: CreateMedListInterface) => {
  return fetch(`${url}/med_list/new/${medList.medPlanId}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': securityToken(),
    },
    body: JSON.stringify(medList.medList)
  }).then(response => response.json())
}

export const addMedicineToMedListAPI = (medList: AddMedicineToMedListInterface) => {
  return fetch(`${url}/med_list/add_medicine_list/${medList.medListId}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': securityToken(),
    },
    body: JSON.stringify(medList.medicines)
  }).then(response => response.json())
}