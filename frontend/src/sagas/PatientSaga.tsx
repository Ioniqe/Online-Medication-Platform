import { PatientAndCaregiverIds, Person, PersonWithDoctorId, PersonWithId } from "../model/models";
import { takeLatest, call, put } from "redux-saga/effects";
import { assignCaregiverAPI, deletePatientAPI, editPatientAPI, savePatientAPI } from "../api/PatientApi";
import { savePatientRequest, savePatientSuccess, savePatientFailure, deletePatientFailure, deletePatientRequest, deletePatientSuccess, editPatientFailure, editPatientRequest, editPatientSuccess, assignCaregiverFailure, assignCaregiverRequest, assignCaregiverSuccess } from "../actions/PatientAction";
import { ASSIGN_CAREGIVER, DELETE_PATIENT, SAVE_PATIENT, UPDATE_PATIENT } from "../types/PatientTypes";

interface Props {
  type: string,
  payload: PersonWithDoctorId | string | PersonWithId | PatientAndCaregiverIds
} 

//---------------------------------------save
function* savePatientAsync(props: Props) {
  try {
    yield put(savePatientRequest());
    yield call(() => savePatientAPI(props.payload as PersonWithDoctorId));
    yield put(savePatientSuccess())
  } catch (e) {
    console.log("err");
    yield put(savePatientFailure())
  }
}

export function* savePatientWatcher() {
  yield takeLatest(SAVE_PATIENT, savePatientAsync)
}

//---------------------------------------delete
function* deletePatientAsync(props: Props) {
  try {
    yield put(deletePatientRequest());
    yield call(() => deletePatientAPI(props.payload as string));
    yield put(deletePatientSuccess())
  } catch (e) {
    console.log("err");
    yield put(deletePatientFailure())
  }
}

export function* deletePatientWatcher() {
  yield takeLatest(DELETE_PATIENT, deletePatientAsync)
}

//---------------------------------------edit
function* editPatientAsync(props: Props) {
  console.log("editPatientAsync");
  try {
    yield put(editPatientRequest());

    let patient: Person = {
      username: (props.payload as PersonWithId).username,
      password: (props.payload as PersonWithId).password,
      firstname: (props.payload as PersonWithId).firstname,
      lastname: (props.payload as PersonWithId).lastname,
      address: (props.payload as PersonWithId).address,
      birth_date: (props.payload as PersonWithId).birth_date,
      gender: (props.payload as PersonWithId).gender,
      type: (props.payload as PersonWithId).type,
    }

    yield call(() => editPatientAPI(patient, (props.payload as PersonWithId).id));
    yield put(editPatientSuccess())
  } catch (e) {
    console.log("err");
    yield put(editPatientFailure())
  }
}

export function* editPatientWatcher() {
  yield takeLatest(UPDATE_PATIENT, editPatientAsync)
}

//---------------------------------------assign caregiver
function* assignCaregiverAsync(props: Props) {
  try {
    yield put(assignCaregiverRequest());
    yield call(() => assignCaregiverAPI(props.payload as PatientAndCaregiverIds));
    yield put(assignCaregiverSuccess())
  } catch (e) {
    console.log("err");
    yield put(assignCaregiverFailure())
  }
}

export function* assignCaregiverWatcher() {
  yield takeLatest(ASSIGN_CAREGIVER, assignCaregiverAsync)
}
