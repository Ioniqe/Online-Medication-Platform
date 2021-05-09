import { call, put, takeLatest } from "redux-saga/effects";
import { getPatientsOfDoctorRequest, getPatientsOfDoctorSuccess, getPatientsOfDoctorFailure } from "../actions/PatientOfDoctorAction";
import { getPeopleAPI } from "../api/DoctorApi";
import { PersonWithId } from "../model/models";
import { GET_PATIENTS_OF_DOCTOR } from "../types/PatientOfDoctorTypes";

interface Props {
  type: string,
  payload: string
} 

function* getPatientsOfDoctorAsync(props: Props) {
  try {
    yield put(getPatientsOfDoctorRequest());
    const people = yield call(() => getPeopleAPI(props.payload));
    yield put(getPatientsOfDoctorSuccess(people as PersonWithId[]))
  } catch (e) {
    console.log("err");
    yield put(getPatientsOfDoctorFailure())
  }
}

export function* getPatientsOfDoctorWatcher() {
  yield takeLatest(GET_PATIENTS_OF_DOCTOR, getPatientsOfDoctorAsync)
}