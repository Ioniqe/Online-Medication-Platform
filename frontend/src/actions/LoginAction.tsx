import { PersonWithId, PersonWithIdAndToken, User } from "../model/models"
import { VERIFY_USER, VERIFY_USER_FAILURE, VERIFY_USER_REQUEST, VERIFY_USER_SUCCESS } from "../types/LoginTypes"

export const verifyUser = (user: User) => {
  return {
    type: VERIFY_USER,
    payload: user
  }
}

//--------------------------------------------- VERIFY USER
export const verifyUserRequest = () => {
  return {
    type: VERIFY_USER_REQUEST,
  }
}

export const verifyUserSuccess = (person : PersonWithIdAndToken) => {
  return {
    type: VERIFY_USER_SUCCESS,
    payload : person
  }
}

export const verifyUserFailure = () => {
  return {
    type: VERIFY_USER_FAILURE,
  }
}

