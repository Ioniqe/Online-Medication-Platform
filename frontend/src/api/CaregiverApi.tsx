import { Person, url } from "../model/models"
import { securityToken } from "../utils/securityToken"

export const getPeopleAPI = (personId: string) => {

  return fetch(`${url}/patients_details/caregiver/${personId}`, {
    method: 'GET',
    headers: {
      'Authorization': securityToken(),
    },
  }).then(response => response.json())
}

export const getCaregiversAPI = () => {
  console.log(securityToken());

  return fetch(`${url}/people/caregiver`, {
    method: 'GET',
    headers: {
      'Authorization': securityToken(),
    },
  }).then(response => response.json())
}

export const deleteCaregiverAPI = (personId: string) => {
  return fetch(`${url}/caregiver/delete/${personId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': securityToken(),
    },
  })
}

export const saveCaregiverAPI = (person: Person) => {
  return fetch(`${url}/caregiver/new`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': securityToken(),
    },
    body: JSON.stringify(person)
  }).then(response => response.json())
}

export const editCaregiverAPI = (editCaregiver: Person, personId: string) => {
  return fetch(`${url}/caregiver/update/${personId}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': securityToken(),
    },
    body: JSON.stringify(editCaregiver)
  }).then(response => response.json())
}