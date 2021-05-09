import { call, put, takeLatest } from "redux-saga/effects";
import { getCaregiversRequest, getCaregiversSuccess, getCaregiversFailure, deleteCaregiverFailure, deleteCaregiverRequest, deleteCaregiverSuccess, saveCaregiverFailure, saveCaregiverRequest, saveCaregiverSuccess, editCaregiverFailure, editCaregiverRequest, editCaregiverSuccess } from "../actions/CaregiverAction";
import { getPatientsOfCaregiverFailure, getPatientsOfCaregiverRequest, getPatientsOfCaregiverSuccess} from "../actions/PatientOfCaregiverAction";
import { deleteCaregiverAPI, editCaregiverAPI, getCaregiversAPI, getPeopleAPI, saveCaregiverAPI } from "../api/CaregiverApi";
import { Person, PersonWithId } from "../model/models";
import { DELETE_CAREGIVER, GET_CAREGIVERS, SAVE_CAREGIVER, UPDATE_CAREGIVER } from "../types/CaregiverTypes";
import { GET_PATIENTS_OF_CAREGIVER } from "../types/PatientOfCaregiverTypes";

interface Props {
  type: string,
  payload: string | Person | PersonWithId
} 

//---------------------------get patients list
function* getPatientsOfCaregiverAsync(props: Props) {
  try {
    yield put(getPatientsOfCaregiverRequest());
    const people = yield call(() => getPeopleAPI(props.payload as string));
    yield put(getPatientsOfCaregiverSuccess(people as PersonWithId[]))
  } catch (e) {
    console.log("err");
    yield put(getPatientsOfCaregiverFailure())
  }
}

export function* getPatientsOfCaregiverWatcher() {
  yield takeLatest(GET_PATIENTS_OF_CAREGIVER, getPatientsOfCaregiverAsync)
}

//-------------------------get list
function* getCaregiversAsync() {
  try {
    yield put(getCaregiversRequest());
    const people = yield call(() => getCaregiversAPI());
    yield put(getCaregiversSuccess(people as PersonWithId[]))
  } catch (e) {
    console.log("err");
    yield put(getCaregiversFailure())
  }
}

export function* getCaregiversWatcher() {
  yield takeLatest(GET_CAREGIVERS, getCaregiversAsync)
}

//-----------------------delete
function* deleteCaregiverAsync(props: Props) {
  try {
    yield put(deleteCaregiverRequest());
    yield call(() => deleteCaregiverAPI(props.payload as string));
    yield put(deleteCaregiverSuccess())
  } catch (e) {
    console.log("err");
    yield put(deleteCaregiverFailure())
  }
}

export function* deleteCaregiverWatcher() {
  yield takeLatest(DELETE_CAREGIVER, deleteCaregiverAsync)
}

//----------------------save
function* saveCaregiverAsync(props: Props) {
  try {
    yield put(saveCaregiverRequest());
    yield call(() => saveCaregiverAPI(props.payload as Person));
    yield put(saveCaregiverSuccess())
  } catch (e) {
    console.log("err");
    yield put(saveCaregiverFailure())
  }
}

export function* saveCaregiverWatcher() {
  yield takeLatest(SAVE_CAREGIVER, saveCaregiverAsync)
}

//----------------------edit
function* editCaregiverAsync(props: Props) {
  try {
    yield put(editCaregiverRequest());

    let caregiver: Person = {
      username: (props.payload as PersonWithId).username,
      password: (props.payload as PersonWithId).password,
      firstname: (props.payload as PersonWithId).firstname,
      lastname: (props.payload as PersonWithId).lastname,
      address: (props.payload as PersonWithId).address,
      birth_date: (props.payload as PersonWithId).birth_date,
      gender: (props.payload as PersonWithId).gender,
      type: (props.payload as PersonWithId).type,
    }

    yield call(() => editCaregiverAPI(caregiver, (props.payload as PersonWithId).id));
    yield put(editCaregiverSuccess())
  } catch (e) {
    console.log("err");
    yield put(editCaregiverFailure())
  }
}

export function* editCaregiverWatcher() {
  yield takeLatest(UPDATE_CAREGIVER, editCaregiverAsync)
}