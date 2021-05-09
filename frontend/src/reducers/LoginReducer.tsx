import { VERIFY_USER_REQUEST, VERIFY_USER_SUCCESS, VERIFY_USER_FAILURE } from "../types/LoginTypes"
import { PersonWithId, PersonWithIdAndToken } from "../model/models"

export interface LoginState {
  loading: boolean,
  user: PersonWithIdAndToken,
  error: boolean
}

const initialState: LoginState = {
  loading: false,
  user:
  {
    token: "",
    id : "",
    username : "",
    password : "",
    firstname : "",
    lastname : "",
    address : "",
    birth_date : new Date(),
    gender : "",
    type : ""
  },
  error: false
}

const loginReducer = (state = initialState, action: { type: string, payload: PersonWithIdAndToken }) => {
  switch (action.type) {
    case VERIFY_USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case VERIFY_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: false
      }
    case VERIFY_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    default: return state
  }
}

export default loginReducer