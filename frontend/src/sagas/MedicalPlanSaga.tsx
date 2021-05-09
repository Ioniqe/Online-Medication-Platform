import { call, put, takeLatest } from "redux-saga/effects";
import { getMedPlansRequest, getMedPlansSuccess, getMedPlansFailure, createMedPlanFailure, createMedPlanRequest, createMedPlanSuccess } from "../actions/MedicalPlanActions";
import { createMedPlanAPI, getMedPlansAPI } from "../api/MedicalPlanApi";
import { CreateMedPlanInterface, MedPlanWithIntervals } from "../model/models";
import { CREATE_MED_PLAN, GET_MED_PLANS } from "../types/MedPlanTypes";

interface Props {
  type: string,
  payload: string | CreateMedPlanInterface
} 

//--------------------------get med plans
function* getMedPlansAsync(props: Props) {
  try {
    yield put(getMedPlansRequest());
    const medPlans = yield call(() => getMedPlansAPI(props.payload as string));
    yield put(getMedPlansSuccess(medPlans as MedPlanWithIntervals[]))
  } catch (e) {
    console.log("err");
    yield put(getMedPlansFailure())
  }
}

export function* getMedPlansWatcher() {
  yield takeLatest(GET_MED_PLANS, getMedPlansAsync)
}

//--------------------------create med plan
function* createMedPlanAsync(props: Props) {
  try {
    yield put(createMedPlanRequest());
    const medPlanId = yield call(() => createMedPlanAPI(props.payload as CreateMedPlanInterface));
    yield put(createMedPlanSuccess(medPlanId as string))
  } catch (e) {
    console.log("err");
    yield put(createMedPlanFailure())
  }
}

export function* createMedPlanWatcher() {
  yield takeLatest(CREATE_MED_PLAN, createMedPlanAsync)
}