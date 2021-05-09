import { CreateMedPlanInterface, MedPlanWithIntervals } from "../model/models"
import { CREATE_MED_PLAN, CREATE_MED_PLAN_FAILURE, CREATE_MED_PLAN_REQUEST, CREATE_MED_PLAN_SUCCESS, GET_MED_PLANS, GET_MED_PLANS_FAILURE, GET_MED_PLANS_REQUEST, GET_MED_PLANS_SUCCESS } from "../types/MedPlanTypes"

export const getMedPlans = (personId: string) => { //personId of patient
  return {
    type: GET_MED_PLANS,
    payload: personId
  }
}

export const createMedPlan = (medPlan: CreateMedPlanInterface) => { //personId of patient
  return {
    type: CREATE_MED_PLAN,
    payload: medPlan
  }
}

//--------------------------------------------- GET MED PLANS
export const getMedPlansRequest = () => {
  return {
    type: GET_MED_PLANS_REQUEST,
  }
}

export const getMedPlansSuccess = (medPlans : MedPlanWithIntervals[]) => {
  return {
    type: GET_MED_PLANS_SUCCESS,
    payload : medPlans
  }
}

export const getMedPlansFailure = () => {
  return {
    type: GET_MED_PLANS_FAILURE,
  }
}

//--------------------------------------------- GET MED PLANS
export const createMedPlanRequest = () => {
  return {
    type: CREATE_MED_PLAN_REQUEST,
  }
}

export const createMedPlanSuccess = (medPlanId : string) => {
  return {
    type: CREATE_MED_PLAN_SUCCESS,
    payload : medPlanId
  }
}

export const createMedPlanFailure = () => {
  return {
    type: CREATE_MED_PLAN_FAILURE,
  }
}
