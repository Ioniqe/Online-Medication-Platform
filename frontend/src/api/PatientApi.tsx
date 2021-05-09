import { PatientAndCaregiverIds, Person, PersonWithDoctorId, url } from "../model/models"
import { securityToken } from "../utils/securityToken"

export const savePatientAPI = (newPatient: PersonWithDoctorId) => {
  return fetch(`${url}/patient/new/${newPatient.doctorPersonId}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': securityToken(),
    },
    body: JSON.stringify(newPatient.person)
  }).then(response => response.json())
}

export const deletePatientAPI = (personId: string) => {
  return fetch(`${url}/patient/delete/${personId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': securityToken(),
    },
  })
}

export const editPatientAPI = (editPatient: Person, personId: string) => {
  return fetch(`${url}/patient/update/${personId}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': securityToken(),
    },
    body: JSON.stringify(editPatient)
  }).then(response => response.json())
}

export const assignCaregiverAPI = (ids: PatientAndCaregiverIds) => {
  return fetch(`${url}/patient/set_caregiver/${ids.patientId}/${ids.caregiverId}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': securityToken(),
    },
  }).then(response => response.json())
}

