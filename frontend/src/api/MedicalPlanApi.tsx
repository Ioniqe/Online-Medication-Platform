import { CreateMedPlanInterface, url } from "../model/models"
import { securityToken } from "../utils/securityToken"

export const getMedPlansAPI = (personId: string) => {
  console.log(securityToken());

  return fetch(`${url}/med_plans/${personId}`, { 
    method: 'GET',
    headers: {
      'Authorization': securityToken(),
    },
  }).then(response => response.json())
}

export const createMedPlanAPI = (medPlan: CreateMedPlanInterface) => {
  console.log(securityToken());

  return fetch(`${url}/med_plan/new/${medPlan.patientPersonId}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': securityToken(),
    },
    body: JSON.stringify(medPlan.medPlan)
  }).then(response => response.json())
}
