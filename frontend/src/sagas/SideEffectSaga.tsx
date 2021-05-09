import { put, takeLatest, call } from "redux-saga/effects";
import { saveSideEffectRequest, saveSideEffectSuccess, saveSideEffectFailure, getSideEffectsListFailure, getSideEffectsListRequest, getSideEffectsListSuccess, saveSideEffectsListFailure, saveSideEffectsListRequest, saveSideEffectsListSuccess, getSideEffectsOfMedicineFailure, getSideEffectsOfMedicineRequest, getSideEffectsOfMedicineSuccess } from "../actions/SideEffectAction";
import { getSideEffectsListAPI, getSideEffectsOfMedicineAPI, saveSideEffectAPI, saveSideEffectsListForMedicineAPI } from "../api/SideEffectApi";
import { SideEffect, SideEffectsListWithMedicationId, SideEffectWithId } from "../model/models";
import { GET_SIDE_EFFECTS_LIST, GET_SIDE_EFFECTS_OF_MEDICINE, SAVE_SIDE_EFFECT, SAVE_SIDE_EFFECTS_LIST } from "../types/SideEffectTypes";

interface Props {
  type: string,
  payload: SideEffect | SideEffectsListWithMedicationId | string
} 

//----------------------save
function* saveSideEffectAsync(props: Props) {
  try {
    yield put(saveSideEffectRequest());
    yield call(() => saveSideEffectAPI(props.payload as SideEffect));
    yield put(saveSideEffectSuccess())
  } catch (e) {
    console.log("err");
    yield put(saveSideEffectFailure())
  }
}

export function* saveSideEffectWatcher() {
  yield takeLatest(SAVE_SIDE_EFFECT, saveSideEffectAsync)
}

//----------------------save side effects list for medication
function* saveSideEffectsListAsync(props: Props) {
  try {
    yield put(saveSideEffectsListRequest());
    yield call(() => saveSideEffectsListForMedicineAPI(props.payload as SideEffectsListWithMedicationId));
    yield put(saveSideEffectsListSuccess())
  } catch (e) {
    console.log("err");
    yield put(saveSideEffectsListFailure())
  }
}

export function* saveSideEffectsListWatcher() {
  yield takeLatest(SAVE_SIDE_EFFECTS_LIST, saveSideEffectsListAsync)
}

//-------------------------get side effects list
function* getSideEffectsListAsync() {
  try {
    yield put(getSideEffectsListRequest());
    const sideEffects = yield call(() => getSideEffectsListAPI());
    yield put(getSideEffectsListSuccess(sideEffects as SideEffectWithId[]))
  } catch (e) {
    console.log("err");
    yield put(getSideEffectsListFailure())
  }
}

export function* getSideEffectsListWatcher() {
  yield takeLatest(GET_SIDE_EFFECTS_LIST, getSideEffectsListAsync)
}

//-------------------------get side effects of medicine id
function* getSideEffectsOfMedicineAsync(props: Props) {
  try {
    yield put(getSideEffectsOfMedicineRequest());
    const sideEffects = yield call(() => getSideEffectsOfMedicineAPI(props.payload as string));
    yield put(getSideEffectsOfMedicineSuccess(sideEffects as SideEffectWithId[]))
  } catch (e) {
    console.log("err");
    yield put(getSideEffectsOfMedicineFailure())
  }
}

export function* getSideEffectsOfMedicineWatcher() {
  yield takeLatest(GET_SIDE_EFFECTS_OF_MEDICINE, getSideEffectsOfMedicineAsync)
}
