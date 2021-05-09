import { Person } from "../model/models"
import { RESET_REGISTER, SAVE_USER_FAILURE, SAVE_USER_REQUEST, SAVE_USER_SUCCESS } from "../types/RegisterTypes"

export interface LoginState {
  loading: boolean,
  registerSuccessful: boolean,
  error: boolean
}

const initialState: LoginState = {
  loading: false,
  registerSuccessful: false,
  error: false
}

const registerReducer = (state = initialState, action: { type: string, payload: Person }) => {
  switch (action.type) {
    case SAVE_USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SAVE_USER_SUCCESS:
      return {
        loading: false,
        registerSuccessful: true,
        error: false
      }
    case SAVE_USER_FAILURE:
      return {
        loading: false,
        registerSuccessful: false,
        error: true
      }
    case RESET_REGISTER:
      return {
        ...initialState
      }
    default: return state
  }
}

export default registerReducer