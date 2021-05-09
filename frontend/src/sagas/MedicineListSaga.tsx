import { put, takeLatest, call } from "redux-saga/effects";
import { createMedListRequest, createMedListSuccess, createMedListFailure, addMedicineToMedListFailure, addMedicineToMedListRequest, addMedicineToMedListSuccess } from "../actions/MedicineListAction";
import { addMedicineToMedListAPI, createMedListAPI } from "../api/MedicineListApi";
import { AddMedicineToMedListInterface, CreateMedListInterface } from "../model/models";
import { ADD_MEDICINE_TO_MED_LIST, CREATE_MED_LIST } from "../types/MedicineListTypes";

interface Props {
  type: string,
  payload: CreateMedListInterface | AddMedicineToMedListInterface
} 

//--------------------------create med list
function* createMedListAsync(props: Props) {
  try {
    yield put(createMedListRequest());
    const medListId = yield call(() => createMedListAPI(props.payload as CreateMedListInterface));
    yield put(createMedListSuccess(medListId as string))
  } catch (e) {
    console.log("err");
    yield put(createMedListFailure())
  }
}

export function* createMedListWatcher() {
  yield takeLatest(CREATE_MED_LIST, createMedListAsync)
}

//--------------------------add meds to med list
function* addMedicineToMedListAsync(props: Props) {
  try {
    yield put(addMedicineToMedListRequest());
    yield call(() => addMedicineToMedListAPI(props.payload as AddMedicineToMedListInterface));
    yield put(addMedicineToMedListSuccess())
  } catch (e) {
    console.log("err");
    yield put(addMedicineToMedListFailure())
  }
}

export function* addMedicineToMedListWatcher() {
  yield takeLatest(ADD_MEDICINE_TO_MED_LIST, addMedicineToMedListAsync)
}