import { PersonWithId, PersonWithIdAndToken, User } from "../model/models";
import { takeLatest, call, put } from "redux-saga/effects";
import { VERIFY_USER } from "../types/LoginTypes";
import { verifyUserFailure, verifyUserRequest, verifyUserSuccess } from "../actions/LoginAction";
import { verifyUserAPI } from "../api/LoginApi";

interface Props {
  type: string,
  payload: User
} 

function* verifyUserAsync(props: Props) {
  try {
    yield put(verifyUserRequest());
    const user = yield call(() => verifyUserAPI(props.payload));
    yield put(verifyUserSuccess(user as PersonWithIdAndToken))
  } catch (e) {
    console.log("err");
    yield put(verifyUserFailure())
  }
}

export function* verifyUserWatcher() {
  yield takeLatest(VERIFY_USER, verifyUserAsync)
}
