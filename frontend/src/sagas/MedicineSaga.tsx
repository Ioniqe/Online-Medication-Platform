import { put, takeLatest, call } from "redux-saga/effects";
import { saveMedicineRequest, saveMedicineSuccess, saveMedicineFailure, deleteMedicineFailure, deleteMedicineRequest, deleteMedicineSuccess, updateMedicineFailure, updateMedicineRequest, updateMedicineSuccess } from "../actions/MedicineAction";
import { getMedicinesWithSideEffectsListRequest, getMedicinesWithSideEffectsListSuccess, getMedicinesWithSideEffectsListFailure, getMedicinesRequest, getMedicinesFailure, getMedicinesSuccess } from "../actions/MedicineListAction";
import { deleteMedicineAPI, saveMedicineAPI, updateMedicineAPI } from "../api/MedicineApi";
import { getMedicinesAPI, getMedsWithSideEffectsListsAPI } from "../api/MedicineListApi";
import { Medication, MedicationWithId, MedicationWithSideEffectsListWithId } from "../model/models";
import { GET_MEDICINE_LIST, GET_MED_LIST_W_SIDE_EFFECTS } from "../types/MedicineListTypes";
import { DELETE_MEDICATION, SAVE_MEDICATION, UPDATE_MEDICATION } from "../types/MedicineTypes";

interface Props {
  type: string,
  payload: string | Medication | MedicationWithId
} 

//--------------------------get medicines with side effects list
function* getMedListsWithSideEffectsAsync(props: Props) {
  try {
    yield put(getMedicinesWithSideEffectsListRequest());
    const meds = yield call(() => getMedsWithSideEffectsListsAPI(props.payload as string));
    yield put(getMedicinesWithSideEffectsListSuccess(meds as MedicationWithSideEffectsListWithId[]))
  } catch (e) {
    console.log("err");
    yield put(getMedicinesWithSideEffectsListFailure())
  }
}

export function* getMedListsWithSideEffectsWatcher() {
  yield takeLatest(GET_MED_LIST_W_SIDE_EFFECTS, getMedListsWithSideEffectsAsync)
}

//--------------------------get medicines
function* getMedicinesAsync() {
  try {
    yield put(getMedicinesRequest());
    const meds = yield call(() => getMedicinesAPI());
    yield put(getMedicinesSuccess(meds as MedicationWithSideEffectsListWithId[]))
  } catch (e) {
    console.log("err");
    yield put(getMedicinesFailure())
  }
}

export function* getMedicinesWatcher() {
  yield takeLatest(GET_MEDICINE_LIST, getMedicinesAsync)
}

//----------------------save Medicine with side effects
function* saveMedicineAsync(props: Props) {
  try {
    yield put(saveMedicineRequest());
    const medicationId = yield call(() => saveMedicineAPI(props.payload as Medication));
    yield put(saveMedicineSuccess(medicationId as string))
  } catch (e) {
    console.log("err");
    yield put(saveMedicineFailure())
  }
}

export function* saveMedicineWatcher() {
  yield takeLatest(SAVE_MEDICATION, saveMedicineAsync)
}

//----------------------update Medicine
function* updateMedicineAsync(props: Props) {
  try {
    yield put(updateMedicineRequest());
    yield call(() => updateMedicineAPI(props.payload as MedicationWithId));
    yield put(updateMedicineSuccess())
  } catch (e) {
    console.log("err");
    yield put(updateMedicineFailure())
  }
}

export function* updateMedicineWatcher() {
  yield takeLatest(UPDATE_MEDICATION, updateMedicineAsync)
}

//----------------------delete Medicine
function* deleteMedicineAsync(props: Props) {
  try {
    yield put(deleteMedicineRequest());
    yield call(() => deleteMedicineAPI(props.payload as string));
    yield put(deleteMedicineSuccess())
  } catch (e) {
    console.log("err");
    yield put(deleteMedicineFailure())
  }
}

export function* deleteMedicineWatcher() {
  yield takeLatest(DELETE_MEDICATION, deleteMedicineAsync)
}