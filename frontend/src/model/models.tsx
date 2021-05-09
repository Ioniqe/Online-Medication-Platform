// export const url = 'http://localhost:8080';
export const url = 'https://ds-assignment1.herokuapp.com';

export interface User {
  username: string,
  password: string
}

export interface PersonWithId {
  id: string,
  username: string,
  password: string,
  firstname: string,
  lastname: string,
  address: string,
  birth_date: Date | string,
  gender: string,
  type: string
}

export interface PersonWithIdAndToken {
  token: string,
  id: string,
  username: string,
  password: string,
  firstname: string,
  lastname: string,
  address: string,
  birth_date: Date | string,
  gender: string,
  type: string
}

export interface Person {
  username: string,
  password: string,
  firstname: string,
  lastname: string,
  address: string,
  birth_date: Date | string,
  gender: string,
  type: string,
}

export interface PersonWithDoctorId {
  person: Person,
  doctorPersonId: string,
}

export interface MedicationPlan {
  id: string,
  treatmentPeriod: number,
  treatmentName: string,
}

export interface MedicationList {
  id: string,
  startInterval: string,
  endInterval: string
}

export interface MedicationWithId {
  id: string,
  name: string,
  dosage: string
}

export interface Medication {
  name: string,
  dosage: string
}

export interface SideEffectWithId {
  id: string,
  sideEffect: string
}

export interface SideEffect {
  sideEffect: string
}

export interface MedPlanWithIntervals {
  id: string,
  treatmentPeriod: number,
  treatmentName: string,
  startInterval: string,
  endInterval: string
}

export interface MedicationWithSideEffectsListWithId {
  id: string,
  name: string,
  dosage: string,
  sideEffectsListDtos: SideEffectWithId[]
}

export interface SideEffectsListWithMedicationId {
  id: string,
  sideEffectsList: SideEffectWithId[]
}

export interface MedicationWithSideEffectsList {
  name: string,
  dosage: string,
  sideEffectsListDtos: SideEffectWithId[]
}

export interface PatientAndCaregiverIds {
  patientId: string,
  caregiverId: string,
}

//------------------------------------------

export interface MedPlan {
  treatmentPeriod: number,
  treatmentName: string
}

export interface CreateMedPlanInterface {
  patientPersonId: string,
  medPlan: MedPlan
}

export interface MedList {
  startInterval: string,
  endInterval: string
}

export interface CreateMedListInterface {
  medPlanId: string,
  medList: MedList
}

export interface AddMedicineToMedListInterface{
  medListId: string,
  medicines: Medication[]
}

//-----------------------------------------

export interface WebSocketMessages{
  personId: string,
  message: string
}