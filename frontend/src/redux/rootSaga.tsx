import { all } from "redux-saga/effects";
import { deleteCaregiverWatcher, editCaregiverWatcher, getCaregiversWatcher, getPatientsOfCaregiverWatcher, saveCaregiverWatcher } from "../sagas/CaregiverSaga";
import { getPatientsOfDoctorWatcher } from "../sagas/DoctorSaga";
import { verifyUserWatcher } from "../sagas/LoginSaga";
import { createMedPlanWatcher, getMedPlansWatcher } from "../sagas/MedicalPlanSaga";
import { addMedicineToMedListWatcher, createMedListWatcher } from "../sagas/MedicineListSaga";
import { deleteMedicineWatcher, getMedicinesWatcher, getMedListsWithSideEffectsWatcher, saveMedicineWatcher, updateMedicineWatcher } from "../sagas/MedicineSaga";
import { assignCaregiverWatcher, deletePatientWatcher, editPatientWatcher, savePatientWatcher } from "../sagas/PatientSaga";
import { registerUserWatcher } from "../sagas/RegisterSaga";
import { getSideEffectsListWatcher, getSideEffectsOfMedicineWatcher, saveSideEffectsListWatcher, saveSideEffectWatcher } from "../sagas/SideEffectSaga";

export default function* rootSaga() {
  yield all([
    verifyUserWatcher(),
    registerUserWatcher(),
    getPatientsOfCaregiverWatcher(),
    getPatientsOfDoctorWatcher(),
    getMedPlansWatcher(),
    getMedListsWithSideEffectsWatcher(),
    getCaregiversWatcher(),
    getMedicinesWatcher(),
    savePatientWatcher(),
    deletePatientWatcher(),
    deleteCaregiverWatcher(),
    saveCaregiverWatcher(),
    editPatientWatcher(),
    editCaregiverWatcher(),
    saveSideEffectWatcher(),
    getSideEffectsListWatcher(),
    saveMedicineWatcher(),
    saveSideEffectsListWatcher(),
    deleteMedicineWatcher(),
    getSideEffectsOfMedicineWatcher(),
    updateMedicineWatcher(),
    assignCaregiverWatcher(),
    
    createMedPlanWatcher(),
    createMedListWatcher(),
    addMedicineToMedListWatcher(),

  ])
}
