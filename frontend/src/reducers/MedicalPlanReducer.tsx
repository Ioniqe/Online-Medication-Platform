import { MedPlanWithIntervals } from "../model/models"
import { GET_MED_PLANS_REQUEST, GET_MED_PLANS_SUCCESS, GET_MED_PLANS_FAILURE, CREATE_MED_PLAN_FAILURE, CREATE_MED_PLAN_REQUEST, CREATE_MED_PLAN_SUCCESS } from "../types/MedPlanTypes";

export interface CaregiverState {
  medPlansLoading: boolean,
  medPlans: MedPlanWithIntervals[],
  medPlansError: boolean,

  loadingCreate: boolean,
  createdMedPlanId: string,
  errorCreate: boolean,  
}

const initialState: CaregiverState = {
  medPlansLoading: false,
  medPlans: [],
  medPlansError: false,

  loadingCreate: false,
  createdMedPlanId: "",
  errorCreate: false,  
}

const medicalPlanReducer = (state = initialState, action: { type: string, payload: MedPlanWithIntervals[] | string}) => {
  switch (action.type) {
    case GET_MED_PLANS_REQUEST:
      return {
        ...state,
        medPlansLoading: true
      }
    case GET_MED_PLANS_SUCCESS:
      return {
        ...state,
        medPlansLoading: false,
        medPlans: action.payload as MedPlanWithIntervals[],
        medPlansError: false
      }
    case GET_MED_PLANS_FAILURE:
      return {
        ...state,
        medPlansLoading: false,
        medPlansError: true
      }
    //------------------------
    case CREATE_MED_PLAN_REQUEST:
      return {
        ...state,
        loadingCreate: true
      }
    case CREATE_MED_PLAN_SUCCESS:
      return {
        ...state,
        loadingCreate: false,
        createdMedPlanId: action.payload as string,
        errorCreate: false
      }
    case CREATE_MED_PLAN_FAILURE:
      return {
        ...state,
        loadingCreate: false,
        errorCreate: true
      }
    default: return state
  }
}

export default medicalPlanReducer