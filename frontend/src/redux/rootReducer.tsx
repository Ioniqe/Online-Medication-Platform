import { combineReducers } from "redux"
import loginReducer from "../reducers/LoginReducer"
import registerReducer from "../reducers/RegisterReducer"
import medicalPlanReducer from "../reducers/MedicalPlanReducer"
import medicineListReducer from "../reducers/MedicineListReducer"
import caregiverReducer from "../reducers/CaregiverReducer"
import medicineReducer from "../reducers/MedicineReducer"
import patientOfPersonReducer from "../reducers/PatientOfPersonReducer"
import patientReducer from "../reducers/PatientReducer"
import sideEffectReducer from "../reducers/SideEffectReducer"

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  patientOfPerson: patientOfPersonReducer,
  caregiver: caregiverReducer,
  medPlansReducer: medicalPlanReducer,
  medListReducer: medicineListReducer,
  medicine: medicineReducer,
  patient: patientReducer,
  sideEffect: sideEffectReducer,
  
})

export default rootReducer
